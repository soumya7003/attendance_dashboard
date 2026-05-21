import { useState, useEffect, useRef, useCallback } from "react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const STUDENTS = [
  { id: 1, roll: "CS001", name: "Arjun Sharma", email: "arjun@school.edu", dept: "Computer Science", cardUID: "A1B2C3D4", enrolled: true },
  { id: 2, roll: "CS002", name: "Priya Nair", email: "priya@school.edu", dept: "Computer Science", cardUID: "B2C3D4E5", enrolled: true },
  { id: 3, roll: "EC001", name: "Rohan Das", email: "rohan@school.edu", dept: "Electronics", cardUID: "C3D4E5F6", enrolled: true },
  { id: 4, roll: "ME001", name: "Sneha Patel", email: "sneha@school.edu", dept: "Mechanical", cardUID: "D4E5F6G7", enrolled: true },
  { id: 5, roll: "CS003", name: "Vikram Singh", email: "vikram@school.edu", dept: "Computer Science", cardUID: null, enrolled: false },
  { id: 6, roll: "EC002", name: "Ananya Roy", email: "ananya@school.edu", dept: "Electronics", cardUID: "E5F6G7H8", enrolled: true },
  { id: 7, roll: "ME002", name: "Karthik Menon", email: "karthik@school.edu", dept: "Mechanical", cardUID: "F6G7H8I9", enrolled: true },
  { id: 8, roll: "CS004", name: "Deepa Krishnan", email: "deepa@school.edu", dept: "Computer Science", cardUID: "G7H8I9J0", enrolled: true },
];

const COURSES = [
  { id: 1, code: "CS301", name: "Data Structures", dept: "Computer Science", enrolled: 32 },
  { id: 2, code: "CS401", name: "Machine Learning", dept: "Computer Science", enrolled: 28 },
  { id: 3, code: "EC201", name: "Circuit Theory", dept: "Electronics", enrolled: 35 },
  { id: 4, code: "ME301", name: "Thermodynamics", dept: "Mechanical", enrolled: 30 },
  { id: 5, code: "CS201", name: "Operating Systems", dept: "Computer Science", enrolled: 40 },
];

const SESSIONS = [
  { id: 1, course: "CS301", room: "Lab A", date: "2026-05-19", start: "09:00", end: "10:30", present: 28, total: 32 },
  { id: 2, course: "EC201", room: "Room 102", date: "2026-05-19", start: "11:00", end: "12:30", present: 31, total: 35 },
  { id: 3, course: "ME301", room: "Workshop 1", date: "2026-05-18", start: "14:00", end: "15:30", present: 25, total: 30 },
  { id: 4, course: "CS401", room: "Seminar Hall", date: "2026-05-18", start: "10:00", end: "11:30", present: 22, total: 28 },
  { id: 5, course: "CS201", room: "Lab B", date: "2026-05-17", start: "09:00", end: "10:30", present: 36, total: 40 },
];

const DEVICES = [
  { id: "DEV-001", room: "Lab A", status: "Online", lastSeen: "Just now" },
  { id: "DEV-002", room: "Room 102", status: "Online", lastSeen: "2 min ago" },
  { id: "DEV-003", room: "Workshop 1", status: "Offline", lastSeen: "3 hrs ago" },
  { id: "DEV-004", room: "Seminar Hall", status: "Online", lastSeen: "5 min ago" },
  { id: "DEV-005", room: "Lab B", status: "Online", lastSeen: "1 min ago" },
];

const INITIAL_LIVE = [
  { id: 1, roll: "CS001", name: "Arjun Sharma", status: "Present", time: "09:02" },
  { id: 2, roll: "CS002", name: "Priya Nair", status: "Present", time: "09:05" },
  { id: 3, roll: "EC001", name: "Rohan Das", status: "Late", time: "09:18" },
  { id: 4, roll: "ME001", name: "Sneha Patel", status: "Present", time: "09:07" },
];

const NAV_ITEMS = [
  { id: "live", label: "Live Monitor", icon: "M15 10l-4 4 1 1 5-5m-7 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4m0 9A9 9 0 1 1 12 3a9 9 0 0 1 0 18z" },
  { id: "reports", label: "Reports", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" },
  { id: "students", label: "Students", icon: "M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" },
  { id: "courses", label: "Courses", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { id: "sessions", label: "Sessions", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" },
  { id: "devices", label: "Devices", icon: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 0 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 0-2-2V9m0 0h18" },
  { id: "notifications", label: "Notifications", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" },
  { id: "settings", label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" },
];

// ─── ICONS ────────────────────────────────────────────────────────────────────
function Icon({ path, size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {path.split(" M").map((d, i) => (
        <path key={i} d={i === 0 ? d : "M" + d} />
      ))}
    </svg>
  );
}

// ─── GLASSMORPHIC STYLES ───────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #080E1C;
    --surface: rgba(255,255,255,0.045);
    --surface2: rgba(255,255,255,0.07);
    --border: rgba(255,255,255,0.09);
    --border2: rgba(255,255,255,0.14);
    --indigo: #6366F1;
    --indigo2: #818CF8;
    --cyan: #22D3EE;
    --green: #10B981;
    --amber: #F59E0B;
    --red: #EF4444;
    --t1: #F1F5F9;
    --t2: #94A3B8;
    --t3: #475569;
    --font: 'DM Sans', sans-serif;
  }
  html, body, #root { height: 100%; font-family: var(--font); background: var(--bg); color: var(--t1); }
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 2px; }
  .app { display: flex; height: 100vh; overflow: hidden; }
  
  /* Ambient glow */
  .glow-layer { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
  .glow1 { position: absolute; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%); top: -200px; left: -100px; }
  .glow2 { position: absolute; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%); bottom: -100px; right: 100px; }

  /* Sidebar */
  .sidebar { width: 240px; min-width: 240px; height: 100vh; display: flex; flex-direction: column; background: rgba(9,15,30,0.85); border-right: 1px solid var(--border); backdrop-filter: blur(20px); z-index: 10; position: relative; }
  .sidebar-logo { padding: 24px 20px 20px; display: flex; align-items: center; gap: 10px; }
  .logo-icon { width: 34px; height: 34px; border-radius: 10px; background: linear-gradient(135deg, #6366F1, #22D3EE); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .logo-text { font-size: 18px; font-weight: 700; background: linear-gradient(90deg, #fff, #94A3B8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .sidebar-nav { flex: 1; padding: 8px 12px; display: flex; flex-direction: column; gap: 2px; overflow-y: auto; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 10px; cursor: pointer; color: var(--t2); font-size: 14px; font-weight: 500; transition: all 0.15s; border: 1px solid transparent; }
  .nav-item:hover { background: var(--surface2); color: var(--t1); }
  .nav-item.active { background: rgba(99,102,241,0.15); color: #A5B4FC; border-color: rgba(99,102,241,0.25); }
  .nav-item.active svg { color: var(--indigo2); }
  .sidebar-footer { padding: 16px 16px 24px; border-top: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }
  .avatar { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #6366F1, #22D3EE); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: white; flex-shrink: 0; }
  .online-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); margin-left: auto; box-shadow: 0 0 6px var(--green); }
  
  /* Topbar */
  .topbar { height: 60px; display: flex; align-items: center; padding: 0 24px; gap: 12px; border-bottom: 1px solid var(--border); background: rgba(8,14,28,0.7); backdrop-filter: blur(12px); flex-shrink: 0; }
  .topbar-title { font-size: 17px; font-weight: 600; flex: 1; }
  .search-box { display: flex; align-items: center; gap: 8px; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 6px 12px; }
  .search-box input { background: none; border: none; outline: none; color: var(--t1); font-size: 13px; font-family: var(--font); width: 160px; }
  .search-box input::placeholder { color: var(--t3); }
  .live-chip { display: flex; align-items: center; gap: 6px; background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.25); border-radius: 20px; padding: 4px 10px; font-size: 12px; font-weight: 600; color: #FCA5A5; }
  .live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--red); animation: pulse 1.5s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
  .icon-btn { width: 36px; height: 36px; border-radius: 9px; background: var(--surface); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--t2); transition: all 0.15s; position: relative; }
  .icon-btn:hover { background: var(--surface2); color: var(--t1); }
  .badge { position: absolute; top: 4px; right: 4px; width: 16px; height: 16px; border-radius: 50%; background: var(--red); font-size: 9px; font-weight: 700; display: flex; align-items: center; justify-content: center; border: 2px solid var(--bg); }
  
  /* Main */
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; position: relative; z-index: 1; }
  .page { flex: 1; overflow-y: auto; padding: 24px 28px; }
  
  /* Cards */
  .glass-card { background: var(--surface); border: 1px solid var(--border); border-radius: 18px; backdrop-filter: blur(12px); }
  .glass-card:hover { border-color: var(--border2); }
  .card-p { padding: 20px 24px; }
  
  /* Stat Cards */
  .stat-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; margin-bottom: 22px; }
  .stat-card { padding: 20px; border-radius: 18px; border: 1px solid var(--border); background: var(--surface); display: flex; align-items: flex-start; gap: 14px; transition: transform 0.2s, box-shadow 0.2s; }
  .stat-card:hover { transform: translateY(-2px); }
  .stat-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .stat-icon.green { background: rgba(16,185,129,0.15); color: var(--green); }
  .stat-icon.amber { background: rgba(245,158,11,0.15); color: var(--amber); }
  .stat-icon.red { background: rgba(239,68,68,0.15); color: var(--red); }
  .stat-icon.indigo { background: rgba(99,102,241,0.15); color: var(--indigo2); }
  .stat-num { font-size: 34px; font-weight: 800; line-height: 1; letter-spacing: -0.03em; }
  .stat-label { font-size: 12px; font-weight: 500; color: var(--t2); text-transform: uppercase; letter-spacing: 0.06em; margin-top: 4px; }
  
  /* Tables */
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; }
  thead th { padding: 10px 14px; text-align: left; font-size: 11px; font-weight: 600; color: var(--t3); text-transform: uppercase; letter-spacing: 0.07em; border-bottom: 1px solid var(--border); white-space: nowrap; }
  tbody td { padding: 12px 14px; font-size: 13.5px; color: var(--t1); border-bottom: 1px solid rgba(255,255,255,0.04); }
  tbody tr:hover td { background: rgba(255,255,255,0.025); }
  tbody tr.new-row td { animation: rowFlash 1.5s ease-out; }
  @keyframes rowFlash { 0%{background:rgba(99,102,241,0.18)} 100%{background:transparent} }
  
  /* Badges */
  .badge-pill { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 20px; font-size: 11.5px; font-weight: 600; }
  .badge-pill.present { background: rgba(16,185,129,0.15); color: #6EE7B7; }
  .badge-pill.late { background: rgba(245,158,11,0.15); color: #FCD34D; }
  .badge-pill.absent { background: rgba(239,68,68,0.15); color: #FCA5A5; }
  .badge-pill.online { background: rgba(16,185,129,0.15); color: #6EE7B7; }
  .badge-pill.offline { background: rgba(239,68,68,0.15); color: #FCA5A5; }
  
  /* Buttons */
  .btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 10px; font-size: 13.5px; font-weight: 600; cursor: pointer; transition: all 0.15s; border: none; font-family: var(--font); }
  .btn-primary { background: var(--indigo); color: white; box-shadow: 0 4px 14px rgba(99,102,241,0.25); }
  .btn-primary:hover { background: #818CF8; }
  .btn-outline { background: var(--surface); border: 1px solid var(--border2); color: var(--t1); }
  .btn-outline:hover { background: var(--surface2); }
  .btn-danger { background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.25); color: #FCA5A5; }
  .btn-danger:hover { background: rgba(239,68,68,0.25); }
  .btn-sm { padding: 5px 11px; font-size: 12.5px; }
  
  /* Inputs */
  .input { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 9px 13px; color: var(--t1); font-size: 13.5px; font-family: var(--font); outline: none; transition: border 0.15s; width: 100%; }
  .input:focus { border-color: rgba(99,102,241,0.5); box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
  .input::placeholder { color: var(--t3); }
  label.lbl { display: block; font-size: 12.5px; font-weight: 500; color: var(--t2); margin-bottom: 5px; }
  .field { display: flex; flex-direction: column; gap: 0; margin-bottom: 14px; }
  
  /* Modal */
  .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.65); backdrop-filter: blur(4px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn 0.15s; }
  .modal { background: rgba(11,17,35,0.98); border: 1px solid var(--border2); border-radius: 22px; padding: 28px; width: 100%; max-width: 460px; animation: scaleIn 0.2s; }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes scaleIn { from{opacity:0;transform:scale(0.95) translateY(8px)} to{opacity:1;transform:scale(1) translateY(0)} }
  .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; }
  .modal-title { font-size: 17px; font-weight: 700; }
  
  /* Filter Bar */
  .filter-bar { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 18px; align-items: center; }
  
  /* Section header */
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .section-title { font-size: 22px; font-weight: 700; }
  .section-sub { font-size: 13.5px; color: var(--t2); margin-top: 2px; }
  
  /* Donut chart */
  .donut-wrap { position: relative; display: inline-block; }
  .donut-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; pointer-events: none; }
  
  /* Progress bar */
  .progress-bar { height: 6px; border-radius: 3px; background: rgba(255,255,255,0.08); overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 3px; transition: width 0.4s; }
  
  /* Toast */
  .toast-container { position: fixed; bottom: 24px; right: 24px; z-index: 200; display: flex; flex-direction: column; gap: 10px; }
  .toast { background: rgba(11,17,35,0.98); border: 1px solid var(--border2); border-radius: 12px; padding: 12px 16px; min-width: 280px; display: flex; align-items: center; gap: 10px; font-size: 13.5px; animation: slideIn 0.3s; box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
  @keyframes slideIn { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
  .toast.success { border-color: rgba(16,185,129,0.3); }
  .toast.error { border-color: rgba(239,68,68,0.3); }
  
  /* Page fade */
  .page-enter { animation: pageFade 0.2s; }
  @keyframes pageFade { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
  
  /* Scrollbar row dots */
  .roll { font-size: 12px; font-weight: 600; color: var(--indigo2); font-family: monospace; }
  
  /* Gradient text */
  .grad-text { background: linear-gradient(90deg, #818CF8, #22D3EE); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  
  /* Empty state */
  .empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px 24px; gap: 12px; color: var(--t2); }
  .empty-icon { width: 52px; height: 52px; border-radius: 14px; background: var(--surface2); display: flex; align-items: center; justify-content: center; color: var(--t3); margin-bottom: 6px; }

  /* Notification item */
  .notif-item { display: flex; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--border); }
  .notif-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  
  /* Reports chart legend */
  .legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
  
  @media(max-width:900px) {
    .stat-grid { grid-template-columns: repeat(2,1fr); }
    .sidebar { width: 60px; min-width: 60px; }
    .sidebar-logo .logo-text, .sidebar-footer .footer-info, .nav-item span { display: none; }
    .nav-item { justify-content: center; padding: 10px; }
  }
`;

// ─── TOAST SYSTEM ─────────────────────────────────────────────────────────────
function useToast() {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3000);
  }, []);
  return { toasts, add };
}

function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: t.type === "success" ? "var(--green)" : "var(--red)", flexShrink: 0 }} />
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}

// ─── DONUT CHART ──────────────────────────────────────────────────────────────
function DonutChart({ present, late, absent, total }) {
  const r = 68; const cx = 80; const cy = 80;
  const circ = 2 * Math.PI * r;
  const pPct = total > 0 ? present / total : 0;
  const lPct = total > 0 ? late / total : 0;
  const aPct = total > 0 ? absent / total : 0;
  const pLen = pPct * circ; const lLen = lPct * circ; const aLen = aPct * circ;
  const lOffset = circ - pLen;
  const aOffset = circ - pLen - lLen;
  return (
    <div className="donut-wrap" style={{ width: 160, height: 160 }}>
      <svg width="160" height="160" viewBox="0 0 160 160">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" />
        {pLen > 0 && <circle cx={cx} cy={cy} r={r} fill="none" stroke="#10B981" strokeWidth="14" strokeDasharray={`${pLen} ${circ}`} strokeDashoffset={circ / 4} strokeLinecap="round" transform="rotate(-90 80 80)" />}
        {lLen > 0 && <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F59E0B" strokeWidth="14" strokeDasharray={`${lLen} ${circ}`} strokeDashoffset={circ / 4 - pLen} strokeLinecap="round" transform="rotate(-90 80 80)" style={{ opacity: 0.9 }} />}
        {aLen > 0 && <circle cx={cx} cy={cy} r={r} fill="none" stroke="#EF4444" strokeWidth="14" strokeDasharray={`${aLen} ${circ}`} strokeDashoffset={circ / 4 - pLen - lLen} strokeLinecap="round" transform="rotate(-90 80 80)" style={{ opacity: 0.85 }} />}
      </svg>
      <div className="donut-center">
        <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em" }}>{total > 0 ? Math.round((present + late) / total * 100) : 0}%</span>
        <span style={{ fontSize: 10, color: "var(--t2)", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.06em" }}>Attend.</span>
      </div>
    </div>
  );
}

// ─── PAGES ────────────────────────────────────────────────────────────────────

// Live Monitor
function LiveMonitor({ toast }) {
  const [rows, setRows] = useState(INITIAL_LIVE);
  const [newRowId, setNewRowId] = useState(null);
  const present = rows.filter(r => r.status === "Present").length;
  const late = rows.filter(r => r.status === "Late").length;
  const absent = 8 - rows.length;
  const enrolled = 8;

  const simulateTap = () => {
    const unmapped = STUDENTS.filter(s => !rows.find(r => r.roll === s.roll));
    if (unmapped.length === 0) { toast("All students have tapped in!", "success"); return; }
    const s = unmapped[Math.floor(Math.random() * unmapped.length)];
    const now = new Date();
    const status = now.getMinutes() > 20 ? "Late" : "Present";
    const newRow = { id: Date.now(), roll: s.roll, name: s.name, status, time: `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}` };
    setRows(p => [newRow, ...p]);
    setNewRowId(newRow.id);
    toast(`${s.name} tapped in — ${status}`, status === "Present" ? "success" : "error");
    setTimeout(() => setNewRowId(null), 2000);
  };

  return (
    <div className="page-enter">
      <div className="section-header">
        <div>
          <h1 className="section-title">Live Monitor</h1>
          <p className="section-sub">CS301 · Data Structures · Lab A · Mon 19 May</p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div className="live-chip"><div className="live-dot" />LIVE</div>
          <button className="btn btn-outline btn-sm" onClick={simulateTap}>⚡ Simulate Tap</button>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-icon green"><Icon path="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" size={22} /></div>
          <div><div className="stat-num">{present}</div><div className="stat-label">Present</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon amber"><Icon path="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" size={22} /></div>
          <div><div className="stat-num">{late}</div><div className="stat-label">Late</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red"><Icon path="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" size={22} /></div>
          <div><div className="stat-num">{absent}</div><div className="stat-label">Absent</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon indigo"><Icon path="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" size={22} /></div>
          <div><div className="stat-num">{enrolled}</div><div className="stat-label">Enrolled</div></div>
        </div>
      </div>

      <div className="glass-card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Roll</th><th>Name</th><th>Status</th><th>Time</th></tr></thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id} className={r.id === newRowId ? "new-row" : ""}>
                  <td><span className="roll">{r.roll}</span></td>
                  <td style={{ fontWeight: 500 }}>{r.name}</td>
                  <td><span className={`badge-pill ${r.status.toLowerCase()}`}>{r.status}</span></td>
                  <td style={{ color: "var(--t2)", fontFamily: "monospace", fontSize: 13 }}>{r.time}</td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={4}><div className="empty-state"><div className="empty-icon"><Icon path="M15 10l-4 4 1 1 5-5m-7 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4m0 9A9 9 0 1 1 12 3a9 9 0 0 1 0 18z" size={26} /></div><p style={{ fontWeight: 600 }}>Waiting for taps...</p><p style={{ fontSize: 13, color: "var(--t3)" }}>Students haven't tapped in yet</p></div></td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Reports
function Reports() {
  const present = 156; const late = 28; const absent = 42; const total = 226;
  const data = [
    { roll: "CS001", name: "Arjun Sharma", course: "CS301", total: 30, present: 28, late: 1, absent: 1 },
    { roll: "CS002", name: "Priya Nair", course: "CS301", total: 30, present: 25, late: 3, absent: 2 },
    { roll: "EC001", name: "Rohan Das", course: "EC201", total: 28, present: 20, late: 4, absent: 4 },
    { roll: "ME001", name: "Sneha Patel", course: "ME301", total: 25, present: 24, late: 1, absent: 0 },
    { roll: "EC002", name: "Ananya Roy", course: "EC201", total: 28, present: 18, late: 2, absent: 8 },
  ];
  return (
    <div className="page-enter">
      <div className="section-header">
        <div><h1 className="section-title">Reports</h1><p className="section-sub">Attendance analytics across all courses</p></div>
        <button className="btn btn-outline btn-sm"><Icon path="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" size={15} />Export PDF</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 22 }}>
        <div className="glass-card card-p">
          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--t2)", marginBottom: 16 }}>Attendance Distribution</p>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <DonutChart present={present} late={late} absent={absent} total={total} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
              {[{ label: "Present", val: present, color: "var(--green)" }, { label: "Late", val: late, color: "var(--amber)" }, { label: "Absent", val: absent, color: "var(--red)" }].map(item => (
                <div key={item.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}><div className="legend-dot" style={{ background: item.color }} /><span style={{ fontSize: 13 }}>{item.label}</span></div>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{item.val}</span>
                  </div>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: `${(item.val / total) * 100}%`, background: item.color }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="glass-card card-p">
          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--t2)", marginBottom: 16 }}>Overview</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[{ label: "Total Records", val: total, color: "#818CF8" }, { label: "Avg Attendance", val: "82%", color: "#22D3EE" }, { label: "Sessions", val: 5, color: "#6EE7B7" }, { label: "Students", val: STUDENTS.length, color: "#FCD34D" }].map(s => (
              <div key={s.label} style={{ background: "var(--surface2)", borderRadius: 12, padding: "14px 16px" }}>
                <p style={{ fontSize: 22, fontWeight: 800, color: s.color, letterSpacing: "-0.03em" }}>{s.val}</p>
                <p style={{ fontSize: 12, color: "var(--t2)", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Roll</th><th>Name</th><th>Course</th><th>Total</th><th>Present</th><th>Late</th><th>Absent</th><th>%</th></tr></thead>
            <tbody>
              {data.map(r => {
                const pct = Math.round((r.present + r.late) / r.total * 100);
                return (
                  <tr key={r.roll}>
                    <td><span className="roll">{r.roll}</span></td>
                    <td style={{ fontWeight: 500 }}>{r.name}</td>
                    <td style={{ color: "var(--t2)", fontSize: 13 }}>{r.course}</td>
                    <td>{r.total}</td>
                    <td style={{ color: "var(--green)" }}>{r.present}</td>
                    <td style={{ color: "var(--amber)" }}>{r.late}</td>
                    <td style={{ color: "var(--red)" }}>{r.absent}</td>
                    <td><span style={{ fontWeight: 700, color: pct >= 75 ? "var(--green)" : pct >= 60 ? "var(--amber)" : "var(--red)" }}>{pct}%</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Students
function Students({ toast }) {
  const [students, setStudents] = useState(STUDENTS);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ roll: "", name: "", email: "", dept: "Computer Science", cardUID: "" });

  const depts = ["All", "Computer Science", "Electronics", "Mechanical"];
  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "All" || s.dept === deptFilter;
    return matchSearch && matchDept;
  });

  const openAdd = () => { setEditing(null); setForm({ roll: "", name: "", email: "", dept: "Computer Science", cardUID: "" }); setShowModal(true); };
  const openEdit = (s) => { setEditing(s.id); setForm({ roll: s.roll, name: s.name, email: s.email, dept: s.dept, cardUID: s.cardUID || "" }); setShowModal(true); };
  const save = () => {
    if (editing) {
      setStudents(p => p.map(s => s.id === editing ? { ...s, ...form } : s));
      toast("Student updated successfully");
    } else {
      setStudents(p => [...p, { ...form, id: Date.now(), enrolled: true }]);
      toast("Student added successfully");
    }
    setShowModal(false);
  };
  const del = (id) => { setStudents(p => p.filter(s => s.id !== id)); toast("Student removed", "error"); };

  return (
    <div className="page-enter">
      <div className="section-header">
        <div><h1 className="section-title">Students</h1><p className="section-sub">{students.length} students registered</p></div>
        <button className="btn btn-primary" onClick={openAdd}><Icon path="M12 4v16m8-8H4" size={15} />Add Student</button>
      </div>

      <div className="filter-bar">
        <input className="input" style={{ width: 220 }} placeholder="Search by name or roll..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="input" style={{ width: 180 }} value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
          {depts.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <div className="glass-card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Roll</th><th>Name</th><th>Email</th><th>Department</th><th>Card UID</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td><span className="roll">{s.roll}</span></td>
                  <td style={{ fontWeight: 500 }}>{s.name}</td>
                  <td style={{ color: "var(--t2)", fontSize: 13 }}>{s.email}</td>
                  <td><span style={{ background: "rgba(99,102,241,0.12)", color: "#A5B4FC", padding: "2px 9px", borderRadius: 6, fontSize: 12, fontWeight: 500 }}>{s.dept}</span></td>
                  <td><span style={{ fontFamily: "monospace", fontSize: 12.5, color: s.cardUID ? "var(--cyan)" : "var(--t3)" }}>{s.cardUID || "— unassigned"}</span></td>
                  <td style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn-outline btn-sm" onClick={() => openEdit(s)}><Icon path="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586z" size={13} /></button>
                    <button className="btn btn-danger btn-sm" onClick={() => del(s.id)}><Icon path="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16" size={13} /></button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={6}><div className="empty-state"><div className="empty-icon"><Icon path="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" size={26} /></div><p style={{ fontWeight: 600 }}>No students match this filter</p></div></td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">{editing ? "Edit Student" : "Add Student"}</h2>
              <button className="icon-btn" onClick={() => setShowModal(false)}><Icon path="M6 18L18 6M6 6l12 12" size={18} /></button>
            </div>
            {["name", "email", "dept", "cardUID", "roll"].map(f => (
              <div className="field" key={f}>
                <label className="lbl">{f === "cardUID" ? "Card UID" : f === "dept" ? "Department" : f.charAt(0).toUpperCase() + f.slice(1)}</label>
                {f === "dept" ? (
                  <select className="input" value={form[f]} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))}>
                    {["Computer Science", "Electronics", "Mechanical"].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                ) : (
                  <input className="input" value={form[f]} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))} placeholder={f === "cardUID" ? "e.g. A1B2C3D4" : ""} />
                )}
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>{editing ? "Save Changes" : "Add Student"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Courses
function Courses({ toast }) {
  const [courses, setCourses] = useState(COURSES);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ code: "", name: "", dept: "Computer Science" });
  const save = () => { setCourses(p => [...p, { ...form, id: Date.now(), enrolled: 0 }]); toast("Course created"); setShowModal(false); };

  return (
    <div className="page-enter">
      <div className="section-header">
        <div><h1 className="section-title">Courses</h1><p className="section-sub">{courses.length} courses across all departments</p></div>
        <button className="btn btn-primary" onClick={() => { setForm({ code: "", name: "", dept: "Computer Science" }); setShowModal(true); }}><Icon path="M12 4v16m8-8H4" size={15} />Add Course</button>
      </div>
      <div className="glass-card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Code</th><th>Name</th><th>Department</th><th>Enrolled</th></tr></thead>
            <tbody>
              {courses.map(c => (
                <tr key={c.id}>
                  <td><span className="roll">{c.code}</span></td>
                  <td style={{ fontWeight: 500 }}>{c.name}</td>
                  <td style={{ color: "var(--t2)" }}>{c.dept}</td>
                  <td><span style={{ background: "rgba(34,211,238,0.1)", color: "var(--cyan)", padding: "3px 10px", borderRadius: 6, fontSize: 12.5, fontWeight: 600 }}>{c.enrolled} students</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div className="overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header"><h2 className="modal-title">Add Course</h2><button className="icon-btn" onClick={() => setShowModal(false)}><Icon path="M6 18L18 6M6 6l12 12" size={18} /></button></div>
            {[["code", "Course Code"], ["name", "Course Name"]].map(([f, l]) => (
              <div className="field" key={f}><label className="lbl">{l}</label><input className="input" value={form[f]} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))} /></div>
            ))}
            <div className="field"><label className="lbl">Department</label>
              <select className="input" value={form.dept} onChange={e => setForm(p => ({ ...p, dept: e.target.value }))}>
                {["Computer Science", "Electronics", "Mechanical"].map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>Create Course</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Sessions
function Sessions({ toast }) {
  const [sessions, setSessions] = useState(SESSIONS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ course: "CS301", room: "Lab A", date: "2026-05-20", start: "09:00", end: "10:30" });
  const save = () => { setSessions(p => [{ ...form, id: Date.now(), present: 0, total: 32 }, ...p]); toast("Session created"); setShowModal(false); };

  return (
    <div className="page-enter">
      <div className="section-header">
        <div><h1 className="section-title">Sessions</h1><p className="section-sub">{sessions.length} sessions recorded</p></div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}><Icon path="M12 4v16m8-8H4" size={15} />New Session</button>
      </div>
      <div className="glass-card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Date</th><th>Course</th><th>Room</th><th>Time</th><th>Attendance</th></tr></thead>
            <tbody>
              {sessions.map(s => (
                <tr key={s.id}>
                  <td style={{ fontFamily: "monospace", fontSize: 13 }}>{s.date}</td>
                  <td><span className="roll">{s.course}</span></td>
                  <td style={{ color: "var(--t2)" }}>{s.room}</td>
                  <td style={{ color: "var(--t2)", fontSize: 13 }}>{s.start} – {s.end}</td>
                  <td><span style={{ fontWeight: 700, color: Math.round(s.present / s.total * 100) >= 75 ? "var(--green)" : "var(--amber)" }}>{s.present}/{s.total}</span><span style={{ color: "var(--t3)", fontSize: 12, marginLeft: 5 }}>({Math.round(s.present / s.total * 100)}%)</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div className="overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header"><h2 className="modal-title">Create Session</h2><button className="icon-btn" onClick={() => setShowModal(false)}><Icon path="M6 18L18 6M6 6l12 12" size={18} /></button></div>
            <div className="field"><label className="lbl">Course</label>
              <select className="input" value={form.course} onChange={e => setForm(p => ({ ...p, course: e.target.value }))}>
                {COURSES.map(c => <option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}
              </select>
            </div>
            {[["room", "Room", "Lab A"], ["date", "Date", "2026-05-20", "date"], ["start", "Start Time", "09:00", "time"], ["end", "End Time", "10:30", "time"]].map(([f, l, ph, type = "text"]) => (
              <div className="field" key={f}><label className="lbl">{l}</label><input type={type} className="input" value={form[f]} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))} placeholder={ph} /></div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>Create Session</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Devices
function Devices() {
  return (
    <div className="page-enter">
      <div className="section-header">
        <div><h1 className="section-title">Devices</h1><p className="section-sub">{DEVICES.filter(d => d.status === "Online").length} of {DEVICES.length} devices online</p></div>
      </div>
      <div className="glass-card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Device ID</th><th>Room</th><th>Status</th><th>Last Seen</th></tr></thead>
            <tbody>
              {DEVICES.map(d => (
                <tr key={d.id}>
                  <td><span className="roll">{d.id}</span></td>
                  <td style={{ fontWeight: 500 }}>{d.room}</td>
                  <td><span className={`badge-pill ${d.status.toLowerCase()}`}>{d.status === "Online" ? "● " : "○ "}{d.status}</span></td>
                  <td style={{ color: "var(--t2)", fontSize: 13 }}>{d.lastSeen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Notifications
function NotificationsPage() {
  const notifs = [
    { id: 1, title: "New tap recorded", msg: "Arjun Sharma tapped in at 09:02 AM", time: "Just now", type: "present" },
    { id: 2, title: "Late arrival", msg: "Rohan Das marked Late for CS301", time: "12 min ago", type: "late" },
    { id: 3, title: "Device offline", msg: "DEV-003 (Workshop 1) went offline", time: "3 hrs ago", type: "device" },
    { id: 4, title: "Session started", msg: "CS301 — Data Structures session is now active", time: "Today, 09:00", type: "session" },
    { id: 5, title: "Low attendance alert", msg: "Ananya Roy is below 75% attendance threshold", time: "Yesterday", type: "alert" },
  ];
  const colors = { present: "var(--green)", late: "var(--amber)", device: "var(--red)", session: "var(--indigo2)", alert: "#F97316" };
  const icons = {
    present: "M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
    late: "M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
    device: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 0 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 0-2-2V9m0 0h18",
    session: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z",
    alert: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  };
  return (
    <div className="page-enter">
      <div className="section-header">
        <div><h1 className="section-title">Notifications</h1><p className="section-sub">{notifs.length} recent notifications</p></div>
        <button className="btn btn-outline btn-sm">Clear All</button>
      </div>
      <div className="glass-card card-p">
        {notifs.map(n => (
          <div key={n.id} className="notif-item">
            <div className="notif-icon" style={{ background: `${colors[n.type]}18` }}>
              <Icon path={icons[n.type]} size={18} style={{ color: colors[n.type] }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, fontSize: 14 }}>{n.title}</p>
              <p style={{ fontSize: 13, color: "var(--t2)", marginTop: 2 }}>{n.msg}</p>
            </div>
            <span style={{ fontSize: 11.5, color: "var(--t3)", whiteSpace: "nowrap" }}>{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Settings
function Settings() {
  return (
    <div className="page-enter">
      <div className="section-header"><div><h1 className="section-title">Settings</h1><p className="section-sub">Manage your account and preferences</p></div></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {[
          { title: "Account", sub: "Update your name, email, and profile picture", icon: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0M12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" },
          { title: "Password", sub: "Change your login password", icon: "M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm10-10V7a4 4 0 0 0-8 0v4h8z" },
          { title: "Notifications", sub: "Configure alert preferences and thresholds", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" },
          { title: "Integrations", sub: "Connect RFID devices and external services", icon: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 0 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 0-2-2V9m0 0h18" },
        ].map(s => (
          <div key={s.title} className="glass-card card-p" style={{ cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--indigo2)" }}>
              <Icon path={s.icon} size={22} />
            </div>
            <div>
              <p style={{ fontWeight: 600, fontSize: 15 }}>{s.title}</p>
              <p style={{ fontSize: 13, color: "var(--t2)", marginTop: 2 }}>{s.sub}</p>
            </div>
            <div style={{ marginLeft: "auto", color: "var(--t3)" }}><Icon path="M9 5l7 7-7 7" size={18} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [page, setPage] = useState("live");
  const { toasts, add: toast } = useToast();

  const pages = {
    live: <LiveMonitor toast={toast} />,
    reports: <Reports />,
    students: <Students toast={toast} />,
    courses: <Courses toast={toast} />,
    sessions: <Sessions toast={toast} />,
    devices: <Devices />,
    notifications: <NotificationsPage />,
    settings: <Settings />,
  };

  const titles = { live: "Live Monitor", reports: "Reports", students: "Students", courses: "Courses", sessions: "Sessions", devices: "Devices", notifications: "Notifications", settings: "Settings" };

  return (
    <>
      <style>{css}</style>
      <div className="glow-layer"><div className="glow1" /><div className="glow2" /></div>
      <div className="app">
        {/* Sidebar */}
        <nav className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            </div>
            <span className="logo-text">Attendify</span>
          </div>

          <div className="sidebar-nav">
            {NAV_ITEMS.map(item => (
              <div key={item.id} className={`nav-item ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)}>
                <Icon path={item.icon} size={18} />
                <span>{item.label}</span>
                {item.id === "notifications" && <div style={{ marginLeft: "auto", background: "var(--red)", width: 18, height: 18, borderRadius: "50%", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>5</div>}
              </div>
            ))}
          </div>

          <div className="sidebar-footer">
            <div className="avatar">SA</div>
            <div className="footer-info" style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600 }}>School Admin</p>
              <p style={{ fontSize: 11.5, color: "var(--t3)" }}>admin@school.edu</p>
            </div>
            <div className="online-dot" />
          </div>
        </nav>

        {/* Main */}
        <div className="main">
          <div className="topbar">
            <span className="topbar-title">{titles[page]}</span>
            <div className="search-box">
              <Icon path="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" size={15} style={{ color: "var(--t3)" }} />
              <input placeholder="Search anything..." />
            </div>
            {page === "live" && <div className="live-chip"><div className="live-dot" />LIVE</div>}
            <div className="icon-btn" onClick={() => setPage("notifications")}>
              <Icon path="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" size={17} />
              <div className="badge">5</div>
            </div>
            <div className="avatar" style={{ width: 32, height: 32, fontSize: 12, cursor: "pointer" }}>SA</div>
          </div>

          <div className="page" key={page}>
            {pages[page]}
          </div>
        </div>
      </div>
      <ToastContainer toasts={toasts} />
    </>
  );
}