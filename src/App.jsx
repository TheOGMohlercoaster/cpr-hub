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
  "Owner":      ["dashboard","pricing","buyphones","sop","sales","repairs","tasks","pos","crm","settings"],
  "Tech/Sales": ["dashboard","pricing","buyphones","sop","sales","repairs","tasks"],
  "Tech":       ["dashboard","sop","repairs","tasks"],
  "Sales":      ["dashboard","buyphones","sop","sales","tasks"],
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
const TASKS = [
  { id: 1, text: "Open store & count drawer", assignee: "All", done: true, priority: "high" },
  { id: 2, text: "Check RepairQ for overnight claims", assignee: "Manager", done: true, priority: "high" },
  { id: 3, text: "Restock screen protector display", assignee: "Sales", done: false, priority: "med" },
  { id: 4, text: "Follow up on 3 pending repairs", assignee: "Techs", done: false, priority: "high" },
  { id: 5, text: "Post daily promo on Facebook", assignee: "Manager", done: false, priority: "med" },
  { id: 6, text: "MobileSentrix order — check backorders", assignee: "Manager", done: false, priority: "low" },
  { id: 7, text: "Clean workbench stations", assignee: "Techs", done: false, priority: "low" },
];
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
    id: 14,
    title: "Technician End of Day SOP",
    category: "Repair",
    updated: "Jul 9",
    content: `TECHNICIAN END OF DAY SOP
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
TECHNICIAN END OF DAY CHECKLIST
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

Each technician is responsible for leaving their workstation clean, organized, and fully prepared for the next business day. A clean bench, accurate repair documentation, and an organized repair queue are essential to maintaining efficiency and delivering an exceptional customer experience.`
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
  { id: "sales", label: "Daily Sales", icon: "sales" },
  { id: "repairs", label: "Tech Repairs", icon: "repairs" },
  { id: "tasks", label: "Daily Tasks", icon: "tasks" },
  { id: "pos", label: "RepairQ / POS", icon: "pos" },
  { id: "crm", label: "Creatio CRM", icon: "crm" },
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
const DashboardView = ({ setView }) => {
  const totalSales = TODAY_SALES.reduce((a, e) => a + e.sales, 0);
  const totalRepairs = REPAIR_TOTALS.reduce((a, e) => a + e.completed, 0);
  const tasksLeft = TASKS.filter(t => !t.done).length;
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ color: C.textMuted, fontSize: 13, marginBottom: 4 }}>Friday, June 12, 2026</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: C.text, margin: 0 }}>Good morning, CPR Team 👋</h1>
      </div>
      {/* Stat row */}
      <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
        <StatCard label="Today's Sales" value={`$${totalSales.toLocaleString()}`} sub="3 reps active" color={C.teal} icon="sales" />
        <StatCard label="Repairs Done" value={totalRepairs} sub="Today" color={C.accent} icon="repairs" />
        <StatCard label="Tasks Pending" value={tasksLeft} sub={`${TASKS.length - tasksLeft} complete`} color={C.gold} icon="tasks" />
        <StatCard label="Open Claims" value="4" sub="RepairQ" color={C.blue} icon="pos" />
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
      {/* Top tech + top sales */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, flexWrap: "wrap" }}>
        <Card>
          <div style={{ fontWeight: 700, marginBottom: 14, color: C.text }}>Top Tech Today</div>
          {REPAIR_TOTALS.sort((a, b) => b.completed - a.completed).map((t, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < REPAIR_TOTALS.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <span style={{ color: C.textDim, fontSize: 13 }}>{t.name}</span>
              <span style={{ color: C.teal, fontWeight: 700 }}>{t.completed} repairs</span>
            </div>
          ))}
        </Card>
        <Card>
          <div style={{ fontWeight: 700, marginBottom: 14, color: C.text }}>Top Sales Today</div>
          {TODAY_SALES.sort((a, b) => b.sales - a.sales).map((s, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < TODAY_SALES.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <span style={{ color: C.textDim, fontSize: 13 }}>{s.name}</span>
              <span style={{ color: C.gold, fontWeight: 700 }}>${s.sales.toLocaleString()}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

// ── REPAIR PRICING ────────────────────────────────────────────────────────
const PricingView = () => {
  const [parts, setParts] = useState(REPAIR_PARTS);
  const [markup, setMarkup] = useState(55);
  const [search, setSearch] = useState("");
  const filtered = parts.filter(p => p.part.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>Repair Pricing</h2>
        <div style={{ color: C.textMuted, fontSize: 13 }}>MobileSentrix supplier cost + your markup</div>
      </div>
      <IntegrationBanner name="MobileSentrix" description="Connect your API key in Settings to pull live pricing automatically." />
      <div style={{ display: "flex", gap: 12, marginBottom: 18, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Icon d={Icons.search} size={14} stroke={C.textMuted} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search parts…"
            style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 12px 9px 32px", color: C.text, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 14px" }}>
          <span style={{ color: C.textMuted, fontSize: 13 }}>Default markup</span>
          <input type="number" value={markup} onChange={e => setMarkup(+e.target.value)} style={{ width: 50, background: "transparent", border: "none", color: C.accent, fontWeight: 700, fontSize: 14, outline: "none", textAlign: "center" }} />
          <span style={{ color: C.textMuted, fontSize: 13 }}>%</span>
        </div>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ color: C.textMuted, textAlign: "left" }}>
              {["Part / Service", "Supplier Cost", "Your Price", "Margin %", ""].map((h, i) => (
                <th key={i} style={{ padding: "8px 12px", borderBottom: `1px solid ${C.border}`, fontWeight: 600, letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => {
              const price = +(p.supplier * (1 + markup / 100)).toFixed(2);
              return (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}11` }}
                  onMouseEnter={e => e.currentTarget.style.background = C.surfaceHover}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "12px 12px", color: C.text, fontWeight: 500 }}>{p.part}</td>
                  <td style={{ padding: "12px 12px", color: C.textDim }}>${p.supplier.toFixed(2)}</td>
                  <td style={{ padding: "12px 12px", color: C.teal, fontWeight: 700 }}>${price.toFixed(2)}</td>
                  <td style={{ padding: "12px 12px" }}><Tag color={markup >= 80 ? C.green : C.gold}>{markup}%</Tag></td>
                  <td style={{ padding: "12px 12px" }}>
                    <button style={{ background: C.accentDim, color: C.accent, border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>Edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
        <button style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>+ Add Part</button>
        <button style={{ background: C.surface, color: C.textDim, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 18px", fontWeight: 600, cursor: "pointer", fontSize: 13 }}>Import CSV</button>
      </div>
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

// ── DAILY SALES ───────────────────────────────────────────────────────────
const SalesView = () => {
  const totalSales = TODAY_SALES.reduce((a, e) => a + e.sales, 0);
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>Daily Sales</h2>
        <div style={{ color: C.textMuted, fontSize: 13 }}>Today's performance by rep</div>
      </div>
      <IntegrationBanner name="RepairQ" description="Connect your API key to pull sales data automatically from your POS." />
      <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
        <StatCard label="Store Total" value={`$${totalSales.toLocaleString()}`} color={C.teal} icon="sales" />
        <StatCard label="Transactions" value={TODAY_SALES.reduce((a, e) => a + e.transactions, 0)} color={C.accent} />
        <StatCard label="Avg per Rep" value={`$${Math.round(totalSales / TODAY_SALES.length).toLocaleString()}`} color={C.gold} />
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        {TODAY_SALES.sort((a, b) => b.sales - a.sales).map((s, i) => {
          const pct = Math.min((s.sales / s.target) * 100, 100);
          return (
            <Card key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <div>
                  <div style={{ color: C.text, fontWeight: 700, fontSize: 15 }}>{s.name}</div>
                  <div style={{ color: C.textMuted, fontSize: 12 }}>{s.role} · {s.transactions} transactions</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: C.teal, fontWeight: 800, fontSize: 20 }}>${s.sales.toLocaleString()}</div>
                  <div style={{ color: C.textMuted, fontSize: 12 }}>Target: ${s.target.toLocaleString()}</div>
                </div>
              </div>
              <div style={{ background: C.border, borderRadius: 4, height: 6, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, background: pct >= 100 ? C.green : C.teal, height: "100%", borderRadius: 4, transition: "width .5s" }} />
              </div>
              <div style={{ color: C.textMuted, fontSize: 11, marginTop: 4 }}>{Math.round(pct)}% of daily target</div>
            </Card>
          );
        })}
      </div>
      <div style={{ marginTop: 16 }}>
        <button style={{ background: C.surface, color: C.textDim, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 18px", fontWeight: 600, cursor: "pointer", fontSize: 13 }}>+ Log Manual Entry</button>
      </div>
    </div>
  );
};

// ── TECH REPAIRS ──────────────────────────────────────────────────────────
const RepairsView = () => (
  <div>
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>Tech Repairs</h2>
      <div style={{ color: C.textMuted, fontSize: 13 }}>Repair totals by technician — today</div>
    </div>
    <IntegrationBanner name="RepairQ" description="Connect to pull live repair ticket data per technician automatically." />
    <div style={{ display: "grid", gap: 12 }}>
      {REPAIR_TOTALS.sort((a, b) => b.completed - a.completed).map((t, i) => (
        <Card key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ color: C.text, fontWeight: 700, fontSize: 15 }}>{t.name}</div>
              <div style={{ color: C.textMuted, fontSize: 12 }}>{t.role}</div>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: C.teal, fontWeight: 800, fontSize: 20 }}>{t.completed}</div>
                <div style={{ color: C.textMuted, fontSize: 11 }}>Done</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: C.gold, fontWeight: 800, fontSize: 20 }}>{t.pending}</div>
                <div style={{ color: C.textMuted, fontSize: 11 }}>Pending</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: C.green, fontWeight: 800, fontSize: 20 }}>${t.revenue}</div>
                <div style={{ color: C.textMuted, fontSize: 11 }}>Revenue</div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

// ── DAILY TASKS ───────────────────────────────────────────────────────────
const TasksView = () => {
  const [tasks, setTasks] = useState(TASKS);
  const [newTask, setNewTask] = useState("");
  const toggle = id => setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const add = () => {
    if (!newTask.trim()) return;
    setTasks(ts => [...ts, { id: Date.now(), text: newTask, assignee: "All", done: false, priority: "med" }]);
    setNewTask("");
  };
  const priColor = { high: C.accent, med: C.gold, low: C.textMuted };
  const open = tasks.filter(t => !t.done);
  const done = tasks.filter(t => t.done);
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>Daily Tasks</h2>
        <div style={{ color: C.textMuted, fontSize: 13 }}>{open.length} remaining · {done.length} complete</div>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === "Enter" && add()} placeholder="Add a task…"
          style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 12px", color: C.text, fontSize: 14, outline: "none" }} />
        <button onClick={add} style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 700, cursor: "pointer" }}>Add</button>
      </div>
      <div style={{ marginBottom: 12, color: C.textMuted, fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Open</div>
      {open.map(t => (
        <div key={t.id} onClick={() => toggle(t.id)}
          style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 8, cursor: "pointer" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = C.accent}
          onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
          <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${priColor[t.priority]}`, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ color: C.text, fontSize: 14 }}>{t.text}</div>
            <div style={{ color: C.textMuted, fontSize: 11 }}>{t.assignee}</div>
          </div>
          <Tag color={priColor[t.priority]}>{t.priority}</Tag>
        </div>
      ))}
      {done.length > 0 && <>
        <div style={{ margin: "20px 0 12px", color: C.textMuted, fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Completed</div>
        {done.map(t => (
          <div key={t.id} onClick={() => toggle(t.id)}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 8, cursor: "pointer", opacity: 0.55 }}>
            <div style={{ width: 20, height: 20, borderRadius: 6, background: C.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon d={Icons.check} size={12} stroke="#fff" />
            </div>
            <div style={{ flex: 1, color: C.textMuted, fontSize: 14, textDecoration: "line-through" }}>{t.text}</div>
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

// ── SETTINGS ──────────────────────────────────────────────────────────────
const SettingsView = () => {
  const integrations = [
    { name: "MobileSentrix", desc: "Parts pricing API", status: "disconnected", color: C.accent },
    { name: "Atlas (Phone Buying)", desc: "Scraper for used phone prices", status: "disconnected", color: C.gold },
    { name: "RepairQ", desc: "POS — tickets, claims, sales", status: "disconnected", color: C.teal },
    { name: "Creatio CRM", desc: "Leads and conversions", status: "disconnected", color: C.blue },
  ];
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>Settings</h2>
        <div style={{ color: C.textMuted, fontSize: 13 }}>Integrations, store info, user roles</div>
      </div>
      <div style={{ marginBottom: 8, color: C.textMuted, fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Integrations</div>
      <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
        {integrations.map((int, i) => (
          <Card key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: int.status === "connected" ? C.green : C.border }} />
              <div>
                <div style={{ color: C.text, fontWeight: 600 }}>{int.name}</div>
                <div style={{ color: C.textMuted, fontSize: 12 }}>{int.desc}</div>
              </div>
            </div>
            <button style={{ background: int.color + "22", color: int.color, border: `1px solid ${int.color}44`, borderRadius: 8, padding: "6px 16px", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>Connect</button>
          </Card>
        ))}
      </div>
      <div style={{ marginBottom: 8, color: C.textMuted, fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Store Info</div>
      <Card>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {[["Store Name", "CPR Cell Phones"], ["Owner", "Your Name"], ["Location", "Your City, State"], ["RepairQ Account", "—"]].map(([l, v], i) => (
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

// ── VIEWS MAP ─────────────────────────────────────────────────────────────
const VIEWS = {
  dashboard: DashboardView,
  pricing: PricingView,
  buyphones: BuyPhonesView,
  sop: SOPView,
  sales: SalesView,
  repairs: RepairsView,
  tasks: TasksView,
  pos: POSView,
  crm: CRMView,
  settings: SettingsView,
};

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
      if (newPin === selectedEmployee.pin) {
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
