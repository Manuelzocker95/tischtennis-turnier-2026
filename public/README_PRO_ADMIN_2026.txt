Tischtennis Turnier – PRO+ Admin Edition (2026)

Funktionen
- Überschrift 2026, Countdown bis 03.01.2026 10:00
- Musik startet nach erstem Klick (leise, loop)
- Live-Ranking in neuem Tab (ranking.html), sortiert nach TTR (höchste zuerst)
- Admin mit Passwortschutz (Basic Auth): Bearbeiten (mit Speichern-Button) & Löschen ohne Rückfrage
- CSV-Export

Standard-Login (änderbar per ENV):
- ADMIN_USER=admin
- ADMIN_PASS=tsv1905

Lokal starten
1) npm install
2) npm start
3) http://localhost:3000

Kostenlos online hosten (Render)
1) Neues GitHub-Repo erstellen und alle Dateien hochladen
2) Render.com Account -> New -> Web Service -> Connect GitHub
3) Einstellungen:
   - Build Command: npm install
   - Start Command: npm start
   - Instance Type: Free
4) Environment Variables setzen:
   - ADMIN_USER=admin
   - ADMIN_PASS=tsv1905
5) Deploy -> öffentliche URL teilen
