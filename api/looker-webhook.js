const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw1zLjJPZR8DDfABZuj90C8bGeBtPo0zLXDEgzU67ekf9BibqA7o4wV78XR81JKG3Q5/exec';

// Look title (lowercased, must contain) → destination tab
const ROUTES = [
  { match: 'lead',      tab: 'Leads' },
  { match: 'device',    tab: 'DeviceSales' },
  { match: 'repair',    tab: 'RepairSales' },
  { match: 'accessory', tab: 'AccessorySales' },
  { match: 'purchase',  tab: 'PurchaseOrders' },
  { match: 'total',     tab: 'TotalSales' },
];

const norm = (s) => String(s).toLowerCase().replace(/\s+/g, '');
const num = (v) => {
  if (v === null || v === undefined) return 0;
  const n = parseFloat(String(v).replace(/[$,%\s]/g, ''));
  return isNaN(n) ? 0 : n;
};
const isNumericish = (v) =>
  typeof v === 'string' && /^-?[$]?[\d,]+(\.\d+)?%?$/.test(v.trim());

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

    const title = req.body?.scheduled_plan?.title || '';
    const route = ROUTES.find((r) => norm(title).includes(norm(r.match)));
    if (!route) {
      return res.status(400).json({ error: 'no route for title', title });
    }

    const parsed = JSON.parse(raw);
    if (!parsed.length) return res.status(400).json({ error: 'empty result set' });

    const headers = Object.keys(parsed[0]);
    const rows = [[...headers, 'Updated']];
    const updatedAt = new Date().toISOString();
    let totalsRow = null;

    for (const r of parsed) {
      const cells = headers.map((h) =>
        isNumericish(r[h]) ? num(r[h]) : (r[h] === null ? '' : r[h])
      );
      cells.push(updatedAt);
      // Looker's totals row comes through with a null first column
      if (r[headers[0]] === null) {
        cells[0] = 'STORE TOTAL';
        totalsRow = cells;
      } else {
        rows.push(cells);
      }
    }
    if (totalsRow) rows.push(totalsRow);

    const gs = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sheet: route.tab, rows }),
    });

    return res.status(200).json({
      ok: true,
      title,
      tab: route.tab,
      rows: rows.length - 1,
      sheet: (await gs.text()).slice(0, 200),
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
