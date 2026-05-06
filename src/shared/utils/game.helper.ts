/**
 * Computes the full executable path for a game using a user-configured pattern.
 *
 * Supported placeholders (case-insensitive):
 *   {installPath} — replaced with the game's install directory
 *   {gameName}    — replaced with the game title sanitised for filesystem use
 *
 * Returns undefined when pattern or installPath is absent.
 */
export function computeExecutablePath(
  installPath: string | undefined,
  title: string,
  pattern: string | undefined,
): string | undefined {
  if (!pattern || !installPath) return undefined;

  // Strip characters forbidden in Windows paths
  const safeName = title.replace(/[<>:"/\\|?*]/g, '').trim();

  return pattern
    .replace(/\{installPath\}/gi, installPath)
    .replace(/\{gameName\}/gi, safeName);
}
