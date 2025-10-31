Tischtennis Turnier – PRO+ Admin Edition (2026) v2

Neu in v2:
- 🔍 Live-Suche (Vorname, Nachname, Verein, TTR) im Admin
- ↩️ Undo nach Löschen (10s, „Rückgängig“)
- Auto-Sortierung (Nachname A–Z in der Ansicht)

Timer: bis 03.01.2026, 10:00
Musik: startet nach erstem Klick (leise, loop)
Admin-Login: admin / tsv1905 (änderbar per ENV)
Endpoints: /, /ranking.html, /admin, /download, /api/ranking, /api/teilnehmer

Lokal:
npm install
npm start
http://localhost:3000

Render (kostenlos):
- Repo zu GitHub pushen
- Render -> New -> Web Service -> Connect Repo
- Build: npm install
- Start: npm start
- Env: ADMIN_USER=admin, ADMIN_PASS=tsv1905
- Deploy -> URL teilen
