import { launcherRegistry } from '@services/launchers/core/LauncherServiceRegistry';
import type { LauncherType } from '@shared/types/launcher.types';

export function requiresInteractiveOAuthLinking(launcherType: LauncherType): boolean {
  if (!launcherRegistry.isSupported(launcherType)) {
    return false;
  }

  const service = launcherRegistry.get(launcherType);
  const capabilities = service.getCapabilities();
  return capabilities.canAuthenticate && service.isConfigured() && capabilities.canFetchOwnedGames;
}

export function buildOAuthLinkingRequiredMessage(launcherType: LauncherType): string {
  return `${launcherType} requires OAuth/OpenID linking. Use GET /api/launchers/${launcherType}/auth-url first.`;
}