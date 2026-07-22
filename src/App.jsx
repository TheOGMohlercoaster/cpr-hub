import { useState } from "react";

// ── Icons (inline SVGs to avoid dependencies) ──────────────────────────────
const Icon = ({ d, size = 20, stroke = "currentColor", fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const Icons = {
  dashboard: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  pricing: "M12 2a10 10 0 100 20A10 10 0 0012 2z M12 6v6l4 2",
  buyphones: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
  sop: "M4 19.5A2.5 2.5 0 016.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z",
  sales: "M18 20V10 M12 20V4 M6 20v-6",
  tasks: "M9 11l3 3L22 4 M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
  repairs: "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
  pos: "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16",
  crm: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0",
  plus: "M12 5v14 M5 12h14",
  check: "M20 6L9 17l-5-5",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  phone: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.72A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  dollar: "M12 1v22 M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  trend: "M23 6l-9.5 9.5-5-5L1 18",
  logout: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9",
  atlas: "M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  warn: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
};

// ── Employees & Auth ─────────────────────────────────────────────────────
const EMPLOYEES = [
  { id: 1, name: "Jason Mohler",    pin: "1111", role: "Owner" },
  { id: 2, name: "Cindy Leek",      pin: "2222", role: "Owner" },
  { id: 3, name: "Aliyah Mohler",   pin: "3333", role: "Owner" },
  { id: 4, name: "Nate Williams",   pin: "4444", role: "Tech/Sales" },
  { id: 5, name: "Alex Smith",      pin: "5555", role: "Tech" },
  { id: 6, name: "Galen Chandler",  pin: "6666", role: "Sales" },
  { id: 7, name: "Dillon Greene",   pin: "7777", role: "Sales" },
];

// What each role can see
const ROLE_ACCESS = {
  "Owner":      ["dashboard","pricing","buyphones","sop","repairs","tasks","pos","crm","orders","schedule","links","leaderboard","settings"],
  "Tech/Sales": ["dashboard","pricing","buyphones","sop","repairs","tasks","orders","schedule","links","leaderboard"],
  "Tech":       ["dashboard","sop","repairs","tasks","orders","schedule","links","leaderboard"],
  "Sales":      ["dashboard","buyphones","sop","tasks","orders","schedule","links","leaderboard"],
};

// ── Color tokens ─────────────────────────────────────────────────────────
const C = {
  bg: "#0F1117",
  surface: "#181C27",
  surfaceHover: "#1E2333",
  border: "#252A3A",
  accent: "#FF4D1C",       // CPR-brand orange-red
  accentDim: "#FF4D1C22",
  accentHover: "#FF6B40",
  teal: "#00C9A7",
  tealDim: "#00C9A722",
  gold: "#FFB547",
  goldDim: "#FFB54720",
  text: "#E8EAED",
  textMuted: "#6B7280",
  textDim: "#9CA3AF",
  green: "#22C55E",
  greenDim: "#22C55E20",
  red: "#EF4444",
  redDim: "#EF444420",
  blue: "#3B82F6",
  blueDim: "#3B82F620",
};

// ── Sample data ───────────────────────────────────────────────────────────
const TODAY_SALES = [
  { name: "Marcus T.", role: "Sales", sales: 1240, transactions: 8, target: 1500 },
  { name: "Jenna K.", role: "Sales", sales: 890, transactions: 6, target: 1500 },
  { name: "Devon R.", role: "Manager", sales: 2100, transactions: 14, target: 2000 },
];
const REPAIR_TOTALS = [
  { name: "Amir S.", role: "Tech", completed: 11, pending: 3, revenue: 780 },
  { name: "Brianna L.", role: "Tech", completed: 8, pending: 5, revenue: 520 },
  { name: "Carlos M.", role: "Tech Lead", completed: 14, pending: 1, revenue: 1020 },
];
// ── Daily Tasks Data ─────────────────────────────────────────────────────
// Recurring tasks reset every day at midnight
const RECURRING_TASKS = [
  // All staff
  { id: "r1",  text: "Clock in and review schedule",              role: "All",     priority: "high" },
  { id: "r2",  text: "Check daily announcements",                 role: "All",     priority: "med"  },
  // Opening / Manager
  { id: "r3",  text: "Count and balance cash drawer",             role: "Manager", priority: "high" },
  { id: "r4",  text: "Check RepairQ for overnight tickets",       role: "Manager", priority: "high" },
  { id: "r5",  text: "Place display devices in cases",            role: "Manager", priority: "high" },
  { id: "r6",  text: "Turn on store equipment",                   role: "Manager", priority: "high" },
  { id: "r7",  text: "Clean display case glass",                  role: "Manager", priority: "med"  },
  { id: "r8",  text: "Put sidewalk sign out",                     role: "Manager", priority: "med"  },
  { id: "r9",  text: "Check MobileSentrix for backorders",        role: "Manager", priority: "low"  },
  { id: "r10", text: "Post daily promo on social media",          role: "Manager", priority: "med"  },
  // Sales
  { id: "r11", text: "Restock accessories and display items",     role: "Sales",   priority: "med"  },
  { id: "r12", text: "Wipe down display phones",                  role: "Sales",   priority: "med"  },
  { id: "r13", text: "Follow up on pending customer quotes",      role: "Sales",   priority: "high" },
  { id: "r14", text: "Check ZAGG inventory levels",               role: "Sales",   priority: "low"  },
  // Techs
  { id: "r15", text: "Review repair queue for overdue tickets",   role: "Techs",   priority: "high" },
  { id: "r16", text: "Clean and organize workbench",              role: "Techs",   priority: "high" },
  { id: "r17", text: "Verify parts in stock for today's repairs", role: "Techs",   priority: "high" },
  { id: "r18", text: "Pre-test all incoming devices",             role: "Techs",   priority: "high" },
  { id: "r19", text: "Mark completed repairs Ready for Pickup",   role: "Techs",   priority: "med"  },
  { id: "r20", text: "Call customers with completed repairs",     role: "Techs",   priority: "med"  },
  { id: "r21", text: "Tin soldering tips before shutdown",        role: "Techs",   priority: "low"  },
];

const getTodayKey = () => new Date().toISOString().split("T")[0]; // "2026-07-09"

const getTaskState = () => {
  try {
    const saved = localStorage.getItem("cpr_tasks");
    if (!saved) return { date: "", done: [], custom: [] };
    return JSON.parse(saved);
  } catch { return { date: "", done: [], custom: [] }; }
};

const saveTaskState = (state) => {
  try { localStorage.setItem("cpr_tasks", JSON.stringify(state)); } catch {}
};

const TASKS = []; // kept for dashboard compatibility

// ── Announcements helpers ─────────────────────────────────────────────────
const getAnnouncements = () => {
  try {
    const saved = localStorage.getItem("cpr_announcements");
    return saved ? JSON.parse(saved) : { pinned: null, feed: [] };
  } catch { return { pinned: null, feed: [] }; }
};
const saveAnnouncements = (data) => {
  try { localStorage.setItem("cpr_announcements", JSON.stringify(data)); } catch {}
};
const SOPS = [
  {
    id: 10,
    title: "Technician Standards SOP",
    category: "Repair",
    updated: "Jul 9",
    content: `TECHNICIAN STANDARDS SOP
Store-Level Employee Guide | CPR Cell Phone Repair

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. WORKSTATION CLEANLINESS & ORGANIZATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

During the Day
• Work areas must remain organized while performing repairs
• Clean and organize your work area after every repair
• Tools must be returned to their designated place after use
• Loose screws or parts should never be left on the bench

End of Shift
• Desk must be completely cleaned and organized
• Remove debris, parts, adhesive scraps, and trash
• Return tools and equipment to their proper location

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. REPAIR SCHEDULING & TIME MANAGEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Standard repairs should be scheduled in 30-minute intervals
• Complex repairs may require additional time
• Do not overbook repairs if you are already behind

If Running Behind
• Communicate with other technicians as soon as possible
• Do not wait until the repair is 5 minutes from being due
• Ask for assistance early

Customer Communication
• If a repair will take longer than expected, contact the customer immediately
• Inform them of the delay and provide a new completion estimate

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. REPAIR TICKET & DOCUMENTATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pre-Repair (REQUIRED before starting any repair)
✔ Complete Pre-Test Form
✔ Document all device conditions and issues
✔ Record findings on repair ticket
✔ Note any existing damage

During Repair — Record on ticket:
• Repair performed
• Parts used
• Additional observations
• Unexpected issues discovered

Post-Repair
✔ Complete Post-Test Form
✔ Document results of testing
✔ Add final repair notes to ticket
✔ Mark ticket Ready for Pickup

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. DEVICE TESTING REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pre-Test must check:
• Power • Display • Touch functionality • Cameras
• Speakers • Microphones • Charging • Buttons
• Face ID / Touch ID (when applicable)

Post-Test must confirm:
• All replaced parts function correctly
• Device operates normally
• No additional damage occurred during repair

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. REPAIR QUALITY STANDARDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• All screws removed during repair must be reinstalled
• No screws or components should be missing
• Avoid forgetting shields, brackets, or internal components
• All devices must leave in same or better condition than received

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. DEVICE CLEANING & FINAL PREPARATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before returning device to customer:
• Clean device thoroughly
• Remove fingerprints, dust, and debris
• Wipe screen clean
• Plug device in to charge if possible

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. ADHESIVE REPLACEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Required steps when opening a device:
1. Remove all old adhesive
2. Clean frame or back glass with isopropyl alcohol
3. Remove any residue or debris
4. Install new adhesive

• Adhesive must be added to repair ticket OR removed from inventory
• No device should be sealed without new adhesive

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. SOLDERING WORKSTATION STANDARDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

End of Day:
• Clean ESD mat
• Clean microscope stand and work area
• Remove all flux residue and solder splatter

Equipment Care:
• Soldering tips must be tinned with solder to prevent corrosion
• Clean microscope lenses if dirty

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
9. PARTS & REPAIR TRACKING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• All parts used must be attached to repair ticket and logged in inventory
• All accessories brought in with device must stay with repair ticket until pickup

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
10. REPAIR QUEUE MANAGEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• No repairs should be past due
• Orange tickets (past due) must be updated with new pickup date
• Once finished: mark Ready for Pickup, call customer, charge device

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
11. REPAIR RESEARCH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

If unfamiliar with a repair, before starting:
• Check CPR Knowledge Hub
• Check iFixit
• Research online
• Identify potential risks or fragile components

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
12. BENCH FEE POLICY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• $50 minimum bench fee applies for diagnostic work
• May be adjusted based on time spent, complexity, and work performed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
13. DRESS CODE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Monday – Friday
• Company-issued CPR collared polo (clean and presentable)
• Slacks or dress pants
• Closed-toe tennis shoes or dress shoes

Weekend
• Company-issued CPR t-shirt
• Clean jeans (no holes, rips, or excessive wear)
• Closed-toe tennis shoes or dress shoes

General
• Maintain good personal hygiene and neat appearance
• No hats/hoodies without management approval
• No offensive language, graphics, or competing logos on clothing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
14. WRITE-UP TRIGGERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Immediate Write-Up
• Missing screws or parts after repair
• Failure to complete pre or post tests
• Failure to document repairs properly
• Device returned in worse condition
• Excessively messy workstation
• Not reinstalling adhesive when required

Performance Write-Up
• Repeated late repairs without communication
• Multiple overdue tickets
• Failure to clean workstation regularly
• Not contacting customers about delays

Serious Write-Up
• Careless damage to customer devices
• Repeated avoidable mistakes
• Ignoring repair procedures
• Improper documentation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
15. DAILY CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Beginning of Shift
✔ Review repair queue
✔ Identify upcoming repairs
✔ Ensure tools are ready
✔ Ensure workstation is clean

During the Day
✔ Pre-test every device
✔ Complete repair notes
✔ Complete post-test
✔ Clean workstation after each repair
✔ Monitor queue for overdue tickets
✔ Communicate delays early

After Each Repair
✔ Reinstall all screws and parts
✔ Replace adhesive if device was opened
✔ Clean device
✔ Plug device in if possible
✔ Attach parts to ticket
✔ Mark repair Ready for Pickup

End of Shift
✔ Clean workstation
✔ Organize tools
✔ Dispose of debris and trash
✔ Clean soldering workstation (if used)
✔ Ensure no open repairs are overdue`
  },
  {
    id: 11,
    title: "Discounts SOP",
    category: "Sales",
    updated: "Jul 9",
    content: `DISCOUNTS SOP
Store-Level Employee Guide | CPR Cell Phone Repair

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CUSTOMER DISCOUNTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Military Discount
• 20% off — maximum discount $20

Student Discount
• 20% off — maximum discount $20

Business Discount
• $20 off

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EMPLOYEE DISCOUNTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Ask Management or Owners for approval before applying
• Most accessories: $5 above cost
• Most phones: $25 to $50 below retail

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MULTI REPAIR DISCOUNTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• If more than one repair is done, we can typically discount $50
  (Only when both repairs are $130+ above part cost)

• If the customer is going to walk, ask management or owners if we can do better
  — most of the time we can

From Management — How to price multi-repairs:
  Start with the highest repair cost at full price, then price the cheaper
  repair at double its part cost (minimum $20 additional).

  Example — iPhone 12 Screen + Charge Port:
  • Screen: $169.99
  • Charge port retail: $119.99 / part cost: $8.00
  • Instead of $16 (double cost), offer charge port for an additional $50
  • Total: $219.99 + tax

  For additional repairs beyond two:
  • Price each additional repair at double its part cost, starting at $20 minimum

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMPORTANT NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Discounts cannot be combined unless approved by management
• Always verify military or student status before applying discount
• Employee discounts require manager or owner approval first`
  },
  {
    id: 12,
    title: "Dress Code SOP",
    category: "Operations",
    updated: "Jul 9",
    content: `DRESS CODE SOP
Store-Level Employee Guide | CPR Cell Phone Repair

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MONDAY – FRIDAY ATTIRE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Company-issued CPR collared polo shirt must be worn and kept clean and presentable
• Slacks or dress pants are required
• Clothing must be free of stains, excessive wrinkles, tears, or holes
• Closed-toe tennis shoes or dress shoes are required

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WEEKEND ATTIRE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Company-issued CPR t-shirt may be worn
• Clean jeans are permitted — no holes, rips, fraying, or excessive wear
• Closed-toe tennis shoes or dress shoes are required

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GENERAL APPEARANCE STANDARDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Maintain good personal hygiene and a neat, professional appearance at all times
• Clothing should fit appropriately — not excessively tight, baggy, or revealing
• Hats, hoodies, or non-company branded outerwear may only be worn with management approval
• Clothing displaying offensive language, inappropriate graphics, or competing business logos is prohibited
• Management reserves the right to determine whether attire meets company standards and may require employees to change

Employees who fail to comply with the dress code may be asked to correct the issue before beginning work.`
  },
  {
    id: 13,
    title: "Technician End of Shift SOP",
    category: "Repair",
    updated: "Jul 9",
    content: `TECHNICIAN END OF SHIFT SOP
Store-Level Employee Guide | CPR Cell Phone Repair

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REPAIR QUEUE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before clocking out:
• Review all assigned repair tickets
• Ensure every repair ticket has accurate and up-to-date notes
• Verify there are no past-due repair tickets without customer communication
• Update estimated completion and pickup times as needed
• Confirm all repair statuses accurately reflect the current stage of the repair

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMPLETED REPAIRS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Ensure all completed repairs are properly labeled
• Place completed devices in the designated pickup location
• Verify completed devices are connected to chargers when applicable
• If you are off the next day and have a repair due for pickup, notify the scheduled technician

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WORKSTATION ORGANIZATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before leaving:
• Clean and organize your repair bench
• Remove all leftover parts, screws, adhesive backing, packaging, trash, dirt, and debris
• Return all tools and equipment to their designated locations
• Ensure your workstation is clean and ready for the next business day

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BATTERY & RECYCLING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Verify all recycled lithium-ion batteries are placed in the designated battery storage container
• Ensure batteries are stored safely and in accordance with company safety procedures
• Empty the recycled parts bin if it is full and dispose of contents according to company procedures

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECHNICIAN CLOSING CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ Repair queue reviewed
☐ No past-due tickets without updated pickup times or customer communication
☐ Repair tickets updated with current notes and statuses
☐ Completed repairs labeled and placed in designated pickup area
☐ Completed devices charging (when applicable)
☐ Workbench cleaned and organized
☐ All tools returned to proper locations
☐ Leftover parts, adhesive, packaging, and debris removed
☐ Recycled batteries stored properly
☐ Recycled parts bin emptied if full

Each technician is responsible for leaving their workstation clean, organized, and fully prepared for the next business day.`
  },
  {
    id: 15,
    title: "Technician Start of Shift SOP",
    category: "Repair",
    updated: "Jul 9",
    content: `TECHNICIAN START OF SHIFT SOP
Store-Level Employee Guide | CPR Cell Phone Repair

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WORKSTATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Ensure your repair bench is clean, organized, and stocked with the tools and supplies needed for the day
• Remove unnecessary parts, tools, trash, and completed repairs from your workspace

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REPAIR QUEUE REVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before beginning repairs:
• Review the Repair Queue
• Identify any overdue or past-due repairs
• Update estimated completion and pickup times as needed
• Review all repairs currently scheduled for the day
• Prioritize repairs based on due date, customer commitments, and management direction

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PREPARE FOR REPAIRS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Gather parts and tools for scheduled repairs
• Verify required parts are in stock before beginning work
• Organize your repair workflow to maximize efficiency throughout the day`
  },
  { id: 1, title: "iPhone Screen Replacement Protocol", category: "Repair", updated: "Jun 1", content: "" },
  { id: 2, title: "Samsung Water Damage Intake", category: "Repair", updated: "May 28", content: "" },
  { id: 3, title: "Trade-In Evaluation Checklist", category: "Sales", updated: "May 20", content: "" },
  {
    id: 4,
    title: "Store Opening Procedure",
    category: "Operations",
    updated: "Jul 9",
    content: `OPENING PROCEDURE SOP
Store-Level Employee Guide | CPR Cell Phone Repair

Opening employee must arrive and have store open at least 30 minutes prior to business hours.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CASH HANDLING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Count and balance all cash registers
• Report any discrepancies to management immediately

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STORE SETUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Remove all electronic devices (phones, tablets, smart watches, laptops, gaming consoles, etc.) from secure storage and place in appropriate display cases
• Wipe down every display device — remove fingerprints, dust, and smudges
• Verify all merchandise is displayed neatly and securely

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POWER UP THE STORE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Turn on the following:
• Display case lighting
• Front showroom lights
• Back room lights
• Track lighting
• Air compressor
• Display TVs
• Security monitor system (back room)
• Dehydrator

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLEANING & PRESENTATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before opening doors:
• Clean all display case glass
• Wipe down the center display island
• Ensure sales floor is clean and free of dirt or debris
• Straighten merchandise and displays
• Verify store is clean, organized, and ready to welcome customers

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UNLOCK FRONT DOOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• If customers are waiting outside before opening time and everything is done, open early to accommodate them
• Take sidewalk sign out to the curb
• Welcome customers!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECHNICIAN OPENING RESPONSIBILITIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Workstation
• Ensure repair bench is clean, organized, and stocked with tools and supplies
• Remove unnecessary parts, tools, trash, and completed repairs from workspace

Repair Queue Review
• Review the Repair Queue
• Identify any overdue or past-due repairs
• Update estimated completion and pickup times as needed
• Review all repairs scheduled for the day
• Prioritize by due date, customer commitments, and management direction

Prepare for Repairs
• Gather parts and tools for scheduled repairs
• Verify required parts are in stock before beginning work
• Organize repair workflow to maximize efficiency

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OPENING READINESS CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ Registers counted and balanced
☐ All display devices placed in cases
☐ Display devices cleaned
☐ Display case lights on
☐ Front and back lights on
☐ Track lights on
☐ Compressor on
☐ Display TVs on
☐ Security monitors on
☐ Dehydrator on
☐ Display case glass cleaned
☐ Center island cleaned
☐ Floors clean
☐ Store organized and presentable
☐ Technician workstations clean
☐ Repair queue reviewed
☐ Technicians prepared for scheduled repairs

The goal is for every customer to walk into a clean, organized, fully operational store the moment the doors open.`
  },
  {
    id: 5,
    title: "Store Closing Procedure",
    category: "Operations",
    updated: "Jul 9",
    content: `STORE CLOSING PROCEDURE SOP
Store-Level Employee Guide | CPR Cell Phone Repair

No employee should leave until all closing tasks have been completed.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECURE THE STORE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Turn the OPEN sign off
• Bring the exterior sidewalk sign inside
• Lock the front entrance door after the last customer has exited
• Remove all electronic devices (phones, tablets, smart watches, laptops, gaming consoles, etc.) from display cases and securely store in the security cage
• Board and lock the back door
• Arm the security system
• Verify the front door is locked before leaving

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CASH HANDLING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Count and balance all cash drawers
• Report any cash discrepancies to management immediately
• Prepare the bank deposit
• Place the deposit bag in the secure drop box

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLEANING & ORGANIZATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Vacuum the front showroom and back work area
• Empty all trash cans and take trash to the designated dumpster
• Clean and organize the front display island
• Clean and organize the back work island
• Clean all display case glass and entrance door glass
• Restock accessories and merchandise for the next business day
• Place all handheld display phones on their charging bases

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EQUIPMENT SHUTDOWN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Turn off or secure the following:
• Display TVs
• Customer and technician monitors
• Security monitor system (back room)
• All computers
• Display cabinet lighting (unplug)
• Air compressor
• Powered tools on the back work island

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TWO-MINUTE FINAL WALKTHROUGH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before arming the security system, verify:
• No customers or unauthorized individuals remain inside
• All repair devices have been properly secured
• All display electronics removed from cases and secured in storage cage
• All cash drawers, deposits, and company assets are secured
• All computers, TVs, monitors, lights, compressors, and powered tools are off
• All trash removed and work areas clean and organized
• Front and back doors are locked and secure
• Back door has been boarded
• No water running and no safety hazards exist
• Security alarm has been armed successfully
• Front door is locked after exiting the building

Never rush the final walkthrough — it prevents theft, equipment damage, safety issues, and unnecessary alarm calls.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FINAL CLOSING CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ OPEN sign turned off
☐ Sidewalk sign brought inside
☐ Front door locked
☐ Cash drawers counted and balanced
☐ Deposit completed and placed in drop box
☐ Front showroom vacuumed
☐ Back work area vacuumed
☐ All trash removed
☐ Electronic devices secured in cage
☐ Front display island cleaned and organized
☐ Back work island cleaned and organized
☐ Display case glass cleaned
☐ Entrance door glass cleaned
☐ Accessories restocked
☐ Display phones placed on charging bases
☐ Monitors turned off
☐ Display TVs turned off
☐ Security monitors turned off
☐ All computers shut down
☐ Display cabinet lights unplugged
☐ Air compressor turned off
☐ Powered tools turned off
☐ Back door boarded and locked
☐ Security system armed
☐ Final check completed and all doors locked

Failure to complete any portion of the closing procedure may result in disciplinary action.`
  },
  { id: 6, title: "RepairQ Ticket Creation Guide", category: "POS", updated: "Mar 30", content: "" },
  { id: 7, title: "Handling Warranty Claims", category: "Sales", updated: "Jun 5", content: "" },
  { id: 8, title: "Customer Complaint Escalation", category: "Operations", updated: "May 10", content: "" },
  {
    id: 9,
    title: "ZAGG Screen Protectors",
    category: "Sales",
    updated: "Jul 9",
    content: `ZAGG SOP — Store-Level Employee Guide

FIELD GUIDE LINK
https://sites.google.com/zaggfranchise.com/field-guide/getting-started/frequently-used-forms-and-links

ISOD LOGIN
Username: CPR1661
Password: 9Pbwo5-a0

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GLASS OPTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DEFENCE — Advanced Clarity and Scratch Protection | MSRP $19.99
• Edge-to-edge impact and shatter protection
• Precision surface finishing for increased scratch resistance
• Military grade components (originally for helicopter blades)
• Thinner, more touch-sensitive package
• High gloss glass-like surface finish
• Stain resistant (cosmetics, cleaning supplies, food)
• Can be cut for any device on ZAGG on Demand
• Blank sizes: Wearable, Smartphone & Tablet
• Thickness: 0.15mm

ELITE — Advanced Self-Healing & Superior Impact Protection | MSRP $29.99
• Superior impact & scratch protection
• Anti-microbial treatment — inhibits odor-causing bacteria
• Premium glass-like feel and clarity
• Advanced touch sensitivity
• Advanced self-healing via Nano-Memory Technology
• Military grade components
• Can be cut for any device with On Demand
• Blank sizes: Wearable, Smartphone & Tablet
• Thickness: 0.18mm

ELITE MATTE — Anti-Glare & Matte Feel | MSRP $29.99
• Same as Elite plus reduced glare
• Matte finish reduces direct light reflection
• Velvet smooth premium matte feel
• Can be cut for any device on ISOD
• Blank sizes: Wearable, Smartphone & Tablet
• Thickness: 0.18mm

REINFORCE — Shatterproof, Glass-Like Surface | MSRP $39.99
• 100% recycled PET material
• Ultimate scratch protection
• Smooth glass-like surface, superior durability
• Shatterproof — will not chip or shatter unlike glass
• Smudge resistant
• Available for flat devices only
• Small blank size only — requires special cutting blade

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROTECT BETTER CASE TRADE-IN PROGRAM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Program Link: https://docs.google.com/presentation/d/18znFKjw5uLyvngjLWOeptwtGPqLIJhXIktGFqPC9NFw/edit

• Customers may trade in their current case for credit toward Gear4 (Preferred Partner Only)
• Cases must be for the same generation of phone
• Effective 11/11/22 — TBD
• Coupon #ProtectBetter must be used and visible on receipt
• New Gear4 sale must be visible on receipt
• Receipt must be taped to traded-in case and sent with warranty product to receive credit
• Traded-in case must match same generation as case being sold
• iFrogz cases are NOT eligible — only trades toward new Gear4 cases
• Any case, any brand can be traded in toward new Gear4 case
• All Gear4 phone cases are eligible — not limited to iPhone

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WARRANTY PROCESS IN REPAIRQ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Navigate to Tickets → + Repair Ticket (use Repair ticket to capture customer info)
2. Capture customer contact information
3. Capture device details
4. Add ZAGG Labor SKU: "InvisibleShield Warranty - Professional Installation Service"
   • Price: $12 for glass / $12 for ISOD
5. Bundle the appropriate inventoried screen protector catalog item to the labor SKU
   • This decreases inventory of glass consumed
   • Customer is charged $12 for glass or $10 for ISOD`
  },
];
const REPAIR_PARTS = [
  { part: 'iPhone 15 Pro OLED Screen', supplier: 89.99, ourCost: 139.99, margin: 55 },
  { part: 'iPhone 14 Battery', supplier: 24.99, ourCost: 49.99, margin: 100 },
  { part: 'Samsung S24 Screen', supplier: 110.00, ourCost: 169.99, margin: 55 },
  { part: 'iPhone 15 Charging Port', supplier: 18.50, ourCost: 39.99, margin: 116 },
  { part: 'iPad Pro 11" Screen', supplier: 145.00, ourCost: 219.99, margin: 52 },
];
const ATLAS_PHONES = [
  { model: 'iPhone 15 Pro 256GB', condition: 'A', atlasBuy: 520, ourOffer: 480, locked: false },
  { model: 'iPhone 14 128GB', condition: 'B', atlasBuy: 310, ourOffer: 285, locked: false },
  { model: 'Samsung S24 Ultra', condition: 'A', atlasBuy: 480, ourOffer: 445, locked: false },
  { model: 'iPhone 13 128GB', condition: 'C', atlasBuy: 175, ourOffer: 155, locked: true },
  { model: 'Google Pixel 8', condition: 'B', atlasBuy: 210, ourOffer: 195, locked: false },
];

// ── Nav items ─────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "pricing", label: "Repair Pricing", icon: "pricing" },
  { id: "buyphones", label: "Buy Phones", icon: "buyphones" },
  { id: "sop", label: "SOPs", icon: "sop" },

  { id: "repairs", label: "Tech Repairs", icon: "repairs" },
  { id: "tasks", label: "Daily Tasks", icon: "tasks" },
  { id: "pos", label: "RepairQ / POS", icon: "pos" },
  { id: "crm", label: "Creatio CRM", icon: "crm" },
  { id: "orders", label: "Special Orders", icon: "dollar" },
  { id: "schedule", label: "Schedule", icon: "tasks" },
  { id: "links", label: "Quick Links", icon: "trend" },
  { id: "leaderboard", label: "Leaderboard", icon: "trend" },
];

// ── Shared UI components ──────────────────────────────────────────────────
const Card = ({ children, style = {} }) => (
  <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, ...style }}>
    {children}
  </div>
);
const Badge = ({ children, color = C.accent }) => (
  <span style={{ background: color + "22", color, borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>
    {children}
  </span>
);
const Tag = ({ children, color }) => (
  <span style={{ background: color + "18", color, borderRadius: 20, padding: "2px 9px", fontSize: 11, fontWeight: 600 }}>{children}</span>
);
const IntegrationBanner = ({ name, description }) => (
  <div style={{ background: C.goldDim, border: `1px solid ${C.gold}44`, borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
    <Icon d={Icons.warn} size={16} stroke={C.gold} />
    <span style={{ color: C.gold, fontSize: 13 }}>
      <strong>{name}</strong> — {description}
    </span>
  </div>
);
const StatCard = ({ label, value, sub, color = C.accent, icon }) => (
  <Card style={{ flex: 1, minWidth: 140 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</div>
        <div style={{ color, fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>{value}</div>
        {sub && <div style={{ color: C.textDim, fontSize: 12, marginTop: 4 }}>{sub}</div>}
      </div>
      {icon && <div style={{ background: color + "18", borderRadius: 8, padding: 8 }}><Icon d={Icons[icon]} size={18} stroke={color} /></div>}
    </div>
  </Card>
);

// ── DASHBOARD ─────────────────────────────────────────────────────────────
const DashboardView = ({ setView, currentUser }) => {
  const totalSales = TODAY_SALES.reduce((a, e) => a + e.sales, 0);
  const totalRepairs = REPAIR_TOTALS.reduce((a, e) => a + e.completed, 0);
  const tasksLeft = TASKS.filter(t => !t.done).length;
  const canPost = currentUser?.role === "Owner" || currentUser?.role === "Tech/Sales";

  const [salesData, setSalesData] = useState([]);
  const [salesLoaded, setSalesLoaded] = useState(false);

  if (!salesLoaded) {
    setSalesLoaded(true);
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SALES_SHEET_ID}/values/Sheet1!A:F?key=${SHEETS_API_KEY}`)
      .then(r => r.json())
      .then(json => {
        const rows = (json.values || []).slice(1);
        const parsed = rows.map(row => ({
          name:           row[0] || '',
          firstName:      row[0] ? (row[0].includes(', ') ? row[0].split(', ')[1] : row[0].split(' ')[0]) : '',
          totalSales:     parseFloat(row[1]) || 0,
          repairUnits:    parseInt(row[2]) || 0,
          accessorySales: parseFloat(row[3]) || 0,
          deviceSales:    parseFloat(row[4]) || 0,
          month:          row[5] || '',
        }));
        setSalesData(parsed);
      })
      .catch(() => {});
  }

  const totalSalesAmt = salesData.reduce((a, e) => a + e.totalSales, 0);
  const totalRepairUnits = salesData.reduce((a, e) => a + e.repairUnits, 0);
  const totalAccessory = salesData.reduce((a, e) => a + e.accessorySales, 0);
  const totalDevices = salesData.reduce((a, e) => a + e.deviceSales, 0);
  const salesMonth = salesData.length > 0 ? salesData[0].month : 'This Month';

  const [announcements, setAnnouncements] = useState(getAnnouncements);
  const [newPost, setNewPost] = useState("");
  const [newPinned, setNewPinned] = useState("");
  const [showPinnedEdit, setShowPinnedEdit] = useState(false);
  const [showNewPost, setShowNewPost] = useState(false);

  const updateAnnouncements = (data) => { setAnnouncements(data); saveAnnouncements(data); };

  const addPost = () => {
    if (!newPost.trim()) return;
    const post = {
      id: Date.now(),
      text: newPost,
      author: currentUser?.name || "Staff",
      time: new Date().toLocaleString(),
    };
    updateAnnouncements({ ...announcements, feed: [post, ...announcements.feed] });
    setNewPost("");
    setShowNewPost(false);
  };

  const savePinned = () => {
    updateAnnouncements({ ...announcements, pinned: newPinned.trim() || null });
    setShowPinnedEdit(false);
    setNewPinned("");
  };

  const deletePost = (id) => {
    updateAnnouncements({ ...announcements, feed: announcements.feed.filter(p => p.id !== id) });
  };

  const clearPinned = () => updateAnnouncements({ ...announcements, pinned: null });

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ color: C.textMuted, fontSize: 13, marginBottom: 4 }}>Friday, June 12, 2026</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: C.text, margin: 0 }}>Good morning, CPR Team 👋</h1>
      </div>
      {/* Stat row - Monthly totals */}
      <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
        <StatCard label="Monthly Sales" value={salesData.length > 0 ? `$${totalSalesAmt.toLocaleString()}` : "—"} sub={salesMonth} color={C.teal} icon="sales" />
        <StatCard label="Repair Units" value={salesData.length > 0 ? totalRepairUnits : "—"} sub={salesMonth} color={C.accent} icon="repairs" />
        <StatCard label="Accessory Sales" value={salesData.length > 0 ? `$${totalAccessory.toLocaleString()}` : "—"} sub={salesMonth} color={C.gold} icon="dollar" />
        <StatCard label="Device Sales" value={salesData.length > 0 ? `$${totalDevices.toLocaleString()}` : "—"} sub={salesMonth} color={C.blue} icon="phone" />
      </div>
      {/* Quick access grid */}
      <div style={{ marginBottom: 8, color: C.textMuted, fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Quick Access</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10, marginBottom: 24 }}>
        {NAV.filter(n => n.id !== "dashboard").map(n => (
          <div key={n.id} onClick={() => setView(n.id)}
            style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, transition: "all .15s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.background = C.surfaceHover; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.surface; }}>
            <Icon d={Icons[n.icon]} size={16} stroke={C.accent} />
            <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{n.label}</span>
          </div>
        ))}
      </div>
      {/* Claims & Quick Links Bar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {[
          { name: "T-Mobile Claims", url: "https://mytmoclaim.com/", color: "#FF4D1C" },
          { name: "Xfinity Mobile", url: "https://fastclaims.com/xfinitymobile", color: "#3B82F6" },
          { name: "Spectrum Mobile", url: "https://fastclaims.com/spectrummobile", color: "#3B82F6" },
          { name: "Device Care", url: "https://devicecarenow.com/cpr", color: "#00C9A7" },
          { name: "Akko", url: "https://partner.akko.app/claims/device-info", color: "#A855F7" },
          { name: "CPR Support", url: "https://cpr.creatio.com", color: "#FFB547" },
          { name: "Knowledge Hub", url: "https://franchiseeconnects.sharepoint.com/", color: "#22C55E" },
          { name: "Clock In", url: "https://secure8.yourpayrollhr.com/ta/200371.login", color: "#00C9A7" },
          { name: "Email", url: "https://m365.cloud.microsoft/chat?auth=2&origindomain=Office", color: "#6B7280" },
        ].map(link => (
          <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
            style={{ background: link.color + "18", border: `1px solid ${link.color}44`, borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, color: link.color, textDecoration: "none", whiteSpace: "nowrap" }}
            onMouseEnter={e => e.currentTarget.style.background = link.color + "30"}
            onMouseLeave={e => e.currentTarget.style.background = link.color + "18"}>
            {link.name} ↗
          </a>
        ))}
      </div>

      {/* Announcements */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ color: C.textMuted, fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>📢 Announcements</div>
          {canPost && (
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => { setShowPinnedEdit(true); setNewPinned(announcements.pinned || ""); }}
                style={{ background: C.goldDim, color: C.gold, border: `1px solid ${C.gold}44`, borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                📌 Pin
              </button>
              <button onClick={() => setShowNewPost(true)}
                style={{ background: C.accentDim, color: C.accent, border: `1px solid ${C.accent}44`, borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                + Post
              </button>
            </div>
          )}
        </div>

        {/* Pinned message */}
        {announcements.pinned && (
          <div style={{ background: C.goldDim, border: `1px solid ${C.gold}44`, borderRadius: 10, padding: "12px 16px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ fontSize: 16 }}>📌</span>
              <span style={{ color: C.gold, fontWeight: 600, fontSize: 14 }}>{announcements.pinned}</span>
            </div>
            {canPost && (
              <button onClick={clearPinned} style={{ background: "transparent", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 16, padding: "0 4px" }}>×</button>
            )}
          </div>
        )}

        {/* Pinned edit form */}
        {showPinnedEdit && (
          <div style={{ background: C.surface, border: `1px solid ${C.gold}44`, borderRadius: 10, padding: 14, marginBottom: 10 }}>
            <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 8 }}>📌 Pinned Announcement</div>
            <input value={newPinned} onChange={e => setNewPinned(e.target.value)} placeholder="Type a pinned message…"
              style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", color: C.text, fontSize: 13, outline: "none", boxSizing: "border-box", marginBottom: 8 }} />
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={savePinned} style={{ background: C.gold, color: "#000", border: "none", borderRadius: 8, padding: "7px 16px", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>Save</button>
              <button onClick={() => setShowPinnedEdit(false)} style={{ background: C.surface, color: C.textMuted, border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 16px", cursor: "pointer", fontSize: 12 }}>Cancel</button>
            </div>
          </div>
        )}

        {/* New post form */}
        {showNewPost && (
          <div style={{ background: C.surface, border: `1px solid ${C.accent}44`, borderRadius: 10, padding: 14, marginBottom: 10 }}>
            <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 8 }}>New Announcement</div>
            <input value={newPost} onChange={e => setNewPost(e.target.value)} onKeyDown={e => e.key === "Enter" && addPost()} placeholder="Type an announcement…"
              style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", color: C.text, fontSize: 13, outline: "none", boxSizing: "border-box", marginBottom: 8 }} />
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={addPost} style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "7px 16px", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>Post</button>
              <button onClick={() => setShowNewPost(false)} style={{ background: C.surface, color: C.textMuted, border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 16px", cursor: "pointer", fontSize: 12 }}>Cancel</button>
            </div>
          </div>
        )}

        {/* Feed */}
        {announcements.feed.length === 0 && !announcements.pinned && (
          <div style={{ color: C.textMuted, fontSize: 13, textAlign: "center", padding: "16px", background: C.surface, borderRadius: 10, border: `1px solid ${C.border}` }}>
            No announcements yet {canPost ? "— click Post to add one" : ""}
          </div>
        )}
        {announcements.feed.map(post => (
          <div key={post.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 16px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ color: C.text, fontSize: 14, marginBottom: 4 }}>{post.text}</div>
              <div style={{ color: C.textMuted, fontSize: 11 }}>{post.author} · {post.time}</div>
            </div>
            {canPost && (
              <button onClick={() => deletePost(post.id)} style={{ background: "transparent", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 16, padding: "0 4px", flexShrink: 0 }}>×</button>
            )}
          </div>
        ))}
      </div>

      {/* Today's Schedule */}
      <TodaySchedule />

      {/* Top tech + top sales */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, flexWrap: "wrap" }}>
        <Card>
          <div style={{ fontWeight: 700, marginBottom: 14, color: C.text }}>🔧 Top Tech — {salesMonth}</div>
          {salesData.length > 0
            ? [...salesData].sort((a, b) => b.repairUnits - a.repairUnits).slice(0, 5).map((e, i) => {
                return (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 4 ? `1px solid ${C.border}` : "none" }}>
                    <span style={{ color: C.textDim, fontSize: 13 }}>{["🥇","🥈","🥉"][i] || (i+1)+"."} {e.firstName}</span>
                    <span style={{ color: C.teal, fontWeight: 700 }}>{e.repairUnits} units</span>
                  </div>
                );
              })
            : REPAIR_TOTALS.sort((a, b) => b.completed - a.completed).map((t, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < REPAIR_TOTALS.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <span style={{ color: C.textDim, fontSize: 13 }}>{t.name}</span>
                  <span style={{ color: C.teal, fontWeight: 700 }}>{t.completed} repairs</span>
                </div>
              ))
          }
        </Card>
        <Card>
          <div style={{ fontWeight: 700, marginBottom: 14, color: C.text }}>💰 Top Sales — {salesMonth}</div>
          {salesData.length > 0
            ? [...salesData].sort((a, b) => b.totalSales - a.totalSales).slice(0, 5).map((e, i) => {
                return (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 4 ? `1px solid ${C.border}` : "none" }}>
                    <span style={{ color: C.textDim, fontSize: 13 }}>{["🥇","🥈","🥉"][i] || (i+1)+"."} {e.firstName}</span>
                    <span style={{ color: C.gold, fontWeight: 700 }}>${e.totalSales.toLocaleString()}</span>
                  </div>
                );
              })
            : TODAY_SALES.sort((a, b) => b.sales - a.sales).map((s, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < TODAY_SALES.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <span style={{ color: C.textDim, fontSize: 13 }}>{s.name}</span>
                  <span style={{ color: C.gold, fontWeight: 700 }}>${s.sales.toLocaleString()}</span>
                </div>
              ))
          }
        </Card>
      </div>
    </div>
  );
};

// ── REPAIR PRICING (GOOGLE SHEETS LIVE) ──────────────────────────────────
const PRICING_SHEET_ID = "17qLyjLfiPl3uzUP3nQ-OWARLxBEX0cOIAT8_SrqQwiE";
const MS_BASE_URL = "https://www.cpr.parts";

const getMSCredentials = () => {
  try {
    const saved = localStorage.getItem("cpr_ms_creds");
    return saved ? JSON.parse(saved) : { consumerKey: "", consumerSecret: "", accessToken: "", accessTokenSecret: "" };
  } catch { return { consumerKey: "", consumerSecret: "", accessToken: "", accessTokenSecret: "" }; }
};

const PricingView = () => {
  const [search, setSearch] = useState("");
  const [allPrices, setAllPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchPricing = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${PRICING_SHEET_ID}/values/${encodeURIComponent("Repair Prices")}!A:F?key=${SHEETS_API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const rows = data.values || [];
      // Skip first 2 header rows, parse remaining
      const parsed = rows.slice(2).map((row, i) => ({
        id: i,
        brand:    (row[0] || "").trim(),
        model:    (row[1] || "").trim(),
        modelNum: (row[2] || "").trim(),
        repair:   (row[3] || "").trim(),
        amPrice:  (row[4] || "").trim(),
        oemPrice: (row[5] || "").trim(),
      })).filter(r => r.repair && r.model !== "" && (r.amPrice || r.oemPrice));
      setAllPrices(parsed);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (e) {
      setError(`Could not load pricing: ${e.message}`);
    }
    setLoading(false);
  };

  const [mounted, setMounted] = useState(false);
  if (!mounted) { setMounted(true); fetchPricing(); }

  const filtered = allPrices.filter(p => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return p.model.toLowerCase().includes(q) ||
           p.repair.toLowerCase().includes(q) ||
           p.brand.toLowerCase().includes(q) ||
           p.modelNum.toLowerCase().includes(q);
  });

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>Repair Pricing</h2>
        <div style={{ color: C.textMuted, fontSize: 13 }}>
          Live from your pricing sheet · {lastUpdated ? `Updated ${lastUpdated}` : "Loading..."}
        </div>
      </div>

      {/* Parts Quick Links */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {[
          { name: "CPR Parts", url: "https://www.cpr.parts" },
          { name: "PLP", url: "https://www.phonelcdparts.com" },
          { name: "Injured Gadgets", url: "https://www.injuredgadgets.com" },
          { name: "Laptop Screens", url: "https://www.laptopscreen.com/English/" },
          { name: "eBay", url: "https://www.ebay.com" },
          { name: "Amazon", url: "https://www.amazon.com" },
        ].map(link => (
          <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
            style={{ background: C.accentDim, border: `1px solid ${C.accent}44`, borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, color: C.accent, textDecoration: "none" }}
            onMouseEnter={e => e.currentTarget.style.background = C.accent + "30"}
            onMouseLeave={e => e.currentTarget.style.background = C.accentDim}>
            {link.name} ↗
          </a>
        ))}
      </div>

      {/* Search */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by model, repair type, or brand… (e.g. iPhone 14, battery, Samsung)"
          style={{ flex: 1, minWidth: 200, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.text, fontSize: 14, outline: "none" }}
        />
        <button onClick={fetchPricing}
          style={{ background: C.surface, color: C.textMuted, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, cursor: "pointer" }}>
          ↻ Refresh
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "40px", color: C.textMuted }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>⏳</div>
          Loading pricing...
        </div>
      )}

      {error && (
        <div style={{ background: C.redDim, border: `1px solid ${C.red}44`, borderRadius: 10, padding: "14px 18px", color: C.red, marginBottom: 16 }}>
          {error}
        </div>
      )}

      {!loading && !error && (
        <div style={{ overflowX: "auto" }}>
          <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 8 }}>
            {filtered.length} repairs found {search ? `for "${search}"` : ""}
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ color: C.textMuted, textAlign: "left" }}>
                {["Brand", "Model", "Model #", "Repair", "AM Price", "OEM Price"].map((h, i) => (
                  <th key={i} style={{ padding: "8px 12px", borderBottom: `1px solid ${C.border}`, fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 200).map((p, i) => (
                <tr key={i}
                  onMouseEnter={e => e.currentTarget.style.background = C.surfaceHover}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  style={{ borderBottom: `1px solid ${C.border}22` }}>
                  <td style={{ padding: "10px 12px", color: C.textDim }}>{p.brand}</td>
                  <td style={{ padding: "10px 12px", color: C.text, fontWeight: 600 }}>{p.model}</td>
                  <td style={{ padding: "10px 12px", color: C.textMuted, fontSize: 11 }}>{p.modelNum}</td>
                  <td style={{ padding: "10px 12px", color: C.textDim }}>{p.repair}</td>
                  <td style={{ padding: "10px 12px", color: C.teal, fontWeight: 700 }}>{p.amPrice || "—"}</td>
                  <td style={{ padding: "10px 12px", color: C.gold, fontWeight: 700 }}>{p.oemPrice || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length > 200 && (
            <div style={{ color: C.textMuted, fontSize: 12, padding: "10px", textAlign: "center" }}>
              Showing 200 of {filtered.length} — use search to narrow results
            </div>
          )}
          {filtered.length === 0 && search && (
            <div style={{ textAlign: "center", padding: "30px", color: C.textMuted }}>
              No repairs found for "{search}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ── BUY PHONES (ATLAS - LIVE GOOGLE SHEETS) ──────────────────────────────
const SHEETS_API_KEY = "AIzaSyBUfyOB-U1RPitIXZn0D0eHgtEkh76xEIA";
const SHEET_ID = "1pu4Adxq4MGB6Qour0k__4gBdgnggWRoSVYnJUKgxzEw";

// modelCol/priceCol are 0-indexed (A=0, B=1, C=2, D=3, E=4)
// startRow is 0-indexed (row 12 = index 11, row 11 = index 10, row 6 = index 5, etc)
const TABS = [
  { label: "iPhone Used",  modelCol: 1, priceCol: 3, startRow: 11 },
  { label: "Samsung",      modelCol: 1, priceCol: 4, startRow: 11, conditionCol: 2, samsung: true },
  { label: "Google Pixel", modelCol: 0, priceCol: 2, startRow: 1  },
  { label: "iPad Used",    modelCol: 1, priceCol: 3, startRow: 11 },
  { label: "Apple Watch",  modelCol: 1, priceCol: 4, startRow: 5  },
  { label: "MacBooks",     modelCol: 1, priceCol: 3, startRow: 4  },
  { label: "Parts / ic",   modelCol: 1, priceCol: 3, startRow: 11 },
];

const BuyPhonesView = () => {
  const [search, setSearch] = useState("");
  const [margin, setMargin] = useState(20);
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchSheetData = async (tab) => {
    setLoading(true);
    setError(null);
    setPhones([]);
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(tab.label)}!A:Z?key=${SHEETS_API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const rows = data.values || [];
      // Use startRow to skip header/empty rows, pull modelCol and priceCol directly
      let parsed = [];
      if (tab.samsung) {
        const skipValues = ["not buying", "ask", "#num!", "-", "", "new", "a", "b", "c", "d", "doa"];
        let lastModel = "";
        let lastUnlockedPrice = "";
        rows.forEach((row) => {
          const model = (row[1] || "").toString().trim();
          const condition = (row[2] || "").toString().trim().toLowerCase();
          const price = (row[4] || "").toString().trim();
          const isValidPrice = (p) => p && !skipValues.some(s => p.toLowerCase().includes(s));

          if (condition === "unlocked" && model && model.length > 2) {
            lastModel = model;
            // Only add if price starts with $
            if (price.startsWith("$")) {
              parsed.push({ model: lastModel, condition: "Unlocked", atlasPrice: price });
            }
          } else if (condition.includes("carrier") && lastModel) {
            if (price.startsWith("$")) {
              parsed.push({ model: lastModel, condition: "Carrier Locked", atlasPrice: price });
            }
            lastModel = "";
          }
        });
      } else {
        parsed = rows.slice(tab.startRow)
          .map(row => ({
            model: (row[tab.modelCol] || "").toString().trim(),
            atlasPrice: (row[tab.priceCol] || "").toString().trim(),
            condition: "",
          }))
          .filter(r => {
            if (!r.model || r.model.length < 2) return false;
            if (!r.atlasPrice || r.atlasPrice === "" || r.atlasPrice === "-") return false;
            const skipPrices = ["not buying", "ask", "#num", "new", "a", "b", "c", "d", "doa"];
            if (skipPrices.includes(r.atlasPrice.toLowerCase())) return false;
            return true;
          });
      }
      setPhones(parsed);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (e) {
      setError(`Could not load "${tab.label}" — ${e.message}. Check API key and sheet sharing.`);
    }
    setLoading(false);
  };

  // Load iPhone Used on mount
  const [mounted, setMounted] = useState(false);
  if (!mounted) { setMounted(true); fetchSheetData(TABS[0]); }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    fetchSheetData(tab);
  };

  const filtered = phones.filter(p =>
    p.model.toLowerCase().includes(search.toLowerCase()) ||
    p.atlasPrice.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>Buy Phones</h2>
        <div style={{ color: C.textMuted, fontSize: 13 }}>
          Live Atlas pricing · {lastUpdated ? `Updated ${lastUpdated}` : "Loading..."}
        </div>
      </div>

      {/* Phone Buying Quick Links */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {[
          { name: "Sickw", url: "https://sickw.com" },
          { name: "T-Mobile BYOD", url: "https://www.t-mobile.com/resources/bring-your-own-phone" },
          { name: "Verizon BYOD", url: "https://www.verizon.com/bring-your-own-device/test" },
          { name: "AT&T BYOD", url: "https://www.att.com/buy/byod/identify?devicetype=phone" },
          { name: "Hyla", url: "https://hylaasp.hylamobile.com/grading-scale/#mobile-devices-and-tablets" },
          { name: "Digicircle", url: "https://www.digicircle.com/index.php" },
          { name: "EcoATM", url: "https://www.ecoatm.com/pages/sell" },
        ].map(link => (
          <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
            style={{ background: C.goldDim, border: `1px solid ${C.gold}44`, borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, color: C.gold, textDecoration: "none" }}
            onMouseEnter={e => e.currentTarget.style.background = C.gold + "30"}
            onMouseLeave={e => e.currentTarget.style.background = C.goldDim}>
            {link.name} ↗
          </a>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {TABS.map(tab => (
          <button key={tab.label} onClick={() => handleTabChange(tab)}
            style={{ background: activeTab.label === tab.label ? C.teal : C.surface, color: activeTab.label === tab.label ? "#fff" : C.textDim, border: `1px solid ${activeTab.label === tab.label ? C.teal : C.border}`, borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            {tab.label}
          </button>
        ))}
        <button onClick={() => fetchSheetData(activeTab)}
          style={{ background: C.surface, color: C.textMuted, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer" }}>
          ↻ Refresh
        </button>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search model…"
          style={{ flex: 1, minWidth: 200, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 12px", color: C.text, fontSize: 14, outline: "none" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 14px" }}>
          <span style={{ color: C.textMuted, fontSize: 13 }}>Offer below Atlas by</span>
          <input type="number" value={margin} onChange={e => setMargin(+e.target.value)}
            style={{ width: 40, background: "transparent", border: "none", color: C.accent, fontWeight: 700, fontSize: 14, outline: "none", textAlign: "center" }} />
          <span style={{ color: C.textMuted, fontSize: 13 }}>%</span>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "40px", color: C.textMuted }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>⏳</div>
          Loading live Atlas prices…
        </div>
      )}
      {error && (
        <div style={{ background: C.redDim, border: `1px solid ${C.red}44`, borderRadius: 10, padding: "14px 18px", color: C.red, marginBottom: 16 }}>
          {error}
        </div>
      )}

      {!loading && !error && phones.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 8 }}>{filtered.length} devices found</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ color: C.textMuted, textAlign: "left" }}>
                <th style={{ padding: "8px 12px", borderBottom: `1px solid ${C.border}`, fontWeight: 600 }}>Model</th>
                {activeTab.conditionCol !== undefined && <th style={{ padding: "8px 12px", borderBottom: `1px solid ${C.border}`, fontWeight: 600 }}>Condition</th>}
                <th style={{ padding: "8px 12px", borderBottom: `1px solid ${C.border}`, fontWeight: 600 }}>Atlas Price (A Grade)</th>
                <th style={{ padding: "8px 12px", borderBottom: `1px solid ${C.border}`, fontWeight: 600, color: C.teal }}>Your Offer</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 150).map((row, i) => {
                const rawPrice = parseFloat(row.atlasPrice.replace(/[^0-9.]/g, ""));
                const offer = rawPrice ? `$${(rawPrice * (1 - margin / 100)).toFixed(0)}` : "—";
                return (
                  <tr key={i}
                    onMouseEnter={e => e.currentTarget.style.background = C.surfaceHover}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    style={{ borderBottom: `1px solid ${C.border}22` }}>
                    <td style={{ padding: "10px 12px", color: C.text, fontWeight: 600 }}>{row.model}</td>
                    {activeTab.conditionCol !== undefined && <td style={{ padding: "10px 12px", color: C.textDim }}>{row.condition}</td>}
                    <td style={{ padding: "10px 12px", color: C.textDim }}>{row.atlasPrice}</td>
                    <td style={{ padding: "10px 12px", color: C.teal, fontWeight: 700 }}>{offer}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length > 150 && (
            <div style={{ color: C.textMuted, fontSize: 12, padding: "10px", textAlign: "center" }}>
              Showing 150 of {filtered.length} — use search to narrow results
            </div>
          )}
        </div>
      )}

      {!loading && !error && phones.length === 0 && (
        <Card>
          <div style={{ textAlign: "center", padding: "30px", color: C.textMuted }}>
            No data found for this tab.
          </div>
        </Card>
      )}
    </div>
  );
};

// ── SOPs ──────────────────────────────────────────────────────────────────
const SOPView = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const cats = ["All", "Repair", "Sales", "Operations", "POS"];
  const filtered = SOPS.filter(s =>
    (filter === "All" || s.category === filter) &&
    (s.title.toLowerCase().includes(search.toLowerCase()) ||
     (s.content && s.content.toLowerCase().includes(search.toLowerCase())))
  );
  const catColor = { Repair: C.accent, Sales: C.teal, Operations: C.gold, POS: C.blue };

  if (selected) return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <button onClick={() => setSelected(null)}
          style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 14px", color: C.textDim, fontSize: 13, cursor: "pointer" }}>
          ← Back
        </button>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text, margin: 0 }}>{selected.title}</h2>
          <div style={{ color: C.textMuted, fontSize: 12 }}>Updated {selected.updated}</div>
        </div>
        <Tag color={catColor[selected.category] || C.textMuted}>{selected.category}</Tag>
      </div>
      {selected.content ? (
        <Card>
          <pre style={{ color: C.text, fontSize: 13, lineHeight: 1.8, whiteSpace: "pre-wrap", fontFamily: "inherit", margin: 0 }}>
            {selected.content}
          </pre>
        </Card>
      ) : (
        <Card>
          <div style={{ textAlign: "center", padding: "40px", color: C.textMuted }}>
            No content uploaded yet for this SOP.
          </div>
        </Card>
      )}
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>SOPs</h2>
        <div style={{ color: C.textMuted, fontSize: 13 }}>Standard Operating Procedures — searchable by all staff</div>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search SOPs…"
          style={{ flex: 1, minWidth: 200, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 12px", color: C.text, fontSize: 14, outline: "none" }} />
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              style={{ background: filter === c ? C.accent : C.surface, color: filter === c ? "#fff" : C.textDim, border: `1px solid ${filter === c ? C.accent : C.border}`, borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {filtered.map(s => (
          <div key={s.id}
            style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = C.accent}
            onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
            onClick={() => setSelected(s)}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Icon d={Icons.sop} size={16} stroke={catColor[s.category] || C.textMuted} />
              <div>
                <div style={{ color: C.text, fontWeight: 600, fontSize: 14 }}>{s.title}</div>
                <div style={{ color: C.textMuted, fontSize: 12, marginTop: 2 }}>Updated {s.updated} {s.content ? "" : "· No content yet"}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Tag color={catColor[s.category] || C.textMuted}>{s.category}</Tag>
              <button style={{ background: s.content ? C.accentDim : C.surface, color: s.content ? C.accent : C.textMuted, border: "none", borderRadius: 6, padding: "4px 12px", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>
                {s.content ? "View" : "Empty"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16 }}>
        <button style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>+ Upload SOP</button>
      </div>
    </div>
  );
};

// ── TECH REPAIRS ──────────────────────────────────────────────────────────
const RepairsView = () => {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState("");
  const [mounted, setMounted] = useState(false);

  const fetchRepairs = async () => {
    setLoading(true);
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SALES_SHEET_ID}/values/Sheet1!A:F?key=${SHEETS_API_KEY}`;
      const res = await fetch(url);
      const json = await res.json();
      const rows = (json.values || []).slice(1);
      const parsed = rows.map(row => ({
        name:        row[0] || "",
        firstName:   row[0] ? (row[0].includes(", ") ? row[0].split(", ")[1] : row[0].split(" ")[0]) : "",
        repairUnits: parseInt(row[2]) || 0,
        month:       row[5] || "",
      })).filter(r => r.name);
      setRepairs(parsed.sort((a, b) => b.repairUnits - a.repairUnits));
      if (parsed.length > 0) setMonth(parsed[0].month);
    } catch(e) { console.error(e); }
    setLoading(false);
  };

  if (!mounted) { setMounted(true); fetchRepairs(); }

  const total = repairs.reduce((a, r) => a + r.repairUnits, 0);
  const max = repairs.length > 0 ? repairs[0].repairUnits : 1;
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>Tech Repairs</h2>
        <div style={{ color: C.textMuted, fontSize: 13 }}>
          Consumer Repair Units — {month}
          <button onClick={fetchRepairs} style={{ background: "transparent", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 16, marginLeft: 8 }}>↻</button>
        </div>
      </div>

      {loading && <div style={{ textAlign: "center", padding: 40, color: C.textMuted }}>⏳ Loading...</div>}

      {!loading && (
        <>
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            <StatCard label="Total Repair Units" value={total} sub={month} color={C.teal} icon="repairs" />
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            {repairs.map((t, i) => {
              const pct = max > 0 ? (t.repairUnits / max) * 100 : 0;
              return (
                <Card key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 20 }}>{medals[i] || `#${i+1}`}</span>
                      <div>
                        <div style={{ color: C.text, fontWeight: 700, fontSize: 15 }}>{t.firstName}</div>
                        <div style={{ color: C.textMuted, fontSize: 12 }}>{t.name}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: C.teal, fontWeight: 800, fontSize: 24 }}>{t.repairUnits}</div>
                      <div style={{ color: C.textMuted, fontSize: 11 }}>repair units</div>
                    </div>
                  </div>
                  <div style={{ background: C.border, borderRadius: 4, height: 6, overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, background: C.teal, height: "100%", borderRadius: 4, transition: "width .5s" }} />
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

// ── DAILY TASKS ───────────────────────────────────────────────────────────
const TasksView = ({ currentUser }) => {
  const priColor = { high: C.accent, med: C.gold, low: C.textMuted };

  // Load state, reset if it's a new day
  const initState = () => {
    const saved = getTaskState();
    const today = getTodayKey();
    if (saved.date !== today) {
      const fresh = { date: today, done: [], custom: [] };
      saveTaskState(fresh);
      return fresh;
    }
    return saved;
  };

  const [state, setState] = useState(initState);
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState("med");

  const updateState = (next) => { setState(next); saveTaskState(next); };

  // Filter recurring tasks by role
  const roleMap = {
    "Owner":      ["All", "Manager", "Sales", "Techs"],
    "Tech/Sales": ["All", "Sales", "Techs"],
    "Tech":       ["All", "Techs"],
    "Sales":      ["All", "Sales"],
  };
  const allowedRoles = roleMap[currentUser?.role] || ["All"];
  const myRecurring = RECURRING_TASKS.filter(t => allowedRoles.includes(t.role));

  const toggleRecurring = (id) => {
    const done = state.done.includes(id)
      ? state.done.filter(d => d !== id)
      : [...state.done, id];
    updateState({ ...state, done });
  };

  const addCustom = () => {
    if (!newTask.trim()) return;
    const custom = [...state.custom, { id: `c${Date.now()}`, text: newTask, priority: newPriority }];
    updateState({ ...state, custom });
    setNewTask("");
  };

  const toggleCustom = (id) => {
    const done = state.done.includes(id)
      ? state.done.filter(d => d !== id)
      : [...state.done, id];
    updateState({ ...state, done });
  };

  const deleteCustom = (id) => {
    const custom = state.custom.filter(t => t.id !== id);
    const done = state.done.filter(d => d !== id);
    updateState({ ...state, custom, done });
  };

  const allTasks = [
    ...myRecurring.map(t => ({ ...t, recurring: true })),
    ...state.custom.map(t => ({ ...t, recurring: false, role: "Custom" })),
  ];
  const open = allTasks.filter(t => !state.done.includes(t.id));
  const done = allTasks.filter(t => state.done.includes(t.id));
  const pct = allTasks.length ? Math.round((done.length / allTasks.length) * 100) : 0;

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>Daily Tasks</h2>
        <div style={{ color: C.textMuted, fontSize: 13 }}>{open.length} remaining · {done.length} complete · resets at midnight</div>
      </div>

      {/* Progress bar */}
      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: C.textDim, fontSize: 13 }}>Today's Progress</span>
          <span style={{ color: pct === 100 ? C.green : C.teal, fontWeight: 700 }}>{pct}%</span>
        </div>
        <div style={{ background: C.border, borderRadius: 4, height: 8, overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, background: pct === 100 ? C.green : C.teal, height: "100%", borderRadius: 4, transition: "width .4s" }} />
        </div>
        {pct === 100 && <div style={{ color: C.green, fontSize: 12, marginTop: 8, textAlign: "center", fontWeight: 600 }}>🎉 All tasks complete!</div>}
      </Card>

      {/* Add custom task — owners and managers only */}
      {(currentUser?.role === "Owner" || currentUser?.role === "Tech/Sales") && (
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          <input value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === "Enter" && addCustom()} placeholder="Add a one-off task…"
            style={{ flex: 1, minWidth: 180, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 12px", color: C.text, fontSize: 14, outline: "none" }} />
          <select value={newPriority} onChange={e => setNewPriority(e.target.value)}
            style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 12px", color: C.text, fontSize: 13, outline: "none" }}>
            <option value="high">High</option>
            <option value="med">Med</option>
            <option value="low">Low</option>
          </select>
          <button onClick={addCustom} style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 700, cursor: "pointer" }}>Add</button>
        </div>
      )}

      {/* Open tasks */}
      {open.length > 0 && <>
        <div style={{ marginBottom: 10, color: C.textMuted, fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>To Do — {open.length}</div>
        {open.map(t => (
          <div key={t.id}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 8 }}
            onMouseEnter={e => e.currentTarget.style.borderColor = priColor[t.priority]}
            onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
            <div onClick={() => t.recurring ? toggleRecurring(t.id) : toggleCustom(t.id)}
              style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${priColor[t.priority]}`, flexShrink: 0, cursor: "pointer" }} />
            <div onClick={() => t.recurring ? toggleRecurring(t.id) : toggleCustom(t.id)} style={{ flex: 1, cursor: "pointer" }}>
              <div style={{ color: C.text, fontSize: 14 }}>{t.text}</div>
              <div style={{ color: C.textMuted, fontSize: 11, marginTop: 2 }}>{t.role} {!t.recurring ? "· Custom" : ""}</div>
            </div>
            <Tag color={priColor[t.priority]}>{t.priority}</Tag>
            {!t.recurring && (
              <button onClick={() => deleteCustom(t.id)}
                style={{ background: "transparent", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 16, padding: "0 4px" }}>×</button>
            )}
          </div>
        ))}
      </>}

      {/* Completed tasks */}
      {done.length > 0 && <>
        <div style={{ margin: "20px 0 10px", color: C.textMuted, fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Completed — {done.length}</div>
        {done.map(t => (
          <div key={t.id}
            onClick={() => t.recurring ? toggleRecurring(t.id) : toggleCustom(t.id)}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 8, cursor: "pointer", opacity: 0.5 }}>
            <div style={{ width: 20, height: 20, borderRadius: 6, background: C.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon d={Icons.check} size={12} stroke="#fff" />
            </div>
            <div style={{ flex: 1, color: C.textMuted, fontSize: 14, textDecoration: "line-through" }}>{t.text}</div>
            <Tag color={C.green}>done</Tag>
          </div>
        ))}
      </>}
    </div>
  );
};

// ── POS / RepairQ ─────────────────────────────────────────────────────────
const POSView = () => (
  <div>
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>RepairQ / POS</h2>
      <div style={{ color: C.textMuted, fontSize: 13 }}>Tickets, claims, and sales data from your POS</div>
    </div>
    <IntegrationBanner name="RepairQ API" description="Add your RepairQ API key in Settings to activate live ticket and claims data." />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
      <StatCard label="Open Tickets" value="17" color={C.accent} icon="repairs" />
      <StatCard label="Pending Claims" value="4" color={C.gold} icon="pos" />
      <StatCard label="Closed Today" value="11" color={C.green} />
      <StatCard label="Avg Repair Time" value="2.4h" color={C.teal} />
    </div>
    <Card>
      <div style={{ color: C.textMuted, fontSize: 13, textAlign: "center", padding: "40px 20px" }}>
        <Icon d={Icons.pos} size={36} stroke={C.border} />
        <div style={{ marginTop: 12, fontWeight: 600, color: C.textDim }}>Connect RepairQ to see live tickets</div>
        <div style={{ fontSize: 12, marginTop: 6 }}>Go to Settings → Integrations → RepairQ and paste your API key</div>
        <button style={{ marginTop: 16, background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", fontWeight: 700, cursor: "pointer" }}>Go to Settings</button>
      </div>
    </Card>
  </div>
);

// ── CRM / Creatio ─────────────────────────────────────────────────────────
const CRMView = () => (
  <div>
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>Creatio CRM</h2>
      <div style={{ color: C.textMuted, fontSize: 13 }}>Leads, contacts, and conversion tracking</div>
    </div>
    <IntegrationBanner name="Creatio API" description="Connect your Creatio credentials in Settings to pull live lead and conversion data." />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
      <StatCard label="New Leads" value="12" sub="This week" color={C.blue} icon="crm" />
      <StatCard label="Contacted" value="8" sub="67%" color={C.teal} />
      <StatCard label="Converted" value="3" sub="25%" color={C.green} />
    </div>
    <Card>
      <div style={{ color: C.textMuted, fontSize: 13, textAlign: "center", padding: "40px 20px" }}>
        <Icon d={Icons.crm} size={36} stroke={C.border} />
        <div style={{ marginTop: 12, fontWeight: 600, color: C.textDim }}>Connect Creatio to see live leads</div>
        <div style={{ fontSize: 12, marginTop: 6 }}>Go to Settings → Integrations → Creatio and add your org URL and API key</div>
        <button style={{ marginTop: 16, background: C.blue, color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", fontWeight: 700, cursor: "pointer" }}>Go to Settings</button>
      </div>
    </Card>
  </div>
);

// ── PIN MANAGEMENT ───────────────────────────────────────────────────────
// Load saved PINs from localStorage, fall back to defaults
const getSavedPins = () => {
  try {
    const saved = localStorage.getItem("cpr_pins");
    return saved ? JSON.parse(saved) : {};
  } catch { return {}; }
};

const savePins = (pins) => {
  try { localStorage.setItem("cpr_pins", JSON.stringify(pins)); } catch {}
};

// Get effective PIN for an employee (saved or default)
const getPin = (employee) => {
  const saved = getSavedPins();
  return saved[employee.id] || employee.pin;
};

const PinEditor = ({ employee }) => {
  const [editing, setEditing] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const currentPin = getPin(employee);

  const savePin = () => {
    if (newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
      setError("PIN must be exactly 4 digits"); return;
    }
    if (newPin !== confirmPin) {
      setError("PINs don't match"); return;
    }
    const pins = getSavedPins();
    pins[employee.id] = newPin;
    savePins(pins);
    setSaved(true);
    setEditing(false);
    setNewPin("");
    setConfirmPin("");
    setError("");
    setTimeout(() => setSaved(false), 2000);
  };

  const roleColor = { Owner: C.accent, "Tech/Sales": C.teal, Tech: C.blue, Sales: C.gold };

  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: (roleColor[employee.role] || C.accent) + "22", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: roleColor[employee.role] || C.accent, fontWeight: 800, fontSize: 14 }}>{employee.name.charAt(0)}</span>
          </div>
          <div>
            <div style={{ color: C.text, fontWeight: 600, fontSize: 13 }}>{employee.name}</div>
            <div style={{ color: C.textMuted, fontSize: 11 }}>{employee.role} · PIN: {"●".repeat(4)}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {saved && <span style={{ color: C.green, fontSize: 12, fontWeight: 600 }}>✓ Saved!</span>}
          <button onClick={() => { setEditing(!editing); setError(""); setNewPin(""); setConfirmPin(""); }}
            style={{ background: editing ? C.surface : C.accentDim, color: editing ? C.textMuted : C.accent, border: `1px solid ${editing ? C.border : C.accent + "44"}`, borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            {editing ? "Cancel" : "Change PIN"}
          </button>
        </div>
      </div>
      {editing && (
        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <div style={{ color: C.textMuted, fontSize: 11, marginBottom: 4 }}>New PIN</div>
            <input type="password" maxLength={4} value={newPin} onChange={e => { setNewPin(e.target.value.replace(/\D/g, '')); setError(""); }}
              placeholder="4 digits"
              style={{ width: "100%", background: C.surface, border: `1px solid ${error ? C.red : C.border}`, borderRadius: 8, padding: "8px 12px", color: C.text, fontSize: 14, outline: "none", boxSizing: "border-box", letterSpacing: 4 }} />
          </div>
          <div>
            <div style={{ color: C.textMuted, fontSize: 11, marginBottom: 4 }}>Confirm PIN</div>
            <input type="password" maxLength={4} value={confirmPin} onChange={e => { setConfirmPin(e.target.value.replace(/\D/g, '')); setError(""); }}
              placeholder="4 digits"
              style={{ width: "100%", background: C.surface, border: `1px solid ${error ? C.red : C.border}`, borderRadius: 8, padding: "8px 12px", color: C.text, fontSize: 14, outline: "none", boxSizing: "border-box", letterSpacing: 4 }} />
          </div>
          {error && <div style={{ color: C.red, fontSize: 12, gridColumn: "1/-1" }}>{error}</div>}
          <button onClick={savePin}
            style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "8px", fontWeight: 700, cursor: "pointer", fontSize: 13, gridColumn: "1/-1" }}>
            Save PIN
          </button>
        </div>
      )}
    </div>
  );
};

// ── SETTINGS ──────────────────────────────────────────────────────────────
const SettingsView = () => {
  const [msCreds, setMsCreds] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cpr_ms_creds") || "{}"); } catch { return {}; }
  });
  const [msSaved, setMsSaved] = useState(false);

  const saveMsCreds = () => {
    try {
      localStorage.setItem("cpr_ms_creds", JSON.stringify(msCreds));
      setMsSaved(true);
      setTimeout(() => setMsSaved(false), 2000);
    } catch {}
  };

  const isConnected = !!(msCreds.accessToken && msCreds.accessTokenSecret);

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>Settings</h2>
        <div style={{ color: C.textMuted, fontSize: 13 }}>Integrations, store info, user roles</div>
      </div>

      {/* MobileSentrix */}
      <div style={{ marginBottom: 8, color: C.textMuted, fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>MobileSentrix Integration</div>
      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: isConnected ? C.green : C.border }} />
          <span style={{ color: isConnected ? C.green : C.textMuted, fontWeight: 600, fontSize: 13 }}>
            {isConnected ? "Connected" : "Not Connected"}
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {[
            ["Consumer Key", "consumerKey", "Your Consumer Key"],
            ["Consumer Secret", "consumerSecret", "Your Consumer Secret"],
            ["Access Token", "accessToken", "oauth_token from login URL"],
            ["Access Token Secret", "accessTokenSecret", "oauth_token_secret from login URL"],
          ].map(([label, key, placeholder]) => (
            <div key={key}>
              <div style={{ color: C.textMuted, fontSize: 11, marginBottom: 4 }}>{label}</div>
              <input
                type="password"
                value={msCreds[key] || ""}
                onChange={e => setMsCreds(c => ({ ...c, [key]: e.target.value }))}
                placeholder={placeholder}
                style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", color: C.text, fontSize: 13, outline: "none", boxSizing: "border-box" }}
              />
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={saveMsCreds}
            style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
            Save Credentials
          </button>
          {msSaved && <span style={{ color: C.green, fontSize: 13, fontWeight: 600 }}>✓ Saved!</span>}
        </div>
        <div style={{ marginTop: 12, color: C.textMuted, fontSize: 11 }}>
          Credentials are stored locally on this device only and never sent anywhere except MobileSentrix.
        </div>
      </Card>

      {/* Other integrations */}
      <div style={{ marginBottom: 8, color: C.textMuted, fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Other Integrations</div>
      <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
        {[
          { name: "RepairQ", desc: "POS — tickets, claims, sales", color: C.teal },
          { name: "Creatio CRM", desc: "Leads and conversions", color: C.blue },
        ].map((int, i) => (
          <Card key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.border }} />
              <div>
                <div style={{ color: C.text, fontWeight: 600 }}>{int.name}</div>
                <div style={{ color: C.textMuted, fontSize: 12 }}>{int.desc}</div>
              </div>
            </div>
            <button style={{ background: int.color + "22", color: int.color, border: `1px solid ${int.color}44`, borderRadius: 8, padding: "6px 16px", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>Pending</button>
          </Card>
        ))}
      </div>

      {/* PIN Management */}
      <div style={{ marginBottom: 8, color: C.textMuted, fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Employee PINs</div>
      <Card style={{ marginBottom: 24 }}>
        <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 14 }}>Click an employee to change their PIN. PINs must be 4 digits.</div>
        <div style={{ display: "grid", gap: 10 }}>
          {EMPLOYEES.map(emp => (
            <PinEditor key={emp.id} employee={emp} />
          ))}
        </div>
      </Card>

      {/* Store Info */}
      <div style={{ marginBottom: 8, color: C.textMuted, fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Store Info</div>
      <Card>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {[["Store Name", "CPR Cell Phone Repair"], ["Owner", "Jason Mohler"], ["Location", "Springfield, MO"], ["RepairQ Account", "—"]].map(([l, v], i) => (
            <div key={i}>
              <div style={{ color: C.textMuted, fontSize: 11, marginBottom: 4 }}>{l}</div>
              <input defaultValue={v} style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", color: C.text, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}
        </div>
        <button style={{ marginTop: 16, background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Save</button>
      </Card>
    </div>
  );
};

// ── TODAY'S SCHEDULE ─────────────────────────────────────────────────────
const TodaySchedule = () => {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0]; // "2026-07-15"
  const todayLabel = today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  const fetchSchedule = () => {
    setLoading(true);
    setError(null);
    try {
      // First try to read from Schedule Maker (localStorage)
      const saved = localStorage.getItem("cpr_today_shifts");
      if (saved) {
        const todayShifts = JSON.parse(saved);
        if (todayShifts.length > 0) {
          setShifts(todayShifts);
          setLoading(false);
          return;
        }
      }
      // Fall back to Google Sheet if no schedule maker data
      if (!SCHEDULE_SHEET_ID) { setLoading(false); setError("no_sheet"); return; }
      fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SCHEDULE_SHEET_ID}/values/Sheet1!A:Q?key=${SHEETS_API_KEY}`)
        .then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
        .then(data => {
          const rows = data.values || [];
          if (rows.length < 2) { setShifts([]); setLoading(false); return; }
          const headers = rows[0];
          const col = (name) => headers.findIndex(h => h.toLowerCase().includes(name.toLowerCase()));
          const parsed = rows.slice(1).map(row => ({
            firstName:  row[col("first name")]  || "",
            lastName:   row[col("last name")]   || "",
            date:       row[col("shift start date")] || "",
            startTime:  row[col("shift start time")] || "",
            endTime:    row[col("shift end time")]   || "",
            hours:      row[col("scheduled hours")]  || "",
            notes:      row[col("notes")]            || "",
          })).filter(r => r.date === todayStr && r.firstName);
          setShifts(parsed);
          setLoading(false);
        })
        .catch(e => { setError(e.message); setLoading(false); });
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  if (!mounted) { setMounted(true); fetchSchedule(); }

  if (error === "no_sheet") return null; // hide if no sheet configured yet

  return (
    <Card style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div>
          <div style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>📅 Today's Schedule</div>
          <div style={{ color: C.textMuted, fontSize: 12, marginTop: 2 }}>{todayLabel}</div>
        </div>
        <button onClick={fetchSchedule} style={{ background: "transparent", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 18 }}>↻</button>
      </div>

      {loading && <div style={{ color: C.textMuted, fontSize: 13, textAlign: "center", padding: "10px" }}>Loading schedule...</div>}
      {error && error !== "no_sheet" && <div style={{ color: C.red, fontSize: 13 }}>{error}</div>}

      {!loading && !error && shifts.length === 0 && (
        <div style={{ color: C.textMuted, fontSize: 13, textAlign: "center", padding: "10px" }}>No shifts scheduled for today</div>
      )}

      {!loading && shifts.length > 0 && (
        <div style={{ display: "grid", gap: 8 }}>
          {shifts.sort((a, b) => a.startTime.localeCompare(b.startTime)).map((s, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 12px", background: C.bg, borderRadius: 8, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.accentDim, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: C.accent, fontWeight: 800, fontSize: 13 }}>{s.firstName.charAt(0)}</span>
                </div>
                <div>
                  <div style={{ color: C.text, fontWeight: 600, fontSize: 13 }}>{s.firstName} {s.lastName}</div>
                  {s.notes && <div style={{ color: C.textMuted, fontSize: 11, marginTop: 2 }}>📝 {s.notes}</div>}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: C.teal, fontWeight: 700, fontSize: 13 }}>{s.startTime} – {s.endTime}</div>
                <div style={{ color: C.textMuted, fontSize: 11 }}>{s.hours} hrs</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

// ── SPECIAL ORDERS ───────────────────────────────────────────────────────
const SO_SHEET_ID = "17bpYFOxo-DCnizwG0gLkFiD2bUru7-CpIa_xcgQKcvw";
const SO_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdiLcbkkTbW04GfoFaPDxUdfpPZUAxfE0nj3yntIsv4y9vKtw/viewform";
const SCHEDULE_SHEET_ID = "1mCjFLbK7LrEVldDWyuT3OaDDWY_curoa6GlcPI8cDCc";
const SCHEDULE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzSFNwL5OkvCCFK2ZiSoEsWE2_3HOFJrxo0q5muYh3_DdFvcC1e-xYPYxAakaC3QEMD/exec";
const SCHEDULE_WRITE_SHEET_ID = "1kmP_9w85gdfV-ngK27LSF0EwA3aSMrEuTvNZbAa4Jhs";
const SALES_SHEET_ID = "1KhmrHUGyouovfbxat2unb8WEoMRFwigX5IltYHnzMBA";
const SO_COLS = ["Timestamp","Customer Name","Phone","Device Make","Device Model","Problem","Parts Needed","Date Promised","Supplier","Customer Paid","Device Left","Part Number","Quoted Price","Rep","Color","Item Ordered","Expected Delivery","Part In","Customer Called"];

const SpecialOrdersView = ({ currentUser }) => {
  const MONTHS = ["Current", "June 2026"];
  const [activeMonth, setActiveMonth] = useState("Current");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const isOwner = currentUser?.role === "Owner";

  const fetchOrders = async (month = activeMonth) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SO_SHEET_ID}/values/${encodeURIComponent(month)}!A:T?key=${SHEETS_API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const rows = data.values || [];
      if (rows.length < 2) { setOrders([]); setLoading(false); return; }
      // Map columns dynamically using headers
      const headers = rows[0].map(h => h.toLowerCase().trim());
      const col = (name) => headers.findIndex(h => h.includes(name.toLowerCase()));
      const parsed = rows.slice(1).map((row, i) => ({
        id: i,
        timestamp:        row[0]  || "",
        customer:         row[1]  || "",
        phone:            row[2]  || "",
        make:             row[3]  || "",
        model:            row[4]  || "",
        problem:          row[5]  || "",
        parts:            row[6]  || "",
        color:            row[7]  || "",
        promised:         row[8]  || "",
        supplier:         row[9]  || "",
        paid:             row[10] || "",
        deviceLeft:       row[11] || "",
        partNumber:       row[12] || "",
        quoted:           row[13] || "",
        rep:              row[14] || "",
        itemOrdered:      row[15] || "",
        expectedDelivery: row[16] || "",
        partIn:           row[17] || "",
        customerCalled:   row[18] || "",
        ticketNum:        row[19] || "",
      })).filter(r => r.customer);
      setOrders(parsed);
    } catch (e) {
      setError(`Could not load orders: ${e.message}`);
    }
    setLoading(false);
  };

  const [mounted, setMounted] = useState(false);
  if (!mounted) { setMounted(true); fetchOrders(activeMonth); }

  const isOverdue = (order) => {
    if (!order.promised || order.partIn) return false;
    const promised = new Date(order.promised);
    return promised < new Date();
  };

  const filters = ["All", "Part Not In", "Part In", "Overdue"];
  const filtered = orders.filter(o => {
    const matchSearch = !search ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.make.toLowerCase().includes(search.toLowerCase()) ||
      o.model.toLowerCase().includes(search.toLowerCase()) ||
      o.parts.toLowerCase().includes(search.toLowerCase()) ||
      o.rep.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "All" ? true :
      filter === "Part In" ? !!o.partIn :
      filter === "Part Not In" ? !o.partIn :
      filter === "Overdue" ? isOverdue(o) : true;
    return matchSearch && matchFilter;
  });

  const partInCount = orders.filter(o => o.partIn).length;
  const pendingCount = orders.filter(o => !o.partIn).length;
  const overdueCount = orders.filter(o => isOverdue(o)).length;

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>Special Orders</h2>
        <div style={{ color: C.textMuted, fontSize: 13 }}>Live from Google Sheets · {orders.length} total orders</div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <StatCard label="Pending" value={pendingCount} color={C.gold} icon="tasks" />
        <StatCard label="Part In" value={partInCount} color={C.green} />
        <StatCard label="Overdue" value={overdueCount} color={C.accent} icon="warn" />
      </div>

      {/* Month selector */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {MONTHS.map(m => (
          <button key={m} onClick={() => { setActiveMonth(m); fetchOrders(m); }}
            style={{ background: activeMonth === m ? C.teal : C.surface, color: activeMonth === m ? "#fff" : C.textDim, border: `1px solid ${activeMonth === m ? C.teal : C.border}`, borderRadius: 8, padding: "6px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            {m}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customer, device, part, rep…"
          style={{ flex: 1, minWidth: 200, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 12px", color: C.text, fontSize: 14, outline: "none" }} />
        <div style={{ display: "flex", gap: 6 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ background: filter === f ? C.accent : C.surface, color: filter === f ? "#fff" : C.textDim, border: `1px solid ${filter === f ? C.accent : C.border}`, borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              {f}
            </button>
          ))}
        </div>
        <button onClick={() => window.open(SO_FORM_URL, "_blank")}
          style={{ background: C.teal, color: "#fff", border: "none", borderRadius: 8, padding: "9px 16px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
          + New Order
        </button>
        <button onClick={fetchOrders}
          style={{ background: C.surface, color: C.textMuted, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 12px", fontSize: 13, cursor: "pointer" }}>
          ↻
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "40px", color: C.textMuted }}>⏳ Loading orders...</div>
      )}
      {error && (
        <div style={{ background: C.redDim, border: `1px solid ${C.red}44`, borderRadius: 10, padding: "14px 18px", color: C.red, marginBottom: 16 }}>{error}</div>
      )}

      {!loading && !error && (
        <div style={{ overflowX: "auto" }}>
          <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 8 }}>{filtered.length} orders</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ color: C.textMuted, textAlign: "left" }}>
                {["Status","Customer","Phone","Device","Parts Needed","Color","Promised","Supplier","Quoted","Rep", isOwner ? "Part #" : null, "Expected","Part In","Called", isOwner ? "Ticket #" : null].filter(Boolean).map((h, i) => (
                  <th key={i} style={{ padding: "8px 10px", borderBottom: `1px solid ${C.border}`, fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o, i) => {
                const overdue = isOverdue(o);
                const rowBg = overdue && !o.partIn ? C.redDim : "transparent";
                return (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.border}22`, background: rowBg }}
                    onMouseEnter={e => e.currentTarget.style.background = C.surfaceHover}
                    onMouseLeave={e => e.currentTarget.style.background = rowBg}>
                    <td style={{ padding: "10px 10px" }}>
                      {o.partIn
                        ? <Tag color={C.green}>Part In</Tag>
                        : overdue
                        ? <Tag color={C.accent}>Overdue</Tag>
                        : <Tag color={C.gold}>Pending</Tag>}
                    </td>
                    <td style={{ padding: "10px 10px", color: C.text, fontWeight: 600, whiteSpace: "nowrap" }}>{o.customer}</td>
                    <td style={{ padding: "10px 10px", color: C.textDim, whiteSpace: "nowrap" }}>{o.phone}</td>
                    <td style={{ padding: "10px 10px", color: C.textDim, whiteSpace: "nowrap" }}>{o.make} {o.model}</td>
                    <td style={{ padding: "10px 10px", color: C.textDim, maxWidth: 180 }}>{o.parts}</td>
                    <td style={{ padding: "10px 10px", color: C.textDim, whiteSpace: "nowrap" }}>{o.color}</td>
                    <td style={{ padding: "10px 10px", color: overdue && !o.partIn ? C.accent : C.textDim, whiteSpace: "nowrap", fontWeight: overdue ? 700 : 400 }}>{o.promised}</td>
                    <td style={{ padding: "10px 10px", color: C.textDim }}>{o.supplier}</td>
                    <td style={{ padding: "10px 10px", color: C.teal, fontWeight: 600 }}>{o.quoted}</td>
                    <td style={{ padding: "10px 10px", color: C.textDim }}>{o.rep}</td>
                    {isOwner && <td style={{ padding: "10px 10px", color: C.textMuted, fontSize: 11 }}>{o.partNumber}</td>}
                    <td style={{ padding: "10px 10px", color: C.textDim, whiteSpace: "nowrap" }}>{o.expectedDelivery}</td>
                    <td style={{ padding: "10px 10px" }}>{o.partIn ? <Tag color={C.green}>✓ {o.partIn}</Tag> : <Tag color={C.border}>—</Tag>}</td>
                    <td style={{ padding: "10px 10px" }}>{o.customerCalled ? <Tag color={C.teal}>✓</Tag> : <Tag color={C.border}>—</Tag>}</td>
                    {isOwner && <td style={{ padding: "10px 10px", color: C.textMuted, fontSize: 11 }}>{o.ticketNum}</td>}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "30px", color: C.textMuted }}>No orders match your search</div>
          )}
        </div>
      )}
    </div>
  );
};

// ── SCHEDULE MAKER ───────────────────────────────────────────────────────
const SCHEDULE_EMPLOYEES = [
  { id: 1, name: "Jason Mohler",   color: "#FF4D1C", email: "jmohler@wirelesstrendz.net" },
  { id: 2, name: "Cindy Leek",     color: "#00C9A7", email: "cleek@cpr-stores.com" },
  { id: 3, name: "Aliyah Mohler",  color: "#3B82F6", email: "aliyah.mohler@wirelesstrendz.net" },
  { id: 4, name: "Nate Williams",  color: "#FFB547", email: "nathanielwilliams1483@gmail.com" },
  { id: 5, name: "Alex Smith",     color: "#A855F7", email: "alex@wirelesstrendz.net" },
  { id: 6, name: "Galen Chandler", color: "#22C55E", email: "gchandler@cpr-stores.com" },
  { id: 7, name: "Dillon Greene",  color: "#EF4444", email: "DGreene1@cpr-stores.com" },
];

const getWeekStart = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
  return new Date(d.setDate(diff));
};

const getWeekDays = (weekStart) => {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });
};

const formatDate = (date) => date.toISOString().split("T")[0];
const formatDay = (date) => date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

const getScheduleKey = (weekStart) => `cpr_schedule_${formatDate(weekStart)}`;

const loadSchedule = (weekStart) => {
  try {
    const saved = localStorage.getItem(getScheduleKey(weekStart));
    return saved ? JSON.parse(saved) : {};
  } catch { return {}; }
};

const saveSchedule = (weekStart, schedule) => {
  try { localStorage.setItem(getScheduleKey(weekStart), JSON.stringify(schedule)); } catch {}
};

const PRESET_SHIFTS = [
  { label: '9:30a - 5:30p', start: '9:30 AM', end: '5:30 PM' },
  { label: '9:30a - 6:30p', start: '9:30 AM', end: '6:30 PM' },
  { label: '10a - 6p',      start: '10:00 AM', end: '6:00 PM' },
  { label: '10a - 6:30p',   start: '10:00 AM', end: '6:30 PM' },
];

const ShiftModal = ({ day, employee, existing, onSave, onDelete, onClose }) => {
  const [start, setStart] = useState(existing?.start || "9:00 AM");
  const [end, setEnd] = useState(existing?.end || "5:00 PM");
  const [notes, setNotes] = useState(existing?.notes || "");

  const timeOptions = [];
  for (let h = 6; h <= 22; h++) {
    for (let m of [0, 30]) {
      const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
      const ampm = h < 12 ? "AM" : "PM";
      const label = `${hour}:${m === 0 ? "00" : "30"} ${ampm}`;
      timeOptions.push(label);
    }
  }

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.7)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={onClose}>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24, width: 340, maxWidth: "90vw" }}
        onClick={e => e.stopPropagation()}>
        <div style={{ fontWeight: 800, fontSize: 16, color: C.text, marginBottom: 4 }}>{employee.name}</div>
        <div style={{ color: C.textMuted, fontSize: 13, marginBottom: 20 }}>{formatDay(day)}</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div>
            <div style={{ color: C.textMuted, fontSize: 11, marginBottom: 4 }}>Start Time</div>
            <select value={start} onChange={e => setStart(e.target.value)}
              style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 10px", color: C.text, fontSize: 13, outline: "none" }}>
              {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <div style={{ color: C.textMuted, fontSize: 11, marginBottom: 4 }}>End Time</div>
            <select value={end} onChange={e => setEnd(e.target.value)}
              style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 10px", color: C.text, fontSize: 13, outline: "none" }}>
              {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ color: C.textMuted, fontSize: 11, marginBottom: 4 }}>Notes (optional)</div>
          <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any notes for this shift…"
            style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", color: C.text, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => onSave({ start, end, notes })}
            style={{ flex: 1, background: employee.color, color: "#fff", border: "none", borderRadius: 8, padding: "10px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
            Save Shift
          </button>
          {existing && (
            <button onClick={onDelete}
              style={{ background: C.redDim, color: C.red, border: `1px solid ${C.red}44`, borderRadius: 8, padding: "10px 14px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
              Delete
            </button>
          )}
          <button onClick={onClose}
            style={{ background: C.surface, color: C.textMuted, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", cursor: "pointer", fontSize: 13 }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const generateICS = (shifts, employeeName) => {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CPR Hub//Schedule//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  shifts.forEach(shift => {
    const dateStr = shift.date.replace(/-/g, '');
    const startTime = shift.start.replace(/:/g, '').replace(' ', '').padStart(6, '0');
    const endTime = shift.end.replace(/:/g, '').replace(' ', '').padStart(6, '0');

    // Convert 12hr to 24hr
    const to24 = (timeStr) => {
      const [time, period] = timeStr.split(' ');
      let [h, m] = time.split(':').map(Number);
      if (period === 'PM' && h !== 12) h += 12;
      if (period === 'AM' && h === 12) h = 0;
      return `${String(h).padStart(2,'0')}${String(m).padStart(2,'0')}00`;
    };

    const dtStart = `${dateStr}T${to24(shift.start)}`;
    const dtEnd = `${dateStr}T${to24(shift.end)}`;
    const uid = `${dateStr}-${employeeName.replace(/ /g,'')}@cprhub`;

    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${uid}`);
    lines.push(`DTSTART;TZID=America/Chicago:${dtStart}`);
    lines.push(`DTEND;TZID=America/Chicago:${dtEnd}`);
    lines.push(`SUMMARY:Work - CPR Cell Phone Repair`);
    lines.push(`DESCRIPTION:${shift.start} - ${shift.end}${shift.notes ? ' | ' + shift.notes : ''}`);
    lines.push('LOCATION:CPR Cell Phone Repair - Springfield MO');
    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');
  return lines.join('
');
};

const downloadICS = (icsContent, filename) => {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const ScheduleView = ({ currentUser }) => {
  const canEdit = currentUser?.role === "Owner";
  const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date()));
  const [schedule, setSchedule] = useState(() => loadSchedule(getWeekStart(new Date())));
  const [modal, setModal] = useState(null); // { day, employee }
  const [published, setPublished] = useState(false);
  const [copiedShift, setCopiedShift] = useState(null); // { shift, empId, date }
  const [draggedShift, setDraggedShift] = useState(null); // { shift, empId, date }

  const days = getWeekDays(weekStart);
  const today = formatDate(new Date());

  // Load from shared Google Sheet on mount (for employees on other devices)
  const [loadedFromSheet, setLoadedFromSheet] = useState(false);
  if (!loadedFromSheet) {
    setLoadedFromSheet(true);
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SCHEDULE_WRITE_SHEET_ID}/values/Sheet1!A:F?key=${SHEETS_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        const rows = data.values || [];
        if (rows.length < 2) return;
        // Build schedule from sheet data
        const sheetSchedule = {};
        rows.slice(1).forEach(row => {
          const [empId, , date, start, end, notes] = row;
          if (empId && date && start) {
            sheetSchedule[`${empId}_${date}`] = { start, end: end || "", notes: notes || "" };
          }
        });
        if (Object.keys(sheetSchedule).length > 0) {
          // Save to localStorage for each week
          const weeks = {};
          Object.keys(sheetSchedule).forEach(key => {
            const date = key.split("_")[1];
            if (date) {
              const ws = formatDate(getWeekStart(new Date(date + "T12:00:00")));
              if (!weeks[ws]) weeks[ws] = {};
              weeks[ws][key] = sheetSchedule[key];
            }
          });
          Object.entries(weeks).forEach(([ws, s]) => {
            saveSchedule(new Date(ws), s);
          });
          // Update current view
          const currentWeekSchedule = sheetSchedule;
          const filtered = {};
          Object.entries(currentWeekSchedule).forEach(([k, v]) => {
            const date = k.split("_")[1];
            if (date && days.some(d => formatDate(d) === date)) {
              filtered[k] = v;
            }
          });
          if (Object.keys(filtered).length > 0) setSchedule(filtered);
        }
      })
      .catch(() => {});
  }

  const updateSchedule = (newSchedule) => {
    setSchedule(newSchedule);
    saveSchedule(weekStart, newSchedule);
  };

  const getShift = (empId, date) => schedule[`${empId}_${date}`] || null;

  const saveShift = (empId, date, shift) => {
    updateSchedule({ ...schedule, [`${empId}_${date}`]: shift });
    setModal(null);
  };

  const deleteShift = (empId, date) => {
    const next = { ...schedule };
    delete next[`${empId}_${date}`];
    updateSchedule(next);
    setModal(null);
  };

  const changeWeek = (dir) => {
    const next = new Date(weekStart);
    next.setDate(next.getDate() + dir * 7);
    setWeekStart(next);
    const nextSchedule = loadSchedule(next);
    // If next week is empty and we're going forward, copy current week
    if (dir === 1 && Object.keys(nextSchedule).length === 0) {
      const currentSchedule = loadSchedule(weekStart);
      if (Object.keys(currentSchedule).length > 0) {
        // Remap dates: shift each key's date forward by 7 days
        const copied = {};
        Object.entries(currentSchedule).forEach(([key, shift]) => {
          const [empId, date] = key.split("_");
          const oldDate = new Date(date);
          oldDate.setDate(oldDate.getDate() + 7);
          const newDate = oldDate.toISOString().split("T")[0];
          copied[`${empId}_${newDate}`] = { ...shift };
        });
        saveSchedule(next, copied);
        setSchedule(copied);
        setPublished(false);
        return;
      }
    }
    setSchedule(nextSchedule);
    setPublished(false);
  };

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailBody, setEmailBody] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [copied, setCopied] = useState(false);

  const buildEmailContent = () => {
    const weekLabel = `${formatDay(days[0])} - ${formatDay(days[6])}`;
    let body = `Work Schedule: ${weekLabel}\n\n`;
    SCHEDULE_EMPLOYEES.forEach(emp => {
      const empShifts = days.filter(d => getShift(emp.id, formatDate(d)));
      if (empShifts.length === 0) return;
      body += `${emp.name}:\n`;
      empShifts.forEach(d => {
        const shift = getShift(emp.id, formatDate(d));
        body += `  ${formatDay(d)}: ${shift.start} - ${shift.end}`;
        if (shift.notes) body += ` (${shift.notes})`;
        body += "\n";
      });
      body += "\n";
    });
    return { body, subject: `Work Schedule: ${weekLabel}` };
  };

  const publishAndEmail = async () => {
    const { body, subject } = buildEmailContent();
    setEmailBody(body);
    setEmailSubject(subject);

    // Sync schedule to Google Sheets for all devices
    try {
      const rows = [["empId", "empName", "date", "start", "end", "notes"]];
      SCHEDULE_EMPLOYEES.forEach(emp => {
        days.forEach(d => {
          const dateStr = formatDate(d);
          const shift = schedule[`${emp.id}_${dateStr}`];
          if (shift) {
            rows.push([emp.id, emp.name, dateStr, shift.start, shift.end, shift.notes || ""]);
          }
        });
      });
      // Also add next 4 weeks of schedule data
      await fetch(SCHEDULE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ rows }),
        mode: "no-cors",
      });
    } catch (e) {
      console.error("Schedule sync error:", e);
    }

    setShowEmailModal(true);
    setPublished(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(emailBody).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const openGmail = () => {
    const emails = SCHEDULE_EMPLOYEES.map(e => e.email).filter(Boolean).join(",");
    // Open Gmail compose — body is copied to clipboard first since URL body has length limits
    navigator.clipboard.writeText(emailBody).catch(() => {});
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emails)}&su=${encodeURIComponent(emailSubject)}`;
    window.open(gmailUrl, "_blank");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const openMailto = () => {
    const emails = SCHEDULE_EMPLOYEES.map(e => e.email).filter(Boolean).join(",");
    window.open(`mailto:${emails}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`);
  };

  // Update TodaySchedule data in localStorage so dashboard can read it
  const todayShifts = SCHEDULE_EMPLOYEES.flatMap(emp => {
    const shift = getShift(emp.id, today);
    if (!shift) return [];
    return [{ firstName: emp.name.split(" ")[0], lastName: emp.name.split(" ")[1] || "", startTime: shift.start, endTime: shift.end, hours: "", notes: shift.notes, date: today, color: emp.color }];
  });
  try { localStorage.setItem("cpr_today_shifts", JSON.stringify(todayShifts)); } catch {}

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>Schedule</h2>
        <div style={{ color: C.textMuted, fontSize: 13 }}>
          {formatDay(days[0])} — {formatDay(days[6])}
        </div>
      </div>

      {/* Week navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <button onClick={() => changeWeek(-1)}
          style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 16px", color: C.textDim, cursor: "pointer", fontSize: 13 }}>
          ← Prev Week
        </button>
        <button onClick={() => { setWeekStart(getWeekStart(new Date())); setSchedule(loadSchedule(getWeekStart(new Date()))); }}
          style={{ background: C.accentDim, color: C.accent, border: `1px solid ${C.accent}44`, borderRadius: 8, padding: "8px 16px", fontWeight: 600, cursor: "pointer", fontSize: 13 }}>
          This Week
        </button>
        <button onClick={() => changeWeek(1)}
          style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 16px", color: C.textDim, cursor: "pointer", fontSize: 13 }}>
          Next Week →
        </button>
      </div>

      {/* Schedule grid */}
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
          <thead>
            <tr>
              <th style={{ padding: "8px 12px", textAlign: "left", color: C.textMuted, fontSize: 12, fontWeight: 600, borderBottom: `1px solid ${C.border}`, minWidth: 120 }}>Employee</th>
              {days.map((d, i) => {
                const isToday = formatDate(d) === today;
                return (
                  <th key={i} style={{ padding: "8px 10px", textAlign: "center", color: isToday ? C.accent : C.textMuted, fontSize: 12, fontWeight: isToday ? 800 : 600, borderBottom: `1px solid ${C.border}`, background: isToday ? C.accentDim : "transparent", minWidth: 100 }}>
                    {d.toLocaleDateString("en-US", { weekday: "short" })}<br />
                    <span style={{ fontSize: 11 }}>{d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {SCHEDULE_EMPLOYEES.map(emp => (
              <tr key={emp.id}>
                <td style={{ padding: "8px 12px", borderBottom: `1px solid ${C.border}22` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: emp.color, flexShrink: 0 }} />
                    <span style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>{emp.name.split(" ")[0]}</span>
                  </div>
                </td>
                {days.map((d, i) => {
                  const dateStr = formatDate(d);
                  const shift = getShift(emp.id, dateStr);
                  const isToday = dateStr === today;
                  return (
                    <td key={i} style={{ padding: "6px", borderBottom: `1px solid ${C.border}22`, background: isToday ? C.accentDim + "44" : "transparent", textAlign: "center" }}>
                      {shift ? (
                        <div
                          draggable={canEdit}
                          onDragStart={() => setDraggedShift({ shift, empId: emp.id, date: dateStr })}
                          onDragEnd={() => setDraggedShift(null)}
                          onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }}
                          onDrop={e => {
                            e.preventDefault();
                            if (draggedShift) {
                              const ds = draggedShift;
                              setDraggedShift(null);
                              setTimeout(() => {
                                const next = { ...loadSchedule(weekStart) };
                                next[`${emp.id}_${dateStr}`] = { ...ds.shift };
                                if (!ds.isPreset && ds.empId && ds.date && !(ds.empId === emp.id && ds.date === dateStr)) {
                                  delete next[`${ds.empId}_${ds.date}`];
                                }
                                saveSchedule(weekStart, next);
                                setSchedule({ ...next });
                              }, 0);
                            }
                          }}
                          onClick={() => {
                            if (!canEdit) return;
                            if (copiedShift) {
                              // Paste copied shift here
                              saveShift(emp.id, dateStr, { ...copiedShift.shift });
                              setCopiedShift(null);
                            } else {
                              setModal({ day: d, employee: emp });
                            }
                          }}
                          onContextMenu={e => {
                            e.preventDefault();
                            if (canEdit) setCopiedShift({ shift, empId: emp.id, date: dateStr });
                          }}
                          style={{
                            background: copiedShift?.empId === emp.id && copiedShift?.date === dateStr ? emp.color + "44" : emp.color + "22",
                            border: `1px solid ${emp.color}${copiedShift?.empId === emp.id && copiedShift?.date === dateStr ? "ff" : "66"}`,
                            borderRadius: 6, padding: "4px 6px",
                            cursor: canEdit ? (copiedShift ? "copy" : "grab") : "default",
                            opacity: draggedShift?.empId === emp.id && draggedShift?.date === dateStr ? 0.4 : 1,
                          }}>
                          <div style={{ color: emp.color, fontSize: 11, fontWeight: 700 }}>{shift.start}</div>
                          <div style={{ color: emp.color, fontSize: 11 }}>{shift.end}</div>
                          <div style={{ display: "flex", gap: 3, marginTop: 2 }}>
                            {shift.notes && <span style={{ fontSize: 9 }}>📝</span>}
                            {canEdit && <span style={{ fontSize: 9, color: C.textMuted }}>⠿</span>}
                          </div>
                        </div>
                      ) : (
                        canEdit && (
                          <div
                            onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }}
                            onDrop={e => {
                              e.preventDefault();
                              if (draggedShift) {
                                const ds = draggedShift;
                                setDraggedShift(null);
                                setTimeout(() => {
                                  const next = { ...loadSchedule(weekStart) };
                                  next[`${emp.id}_${dateStr}`] = { ...ds.shift };
                                  // Only delete source if not a preset
                                  if (!ds.isPreset && ds.empId && ds.date) {
                                    delete next[`${ds.empId}_${ds.date}`];
                                  }
                                  saveSchedule(weekStart, next);
                                  setSchedule({ ...next });
                                }, 0);
                              }
                            }}
                            onClick={() => {
                              if (copiedShift) {
                                // Paste copied shift
                                saveShift(emp.id, dateStr, { ...copiedShift.shift });
                                setCopiedShift(null);
                              } else {
                                setModal({ day: d, employee: emp });
                              }
                            }}
                            style={{
                              border: `1px dashed ${copiedShift || draggedShift ? emp.color : C.border}`,
                              borderRadius: 6, padding: "8px 4px",
                              cursor: copiedShift || draggedShift ? "copy" : "pointer",
                              color: copiedShift || draggedShift ? emp.color : C.textMuted,
                              fontSize: 18,
                              background: copiedShift || draggedShift ? emp.color + "11" : "transparent",
                            }}
                            onMouseEnter={e => { if (!copiedShift && !draggedShift) e.currentTarget.style.borderColor = emp.color; }}
                            onMouseLeave={e => { if (!copiedShift && !draggedShift) e.currentTarget.style.borderColor = C.border; }}>
                            {copiedShift || draggedShift ? "📋" : "+"}
                          </div>
                        )
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Preset Shifts */}
      {canEdit && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ color: '#6B7280', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>
            ⚡ Preset Shifts — drag or click to copy
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {PRESET_SHIFTS.map((preset, i) => (
              <div key={i}
                draggable
                onDragStart={() => setDraggedShift({ shift: { start: preset.start, end: preset.end, notes: '' }, empId: null, date: null, isPreset: true })}
                onDragEnd={() => setDraggedShift(null)}
                onClick={() => setCopiedShift({ shift: { start: preset.start, end: preset.end, notes: '' }, isPreset: true })}
                style={{ background: '#FF4D1C22', border: '1px solid #FF4D1C44', borderRadius: 8, padding: '7px 14px', cursor: 'grab', fontSize: 12, fontWeight: 700, color: '#FF4D1C', userSelect: 'none' }}
                onMouseEnter={e => e.currentTarget.style.background = '#FF4D1C33'}
                onMouseLeave={e => e.currentTarget.style.background = '#FF4D1C22'}>
                {preset.label}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Copy mode banner */}
      {copiedShift && (
        <div style={{ background: C.tealDim, border: `1px solid ${C.teal}44`, borderRadius: 10, padding: "10px 16px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: C.teal, fontSize: 13, fontWeight: 600 }}>
            📋 Shift copied — click any empty cell to paste
          </span>
          <button onClick={() => setCopiedShift(null)}
            style={{ background: "transparent", border: "none", color: C.teal, cursor: "pointer", fontWeight: 700, fontSize: 13 }}>
            ✕ Cancel
          </button>
        </div>
      )}

      {/* Instructions */}
      {canEdit && !copiedShift && !draggedShift && (
        <div style={{ color: C.textMuted, fontSize: 11, marginBottom: 12 }}>
          💡 <strong>Drag</strong> a shift to move it · <strong>Right-click</strong> a shift to copy it · Click an empty cell to paste
        </div>
      )}

      {/* Calendar download buttons - always visible */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <button onClick={() => {
          const emp = SCHEDULE_EMPLOYEES.find(e => e.name === currentUser?.name);
          const myShifts = emp ? days.flatMap(d => {
            const dateStr = formatDate(d);
            const shift = schedule[`${emp.id}_${dateStr}`];
            return shift ? [{ date: dateStr, ...shift }] : [];
          }) : [];
          if (myShifts.length === 0) { alert("No shifts found for your name this week. Make sure your name in CPR Hub matches the schedule."); return; }
          const ics = generateICS(myShifts, currentUser?.name || "My");
          downloadICS(ics, `CPR_My_Schedule_${formatDate(days[0])}.ics`);
        }}
          style={{ background: C.teal, color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
          📅 Add My Shifts to Calendar
        </button>
        {canEdit && (
          <button onClick={() => {
            const allShifts = SCHEDULE_EMPLOYEES.flatMap(emp =>
              days.flatMap(d => {
                const dateStr = formatDate(d);
                const shift = schedule[`${emp.id}_${dateStr}`];
                return shift ? [{ date: dateStr, ...shift }] : [];
              })
            );
            if (allShifts.length === 0) { alert("No shifts scheduled this week yet."); return; }
            const ics = generateICS(allShifts, "All Staff");
            downloadICS(ics, `CPR_Full_Schedule_${formatDate(days[0])}.ics`);
          }}
            style={{ background: C.blue, color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
            📅 Download Full Schedule (.ics)
          </button>
        )}
      </div>

      {/* Publish button */}
      {canEdit && (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={publishAndEmail}
            style={{ background: C.teal, color: "#fff", border: "none", borderRadius: 8, padding: "10px 22px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
            📧 Publish & Email Staff
          </button>
          {published && <span style={{ color: C.green, fontSize: 13, alignSelf: "center", fontWeight: 600 }}>✓ Schedule ready!</span>}
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.7)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={() => setShowEmailModal(false)}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24, width: 500, maxWidth: "90vw", maxHeight: "80vh", display: "flex", flexDirection: "column" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 800, fontSize: 16, color: C.text, marginBottom: 4 }}>📧 Email Schedule</div>
            <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 16 }}>Click the button to copy the schedule, then paste it (Ctrl+V) into any email or message app.</div>

            {/* Copy button */}
            <div style={{ marginBottom: 16 }}>
              <button onClick={copyToClipboard}
                style={{ width: "100%", background: copied ? C.greenDim : C.accent, color: copied ? C.green : "#fff", border: `1px solid ${copied ? C.green : C.accent}`, borderRadius: 8, padding: "12px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                {copied ? "✓ Copied! Paste into your email (Ctrl+V)" : "📋 Copy Schedule to Clipboard"}
              </button>
            </div>

            {/* Preview */}
            <div style={{ color: C.textMuted, fontSize: 11, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.8 }}>Preview</div>
            <textarea readOnly value={emailBody}
              style={{ flex: 1, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px", color: C.text, fontSize: 12, outline: "none", resize: "none", minHeight: 200, fontFamily: "monospace", lineHeight: 1.6 }} />

            <button onClick={() => setShowEmailModal(false)}
              style={{ marginTop: 12, background: C.surface, color: C.textMuted, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px", cursor: "pointer", fontSize: 13 }}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Shift modal */}
      {modal && (
        <ShiftModal
          day={modal.day}
          employee={modal.employee}
          existing={getShift(modal.employee.id, formatDate(modal.day))}
          onSave={(shift) => saveShift(modal.employee.id, formatDate(modal.day), shift)}
          onDelete={() => deleteShift(modal.employee.id, formatDate(modal.day))}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
};

const LINK_CATEGORIES = [
  {
    name: "Parts",
    color: "#FF4D1C",
    icon: "🔧",
    links: [
      { name: "MobileSentrix", url: "https://www.cpr.parts" },
      { name: "PLP", url: "https://www.phonelcdparts.com" },
      { name: "iFixit", url: "https://www.ifixit.com" },
      { name: "Injured Gadgets", url: "https://www.injuredgadgets.com" },
      { name: "Laptop Screens", url: "https://www.laptopscreen.com/English/" },
      { name: "Digikey", url: "https://www.digikey.com" },
      { name: "eBay", url: "https://www.ebay.com" },
      { name: "Amazon", url: "https://www.amazon.com" },
    ]
  },
  {
    name: "Accessories",
    color: "#00C9A7",
    icon: "🎒",
    links: [
      { name: "Voicecomm / CPR Accessories", url: "https://www.cpraccessories.com/login.php?statusset=normal" },
      { name: "ZAGG B2B", url: "https://b2b.zagg.com/login.php" },
      { name: "Rokform Dealer", url: "https://dealer.rokform.com/" },
      { name: "eBay", url: "https://www.ebay.com" },
      { name: "Amazon", url: "https://www.amazon.com" },
    ]
  },
  {
    name: "Phone Buying",
    color: "#FFB547",
    icon: "📱",
    links: [
      { name: "Atlas", url: "https://docs.google.com/spreadsheets/d/1pu4Adxq4MGB6Qour0k__4gBdgnggWRoSVYnJUKgxzEw" },
      { name: "Hyla", url: "https://hylaasp.hylamobile.com/grading-scale/#mobile-devices-and-tablets" },
      { name: "Digicircle", url: "https://www.digicircle.com/index.php" },
      { name: "Sickw", url: "https://sickw.com" },
      { name: "eBay", url: "https://www.ebay.com" },
      { name: "T-Mobile BYOD", url: "https://www.t-mobile.com/resources/bring-your-own-phone" },
      { name: "Verizon BYOD", url: "https://www.verizon.com/bring-your-own-device/test" },
      { name: "AT&T BYOD", url: "https://www.att.com/buy/byod/identify?devicetype=phone" },
      { name: "EcoATM", url: "https://www.ecoatm.com/pages/sell" },
    ]
  },
  {
    name: "HR & Admin",
    color: "#3B82F6",
    icon: "👥",
    links: [
      { name: "Clock In", url: "https://secure8.yourpayrollhr.com/ta/200371.login" },
      { name: "When I Work", url: "https://app.wheniwork.com" },
      { name: "CPR Support / Creatio", url: "https://cpr.creatio.com" },
      { name: "Knowledge Hub", url: "https://franchiseeconnects.sharepoint.com/" },
      { name: "Email / Outlook", url: "https://m365.cloud.microsoft/chat?auth=2&origindomain=Office" },
    ]
  },
  {
    name: "Claims",
    color: "#22C55E",
    icon: "📋",
    links: [
      { name: "T-Mobile Claims", url: "https://mytmoclaim.com/" },
      { name: "Xfinity Mobile", url: "https://fastclaims.com/xfinitymobile" },
      { name: "Spectrum Mobile", url: "https://fastclaims.com/spectrummobile" },
      { name: "Device Care", url: "https://devicecarenow.com/cpr" },
      { name: "Akko", url: "https://partner.akko.app/claims/device-info" },
    ]
  },
];

const LinkCard = ({ link, color }) => (
  <a href={link.url} target="_blank" rel="noopener noreferrer"
    style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, textDecoration: "none", transition: "all .15s" }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.background = color + "11"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bg; }}>
    <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
    <span style={{ color: C.text, fontSize: 13, fontWeight: 500 }}>{link.name}</span>
    <span style={{ color: C.textMuted, fontSize: 11, marginLeft: "auto" }}>↗</span>
  </a>
);

const QuickLinksView = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const cats = ["All", ...LINK_CATEGORIES.map(c => c.name)];
  const displayed = activeCategory === "All" ? LINK_CATEGORIES : LINK_CATEGORIES.filter(c => c.name === activeCategory);

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>Quick Links</h2>
        <div style={{ color: C.textMuted, fontSize: 13 }}>All your commonly used sites in one place</div>
      </div>

      {/* Category filter */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActiveCategory(c)}
            style={{ background: activeCategory === c ? C.accent : C.surface, color: activeCategory === c ? "#fff" : C.textDim, border: `1px solid ${activeCategory === c ? C.accent : C.border}`, borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            {c}
          </button>
        ))}
      </div>

      {/* Link categories */}
      <div style={{ display: "grid", gap: 20 }}>
        {displayed.map(cat => (
          <Card key={cat.name}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 18 }}>{cat.icon}</span>
              <span style={{ fontWeight: 700, fontSize: 15, color: cat.color }}>{cat.name}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
              {cat.links.map(link => (
                <LinkCard key={link.name} link={link} color={cat.color} />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ── SALES LEADERBOARD ────────────────────────────────────────────────────
const LeaderboardView = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [month, setMonth] = useState("");
  const [tab, setTab] = useState("sales");
  const [mounted, setMounted] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SALES_SHEET_ID}/values/Sheet1!A:F?key=${SHEETS_API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const rows = json.values || [];
      if (rows.length < 2) { setData([]); setLoading(false); return; }
      const parsed = rows.slice(1).map(row => ({
        name:         row[0] || "",
        firstName:    row[0] ? (row[0].includes(", ") ? row[0].split(", ")[1] : row[0].split(" ")[0]) : "",
        totalSales:   parseFloat(row[1]) || 0,
        repairUnits:  parseInt(row[2]) || 0,
        accessorySales: parseFloat(row[3]) || 0,
        deviceSales:  parseFloat(row[4]) || 0,
        month:        row[5] || "",
      })).filter(r => r.name);
      setData(parsed);
      if (parsed.length > 0) setMonth(parsed[0].month);
    } catch(e) { setError(e.message); }
    setLoading(false);
  };

  if (!mounted) { setMounted(true); fetchData(); }

  const tabs = [
    { id: "sales",     label: "Total Sales",     key: "totalSales",     format: v => `$${v.toLocaleString()}`,  color: "#00C9A7" },
    { id: "repairs",   label: "Repair Units",    key: "repairUnits",    format: v => v + " units",              color: "#FF4D1C" },
    { id: "accessory", label: "Accessory Sales", key: "accessorySales", format: v => `$${v.toLocaleString()}`,  color: "#FFB547" },
    { id: "devices",   label: "Device Sales",    key: "deviceSales",    format: v => `$${v.toLocaleString()}`,  color: "#3B82F6" },
  ];

  const activeTab = tabs.find(t => t.id === tab);
  const sorted = [...data].sort((a, b) => b[activeTab.key] - a[activeTab.key]);
  const max = sorted.length > 0 ? sorted[0][activeTab.key] : 1;

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#E8EAED", margin: "0 0 4px" }}>Sales Leaderboard</h2>
        <div style={{ color: "#6B7280", fontSize: 13 }}>
          {month} · Updated from RepairQ
          <button onClick={fetchData} style={{ background: "transparent", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 16, marginLeft: 8 }}>↻</button>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ background: tab === t.id ? t.color + "22" : "#181C27", color: tab === t.id ? t.color : "#9CA3AF", border: `1px solid ${tab === t.id ? t.color + "66" : "#252A3A"}`, borderRadius: 8, padding: "7px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            {t.label}
          </button>
        ))}
      </div>

      {loading && <div style={{ textAlign: "center", padding: "40px", color: "#6B7280" }}>⏳ Loading leaderboard...</div>}
      {error && <div style={{ color: "#EF4444", padding: 16 }}>{error}</div>}

      {!loading && !error && (
        <div style={{ display: "grid", gap: 10 }}>
          {sorted.map((emp, i) => {
            const val = emp[activeTab.key];
            const pct = max > 0 ? (val / max) * 100 : 0;
            const firstName = emp.name.split(", ")[1] || emp.name.split(" ")[0];
            const lastName = emp.name.split(", ")[0] || "";
            return (
              <div key={i} style={{ background: "#181C27", border: `1px solid ${i === 0 ? activeTab.color + "44" : "#252A3A"}`, borderRadius: 12, padding: "14px 18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{medals[i] || `#${i+1}`}</span>
                    <div>
                      <div style={{ color: "#E8EAED", fontWeight: 700, fontSize: 15 }}>{firstName} {lastName}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: activeTab.color, fontWeight: 800, fontSize: 18 }}>{activeTab.format(val)}</div>
                  </div>
                </div>
                <div style={{ background: "#252A3A", borderRadius: 4, height: 6, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, background: activeTab.color, height: "100%", borderRadius: 4, transition: "width .5s" }} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ marginTop: 20, color: "#6B7280", fontSize: 12, textAlign: "center" }}>
        Update by exporting from RepairQ → pasting into the CPR Sales Data Google Sheet
      </div>
    </div>
  );
};

// ── VIEWS MAP ─────────────────────────────────────────────────────────────
const VIEWS = {
  dashboard: DashboardView,
  pricing: PricingView,
  buyphones: BuyPhonesView,
  sop: SOPView,
  repairs: RepairsView,
  tasks: TasksView,
  pos: POSView,
  crm: CRMView,
  orders: SpecialOrdersView,
  schedule: ScheduleView,
  links: QuickLinksView,
  leaderboard: LeaderboardView,
  settings: SettingsView,
};

// ── QUICK LINKS ──────────────────────────────────────────────────────────
// ── LOGIN SCREEN ─────────────────────────────────────────────────────────
const LoginScreen = ({ onLogin }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleEmployeeSelect = (emp) => {
    setSelectedEmployee(emp);
    setPin("");
    setError("");
  };

  const handlePinPress = (digit) => {
    if (pin.length >= 4) return;
    const newPin = pin + digit;
    setPin(newPin);
    if (newPin.length === 4) {
      const correctPin = getPin(selectedEmployee);
      if (newPin === correctPin) {
        onLogin(selectedEmployee);
      } else {
        setError("Incorrect PIN. Try again.");
        setTimeout(() => { setPin(""); setError(""); }, 1000);
      }
    }
  };

  const handleClear = () => { setPin(""); setError(""); };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <div style={{ width: 56, height: 56, background: C.accent, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
          <Icon d={Icons.phone} size={28} stroke="#fff" />
        </div>
        <div style={{ fontSize: 24, fontWeight: 800, color: C.text }}>CPR Hub</div>
        <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>Select your name to sign in</div>
      </div>

      {!selectedEmployee ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%", maxWidth: 400 }}>
          {EMPLOYEES.map(emp => (
            <div key={emp.id} onClick={() => handleEmployeeSelect(emp)}
              style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 14px", cursor: "pointer", textAlign: "center" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.background = C.surfaceHover; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.surface; }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.accentDim, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                <span style={{ color: C.accent, fontWeight: 800, fontSize: 16 }}>{emp.name.charAt(0)}</span>
              </div>
              <div style={{ color: C.text, fontWeight: 600, fontSize: 13 }}>{emp.name}</div>
              <div style={{ color: C.textMuted, fontSize: 11, marginTop: 2 }}>{emp.role}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ width: "100%", maxWidth: 300, textAlign: "center" }}>
          <div onClick={() => setSelectedEmployee(null)} style={{ color: C.textMuted, fontSize: 13, cursor: "pointer", marginBottom: 20 }}>← Back</div>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.accentDim, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
            <span style={{ color: C.accent, fontWeight: 800, fontSize: 24 }}>{selectedEmployee.name.charAt(0)}</span>
          </div>
          <div style={{ color: C.text, fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{selectedEmployee.name}</div>
          <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 24 }}>{selectedEmployee.role}</div>

          {/* PIN dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 8 }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{ width: 16, height: 16, borderRadius: "50%", background: pin.length > i ? C.accent : C.border, transition: "background .15s" }} />
            ))}
          </div>
          {error && <div style={{ color: C.red, fontSize: 12, marginBottom: 8 }}>{error}</div>}
          {!error && <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 24 }}>Enter your PIN</div>}

          {/* PIN pad */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 10 }}>
            {["1","2","3","4","5","6","7","8","9"].map(d => (
              <button key={d} onClick={() => handlePinPress(d)}
                style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px", fontSize: 20, fontWeight: 700, color: C.text, cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.background = C.surfaceHover}
                onMouseLeave={e => e.currentTarget.style.background = C.surface}>
                {d}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            <button onClick={handleClear}
              style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px", fontSize: 13, fontWeight: 600, color: C.textMuted, cursor: "pointer" }}>
              Clear
            </button>
            <button onClick={() => handlePinPress("0")}
              style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px", fontSize: 20, fontWeight: 700, color: C.text, cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = C.surfaceHover}
              onMouseLeave={e => e.currentTarget.style.background = C.surface}>
              0
            </button>
            <button onClick={() => setPin(p => p.slice(0,-1))}
              style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px", fontSize: 13, fontWeight: 600, color: C.textMuted, cursor: "pointer" }}>
              ⌫
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ── ROOT APP ──────────────────────────────────────────────────────────────
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const ViewComponent = VIEWS[view] || DashboardView;

  const handleLogin = (employee) => {
    setCurrentUser(employee);
    setView("dashboard");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView("dashboard");
  };

  if (!currentUser) return <LoginScreen onLogin={handleLogin} />;

  const allowedNav = NAV.filter(n => ROLE_ACCESS[currentUser.role]?.includes(n.id));
  // Make sure current view is allowed, else reset
  if (!ROLE_ACCESS[currentUser.role]?.includes(view)) {
    setView("dashboard");
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: C.bg, fontFamily: "'Inter', -apple-system, sans-serif", color: C.text, overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{ width: sidebarOpen ? 220 : 60, background: C.surface, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", transition: "width .2s", flexShrink: 0, overflow: "hidden" }}>
        {/* Logo */}
        <div style={{ padding: "18px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: C.accent, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon d={Icons.phone} size={16} stroke="#fff" fill="none" />
          </div>
          {sidebarOpen && <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.text, letterSpacing: -0.3 }}>CPR Hub</div>
            <div style={{ fontSize: 10, color: C.textMuted }}>Operations Center</div>
          </div>}
        </div>
        {/* Nav */}
        <nav style={{ flex: 1, padding: "10px 8px", overflowY: "auto" }}>
          {allowedNav.map(n => {
            const active = view === n.id;
            return (
              <div key={n.id} onClick={() => setView(n.id)}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 8, marginBottom: 2, cursor: "pointer", background: active ? C.accentDim : "transparent", color: active ? C.accent : C.textDim, transition: "all .12s" }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = C.surfaceHover; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}>
                <Icon d={Icons[n.icon]} size={16} stroke={active ? C.accent : C.textDim} />
                {sidebarOpen && <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, whiteSpace: "nowrap" }}>{n.label}</span>}
              </div>
            );
          })}
        </nav>
        {/* Bottom */}
        <div style={{ padding: "10px 8px", borderTop: `1px solid ${C.border}` }}>
          {currentUser.role === "Owner" && (
            <div onClick={() => setView("settings")}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 8, cursor: "pointer", color: C.textDim }}
              onMouseEnter={e => e.currentTarget.style.background = C.surfaceHover}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <Icon d={Icons.settings} size={16} stroke={C.textDim} />
              {sidebarOpen && <span style={{ fontSize: 13 }}>Settings</span>}
            </div>
          )}
          <button onClick={() => setSidebarOpen(o => !o)}
            style={{ width: "100%", marginTop: 4, background: "transparent", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 11, padding: "6px", borderRadius: 6, textAlign: "center" }}>
            {sidebarOpen ? "← Collapse" : "→"}
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: C.textMuted, fontSize: 13 }}>
            {NAV.find(n => n.id === view)?.label || "Settings"}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ position: "relative" }}>
              <Icon d={Icons.bell} size={18} stroke={C.textMuted} />
              <div style={{ position: "absolute", top: -2, right: -2, width: 7, height: 7, background: C.accent, borderRadius: "50%" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ background: C.accentDim, borderRadius: 8, padding: "4px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: C.accent, fontWeight: 700, fontSize: 13 }}>{currentUser.name}</span>
                <span style={{ color: C.textMuted, fontSize: 11 }}>{currentUser.role}</span>
              </div>
              <button onClick={handleLogout}
                style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "5px 12px", color: C.textMuted, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <Icon d={Icons.logout} size={13} stroke={C.textMuted} />
                {sidebarOpen && "Sign Out"}
              </button>
            </div>
          </div>
        </div>
        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          <ViewComponent setView={setView} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
}
