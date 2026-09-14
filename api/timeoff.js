const SHEET_ID = '1NglgDsYsZaw80Zl8fB1_SkwuyHdffUlGX770H7vdLqQ';
const API_KEY = 'AIzaSyBUfyOB-U1RPitIXZn0D0eHgtEkh76xEIA';
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw1zLjJPZR8DDfABZuj90C8bGeBtPo0zLXDEgzU67ekf9BibqA7o4wV78XR81JKG3Q5/exec';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/TimeOff!A:H?key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      const rows = (data.values || []).slice(1);
      const requests = rows.map(r => ({
        id:          r[0] || '',
        empId:       String(r[1] ?? ''),
        empName:     r[2] || '',
        startDate:   r[3] || '',
        endDate:     r[4] || '',
        reason:      r[5] || '',
        status:      r[6] || 'pending',
        requestedAt: r[7] || '',
      })).filter(r => r.id && r.startDate);
      return res.status(200).json({ requests });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const { requests } = req.body || {};
      if (!Array.isArray(requests)) {
        return res.status(400).json({ error: 'requests must be an array' });
      }

      const rows = [
        ['id', 'empId', 'empName', 'startDate', 'endDate', 'reason', 'status', 'requestedAt'],
        ...requests.map(r => [
          r.id, String(r.empId ?? ''), r.empName, r.startDate,
          r.endDate, r.reason || '', r.status || 'pending', r.requestedAt || '',
        ]),
      ];

      const gs = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sheet: 'TimeOff', rows }),
        redirect: 'follow',
      });

      const text = await gs.text();
      let scriptOk = false;
      try { scriptOk = JSON.parse(text).success === true; } catch {}

      if (!gs.ok || !scriptOk) {
        return res.status(502).json({
          error: 'Apps Script did not confirm the write',
          status: gs.status,
          scriptResponse: text.slice(0, 300),
        });
      }
      return res.status(200).json({ success: true, rows: rows.length - 1 });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
