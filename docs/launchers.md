# Integración de Launchers

## Arquitectura general

El sistema usa el patrón **Strategy + Registry**:

- Cada launcher es una clase que implementa `ILauncherService`.
- El `LauncherServiceRegistry` actúa como factory: registra instancias y las devuelve por tipo.
- `SyncService` orquesta la sincronización sin saber qué launcher usa — solo habla con la interfaz.

```
ILauncherService (interfaz)
  ├── SteamLauncherService    → OpenID 2.0
  └── OAuth2LauncherService   → clase base OAuth2 (abstracta)
        ├── EpicLauncherService
        ├── GogLauncherService
        ├── UplayLauncherService
        ├── OriginLauncherService
        └── BattleNetLauncherService

LauncherServiceRegistry  → Map<LauncherType, ILauncherService>
SyncService              → usa el registry para iterar cuentas del usuario
```

---

## Qué hace cada fichero

| Fichero | Responsabilidad |
|---|---|
| `ILauncherService.ts` | Contrato que toda integración debe cumplir |
| `OAuth2LauncherService.ts` | Clase base que implementa `buildAuthUrl`, `exchangeCode` y `refreshTokens` reales para OAuth2 estándar (soporta `tokenAuthMethod: 'body'\|'basic'`) |
| `LauncherServiceRegistry.ts` | Singleton. Registra servicios y los devuelve por `LauncherType`. Expone `getConfigured()` para listar solo los que tienen credenciales |
| `SteamLauncherService.ts` | Integración completa con Steam (OpenID + Steam Web API) |
| `EpicLauncherService.ts` | Auth + fetchOwnedGames implementados |
| `GogLauncherService.ts` | Auth + fetchOwnedGames implementados |
| `UplayLauncherService.ts` | Auth implementado — librería pendiente (sin API pública) |
| `OriginLauncherService.ts` | Auth + fetchOwnedGames implementados |
| `BattleNetLauncherService.ts` | Auth implementado — librería pendiente (requiere scopes de producto) |

---

## Estado de implementación

| Launcher | Auth | `fetchOwnedGames` | `fetchRecentlyPlayed` | Notas |
|---|---|---|---|---|
| **Steam** | ✅ OpenID 2.0 | ✅ `IPlayerService` | ✅ `IPlayerService` | Completamente funcional |
| **Epic** | ✅ OAuth2 Basic | ✅ `library-service.live.use1a.on.epicgames.com` | — sin endpoint | Requiere `EPIC_CLIENT_ID/SECRET/REDIRECT_URI` |
| **GOG** | ✅ OAuth2 | ✅ `embed.gog.com/user/data/games` + `catalog.gog.com` (batches 50) | — sin endpoint | Requiere `GOG_CLIENT_ID/SECRET/REDIRECT_URI` |
| **EA/Origin** | ✅ OAuth2 + identity fetch (personaId) | ✅ `api1.origin.com/ecommerce2/consolidatedentitlements` | — sin endpoint | Requiere `EA_CLIENT_ID/SECRET/REDIRECT_URI` |
| **Battle.net** | ✅ OAuth2 Basic + userinfo (BattleTag) | ⚠️ stub — no hay endpoint único | — sin endpoint | No existe API de librería; cada juego requiere scope de producto (`sc2.profile`, `wow.profile`…) |
| **Ubisoft** | ✅ OAuth2 (auth/token) | ⚠️ stub — sin API pública | — sin endpoint | API interna no documentada; librería no disponible sin reverse engineering |

**Leyenda:** ✅ implementado · ⚠️ stub intencionado (límite de la API del proveedor) · — no expuesto por el proveedor

---
| `ILauncherService.ts` | Contrato que toda integración debe cumplir |
| `OAuth2LauncherService.ts` | Clase base que implementa `buildAuthUrl` y la estructura de `exchangeCode`/`refreshTokens` para OAuth2 estándar |
| `LauncherServiceRegistry.ts` | Singleton. Registra servicios y los devuelve por `LauncherType`. Expone `getConfigured()` para listar solo los que tienen credenciales |
| `SteamLauncherService.ts` | Integración completa con Steam (OpenID + Steam Web API) |
| `EpicLauncherService.ts` | Auth OAuth2 + fetchOwnedGames implementados |
| `GogLauncherService.ts` | Auth OAuth2 + fetchOwnedGames implementados |
| `UplayLauncherService.ts` | Auth OAuth2 implementado — librería pendiente (sin API pública) |
| `OriginLauncherService.ts` | Auth OAuth2 + fetchOwnedGames implementados |
| `BattleNetLauncherService.ts` | Auth OAuth2 implementado — librería pendiente (requiere scopes de producto) |

---

## Por qué existe cada launcher

### Steam ✅ Completo
Auth vía **OpenID 2.0** (sin cliente secreto — el servidor verifica el callback con `openid.signed`). La biblioteca se obtiene con la **Steam Web API** (`IPlayerService`) usando `STEAM_API_KEY`. El `platformUserId` guardado es el **SteamID64**. `fetchRecentlyPlayed` también funciona.

Variables de entorno necesarias:
```
STEAM_API_KEY=<clave de https://steamcommunity.com/dev/apikey>
STEAM_OPENID_REALM=<dominio público del backend>
STEAM_OPENID_RETURN_URL=<URL de callback>
```

### Epic Games Store ✅ Auth + librería
OAuth2 con **Basic auth** en token request (`tokenAuthMethod: 'basic'`) contra `https://www.epicgames.com/id/authorize`. La biblioteca se obtiene de `library-service.live.use1a.on.epicgames.com/library/api/public/libraryItems?include_metadata=true` con el Bearer token del usuario. Las imágenes se extraen del campo `keyImages` (tipo `DieselGameBoxLogo` o `DieselGameBox`). `fetchRecentlyPlayed` no disponible — Epic no expone sesiones vía esta API.

Requiere app registrada en https://dev.epicgames.com.

Variables de entorno necesarias:
```
EPIC_CLIENT_ID=
EPIC_CLIENT_SECRET=
EPIC_REDIRECT_URI=
```

### GOG ✅ Auth + librería
OAuth2 (`tokenAuthMethod: 'body'`) contra `https://auth.gog.com`. La biblioteca se obtiene en dos pasos:
1. `GET https://embed.gog.com/user/data/games` → lista de product IDs del usuario.
2. `GET https://catalog.gog.com/v1/catalog?productId=...` → metadatos en batches de 50 (endpoint público, sin auth).

`fetchRecentlyPlayed` no disponible — GOG no expone playtime ni sesiones vía API pública. Requiere app en https://www.gog.com/partner.

Variables de entorno necesarias:
```
GOG_CLIENT_ID=
GOG_CLIENT_SECRET=
GOG_REDIRECT_URI=
```

### Ubisoft Connect ⚠️ Solo auth
OAuth2 (`tokenAuthMethod: 'body'`) contra `https://connect.ubisoft.com/authorize` / `https://public-ubiservices.ubi.com/v3/oauth/token`. La API de librería no está documentada públicamente; los endpoints existentes son resultado de ingeniería inversa y no son estables. `fetchOwnedGames` devuelve vacío intencionalmente hasta que Ubisoft exponga una API oficial.

Variables de entorno necesarias:
```
UBISOFT_CLIENT_ID=
UBISOFT_CLIENT_SECRET=
UBISOFT_REDIRECT_URI=
```

### EA App / Origin ✅ Auth + librería
OAuth2 (`tokenAuthMethod: 'body'`) contra `https://accounts.ea.com/connect`. Tras el exchange, se obtiene el `personaId` real con `GET https://gateway.ea.com/proxy/identity/pids/me` (enriquecimiento de identidad). La biblioteca se obtiene con:
```
GET https://api1.origin.com/ecommerce2/consolidatedentitlements/{personaId}
    AuthToken: <accessToken>
```
Se filtran solo entitlements de tipo `basegame` o `DEFAULT`. `fetchRecentlyPlayed` no disponible. Requiere app en https://developer.ea.com.

Variables de entorno necesarias:
```
EA_CLIENT_ID=
EA_CLIENT_SECRET=
EA_REDIRECT_URI=
```

### Battle.net ⚠️ Solo auth
OAuth2 con **Basic auth** contra `https://{region}.battle.net/oauth`. Tras el exchange, se obtiene el BattleTag y `accountId` con `GET https://{region}.battle.net/oauth/userinfo`. El `platformUserId` guardado es el ID numérico de cuenta de Blizzard.

**Límite de la plataforma:** no existe un endpoint de "biblioteca completa". Cada título (WoW, Diablo IV, SC2…) tiene su propia API de perfil que requiere un scope adicional (`sc2.profile`, `wow.profile`…). Con el scope `openid` actual solo se puede verificar la identidad y las cuentas vinculadas.

Próximo paso: ampliar scopes y añadir fetchers por producto en `BattleNetLauncherService`. Requiere app en https://develop.battle.net.

Variables de entorno necesarias:
```
BATTLENET_CLIENT_ID=
BATTLENET_CLIENT_SECRET=
BATTLENET_REDIRECT_URI=
BATTLENET_REGION=eu          # eu | us | kr | tw
```

---

## Cómo añadir un launcher nuevo

### Paso 1 — Añadir el tipo

En `src/shared/types/launcher.types.ts`, agregar el nuevo valor a `LauncherType`:

```typescript
export type LauncherType =
  | 'steam' | 'epic' | 'gog' | 'uplay' | 'origin' | 'battlenet'
  | 'itch'   // ← nuevo
  | 'other';
```

Actualizar también el `ENUM` de Sequelize en `src/shared/entities/LauncherAccount.model.ts` y `src/shared/entities/Game.model.ts` añadiendo el mismo valor.

### Paso 2 — Crear la clase del servicio

Si el launcher usa **OAuth2 estándar**, extender `OAuth2LauncherService`:

```typescript
// src/services/launchers/ItchLauncherService.ts
import { OAuth2LauncherService } from './OAuth2LauncherService';
import type { ILauncherGame } from '@shared/types/launcher.types';
import type LauncherAccount from '@entities/LauncherAccount.model';

export class ItchLauncherService extends OAuth2LauncherService {
  constructor() {
    super({
      launcherType: 'itch',
      clientId: EnvConfig.ITCH_CLIENT_ID,
      clientSecret: EnvConfig.ITCH_CLIENT_SECRET,
      authUrl: 'https://itch.io/user/oauth',
      tokenUrl: 'https://itch.io/api/1/oauth/token',
      redirectUri: EnvConfig.ITCH_REDIRECT_URI,
      scopes: ['profile:me', 'games:read'],
    });
  }

  async fetchOwnedGames(account: LauncherAccount): Promise<ILauncherGame[]> {
    // GET https://api.itch.io/profile/owned-keys usando account.accessToken
    // Mapear cada juego a ILauncherGame
    return [];
  }

  async fetchRecentlyPlayed(_account: LauncherAccount): Promise<ILauncherGame[]> {
    return []; // itch.io no expone sesiones recientes
  }
}
```

Si el launcher usa **un mecanismo de auth distinto** (como Steam con OpenID), implementar `ILauncherService` directamente en lugar de extender `OAuth2LauncherService`.

### Paso 3 — Registrar en app.ts

En `src/app.ts`, importar y registrar dentro de `registerLaunchers()`:

```typescript
import { ItchLauncherService } from '@services/launchers/ItchLauncherService';

function registerLaunchers(): void {
  // ...launchers existentes...
  launcherRegistry.register(new ItchLauncherService());
}
```

### Paso 4 — Variables de entorno

Añadir las nuevas variables al `.env`:

```
ITCH_CLIENT_ID=
ITCH_CLIENT_SECRET=
ITCH_REDIRECT_URI=http://localhost:3000/auth/itch/callback
```

### Paso 5 — Migración de base de datos

Si `launcherType` está definido como `ENUM` en MySQL (no como `VARCHAR`), añadir el valor al tipo en la migración o regenerar las tablas con `alter: true` en el siguiente arranque. El campo `launcher` en `game_catalog` y `launcher_type` en `launcher_accounts` deben incluir el nuevo valor.

---

## Flujo de autenticación

```
1. Frontend pide URL de auth
       ↓  GET /auth/{launcherType}/url
2. Backend: launcherRegistry.get(type).buildAuthUrl(state)
       ↓
3. Usuario autoriza en el portal del launcher
       ↓
4. Launcher redirige a REDIRECT_URI con code (OAuth2) o openid.* (Steam)
       ↓  GET /auth/{launcherType}/callback?code=...
5. Backend: service.exchangeCode(code)  →  LauncherTokens
       ↓
6. Se persiste LauncherAccount con accessToken, refreshToken, platformUserId, tokenExpiresAt
       ↓
7. Se lanza syncService.syncAccount(account)
```

---

## Flujo de sincronización

```
syncService.syncUser(userId)
  └─ para cada LauncherAccount vinculada:
       └─ service.fetchOwnedGames(account)
            └─ para cada ILauncherGame:
                 1. gameCatalogRepository.upsertByLauncherId(launcher, launcherId, data)
                    → inserta o actualiza en game_catalog (deduplicado global)
                 2. userGameRepository.upsertOwnership(userId, gameCatalogId, launcherAccountId, data)
                    → inserta o actualiza en user_games (playtime, isInstalled, lastPlayedAt)
```

Los upserts son idempotentes: relanzar la sync no crea duplicados.
