import { NavLink } from 'react-router-dom';
import { Home, Map, FlaskConical, BarChart3, User } from 'lucide-react';

const NAV = [
  { to: '/',         icon: Home,          label: 'Beranda', exact: true },
  { to: '/misi',     icon: Map,           label: 'Misi' },
  { to: '/lab',      icon: FlaskConical,  label: 'Lab' },
  { to: '/pencapaian', icon: BarChart3,   label: 'Badge' },
  { to: '/profil',   icon: User,          label: 'Profil' },
];

export default function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-emerald-100 shadow-[0_-4px_20px_-6px_rgba(0,0,0,.12)]">
      <div className="grid grid-cols-5">
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.exact}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-semibold transition ${
                isActive ? 'text-emerald-700' : 'text-slate-500'
              }`
            }
          >
            <n.icon className="w-6 h-6" />
            <span>{n.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}