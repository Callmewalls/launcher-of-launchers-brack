import LauncherConfig from '@entities/LauncherConfig.model';
import type { LauncherType } from '@shared/types/launcher.types';

export interface LauncherConfigData {
  installBasePath?: string;
  executablePattern?: string;
}

/**
 * Rutas típicas de instalación por launcher en Windows.
 * Se usan como valores por defecto al crear un usuario nuevo para que el
 * local-scan funcione sin configuración manual.
 * Sobreescribibles vía PUT /api/launchers/:launcherType/local-config
 */
export const DEFAULT_LAUNCHER_INSTALL_PATHS: Partial<Record<LauncherType, string>> = {
  steam:     'C:\\Program Files (x86)\\Steam',
  epic:      'C:\\ProgramData\\Epic\\EpicGamesLauncher\\Data\\Manifests',
  gog:       'C:\\GOG Games',
  uplay:     'C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher\\games',
  origin:    'C:\\Program Files\\EA Games',
  battlenet: 'C:\\Program Files (x86)\\Battle.net\\Games',
};

class LauncherConfigRepository {
  async findByUserAndLauncher(userId: string, launcherType: LauncherType): Promise<LauncherConfig | null> {
    return LauncherConfig.findOne({ where: { userId, launcherType } });
  }

  async findAllByUser(userId: string): Promise<LauncherConfig[]> {
    return LauncherConfig.findAll({ where: { userId } });
  }

  async upsert(userId: string, launcherType: LauncherType, data: LauncherConfigData): Promise<LauncherConfig> {
    const [config] = await LauncherConfig.upsert({
      userId,
      launcherType,
      ...data,
    });
    return config;
  }

  /**
   * Crea una LauncherConfig con la ruta por defecto para cada launcher conocido,
   * solo si el usuario aún no tiene entrada para ese launcher.
   * Idempotente — seguro llamarlo en cada registro aunque ya existan entradas.
   * Los errores individuales se silencian para no bloquear el registro.
   */
  async seedDefaultsForUser(userId: string): Promise<void> {
    const entries = Object.entries(DEFAULT_LAUNCHER_INSTALL_PATHS) as [LauncherType, string][];
    await Promise.allSettled(
      entries.map(([launcherType, installBasePath]) =>
        LauncherConfig.findOrCreate({
          where: { userId, launcherType },
          defaults: { userId, launcherType, installBasePath },
        }),
      ),
    );
  }
}

export const launcherConfigRepository = new LauncherConfigRepository();
export default launcherConfigRepository;
