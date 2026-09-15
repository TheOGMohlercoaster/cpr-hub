const SHEET_ID = '1NglgDsYsZaw80Zl8fB1_SkwuyHdffUlGX770H7vdLqQ';
const API_KEY = 'AIzaSyBUfyOB-U1RPitIXZn0D0eHgtEkh76xEIA';
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw1zLjJPZR8DDfABZuj90C8bGeBtPo0zLXDEgzU67ekf9BibqA7o4wV78XR81JKG3Q5/exec';

const HEADERS = ['date', 'type', 'taskId', 'text', 'role', 'priority', 'completedBy', 'completedAt'];
const KEEP_DAYS = 14;

async function readRows() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/DailyTasks!A:H?key=${API_KEY}`;
  const r = await fetch(url);
  const d = await r.json();
  return (d.values || []).slice(1).filter(row => row[0]);
}

function shape(rows, date) {
  const todays = rows.filter(r => r[0] === date);
  return {
    date,
    done: todays.filter(r => r[1] === 'done').map(r => ({
      taskId: r[2] || '', by: r[6] || '', at: r[7] || '',
    })),
    custom: todays.filter(r => r[1] === 'custom').map(r => ({
      id: r[2] || '', text: r[3] || '', role: r[4] || '', priority: r[5] || 'med',
    })),
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const today = new Date().toISOString().split('T')[0];

  if (req.method === 'GET') {
    try {
      const rows = await readRows();
      return res.status(200).json(shape(rows, req.query.date || today));
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const { date, done, custom } = req.body || {};
      const day = date || today;
      if (!Array.isArray(done) || !Array.isArray(custom)) {
        return res.status(400).json({ error: 'done and custom must be arrays' });
      }

      // Preserve other days so the sheet keeps a short history
      const cutoff = new Date(Date.now() - KEEP_DAYS * 86400000).toISOString().split('T')[0];
      const existing = await readRows();
      const otherDays = existing.filter(r => r[0] !== day && r[0] >= cutoff);

      const todayRows = [
        ...done.map(d => [day, 'done', d.taskId, '', '', '', d.by || '', d.at || '']),
        ...custom.map(c => [day, 'custom', c.id, c.text, c.role || '', c.priority || 'med', '', '']),
      ];

      const rows = [HEADERS, ...otherDays, ...todayRows];

      const gs = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sheet: 'DailyTasks', rows }),
        redirect: 'follow',
      });

      const text = await gs.text();
      let ok = false;
      try { ok = JSON.parse(text).success === true; } catch {}

      if (!gs.ok || !ok) {
        return res.status(502).json({
          error: 'Apps Script did not confirm the write',
          scriptResponse: text.slice(0, 300),
        });
      }
      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
