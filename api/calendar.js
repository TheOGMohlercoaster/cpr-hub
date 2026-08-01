export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const empId = req.query.emp || null;
  const SHEET_ID = '1NglgDsYsZaw80Zl8fB1_SkwuyHdffUlGX770H7vdLqQ';
  const API_KEY = 'AIzaSyBUfyOB-U1RPitIXZn0D0eHgtEkh76xEIA';

  try {
    // Fetch schedule data from Google Sheet
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A:F?key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    const rows = data.values || [];

    // Build ICS content
    let ics = 'BEGIN:VCALENDAR\r\n';
    ics += 'VERSION:2.0\r\n';
    ics += 'PRODID:-//CPR Hub//Schedule//EN\r\n';
    ics += 'CALSCALE:GREGORIAN\r\n';
    ics += 'METHOD:PUBLISH\r\n';
    ics += 'X-WR-CALNAME:CPR Hub Schedule\r\n';
    ics += 'X-WR-TIMEZONE:America/Chicago\r\n';
    ics += 'REFRESH-INTERVAL;VALUE=DURATION:PT1H\r\n';

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const rowEmpId = (row[0] || '').toString().trim();
      const empName  = (row[1] || '').toString().trim();
      const date     = (row[2] || '').toString().trim();
      const start    = (row[3] || '').toString().trim();
      const end      = (row[4] || '').toString().trim();
      const notes    = (row[5] || '').toString().trim();

      if (!date || !start || !empName) continue;
      if (empId && rowEmpId !== empId) continue;

      const dateStr = date.replace(/-/g, '');
      const uid = `${rowEmpId}-${dateStr}@cprhub`;

      ics += 'BEGIN:VEVENT\r\n';
      ics += `UID:${uid}\r\n`;
      ics += `DTSTART;TZID=America/Chicago:${dateStr}T${to24(start)}\r\n`;
      ics += `DTEND;TZID=America/Chicago:${dateStr}T${to24(end)}\r\n`;
      ics += `SUMMARY:Work - CPR Cell Phone Repair\r\n`;
      ics += `DESCRIPTION:${start} - ${end}${notes ? ' | ' + notes : ''}\r\n`;
      ics += `LOCATION:CPR Cell Phone Repair - Springfield MO\r\n`;
      ics += 'END:VEVENT\r\n';
    }

    ics += 'END:VCALENDAR';

    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Content-Disposition', 'inline; filename="cpr-schedule.ics"');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.status(200).send(ics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function to24(timeStr) {
  const parts = timeStr.trim().split(' ');
  const timeParts = parts[0].split(':');
  let h = parseInt(timeParts[0]);
  const m = parseInt(timeParts[1] || 0);
  const period = parts[1] ? parts[1].toUpperCase() : 'AM';
  if (period === 'PM' && h !== 12) h += 12;
  if (period === 'AM' && h === 12) h = 0;
  return `${String(h).padStart(2,'0')}${String(m).padStart(2,'0')}00`;
}
