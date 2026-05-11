# Launcher of Launchers — Backend

API REST que unifica la biblioteca de juegos de múltiples launchers (Steam, Epic, GOG, Ubisoft Connect, EA App, Battle.net, Xbox App/Game Pass PC) en una sola cuenta de usuario.

## Stack

| Capa | Tecnología |
|---|---|
| Runtime | Node.js 18 |
| Lenguaje | TypeScript 6 |
| Framework | Express 5 |
| ORM | Sequelize 6 + MySQL 2 |
| Generación de rutas/swagger | tsoa 7-alpha |
| Dev server | nodemon + ts-node + tsconfig-paths |
| Contenedor | Docker (multi-stage) |

---

## Requisitos previos

- Node.js ≥ 18
- MySQL ≥ 8 en ejecución y accesible
- Una clave de Steam Web API (gratuita en https://steamcommunity.com/dev/apikey)

---

## Puesta en marcha

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copiar `.env.example` a `.env` y rellenar los valores:

```bash
cp .env.example .env
```

### 3. Arrancar en desarrollo

```bash
npm run dev
```

Al arrancar, nodemon ejecuta `tsoa spec-and-routes` (genera rutas y swagger) y luego lanza el servidor con `ts-node`. La base de datos se crea y sincroniza automáticamente si no existe.

El servidor estará disponible en `http://localhost:3000`.

---

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con hot-reload (nodemon + tsoa auto-generación) |
| `npm run build` | Compila TypeScript a `dist/` (incluye generación de tsoa) |
| `npm start` | Arranca el servidor desde `dist/` (producción) |
| `npm run tsoa` | Regenera rutas y swagger manualmente |

---

## Variables de entorno

### Base de datos

| Variable | Default | Descripción |
|---|---|---|
| `DB_HOST` | `localhost` | Host de MySQL |
| `DB_PORT` | `3306` | Puerto de MySQL |
| `DB_NAME` | `launcher_of_launchers` | Nombre de la base de datos (se crea si no existe) |
| `DB_USER` | `root` | Usuario de MySQL |
| `DB_PASSWORD` | _(vacío)_ | Contraseña de MySQL |

### Servidor

| Variable | Default | Descripción |
|---|---|---|
| `PORT` | `3000` | Puerto de escucha |
| `NODE_ENV` | `development` | Entorno (`development` \| `production`) |
| `JWT_SECRET` | — | Secreto para firmar tokens JWT |
| `JWT_EXPIRATION` | `24h` | Tiempo de expiración de tokens JWT |

### Steam

| Variable | Default | Descripción |
|---|---|---|
| `STEAM_API_KEY` | — | Clave de Steam Web API |
| `STEAM_OPENID_REALM` | — | Dominio público del backend (para OpenID) |
| `STEAM_OPENID_RETURN_URL` | — | URL de callback tras login con Steam |

### Epic / GOG / Ubisoft / EA / Battle.net

Cada launcher tiene su propio conjunto de credenciales OAuth2. Ver [docs/launchers.md](docs/launchers.md) para el detalle completo por launcher.

```
EPIC_CLIENT_ID=          EPIC_CLIENT_SECRET=          EPIC_REDIRECT_URI=
GOG_CLIENT_ID=           GOG_CLIENT_SECRET=           GOG_REDIRECT_URI=
UBISOFT_CLIENT_ID=       UBISOFT_CLIENT_SECRET=       UBISOFT_REDIRECT_URI=
EA_CLIENT_ID=            EA_CLIENT_SECRET=            EA_REDIRECT_URI=
BATTLENET_CLIENT_ID=     BATTLENET_CLIENT_SECRET=     BATTLENET_REDIRECT_URI=
BATTLENET_REGION=eu
XBOX_INSTALL_PATH=
```

---

## Estructura del proyecto

```
src/
├── index.ts                        # Entry point — llama a startServer()
├── app.ts                          # Express setup, bootstrap de DB y registro de launchers
│
├── api/
│   ├── controllers/                # Controladores tsoa (decoradores → rutas + swagger)
│   │   └── SteamController.ts
│   └── routes/
│       └── routes.ts               # Auto-generado por tsoa — no editar
│
├── connectors/
│   └── steam-api/                  # Cliente OpenAPI generado para Steam Web API
│
├── data/
│   └── repositories/               # Capa de acceso a datos
│       ├── BaseRepository.ts
│       ├── UserRepository.ts
│       ├── GameRepository.ts       # GameCatalogRepository — upsert por (launcher, launcherId)
│       ├── LauncherAccountRepository.ts
│       └── UserGameRepository.ts   # Upsert de ownership + queries por userId
│
├── services/
│   ├── launchers/                  # Integración con cada plataforma
│   │   ├── ILauncherService.ts         # Interfaz Strategy
│   │   ├── OAuth2LauncherService.ts    # Clase base OAuth2
│   │   ├── LauncherServiceRegistry.ts  # Singleton Registry
│   │   ├── SteamLauncherService.ts     # ✅ Implementación completa
│   │   ├── EpicLauncherService.ts      # Stub (auth definido)
│   │   ├── GogLauncherService.ts       # Stub (auth definido)
│   │   ├── UplayLauncherService.ts     # Stub (auth definido)
│   │   ├── OriginLauncherService.ts    # Stub (auth definido)
│   │   ├── BattleNetLauncherService.ts # Stub (auth definido)
│   │   └── SteamWebApiService.ts       # Wrapper interno de la API de Steam
│   │
│   ├── sync/
│   │   └── SyncService.ts          # Orquesta la sync de biblioteca por usuario
│   │
│   ├── auth/                       # (pendiente) JWT, hashing
│   └── gameLibrary/                # (pendiente) queries de biblioteca del usuario
│
└── shared/
    ├── configs/
    │   ├── database.config.ts      # Instancia de Sequelize
    │   ├── env.config.ts           # Lectura y tipado de variables de entorno
    │   ├── ensure-db.ts            # Crea la base de datos si no existe (mysql2 raw)
    │   └── sync-db.ts              # Autentica Sequelize y sincroniza modelos
    │
    ├── entities/                   # Modelos Sequelize
    │   ├── User.model.ts
    │   ├── Game.model.ts           # GameCatalog — catálogo global deduplicado
    │   ├── UserGame.model.ts       # Tabla intermedia user ↔ game ↔ launcher_account
    │   └── LauncherAccount.model.ts
    │
    ├── types/
    │   ├── launcher.types.ts       # LauncherType, ILauncherGame, LauncherTokens
    │   ├── game.types.ts           # IGameCatalog, IUserGame
    │   ├── api.types.ts
    │   └── steam.types.ts
    │
    └── utils/
        ├── logger.ts
        └── encryption.helper.ts
```

---

## Modelo de datos

```
users
  id (UUID PK) · username · email · password (hash) · timestamps

launcher_accounts
  id (UUID PK)
  user_id → users.id (CASCADE)
  launcher_type (ENUM: steam | epic | gog | uplay | origin | battlenet | xbox | other)
  account_name · platform_user_id (SteamID64, etc.)
  access_token · refresh_token · token_expires_at (cifrados)
  is_linked · linked_at · last_sync_at · timestamps

game_catalog                           ← catálogo global, sin duplicados
  id (UUID PK)
  launcher (ENUM) + launcher_id        ← clave natural UNIQUE
  title · cover_url · description · release_date · genres (JSON) · timestamps

user_games                             ← tabla caliente: posesión + stats por usuario
  id (UUID PK)
  user_id       → users.id (CASCADE)
  game_catalog_id → game_catalog.id (CASCADE)
  launcher_account_id → launcher_accounts.id (CASCADE)
  UNIQUE (user_id, game_catalog_id, launcher_account_id)
  playtime_minutes · is_installed · install_path · last_played_at · synced_at · timestamps
```

El catálogo de juegos se deduplica globalmente: si dos usuarios tienen el mismo juego en Steam, comparten la misma fila en `game_catalog`. Los datos personales (playtime, instalación) viven en `user_games`.

---

## Endpoints disponibles

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/health` | Estado del servidor |
| `GET` | `/api/info` | Versión y entorno |
| `GET` | `/api/docs` | Swagger UI interactivo |
| `GET` | `/steam/{steamId}/owned-games` | Biblioteca de un usuario de Steam |
| `GET` | `/steam/{steamId}/player-summary` | Perfil público de Steam |
| `GET` | `/steam/{steamId}/recently-played` | Juegos recientes de Steam |

La documentación interactiva completa está en `/api/docs` cuando el servidor está en marcha.

---

## Arquitectura de launchers

Cada integración implementa la interfaz `ILauncherService`:

```
buildAuthUrl(state?)     → URL de login en el portal del launcher
exchangeCode(code)       → verifica callback y devuelve tokens + identidad
refreshTokens(account)   → renueva el access token (null si no aplica)
fetchOwnedGames(account) → biblioteca completa del usuario
fetchRecentlyPlayed(account, count?) → últimas sesiones
```

Los launchers OAuth2 extienden `OAuth2LauncherService` (que implementa `buildAuthUrl` genérico). Steam usa OpenID 2.0 e implementa `ILauncherService` directamente.

El `LauncherServiceRegistry` registra todos los servicios al arrancar. `SyncService` itera las cuentas vinculadas del usuario y hace upsert idempotente en `game_catalog` y `user_games`.

Para añadir un nuevo launcher ver [docs/launchers.md](docs/launchers.md).

### Por qué `ILauncherService` es una interfaz y `OAuth2LauncherService` es una clase abstracta

`ILauncherService` define el contrato mínimo que cualquier launcher debe cumplir. Sirve para que el registry, los sync use-cases y los controllers trabajen contra una forma común sin depender de una implementación concreta.

`OAuth2LauncherService` es abstracta porque encapsula comportamiento compartido de varios launchers OAuth2: construcción de la URL de auth, intercambio de código por tokens, refresh y mapeo base de la respuesta. Esa lógica común vive una sola vez, mientras que cada launcher concreta solo implementa o ajusta lo que cambia.

En resumen:

- `interface` = contrato estable, sin estado ni lógica obligatoria.
- `abstract class` = contrato + implementación compartida + puntos de extensión.

Steam no hereda de `OAuth2LauncherService` porque usa OpenID 2.0, no OAuth2, así que implementa `ILauncherService` directamente.

---

## Docker

```bash
# Build de producción
docker build -t lol-backend .

# Arrancar (la DB debe ser accesible desde el contenedor)
docker run -p 3000:3000 --env-file .env lol-backend
```

La imagen usa un build multi-stage: el stage `builder` compila TypeScript con tsoa; el stage `production` solo copia `dist/` y las dependencias de runtime. Imagen final ~150 MB.

---

## Notas de desarrollo

- **tsoa** genera `src/api/routes/routes.ts` y `src/api/swagger.json` automáticamente con `npm run dev`. Estos ficheros están en `.gitignore`.
- **nodemon** ignora los ficheros generados por tsoa para no entrar en bucle de reinicios.
- Los tipos de respuesta en los controladores tsoa deben definirse **inline** en el fichero del controller — tsoa 7-alpha no resuelve path aliases en tipos genéricos.
- `sync-db.ts` puede ejecutarse como script CLI independiente: `npx ts-node -r tsconfig-paths/register src/shared/configs/sync-db.ts`
