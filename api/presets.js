export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const SHEET_ID = '1NglgDsYsZaw80Zl8fB1_SkwuyHdffUlGX770H7vdLqQ';
  const API_KEY = 'AIzaSyBUfyOB-U1RPitIXZn0D0eHgtEkh76xEIA';
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw1zLjJPZR8DDfABZuj90C8bGeBtPo0zLXDEgzU67ekf9BibqA7o4wV78XR81JKG3Q5/exec';

  if (req.method === 'GET') {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Presets!A:C?key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      const rows = (data.values || []).slice(1);
      const presets = rows.map(row => ({
        label: row[0] || '',
        start: row[1] || '',
        end:   row[2] || '',
      })).filter(p => p.label && p.start && p.end);
      res.status(200).json({ presets });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
    return;
  }

  if (req.method === 'POST') {
    try {
      const { presets } = req.body;
      const rows = [['Label', 'Start', 'End'], ...presets.map(p => [p.label, p.start, p.end])];
      await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ sheet: 'Presets', rows }),
        mode: 'no-cors',
      });
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
