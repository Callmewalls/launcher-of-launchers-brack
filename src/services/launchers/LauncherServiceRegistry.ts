import type { LauncherType } from '@shared/types/launcher.types';
import type { ILauncherService } from './ILauncherService';
import { Logger } from '@utils/logger';

class LauncherServiceRegistry {
  private readonly services = new Map<LauncherType, ILauncherService>();

  register(service: ILauncherService): void {
    this.services.set(service.launcherType, service);
    Logger.log(`[LauncherRegistry] Registered: ${service.launcherType} (configured: ${service.isConfigured()})`);
  }

  get(type: LauncherType): ILauncherService {
    const service = this.services.get(type);
    if (!service) {
      throw new Error(`No launcher service registered for type: ${type}`);
    }
    return service;
  }

  /** Returns only launchers that have valid credentials configured */
  getConfigured(): ILauncherService[] {
    return Array.from(this.services.values()).filter((s) => s.isConfigured());
  }

  isSupported(type: LauncherType): boolean {
    return this.services.has(type);
  }

  getSupportedTypes(): LauncherType[] {
    return Array.from(this.services.keys());
  }
}

export const launcherRegistry = new LauncherServiceRegistry();
