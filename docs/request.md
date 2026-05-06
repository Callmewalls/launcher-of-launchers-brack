🟦 Steam (la única realmente abierta de verdad)
🔹 Oficial (usable)
👉 Steam Web API Overview
👉 Steam Web API Key + endpoints básicos

✔️ Qué puedes hacer:

Usuarios, amigos, juegos, stats, logros
Ver si alguien posee un juego
Leaderboards, noticias

✔️ Acceso:

Solo necesitas una API key gratuita
🔹 Documentación completa (no oficial pero estándar de facto)
👉 Steam Web API Reference (xpaw)

✔️ Incluye:

TODOS los endpoints (incluidos algunos no documentados oficialmente)
Interfaces como ISteamUser, IPlayerService, etc.
🔹 APIs internas de Steam (usables sin partner, pero “grey area”)
👉 Internal Steam Web API docs (resumen)

✔️ Qué hay aquí:

Store API (appdetails, precios, etc.)
Market, inventario, comunidad

✔️ Importante:

Algunas requieren cookies/login
No están oficialmente documentadas (pero se usan muchísimo)
🟪 Epic Games (solo lo que puedes usar sin partner)

Epic NO tiene API pública oficial documentada como Steam, pero sí puedes usar estas:

🔹 API pública “real” usada por frontend (sin auth compleja)
👉 https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions
👉 https://store-site-backend-static.ak.epicgames.com/catalog/api/shared/namespace

✔️ Qué puedes hacer:

Listar juegos de la tienda
Ver juegos gratis
Obtener catálogo

💡 Esto es lo que usan webs tipo trackers (no necesitas partner)

🔹 Login / servicios (semi-privado pero usable)
👉 https://account-public-service-prod.ol.epicgames.com

✔️ Permite:

OAuth login
tokens

⚠️ Pero:

No está documentado oficialmente → tendrás que inspeccionar tráfico
🟥 Battle.net (Blizzard)
🔹 APIs oficiales abiertas (NO launcher, pero útiles)
👉 https://develop.battle.net/documentation

✔️ Qué puedes hacer:

Datos de juegos (WoW, Diablo, etc.)
perfiles, estadísticas

✔️ Acceso:

API key gratuita (developer account)

❌ No hay API del launcher en sí

🟩 Ubisoft

❌ Nada usable públicamente para launcher

✔️ Lo único accesible:

endpoints internos (requieren reverse engineering)
no hay docs estables → no te los paso porque no son prácticos
🟧 EA App

❌ Igual que Ubisoft:

sin API pública usable
todo privado / protegido
🟨 GOG

❌ API oficial cerrada → descartada

🔹 Pero esto sí puedes usar (sin partner)
👉 https://catalog.gog.com/v1/catalog

✔️ Permite:

listar juegos
info del catálogo

💡 Es la API que usa su web