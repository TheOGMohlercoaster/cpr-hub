export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { query, consumer_key, consumer_secret, access_token, access_token_secret } = req.body;

  try {
    const url = `https://www.cpr.parts/api/rest/searchproduct?q=${encodeURIComponent(query)}&max_results=20&start_index=1`;
    
    // OAuth 1.0a with PLAINTEXT signature method
    const nonce = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signature = `${encodeURIComponent(consumer_secret)}&${encodeURIComponent(access_token_secret)}`;
    
    const authHeader = [
      'OAuth',
      `oauth_consumer_key="${encodeURIComponent(consumer_key)}"`,
      `oauth_token="${encodeURIComponent(access_token)}"`,
      `oauth_signature_method="PLAINTEXT"`,
      `oauth_signature="${signature}"`,
      `oauth_timestamp="${timestamp}"`,
      `oauth_nonce="${nonce}"`,
      `oauth_version="1.0a"`,
    ].join(', ');
    
    const response = await fetch(url, {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      }
    });

    const text = await response.text();
    try {
      const data = JSON.parse(text);
      res.status(200).json(data);
    } catch {
      res.status(200).json({ raw: text });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
