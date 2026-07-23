export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { imei, authCode, authToken, action, batchId } = req.body;

  try {
    if (action === 'schedule') {
      // Schedule a blacklist check
      const response = await fetch('https://m360soft.com/api/customer/v2/scheduleBlacklistCheck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authCode, authToken, imeiList: [imei] })
      });
      const data = await response.json();
      res.status(200).json(data);
    } else if (action === 'getResult') {
      // Get batch result
      const response = await fetch('https://m360soft.com/api/customer/v2/getBlacklistChecksByBatchId', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authCode, authToken, batchId })
      });
      const data = await response.json();
      res.status(200).json(data);
    } else if (action === 'history') {
      // Check history for IMEI
      const response = await fetch('https://m360soft.com/api/customer/v2/getHistory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authCode, authToken, imei: [imei], limit: 1 })
      });
      const data = await response.json();
      res.status(200).json(data);
    } else {
      res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
