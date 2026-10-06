import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, MapPin, Target, HelpCircle } from 'lucide-react';
import type { Mission } from '@/types';

interface Props {
  mission: Mission;
  onStart: () => void;
  onBack: () => void;
}

export default function MissionIntro({ mission, onStart, onBack }: Props) {
  const intro = mission.intro;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-700 via-teal-700 to-cyan-800 text-white shadow-soft p-6 sm:p-8">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'radial-gradient(circle at 15% 25%, #34d399 0, transparent 45%), radial-gradient(circle at 85% 75%, #22d3ee 0, transparent 45%)',
          }}
        />
        <div className="relative">
          <button
            onClick={onBack}
            className="text-emerald-100 hover:text-white text-base font-semibold mb-4 inline-flex items-center gap-2"
          >
            ← Kembali ke Peta Misi
          </button>
          <div className="flex items-start gap-4">
            <motion.div
              initial={{ scale: 0.7, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur grid place-items-center text-3xl shrink-0"
            >
              {mission.icon}
            </motion.div>
            <div className="flex-1">
              <div className="text-emerald-100 font-semibold mb-1">
                Pengantar Misi {mission.num}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                {mission.title}
              </h1>
              <p className="text-emerald-50 mt-1">{mission.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cerita pembuka */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-3xl shadow-card border border-emerald-100 p-6 sm:p-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 grid place-items-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-800">Mengapa Ini Penting?</h2>
        </div>
        <p className="text-lg leading-relaxed text-slate-700 mb-4">{intro.hook}</p>
        <div className="rounded-2xl bg-emerald-50 border-l-4 border-emerald-500 p-4">
          <p className="text-base leading-relaxed text-emerald-900 italic">
            "{intro.whyItMatters}"
          </p>
        </div>
      </motion.section>

      {/* Konteks lokal */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white rounded-3xl shadow-card border border-emerald-100 p-6 sm:p-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 grid place-items-center">
            <MapPin className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-800">Di Sekitar Kita</h2>
        </div>
        <p className="text-lg leading-relaxed text-slate-700">{intro.localContext}</p>
      </motion.section>

      {/* Apa yang akan dipelajari */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white rounded-3xl shadow-card border border-emerald-100 p-6 sm:p-8"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 grid place-items-center">
            <Target className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-800">Yang Akan Kamu Pelajari</h2>
        </div>
        <ul className="space-y-3">
          {intro.objectives.map((obj, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="flex items-start gap-3 p-3 rounded-xl bg-indigo-50/50"
            >
              <span className="w-6 h-6 rounded-full bg-indigo-500 text-white grid place-items-center text-sm font-bold shrink-0">
                {i + 1}
              </span>
              <span className="text-base text-slate-700 leading-relaxed">{obj}</span>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* Pertanyaan pemantik */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-card border-2 border-amber-200 p-6 sm:p-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-800 grid place-items-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-800">Sebelum Kamu Mulai…</h2>
        </div>
        <p className="text-lg font-semibold text-amber-900 mb-3">
          Coba pikirkan sebentar:
        </p>
        <p className="text-lg italic text-amber-800 leading-relaxed pl-4 border-l-4 border-amber-400">
          {intro.initialQuestion}
        </p>
        <p className="text-base text-amber-700 mt-4">
          Tidak perlu menjawab sekarang. Simpan pertanyaan ini di kepalamu selama mempelajari misi ini.
        </p>
      </motion.section>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="flex flex-wrap gap-3 justify-center pt-2"
      >
        <button
          onClick={onBack}
          className="px-6 py-3.5 rounded-2xl bg-white border-2 border-slate-300 text-slate-700 font-bold text-lg hover:bg-slate-50 transition"
        >
          Kembali
        </button>
        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xl shadow-soft transition"
        >
          MULAI MISI
          <ArrowRight className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}