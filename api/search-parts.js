export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { query, consumer_key, consumer_secret, access_token, access_token_secret } = req.body;

  try {
    const url = `https://www.cpr.parts/api/rest/searchproduct?q=${encodeURIComponent(query)}&max_results=20&start_index=1`;
    const authHeader = `OAuth oauth_consumer_key="${consumer_key}",oauth_token="${access_token}",oauth_signature_method="PLAINTEXT",oauth_version="1.0a",oauth_signature="${consumer_secret}&${access_token_secret}"`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}