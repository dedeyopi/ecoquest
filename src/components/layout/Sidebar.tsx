import { NavLink } from 'react-router-dom';
import {
  Home, Map, FlaskConical, BarChart3, Trophy, BookOpen, User, Code2, Award,
} from 'lucide-react';
import { useStudent } from '@/context/StudentContext';
import { COMPETENCIES } from '@/data/competencies';

const NAV = [
  { to: '/',         icon: Home,          label: 'Beranda', exact: true },
  { to: '/misi',     icon: Map,           label: 'Misi' },
  { to: '/lab',      icon: FlaskConical,  label: 'Lab Maya' },
  { to: '/data',     icon: BarChart3,     label: 'Data' },
  { to: '/pencapaian', icon: Trophy,      label: 'Pencapaian' },
  { to: '/toolkit',  icon: BookOpen,      label: 'Toolkit' },
  { to: '/sertifikat', icon: Award,       label: 'Sertifikat' },
  { to: '/profil',   icon: User,          label: 'Profil' },
  { to: '/pengembang', icon: Code2,       label: 'Pengembang' },
];

export default function Sidebar() {
  const { student } = useStudent();
  const mastered = COMPETENCIES.filter((c) => student.mastery[c.id]?.status === 'mastered').length;
  const explored = student.completedActivities.length;
  const progress = Math.round(
    (mastered / COMPETENCIES.length) * 70 + Math.min(explored, 10) / 10 * 30,
  );

  return (
    <aside className="hidden lg:flex flex-col w-72 shrink-0 bg-white border-r border-emerald-100 sticky top-0 h-screen">
      <div className="px-6 py-6 border-b border-emerald-50">
        <div className="text-2xl font-extrabold text-emerald-700">ECOQUEST 🌱</div>
        <div className="text-sm text-slate-500 mt-1">Misi Menyelamatkan Lingkungan</div>
      </div>
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto no-scrollbar">
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.exact}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl text-lg font-semibold transition ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-soft'
                  : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
              }`
            }
          >
            <n.icon className="w-6 h-6 shrink-0" />
            <span>{n.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-emerald-50">
        <div className="rounded-2xl bg-emerald-50 p-4">
          <div className="flex items-center justify-between text-base font-semibold text-emerald-800">
            <span>Progress</span><span>{progress}%</span>
          </div>
          <div className="mt-2 h-3 rounded-full bg-emerald-200 overflow-hidden">
            <div className="h-full bg-emerald-600 rounded-full transition-all duration-700"
                 style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-2 text-sm text-emerald-700">{mastered}/8 kompetensi dikuasai</div>
        </div>
      </div>
    </aside>
  );
}