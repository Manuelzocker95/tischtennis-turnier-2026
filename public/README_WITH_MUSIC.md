# Projekt mit GEMA-freier Musik (generiert)
Diese Version enthält eine kurze, royalty-free Melodie `fight.wav`, die programmgeneriert wurde.

## Lokales Testen
1. Node.js installieren (falls nicht vorhanden)
2. Im Projektordner:
   > npm install
   > npm start
3. Öffnen: http://localhost:3000

## Deployment auf Render (kurz)
1. Neues GitHub-Repo erstellen und alle Dateien hochladen (inkl. fight.wav, index.html, admin.html, server.js, package.json).
2. Render -> New -> Web Service -> Connect GitHub -> wähle Repo.
3. Build: `npm install`  Start: `npm start`
4. Setze Environment-Variablen in Render (ADMIN_USER, ADMIN_PASS, optional SMTP_*)
5. Deploy starten. Upload logo.png falls nicht im Repo.

Die Admin-Seite ist erreichbar unter /admin (Basic-Auth). CSV-Download unter /download.
