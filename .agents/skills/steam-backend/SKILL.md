---
name: steam-backend
description: Build and maintain Steam backend integrations (Web API, Steamworks partner APIs, OpenID, ticket validation, ownership checks, library sync). Use when implementing Steam endpoints on server side, creating auth/link flows, validating steamid/tickets, or handling Steam API errors/retries.
---

# Steam Backend Integration Skill

Use this skill for backend/server tasks related to Steam integration.

## Scope

- Server-only integration with Steam Web APIs.
- Secure key handling and Steam auth flows.
- Ownership checks, profile reads, and library sync endpoints.
- Reliability patterns: retries, rate-limit handling, observability.

## Authoritative Sources

- Steamworks Web API Overview: https://partner.steamgames.com/doc/webapi_overview
- Steamworks Web API Reference: https://partner.steamgames.com/doc/webapi
- Steam Web API key auth: https://partner.steamgames.com/doc/webapi_overview/auth
- Response and status codes: https://partner.steamgames.com/doc/webapi_overview/responses
- User authentication and ownership: https://partner.steamgames.com/doc/features/auth
- ISteamUserAuth: https://partner.steamgames.com/doc/webapi/ISteamUserAuth
- Public endpoint host example: https://api.steampowered.com
- Partner host (secure servers): https://partner.steam-api.com

## Hard Rules

1. Never expose Steam API keys in frontend code, client bundles, or browser requests.
2. Use HTTPS for all Steam API calls.
3. Prefer partner host for secure backend requests: https://partner.steam-api.com.
4. Keep API keys in environment variables and rotate on compromise.
5. Validate all user input (steamid, appid, pagination, count).
6. Treat SteamID as 64-bit identifier; preserve as string in JSON to avoid precision issues.
7. Implement structured error mapping for 400/401/403/404/405/429/500/503.
8. Add request timeout, retry with backoff, and jitter only for retryable failures.

## Recommended Backend Architecture

- steam.controller.ts: HTTP endpoints for app-specific use cases.
- steam.service.ts: orchestration and business logic.
- steam.client.ts: low-level Steam API HTTP client.
- steam.mapper.ts: transforms Steam payloads to internal DTOs.
- steam.types.ts: typed request/response contracts.
- steam.errors.ts: domain-level errors and HTTP mapping.

## Environment Variables

- STEAM_WEB_API_KEY: public/user key for allowed methods.
- STEAM_PUBLISHER_KEY: publisher key for protected partner methods.
- STEAM_APP_ID: main game AppID.
- STEAM_API_BASE_URL: default https://api.steampowered.com.
- STEAM_PARTNER_API_BASE_URL: default https://partner.steam-api.com.
- STEAM_OPENID_REALM: expected OpenID realm.
- STEAM_OPENID_RETURN_URL: callback endpoint URL.

## Primary Backend Use Cases

### 1) Link Steam account via OpenID (browser)

- Redirect user to Steam OpenID provider: https://steamcommunity.com/openid/
- Validate returned assertion server-side.
- Extract steamid from claimed_id.
- Persist account linkage with userId + steamid.
- Optional post-link ownership check with ISteamUser/CheckAppOwnership.

### 2) Verify in-game identity with ticket

- Client obtains ticket with GetAuthTicketForWebApi.
- Client sends ticket to backend.
- Backend calls ISteamUserAuth/AuthenticateUserTicket on partner/public host (as permitted).
- Backend trusts returned steamid only after successful validation.

### 3) Fetch profile and game library

- Player summary: ISteamUser/GetPlayerSummaries.
- Owned games: IPlayerService/GetOwnedGames.
- Recently played: IPlayerService/GetRecentlyPlayedGames.
- Map response to internal model and store sync timestamp.

### 4) Verify ownership

- Single app: ISteamUser/CheckAppOwnership.
- Publisher scope list: ISteamUser/GetPublisherAppOwnership.
- Deny premium/game access when ownership check fails.

## Endpoint Design Suggestions

- GET /launchers/steam/auth-url?returnUrl=...
- GET /launchers/steam/callback
- POST /steam/auth/ticket/validate
- GET /steam/:steamId/player-summary
- GET /steam/:steamId/owned-games
- GET /steam/:steamId/recently-played
- GET /steam/:steamId/ownership/:appId

## Security Checklist

- Key never logged in plaintext.
- Mask sensitive headers in logs.
- Reject malformed steamid (non numeric, wrong length).
- Add IP allowlist for publisher key where possible.
- Use separate keys per environment (dev/staging/prod).
- Add audit events for account linking/unlinking.

## Error Handling Strategy

- 400: bad params -> validation error.
- 401/403: auth/key issues -> configuration/security error.
- 404/405: wrong route/method -> integration bug.
- 429: apply backoff and retry budget.
- 500/503: transient Steam/server issue -> retry then graceful failure.

Return stable app errors (for example):
- STEAM_INVALID_STEAMID
- STEAM_TICKET_INVALID
- STEAM_OWNERSHIP_DENIED
- STEAM_RATE_LIMITED
- STEAM_UPSTREAM_UNAVAILABLE

## Reliability Defaults

- Request timeout: 5-10s.
- Retries: max 2-3 for retryable errors.
- Backoff: exponential with jitter.
- Circuit breaking for repeated 5xx/429 bursts.
- Cache short-lived reads (profile/news) where acceptable.

## Data Mapping Guidance

Normalize Steam payloads into your internal model:

- steamid -> externalAccountId (string)
- personaname -> displayName
- avatarfull -> avatarUrl
- appid -> launcherGameId
- playtime_forever -> totalMinutesPlayed

Keep raw Steam payload optionally in metadata for debugging.

## Testing Matrix

- Unit tests: mapper, validators, error mapping.
- Integration tests: Steam client success and failure paths.
- Contract tests: endpoint DTO compatibility.
- Security tests: key exposure prevention and callback validation.

## Implementation Notes

- For partner-only APIs, require publisher key and secure server execution.
- Service interfaces can accept input_json in addition to query/body params.
- Steam may return 64-bit numbers as strings in JSON.
- Do not assume fixed field order in API response payloads.

## Done Criteria

- Steam linking works end-to-end.
- Ticket validation returns a trusted steamid.
- Ownership checks gate protected features.
- Library/profile sync endpoints are stable.
- Logs and metrics cover latency, failures, and rate limits.
