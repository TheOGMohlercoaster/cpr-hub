export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { imei, service } = req.body;

  // Use server-side API key from environment variable
  const apiKey = process.env.SICKW_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Sickw API key not configured on server' });
  }

  if (!imei || !service) {
    return res.status(400).json({ error: 'Missing imei or service' });
  }

  try {
    const url = `https://sickw.com/api.php?format=json&key=${apiKey}&imei=${imei}&service=${service}`;
    const response = await fetch(url);
    const text = await response.text();
    try {
      res.status(200).json(JSON.parse(text));
    } catch {
      res.status(200).json({ raw: text.substring(0, 1000) });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
