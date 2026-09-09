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
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/DevicePricing!A:F?key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      const rows = (data.values || []).slice(1);
      const devices = rows.map(r => ({
        model:     r[0] || '',
        storage:   r[1] || '',
        condition: r[2] || '',
        price:     parseFloat(String(r[3] || '').replace(/[$,\s]/g, '')) || 0,
        updatedBy: r[4] || '',
        updated:   r[5] || '',
      })).filter(d => d.model);
      res.status(200).json({ devices });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
    return;
  }

  if (req.method === 'POST') {
    try {
      const { devices } = req.body;
      const rows = [
        ['Model', 'Storage', 'Condition', 'Price', 'Updated By', 'Updated'],
        ...devices.map(d => [d.model, d.storage, d.condition, d.price, d.updatedBy, d.updated]),
      ];
      await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sheet: 'DevicePricing', rows }),
      });
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
