export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { imei, authCode, authToken, action, batchId } = req.body;

  if (!authCode || !authToken) {
    return res.status(400).json({ error: 'Missing credentials' });
  }

  const body = { authCode: authCode.trim(), authToken: authToken.trim() };

  try {
    let url, payload;

    if (action === 'schedule') {
      url = 'https://m360soft.com/api/customer/v1/scheduleBlacklistCheck';
      payload = { ...body, imeiList: [imei] };
    } else if (action === 'getResult') {
      url = 'https://m360soft.com/api/customer/v1/getBlacklistChecksByBatchId';
      payload = { ...body, batchId };
    } else if (action === 'history') {
      url = 'https://m360soft.com/api/customer/v1/getHistory';
      payload = { ...body, imei, limit: 1 };
    } else if (action === 'test') {
      // Simple connection test
      url = 'https://m360soft.com/api/customer/v1/getHistory';
      payload = { ...body, limit: 1 };
    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }

    console.log('Calling M360:', url, 'authCode:', authCode.substring(0, 8) + '...');

    const response = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const text = await response.text();
    console.log('M360 response status:', response.status);
    console.log('M360 response:', text.substring(0, 300));

    try {
      res.status(200).json(JSON.parse(text));
    } catch {
      res.status(200).json({ raw: text.substring(0, 500) });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}
