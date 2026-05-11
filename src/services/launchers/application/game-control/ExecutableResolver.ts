import { promises as fs } from 'fs';
import path from 'path';

const EXCLUDED_EXE_NAMES = new Set([
  'unins000.exe', 'uninstall.exe', 'uninst.exe', 'setup.exe', 'install.exe',
  'unitycrashandler64.exe', 'unitycrashandler32.exe',
  'crashpad_handler.exe', 'crashreportclient.exe', 'crashreporter.exe',
  'vcredist_x64.exe', 'vcredist_x86.exe',
  'dxsetup.exe', 'isdone.exe', 'dotnetfx40_full_setup.exe',
  'launcher.exe',
]);

async function findExeFiles(
  dir: string,
  depth = 0,
  maxDepth = 2,
): Promise<Array<{ path: string; size: number }>> {
  const results: Array<{ path: string; size: number }> = [];
  if (depth > maxDepth) return results;

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isFile() && entry.name.toLowerCase().endsWith('.exe')) {
        if (!EXCLUDED_EXE_NAMES.has(entry.name.toLowerCase())) {
          try {
            const stat = await fs.stat(fullPath);
            results.push({ path: fullPath, size: stat.size });
          } catch {
            // inaccessible file: ignore
          }
        }
      } else if (entry.isDirectory() && depth < maxDepth) {
        const sub = await findExeFiles(fullPath, depth + 1, maxDepth);
        results.push(...sub);
      }
    }
  } catch {
    // inaccessible dir: ignore
  }

  return results;
}

export async function resolveExecutableFromInstallPath(
  installPath: string,
  gameTitle: string,
): Promise<string | undefined> {
  const candidates = await findExeFiles(installPath);
  if (candidates.length === 0) return undefined;
  if (candidates.length === 1) return candidates[0].path;

  const titleWords = gameTitle.toLowerCase().split(/\W+/).filter(Boolean);

  const scored = candidates.map((candidate) => {
    const baseName = path.basename(candidate.path).toLowerCase().replace(/\.exe$/, '');
    const titleScore = titleWords.filter((word) => baseName.includes(word)).length * 1_000_000;
    return { ...candidate, score: titleScore + candidate.size };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0].path;
}
