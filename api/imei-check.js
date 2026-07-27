export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { imei, authCode, authToken, action, batchId } = req.body;

  if (!authCode || !authToken) {
    return res.status(400).json({ error: 'Missing authCode or authToken' });
  }

  // V2 Bearer auth: AuthCode-AuthToken
  const bearerToken = `${authCode.trim()}-${authToken.trim()}`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearerToken}`
  };

  const BASE = 'https://m360soft.com/api/customer/v2';

  try {
    let url, body;

    if (action === 'history') {
      // Search history for this IMEI's blacklist check result
      url = `${BASE}/getHistory`;
      body = { imei: [imei], limit: 1, hasBlacklistCheck: true };

    } else if (action === 'historyAll') {
      // Get history without blacklist filter (to find device info)
      url = `${BASE}/getHistory`;
      body = { imei: [imei], limit: 1 };

    } else if (action === 'schedule') {
      // Schedule new blacklist check
      url = `${BASE}/scheduleBlacklistCheck`;
      body = { imeiList: [imei] };

    } else if (action === 'getResult') {
      // Get batch result by batchId
      url = `${BASE}/getBlacklistChecksByBatchId`;
      body = { batchId };

    } else if (action === 'test') {
      url = `${BASE}/getHistory`;
      body = { limit: 1 };

    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    const text = await response.text();
    try {
      res.status(200).json(JSON.parse(text));
    } catch {
      res.status(200).json({ raw: text.substring(0, 500) });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
