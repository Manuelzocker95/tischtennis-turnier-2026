# Deployment auf Render (Schritt-für-Schritt)

1. GitHub Repo erstellen (z.B. `tischtennis-turnier`) und Dateien hochladen:
   - index.html
   - admin.html
   - server.js
   - package.json
   - README_RENDER.md
   - README.txt
   - (keine binaries: logo.png & fight.mp3 später im Webdashboard hochladen oder in Repo)

2. Account bei Render: https://dashboard.render.com/register (mit GitHub verbinden)

3. New -> Web Service -> Connect GitHub -> wähle Repo

4. Einstellungen:
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance: Free (oder wie gewünscht)
   - Public root: `/`

5. **Umgebungsvariablen (Environment) in Render setzen**
   - ADMIN_USER = deinAdminUser
   - ADMIN_PASS = starkesPasswort
   - PUBLIC_URL = https://dein-service.onrender.com   (optional, für QR)
   - SMTP_HOST (z.B. smtp.gmail.com)  -- optional, nur wenn E-Mails gewünscht
   - SMTP_PORT (587)
   - SMTP_USER (deine smtp user/email)
   - SMTP_PASS (smtp pass)
   - FROM_EMAIL (Absendeadresse für Bestätigungen)
   - SMTP_SECURE (true/false)

6. Deploy starten. Nach wenigen Minuten ist die App unter der Render-URL erreichbar.

7. Upload von `logo.png` und `fight.mp3`:
   - Entweder in dein GitHub-Repo committen oder über Render -> Files -> Upload (oder Host sie extern und ändere Pfade in index.html).

8. Admin-Zugang:
   - Gehe zu `https://dein-service.onrender.com/admin`
   - Browser fragt nach Basic-Auth (nutze ADMIN_USER / ADMIN_PASS)

9. CSV herunterladen:
   - Admin -> "CSV herunterladen" oder `https://.../download`

--- 

Bei Fragen helfe ich dir gern beim Erstellen des GitHub-Repos oder beim Setzen der Umgebungsvariablen in Render.
