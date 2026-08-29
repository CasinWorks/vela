import React, { useState } from 'react';
import { ArrowLeft, Lock, Shield } from 'lucide-react';
import {
  loginStaff,
  roleLabel,
  type AuthSession,
  type StaffRole,
} from '../lib/auth';

interface StaffLoginProps {
  onSuccess: (session: AuthSession) => void;
  onCancel: () => void;
}

export const StaffLogin: React.FC<StaffLoginProps> = ({ onSuccess, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const result = loginStaff(email, password);
    setBusy(false);
    if (result.ok === false) {
      setError(result.error);
      return;
    }
    onSuccess(result.session);
  };

  const roles: { role: StaffRole; hint: string }[] = [
    { role: 'owner', hint: 'Full access · calendar · status · delete' },
    { role: 'admin', hint: 'Full operations access' },
    { role: 'dispatcher', hint: 'View · update status · add to calendar' },
  ];

  return (
    <div className="min-h-screen bg-[#080B0E] text-slate-200 pt-28 pb-16 px-6">
      <div className="max-w-md mx-auto">
        <button
          type="button"
          onClick={onCancel}
          className="text-[11px] tracking-[0.22em] uppercase text-slate-500 hover:text-[#C5A880] inline-flex items-center gap-2 mb-10"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to site
        </button>

        <div className="border border-white/10 bg-[#0C1017] p-8 space-y-6">
          <div className="space-y-3">
            <div className="w-10 h-10 border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880]">
              <Lock className="w-5 h-5" />
            </div>
            <span className="block text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C5A880]">
              Staff access · RBAC
            </span>
            <h1 className="font-serif-luxury text-3xl text-white">Sign in to inquiries</h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              Booking inquiries are restricted. Sign in with an owner, admin, or dispatcher account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-400">Work email</label>
              <input
                required
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#080B0E] border border-white/15 px-3 py-2.5 text-white outline-none focus:border-[#C5A880]"
                placeholder="admin@admin.com"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-slate-400">Password</label>
              <input
                required
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#080B0E] border border-white/15 px-3 py-2.5 text-white outline-none focus:border-[#C5A880]"
              />
            </div>

            {error && (
              <p className="text-red-400 text-[11px] border border-red-500/30 bg-red-950/30 px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full bg-[#C5A880] hover:bg-[#d6ba94] disabled:opacity-50 text-[#080B0E] font-semibold text-xs tracking-[0.2em] uppercase py-3.5 transition-all"
            >
              {busy ? 'Checking…' : 'Sign in'}
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-slate-500">
              <Shield className="w-3.5 h-3.5 text-[#C5A880]" /> Role permissions
            </div>
            <ul className="space-y-2">
              {roles.map((r) => (
                <li key={r.role} className="flex justify-between gap-3 text-[11px]">
                  <span className="text-[#C5A880] font-medium">{roleLabel(r.role)}</span>
                  <span className="text-slate-500 text-right">{r.hint}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
