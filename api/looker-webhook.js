const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw1zLjJPZR8DDfABZuj90C8bGeBtPo0zLXDEgzU67ekf9BibqA7o4wV78XR81JKG3Q5/exec';

const norm = (s) => String(s).toLowerCase().replace(/\s+/g, '');
const get = (row, label) => {
  const k = Object.keys(row).find((k) => norm(k) === norm(label));
  return k === undefined ? null : row[k];
};
const num = (v) => {
  if (v === null || v === undefined) return 0;
  const n = parseFloat(String(v).replace(/[$,%\s]/g, ''));
  return isNaN(n) ? 0 : n;
};

export default async function handler(req, res) {
  if (req.query.key !== process.env.LOOKER_WEBHOOK_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method not allowed' });
  }

  try {
    const raw = req.body?.attachment?.data;
    if (!raw) return res.status(400).json({ error: 'no attachment data' });

    const parsed = JSON.parse(raw);
    const leaderboard = [];
    let storeTotal = null;

    for (const r of parsed) {
      const employee = get(r, 'Employee');
      const entry = {
        employee: employee || 'STORE TOTAL',
        deviceSales: num(get(r, 'Device Sales')),
        cogs: num(get(r, 'COGS')),
        grossProfit: num(get(r, 'Gross Profit')),
        gpPercent: num(get(r, 'GP%')),
      };
      if (employee) leaderboard.push(entry);
      else storeTotal = entry;
    }

    leaderboard.sort((a, b) => b.deviceSales - a.deviceSales);

    const updatedAt = new Date().toISOString();
    const rows = [['Employee', 'Device Sales', 'COGS', 'Gross Profit', 'GP%', 'Updated']];

    leaderboard.forEach((r) =>
      rows.push([r.employee, r.deviceSales, r.cogs, r.grossProfit, r.gpPercent, updatedAt])
    );
    if (storeTotal) {
      rows.push(['STORE TOTAL', storeTotal.deviceSales, storeTotal.cogs,
                 storeTotal.grossProfit, storeTotal.gpPercent, updatedAt]);
    }

    const gs = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sheet: 'DeviceSales', rows }),
    });

    const sheetReply = (await gs.text()).slice(0, 200);
    return res.status(200).json({ ok: true, rows: rows.length - 1, sheet: sheetReply });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
