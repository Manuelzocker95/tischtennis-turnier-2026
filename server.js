// server.js - v4.0 persistent player storage
const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

const DATA_FILE = path.join(__dirname, "players.json");

// 🟢 Spieler beim Start laden
let players = [];
if (fs.existsSync(DATA_FILE)) {
  try {
    players = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    console.log(`✅ ${players.length} Spieler geladen.`);
  } catch (error) {
    console.error("❌ Fehler beim Lesen von players.json:", error);
  }
}

// 🟡 Neue Anmeldung speichern
app.post("/add-player", (req, res) => {
  const player = req.body;
  if (!player.firstName || !player.lastName) {
    return res.status(400).json({ success: false, message: "Ungültige Eingabe" });
  }
  players.push(player);
  fs.writeFileSync(DATA_FILE, JSON.stringify(players, null, 2));
  console.log(`📝 Spieler gespeichert: ${player.firstName} ${player.lastName}`);
  res.json({ success: true });
});

// 🔵 Liste abrufen
app.get("/players", (req, res) => {
  res.json(players);
});

// ⚡ Hauptseite ausliefern (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server läuft auf Port ${PORT}`));
