export default async function handler(req, res) {
  if (req.query.key !== process.env.LOOKER_WEBHOOK_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  console.log('--- LOOKER PAYLOAD ---');
  console.log('CONTENT-TYPE:', req.headers['content-type']);
  console.log('BODY:', JSON.stringify(req.body, null, 2));
  return res.status(200).json({ ok: true });
}
