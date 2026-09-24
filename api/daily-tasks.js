const SHEET_ID = '1NglgDsYsZaw80Zl8fB1_SkwuyHdffUlGX770H7vdLqQ';
const API_KEY = 'AIzaSyBUfyOB-U1RPitIXZn0D0eHgtEkh76xEIA';
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw1zLjJPZR8DDfABZuj90C8bGeBtPo0zLXDEgzU67ekf9BibqA7o4wV78XR81JKG3Q5/exec';

const HEADERS = ['date', 'type', 'taskId', 'text', 'role', 'priority', 'completedBy', 'completedAt'];
// Tasks reset daily, so only today's rows are kept. Anything older is dropped
// on the next write — it keeps the tab small and prevents stale rows piling up.

async function readRows() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/DailyTasks!A:H?key=${API_KEY}`;
  const r = await fetch(url);
  const d = await r.json();
  return (d.values || []).slice(1).filter(row => row[0]);
}

function shape(rows, date) {
  const todays = rows.filter(r => r[0] === date);

  const done = [];
  const seenDone = new Set();
  todays.filter(r => r[1] === 'done').forEach(r => {
    const taskId = r[2] || '';
    if (!taskId || seenDone.has(taskId)) return;
    seenDone.add(taskId);
    done.push({ taskId, by: r[6] || '', at: r[7] || '' });
  });

  const custom = [];
  const seenCustom = new Set();
  todays.filter(r => r[1] === 'custom').forEach(r => {
    const id = r[2] || '';
    if (!id || seenCustom.has(id)) return;
    seenCustom.add(id);
    custom.push({ id, text: r[3] || '', role: r[4] || '', priority: r[5] || 'med' });
  });

  return { date, done, custom };
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

      // One row per task per day. Duplicates made unticking impossible —
      // removing one left the other behind and the box re-checked itself.
      const seenDone = new Set();
      const doneRows = [];
      for (const d of done) {
        if (!d || !d.taskId || seenDone.has(d.taskId)) continue;
        seenDone.add(d.taskId);
        doneRows.push([day, 'done', d.taskId, '', '', '', d.by || '', d.at || '']);
      }

      const seenCustom = new Set();
      const customRows = [];
      for (const c of custom) {
        if (!c || !c.id || seenCustom.has(c.id)) continue;
        seenCustom.add(c.id);
        customRows.push([day, 'custom', c.id, c.text, c.role || '', c.priority || 'med', '', '']);
      }

      // Only today survives — yesterday's rows are dropped
      const rows = [HEADERS, ...doneRows, ...customRows];

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
