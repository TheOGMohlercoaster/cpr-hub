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
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Employees!A:F?key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      const rows = (data.values || []).slice(1);
      if (rows.length === 0) return res.status(200).json({ employees: [] });
      const employees = rows.map(row => ({
        id:    parseInt(row[0]) || 0,
        name:  row[1] || '',
        pin:   row[2] || '',
        role:  row[3] || 'Sales',
        color: row[4] || '#22C55E',
        email: row[5] || '',
      })).filter(e => e.id && e.name);
      res.status(200).json({ employees });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
    return;
  }

  if (req.method === 'POST') {
    try {
      const { employees } = req.body;
      const rows = [
        ['id', 'name', 'pin', 'role', 'color', 'email'],
        ...employees.map(e => [e.id, e.name, e.pin, e.role, e.color || '#22C55E', e.email || ''])
      ];
      await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ sheet: 'Employees', rows }),
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
