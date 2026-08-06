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
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Announcements!A:E?key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      const rows = (data.values || []).slice(1);
      const announcements = {
        pinned: null,
        feed: [],
        dismissed: {}
      };
      rows.forEach(row => {
        const type = row[0] || '';
        if (type === 'pinned') {
          announcements.pinned = row[1] || null;
        } else if (type === 'feed') {
          announcements.feed.push({
            id: row[1] || '',
            text: row[2] || '',
            author: row[3] || '',
            time: row[4] || '',
          });
        }
      });
      res.status(200).json(announcements);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
    return;
  }

  if (req.method === 'POST') {
    try {
      const { pinned, feed } = req.body;
      const rows = [['type', 'id_or_text', 'text', 'author', 'time']];
      if (pinned) rows.push(['pinned', pinned, '', '', '']);
      (feed || []).forEach(p => {
        rows.push(['feed', p.id, p.text, p.author, p.time]);
      });
      await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ sheet: 'Announcements', rows }),
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
