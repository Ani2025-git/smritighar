import React, { useState } from 'react';
import { Landmark, Lock, Mail, KeyRound, ShieldAlert } from 'lucide-react';

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('curator@smritighar.org');
  const [password, setPassword] = useState('demo12345');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-wood-dark/90 p-8 rounded-3xl border-2 border-amber-gold/40 shadow-museum space-y-6">
        
        {/* LOGO & TITLE */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-museum-950 border border-amber-gold flex items-center justify-center mx-auto text-amber-gold shadow-gold-glow">
            <Landmark className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-cream">Curator Portal Login</h1>
          <p className="text-xs text-parchment-dark">
            Frontend Admin Demo for Museum Content Management
          </p>
        </div>

        {/* NOTICE */}
        <div className="p-3.5 rounded-xl bg-amber-gold/10 border border-amber-gold/30 text-xs text-amber-goldLight flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            <strong>Demo Portal Notice:</strong> Click "Login to Dashboard" below to test the frontend Admin Control Panel. No real credentials required.
          </span>
        </div>

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-parchment-dark">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-amber-gold absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-museum-950 text-cream pl-10 pr-4 py-2.5 rounded-xl border border-amber-gold/30 focus:border-amber-gold focus:outline-none text-sm font-sans"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-parchment-dark">Password</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-amber-gold absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-museum-950 text-cream pl-10 pr-4 py-2.5 rounded-xl border border-amber-gold/30 focus:border-amber-gold focus:outline-none text-sm font-sans"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-goldDark via-amber-gold to-amber-goldLight text-museum-950 font-bold text-sm shadow-gold-glow hover:opacity-95 transition-opacity cursor-pointer flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>Login to Dashboard</span>
          </button>
        </form>

        <div className="text-center text-[11px] text-parchment-dark/70">
          SmritiGhar Museum Curator Interface v1.0 (Demo Mode)
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
