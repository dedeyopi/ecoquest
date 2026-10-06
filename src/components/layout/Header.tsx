import { useStudent } from '@/context/StudentContext';
import { COMPETENCIES } from '@/data/competencies';

export default function Header() {
  const { student } = useStudent();
  const mastered = COMPETENCIES.filter((c) => student.mastery[c.id]?.status === 'mastered').length;
  const progress = Math.round((mastered / COMPETENCIES.length) * 70 + Math.min(student.completedActivities.length, 10) / 10 * 30);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-emerald-100">
      <div className="px-4 sm:px-8 py-4 flex items-center gap-4">
        <div className="lg:hidden text-xl font-extrabold text-emerald-700">ECOQUEST 🌱</div>
        <div className="hidden sm:block flex-1 min-w-0">
          <div className="text-lg font-bold text-slate-800 truncate">Selamat belajar, {student.name}! 🌱</div>
          <div className="text-base text-slate-500">Kelas {student.className}</div>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <div className="text-sm text-slate-500">Progress</div>
            <div className="text-lg font-extrabold text-emerald-700">{progress}%</div>
          </div>
          <div className="w-24 sm:w-32 h-3 rounded-full bg-emerald-100 overflow-hidden hidden sm:block">
            <div className="h-full bg-emerald-600 rounded-full transition-all duration-700"
                 style={{ width: `${progress}%` }} />
          </div>
          <div className="w-11 h-11 rounded-full bg-emerald-600 text-white grid place-items-center text-lg font-bold shadow-soft">
            {student.name.trim().charAt(0).toUpperCase() || 'S'}
          </div>
        </div>
      </div>
    </header>
  );
}