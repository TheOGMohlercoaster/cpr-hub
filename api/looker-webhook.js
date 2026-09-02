export default async function handler(req, res) {
  const expected = process.env.LOOKER_WEBHOOK_KEY;
  console.log('EXPECTED SET?', !!expected, 'LEN:', expected ? expected.length : 0);
  console.log('RECEIVED:', req.query.key, 'LEN:', req.query.key ? req.query.key.length : 0);
  if (req.query.key !== expected) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  console.log('--- LOOKER PAYLOAD ---');
  console.log('CONTENT-TYPE:', req.headers['content-type']);
  console.log('BODY:', JSON.stringify(req.body, null, 2));
  return res.status(200).json({ ok: true });
}
