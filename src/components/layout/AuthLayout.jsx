import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient glow backgrounds */}
      <div className="bg-ambient" />
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="logo-icon w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
          <h1 className="text-2xl font-bold text-gradient">Attendify</h1>
          <p className="text-secondary text-sm mt-2">Smart attendance system</p>
        </div>
        
        <div className="glass-card p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}