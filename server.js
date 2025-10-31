const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());

const CSV = 'anmeldungen.csv';
if(!fs.existsSync(CSV)) fs.writeFileSync(CSV,'id,Vorname,Nachname,Geburtsdatum,TTR,Verein\n');

function escapeCsv(s){ if(s==null) return ''; const str=String(s).replace(/\n/g,' '); return str.includes(',')||str.includes('"') ? '"'+str.replace(/"/g,'""')+'"' : str; }
function parseCsv(content){
  const lines = content.trim().split('\n').filter(Boolean);
  const rows = [];
  for(let i=1;i<lines.length;i++){
    const line = lines[i];
    const parts = []; let cur='', inQ=false;
    for(let ch of line){ if(ch==='"'){ inQ=!inQ; cur+=ch; } else if(ch===',' && !inQ){ parts.push(cur); cur=''; } else { cur+=ch; } }
    parts.push(cur);
    const unq = s=> s?.replace(/^"|"$/g,'').replace(/""/g,'"') ?? '';
    const [id, vorname, nachname, geburtsdatum, ttr, verein] = parts.map(unq);
    rows.push({ id, vorname, nachname, geburtsdatum, ttr, verein });
  }
  return rows;
}
function writeCsv(rows){
  const header = 'id,Vorname,Nachname,Geburtsdatum,TTR,Verein\n';
  const body = rows.map(r=>[r.id, r.vorname, r.nachname, r.geburtsdatum, r.ttr, r.verein].map(escapeCsv).join(',')).join('\n');
  fs.writeFileSync(CSV, header + body + (body? '\n':''), 'utf8');
}

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'tsv1905';
function basicAuth(req,res,next){
  const auth = req.headers.authorization || '';
  if(!auth.startsWith('Basic ')){
    res.setHeader('WWW-Authenticate','Basic realm="Admin"');
    return res.status(401).send('Auth required');
  }
  const [u,p] = Buffer.from(auth.split(' ')[1],'base64').toString().split(':');
  if(u===ADMIN_USER && p===ADMIN_PASS) return next();
  res.setHeader('WWW-Authenticate','Basic realm="Admin"');
  return res.status(401).send('Invalid credentials');
}

app.use(express.static('.'));

app.post('/anmelden',(req,res)=>{
  try{
    const {vorname,nachname,geburtsdatum,ttr,verein} = req.body;
    if(!vorname||!nachname) return res.status(400).send('Vor- und Nachname erforderlich');
    const rows = parseCsv(fs.readFileSync(CSV,'utf8'));
    const id = Date.now().toString();
    rows.push({ id, vorname: vorname||'', nachname: nachname||'', geburtsdatum: geburtsdatum||'', ttr: ttr||'', verein: verein||'' });
    writeCsv(rows);
    return res.send('✅ Du hast dich erfolgreich angemeldet!');
  }catch(e){ console.error(e); res.status(500).send('Fehler'); }
});

app.get('/api/ranking',(req,res)=>{
  const rows = parseCsv(fs.readFileSync(CSV,'utf8'));
  rows.sort((a,b)=> (parseFloat(b.ttr)||0) - (parseFloat(a.ttr)||0));
  res.json(rows);
});

app.get('/api/teilnehmer', basicAuth, (req,res)=>{
  const rows = parseCsv(fs.readFileSync(CSV,'utf8'));
  rows.sort((a,b)=> parseInt(b.id) - parseInt(a.id));
  res.json(rows);
});

app.put('/api/teilnehmer/:id', basicAuth, (req,res)=>{
  const rows = parseCsv(fs.readFileSync(CSV,'utf8'));
  const idx = rows.findIndex(r=> r.id === req.params.id);
  if(idx<0) return res.status(404).send('Nicht gefunden');
  const {vorname,nachname,geburtsdatum,ttr,verein} = req.body;
  rows[idx] = { ...rows[idx], vorname, nachname, geburtsdatum, ttr, verein };
  writeCsv(rows);
  res.send('OK');
});

app.delete('/api/teilnehmer/:id', basicAuth, (req,res)=>{
  let rows = parseCsv(fs.readFileSync(CSV,'utf8'));
  const oldLen = rows.length;
  rows = rows.filter(r=> r.id !== req.params.id);
  if(rows.length === oldLen) return res.status(404).send('Nicht gefunden');
  writeCsv(rows);
  res.send('OK');
});

app.get('/download', basicAuth, (req,res)=> res.download(path.join(__dirname,'anmeldungen.csv')));
app.get('/admin', basicAuth, (req,res)=> res.sendFile(path.join(__dirname,'admin.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Server läuft auf port',PORT));
