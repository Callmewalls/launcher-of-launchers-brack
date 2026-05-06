import { execFile } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { promisify } from 'util';
import UserGame from '@entities/UserGame.model';
import { Logger } from '@utils/logger';

/**
 * Given an install directory, returns the most likely main executable.
 * Heuristic: largest .exe in the root of the install folder (ignoring
 * common helper/launcher executables like unins000.exe, UnityCrashHandler, etc.).
 */
function findExeInInstallDir(installDir: string): string | undefined {
  if (!fs.existsSync(installDir)) return undefined;

  const IGNORE = /^(unins\d+|uninstall|crashhandler|unitycrashandler|dotnetfx|vcredist|dxsetup|vc_redist|directx)/i;

  try {
    const entries = fs.readdirSync(installDir, { withFileTypes: true });
    const exes = entries
      .filter(e => e.isFile() && path.extname(e.name).toLowerCase() === '.exe' && !IGNORE.test(e.name))
      .map(e => {
        const full = path.join(installDir, e.name);
        return { full, size: fs.statSync(full).size };
      })
      .sort((a, b) => b.size - a.size);

    return exes[0]?.full;
  } catch {
    return undefined;
  }
}

const execFileAsync = promisify(execFile);

/**
 * Extracts the embedded PNG icon from a Windows .exe file.
 *
 * Uses System.Drawing via a PowerShell subprocess — no native Node addons
 * required. Paths are injected via environment variables to prevent
 * command-injection risk.
 *
 * The PNG is written to a temp file instead of stdout to avoid any binary
 * corruption caused by PowerShell's console output encoding on Windows.
 *
 * Returns null when:
 *   - the UserGame row does not belong to the requesting user
 *   - executablePath is not set (game not installed / not scanned locally)
 *   - the .exe does not exist on disk
 *   - PowerShell fails to extract the icon (some launchers strip icon resources)
 */
export class IconService {
  // Paths injected via env vars — never concatenated into the script string.
  // Writes PNG to $env:ICON_OUT_PATH to avoid binary encoding corruption on stdout.
  private static readonly PS_SCRIPT = [
    'Add-Type -AssemblyName System.Drawing',
    'try {',
    '  $icon = [System.Drawing.Icon]::ExtractAssociatedIcon($env:ICON_EXE_PATH)',
    '  $bmp  = $icon.ToBitmap()',
    '  $bmp.Save($env:ICON_OUT_PATH, [System.Drawing.Imaging.ImageFormat]::Png)',
    '  exit 0',
    '} catch { exit 1 }',
  ].join('; ');

  async getIconForUserGame(userId: string, userGameId: string): Promise<Buffer | null> {
    const entry = await UserGame.findOne({ where: { id: userGameId, userId } });
    if (!entry) return null;

    const exePath = entry.executablePath
      ?? findExeInInstallDir(entry.installPath ?? '');
    if (!exePath) {
      Logger.warn(`[IconService] ${userGameId}: executablePath is null/empty and no exe found in installPath (${entry.installPath ?? 'none'})`);
      return null;
    }

    // Only accept absolute paths ending in .exe to avoid misuse
    const resolved = path.resolve(exePath);
    if (path.extname(resolved).toLowerCase() !== '.exe') {
      Logger.warn(`[IconService] ${userGameId}: bad extension on resolved path: ${resolved}`);
      return null;
    }
    if (!fs.existsSync(resolved)) {
      Logger.warn(`[IconService] ${userGameId}: .exe not found at: ${resolved}`);
      return null;
    }

    const tmpFile = path.join(os.tmpdir(), `lol-icon-${userGameId}.png`);

    try {
      await execFileAsync(
        'powershell',
        ['-NoProfile', '-NonInteractive', '-Command', IconService.PS_SCRIPT],
        {
          // Paths passed via env vars — never interpolated into the script string
          env: { ...process.env, ICON_EXE_PATH: resolved, ICON_OUT_PATH: tmpFile },
          timeout: 8000,
        },
      );

      if (!fs.existsSync(tmpFile)) return null;
      const buffer = fs.readFileSync(tmpFile);
      return buffer.length > 0 ? buffer : null;
    } catch (err) {
      Logger.warn(`[IconService] Could not extract icon for ${resolved}`, err);
      return null;
    } finally {
      // Always clean up the temp file
      try { fs.unlinkSync(tmpFile); } catch { /* ignore */ }
    }
  }
}

export const iconService = new IconService();
