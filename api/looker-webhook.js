let lastPayload = null;

export default async function handler(req, res) {
  if (req.query.key !== process.env.LOOKER_WEBHOOK_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ lastPayload });
  }

  lastPayload = {
    receivedAt: new Date().toISOString(),
    contentType: req.headers['content-type'] || null,
    bodyType: typeof req.body,
    body: req.body,
  };

  return res.status(200).json({ ok: true });
}
