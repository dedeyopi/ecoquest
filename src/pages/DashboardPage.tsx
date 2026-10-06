import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStudent } from '@/context/StudentContext';
import { COMPETENCIES } from '@/data/competencies';
import { MISSIONS } from '@/data/missions';
import { BADGES } from '@/data/badges';
import { EarthScene } from '@/components/scenes';

export default function DashboardPage() {
  const { student } = useStudent();
  const mastered = COMPETENCIES.filter((c) => student.mastery[c.id]?.status === 'mastered').length;
  const progress = Math.round(
    (mastered / COMPETENCIES.length) * 70 +
    (Math.min(student.completedActivities.length, 10) / 10) * 30
  );

  return (
    <div className="space-y-8">

      {/* ===================== HERO ===================== */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-soft">
        <div className="grid md:grid-cols-5 items-center gap-6">
          <div className="md:col-span-3 p-7 sm:p-9">
            <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-sm font-semibold mb-4">
              Misi Kita
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Memahami Bumi dan Menjaga Masa Depannya
            </h1>
            <p className="mt-4 text-lg text-emerald-50 leading-relaxed">
              Halo {student.name.split(' ')[0]}! Eksplorasi pencemaran, perubahan iklim, sampah,
              mikroplastik, biodiversitas, dan jejak karbon melalui eksperimen virtual, simulasi,
              data, dan tantangan pemecahan masalah.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/misi"
                className="px-6 py-3.5 rounded-2xl bg-white text-emerald-800 text-lg font-bold hover:bg-emerald-50 shadow-lg"
              >
                LANJUTKAN MISI
              </Link>
              <Link
                to="/lab"
                className="px-6 py-3.5 rounded-2xl bg-emerald-700/60 border-2 border-white/40 text-white text-lg font-bold hover:bg-emerald-700"
              >
                🔬 Lab Maya
              </Link>
            </div>
          </div>
          <div className="md:col-span-2 p-5">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
              <EarthScene />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== STATS ===================== */}
      <section className="grid sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="bg-white rounded-3xl shadow-card border border-emerald-100 p-6"
        >
          <div className="text-3xl mb-2">📈</div>
          <div className="text-base font-semibold text-slate-500">Progress Belajar</div>
          <div className="text-3xl font-extrabold text-emerald-700 mt-1">{progress}%</div>
          <div className="text-sm text-slate-400 mt-1">Aktivitas &amp; penguasaan</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-card border border-emerald-100 p-6"
        >
          <div className="text-3xl mb-2">🎯</div>
          <div className="text-base font-semibold text-slate-500">Kompetensi Dikuasai</div>
          <div className="text-3xl font-extrabold text-emerald-700 mt-1">{mastered}/8</div>
          <div className="text-sm text-slate-400 mt-1">Ambang mastery ≥ 80%</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-card border border-emerald-100 p-6"
        >
          <div className="text-3xl mb-2">🏅</div>
          <div className="text-base font-semibold text-slate-500">Badge Terkumpul</div>
          <div className="text-3xl font-extrabold text-emerald-700 mt-1">
            {student.badges.length}/{Object.keys(BADGES).length}
          </div>
          <div className="text-sm text-slate-400 mt-1">Terus kumpulkan!</div>
        </motion.div>
      </section>

      {/* ===================== PETA ===================== */}
      <section className="bg-white rounded-3xl shadow-card border border-emerald-100 p-6 sm:p-8">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800">🗺️ Peta Petualangan</h2>
            <p className="text-slate-500 mt-1">Selesaikan misi secara berurutan.</p>
          </div>
          <Link
            to="/misi"
            className="px-5 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold hover:bg-emerald-100 transition"
          >
            Lihat Semua
          </Link>
        </div>
        <div className="space-y-3">
          {MISSIONS.map((m, i) => {
            const prev = i > 0 ? MISSIONS[i - 1] : null;
            const unlocked = i === 0 || !!student.mastery[prev!.competency]?.attempts;
            const rec = student.mastery[m.competency];
            const status = rec?.status ?? 'locked';
            const statusBadge = {
              mastered: '✓ MASTERED',
              developing: 'DEVELOPING',
              needs_remediation: 'PERLU LATIHAN',
              learning: 'SEDANG BELAJAR',
              locked: '🔒 TERKUNCI',
            }[unlocked ? status : 'locked'];
            const statusClass = {
              mastered: 'bg-emerald-100 text-emerald-700',
              developing: 'bg-amber-100 text-amber-700',
              needs_remediation: 'bg-rose-100 text-rose-700',
              learning: 'bg-sky-100 text-sky-700',
              locked: 'bg-slate-100 text-slate-500',
            }[unlocked ? status : 'locked'];

            return (
              <Link
                key={m.id}
                to={unlocked ? `/misi/${m.id}` : '#'}
                onClick={(e) => !unlocked && e.preventDefault()}
                className={`w-full text-left flex items-center gap-4 p-4 rounded-2xl border-2 transition ${
                  unlocked
                    ? 'border-emerald-100 bg-white hover:border-emerald-400 hover:bg-emerald-50/60'
                    : 'border-slate-100 bg-slate-50 opacity-70 cursor-not-allowed'
                }`}
              >
                <div
                  className={`w-14 h-14 shrink-0 rounded-2xl grid place-items-center text-2xl ${
                    unlocked ? 'bg-emerald-100' : 'bg-slate-200'
                  }`}
                >
                  {unlocked ? m.icon : '🔒'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-base font-bold text-slate-800">
                    Misi {m.num} — {m.title}
                  </div>
                  <div className="text-sm text-slate-500 truncate">{m.subtitle}</div>
                </div>
                <div className="hidden sm:block">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${statusClass}`}>
                    {statusBadge}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===================== BADGES ===================== */}
      <section className="bg-white rounded-3xl shadow-card border border-emerald-100 p-6 sm:p-8">
        <h2 className="text-2xl font-extrabold text-slate-800 mb-5">🏅 Pencapaianmu</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {Object.entries(BADGES).map(([id, b]) => {
            const owned = student.badges.some((x) => x.id === id);
            return (
              <div
                key={id}
                className={`rounded-2xl border-2 p-4 text-center ${
                  owned ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-slate-50 opacity-60'
                }`}
              >
                <div className={`text-3xl mb-2 ${owned ? '' : 'grayscale'}`}>{b.icon}</div>
                <div
                  className={`text-sm font-bold leading-snug ${
                    owned ? 'text-emerald-800' : 'text-slate-500'
                  }`}
                >
                  {b.name}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}