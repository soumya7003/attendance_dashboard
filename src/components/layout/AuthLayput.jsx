import { Outlet } from 'react-router-dom';

/**
 * AuthLayout – used for public authentication pages (login, register, forgot password).
 * Displays a glass card in the center with a dark background.
 */
export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#0B1120] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">
        {/* Logo header (optional) */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Attendify
          </h1>
          <p className="text-slate-500 mt-2 text-sm">Smart RFID Attendance System</p>
        </div>

        {/* Glass card wrapper for form */}
        <div className="glass-card p-8">
          <Outlet />
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-600 mt-8">
          &copy; {new Date().getFullYear()} Attendify. All rights reserved.
        </p>
      </div>
    </div>
  );
}