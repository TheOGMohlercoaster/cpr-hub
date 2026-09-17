export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { question, sopContent } = req.body || {};

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not set in Vercel' });
  }
  if (!question) return res.status(400).json({ error: 'No question supplied' });
  if (!sopContent || !sopContent.trim()) {
    return res.status(400).json({ error: 'No SOP content was sent with the question' });
  }

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1000,
        system: `You are a helpful assistant for CPR Cell Phone Repair Springfield MO. Answer using ONLY the SOPs below. Be concise and practical. If the answer isn't in them, say so clearly.\n\nSOPS:\n${sopContent}`,
        messages: [{ role: 'user', content: question }],
      }),
    });

    const data = await r.json();

    // Surface the real failure instead of a generic fallback
    if (!r.ok || data.type === 'error') {
      return res.status(502).json({
        error: data?.error?.message || `Anthropic returned ${r.status}`,
        type: data?.error?.type || null,
        status: r.status,
      });
    }

    const text = (data.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('\n')
      .trim();

    if (!text) {
      return res.status(502).json({ error: 'Anthropic returned no text', raw: JSON.stringify(data).slice(0, 300) });
    }

    return res.status(200).json({ answer: text, sopChars: sopContent.length });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
