export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { imei, authCode, authToken, action, batchId } = req.body;

  // Debug - log what we received (remove in production)
  console.log('M360 request:', { action, imei, authCode: authCode ? authCode.substring(0, 8) + '...' : 'MISSING', authToken: authToken ? 'present' : 'MISSING' });

  if (!authCode || !authToken) {
    return res.status(400).json({ error: 'Missing authCode or authToken - please add M360 credentials in Settings' });
  }

  try {
    if (action === 'schedule') {
      const response = await fetch('https://m360soft.com/api/customer/v2/scheduleBlacklistCheck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          authCode: authCode.trim(), 
          authToken: authToken.trim(), 
          imeiList: [imei] 
        })
      });
      const data = await response.json();
      console.log('Schedule response:', JSON.stringify(data).substring(0, 200));
      res.status(200).json(data);

    } else if (action === 'getResult') {
      const response = await fetch('https://m360soft.com/api/customer/v2/getBlacklistChecksByBatchId', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          authCode: authCode.trim(), 
          authToken: authToken.trim(), 
          batchId 
        })
      });
      const data = await response.json();
      res.status(200).json(data);

    } else if (action === 'history') {
      const response = await fetch('https://m360soft.com/api/customer/v2/getHistory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          authCode: authCode.trim(), 
          authToken: authToken.trim(), 
          imei: [imei], 
          limit: 1,
          hasBlacklistCheck: true
        })
      });
      const data = await response.json();
      res.status(200).json(data);

    } else {
      res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    console.error('M360 error:', error);
    res.status(500).json({ error: error.message });
  }
}
