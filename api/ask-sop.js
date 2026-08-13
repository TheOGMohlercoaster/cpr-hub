export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { question, sopContent } = req.body;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1000,
        system: `You are a helpful assistant for CPR Cell Phone Repair Springfield MO. Answer questions using ONLY the following SOPs. Be concise and practical. If the answer isn't in the SOPs, say so clearly.\n\nSOPS:\n${sopContent}`,
        messages: [{ role: 'user', content: question }]
      })
    });
    const data = await response.json();
    res.status(200).json({ answer: data.content?.[0]?.text || 'No answer found.' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
