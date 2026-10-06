import { useState } from 'react';
import { motion } from 'framer-motion';
import { CARBON_QUESTIONS } from '@/data/activities';

export default function CarbonCalculator({ onComplete }: { onComplete?: () => void }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [sim, setSim] = useState<{ label: string; before: number; after: number } | null>(null);

  const answeredCount = Object.keys(answers).length;
  const done = answeredCount === CARBON_QUESTIONS.length;

  const total = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxTotal = CARBON_QUESTIONS.reduce((a, q) => a + Math.max(...q.opts.map((o) => o.v)), 0);
  const pct = Math.round((total / maxTotal) * 100);
  const cat = pct < 34 ? 'RENDAH' : pct < 67 ? 'SEDANG' : 'TINGGI';
  const catColor = pct < 34 ? 'emerald' : pct < 67 ? 'amber' : 'rose';

  function simulate(type: 'transport' | 'ac' | 'plastic') {
    const config = {
      transport: { reduction: 4, label: '🚶 Motor → jalan kaki / sepeda' },
      ac: { reduction: 3, label: '❄️ AC 24°C → 26°C' },
      plastic: { reduction: 2, label: '🧴 Botol sekali pakai → botol isi ulang' },
    }[type];
    const after = Math.max(0, total - config.reduction);
    setSim({
      label: config.label,
      before: Math.round((total / maxTotal) * 100),
      after: Math.round((after / maxTotal) * 100),
    });
  }

  const catOf = (p: number) => (p < 34 ? 'RENDAH' : p < 67 ? 'SEDANG' : 'TINGGI');

  return (
    <div className="grid lg:grid-cols-5 gap-6 items-start">
      <div className="lg:col-span-3 space-y-4">
        {CARBON_QUESTIONS.map((q, qi) => (
          <div key={q.id} className="rounded-2xl border-2 border-slate-200 bg-white p-5">
            <div className="text-base font-bold text-slate-800 mb-3">{qi + 1}. {q.q}</div>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {q.opts.map((o) => {
                const sel = answers[q.id] === o.v;
                return (
                  <button
                    key={o.t}
                    onClick={() => setAnswers((a) => ({ ...a, [q.id]: o.v }))}
                    className={`text-left px-4 py-3 rounded-xl border-2 text-base font-medium transition ${
                      sel ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-white hover:border-emerald-400'
                    }`}
                  >
                    {o.t}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="lg:col-span-2 space-y-4 lg:sticky lg:top-28">
        <div className={`rounded-2xl border-2 border-${catColor}-300 bg-${catColor}-50 p-6 text-center`}>
          <div className="text-base font-semibold text-slate-600">Estimasi Jejak Karbon</div>
          <div className={`text-4xl font-extrabold text-${catColor}-700 mt-2`}>{done ? cat : '—'}</div>
          <div className="mt-3 h-3 rounded-full bg-white overflow-hidden">
            <motion.div
              className={`h-full bg-${catColor}-500 rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: done ? `${pct}%` : 0 }}
              transition={{ duration: .6 }}
            />
          </div>
          <div className="text-sm text-slate-500 mt-2">
            {answeredCount}/{CARBON_QUESTIONS.length} pertanyaan dijawab
          </div>
        </div>

        {done && (
          <>
            <div className="rounded-2xl border-2 border-emerald-200 bg-white p-5">
              <div className="font-bold text-slate-800 mb-3">🤔 Bagaimana Jika…?</div>
              <div className="space-y-2">
                {(['transport', 'ac', 'plastic'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => simulate(t)}
                    className="w-full text-left px-4 py-3 rounded-xl bg-emerald-50 border-2 border-emerald-200 font-semibold text-emerald-800 hover:bg-emerald-100 transition text-base"
                  >
                    {t === 'transport' && '🚶 Motor → jalan kaki / sepeda'}
                    {t === 'ac' && '❄️ AC 24°C → 26°C'}
                    {t === 'plastic' && '🧴 Botol sekali pakai → botol isi ulang'}
                  </button>
                ))}
              </div>
              {sim && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl bg-white border-2 border-emerald-200"
                >
                  <div className="font-bold text-slate-800 mb-3">{sim.label}</div>
                  <div className="flex items-center gap-3 text-base">
                    <span className="px-3 py-1.5 rounded-xl bg-slate-100 font-bold text-slate-600">{catOf(sim.before)}</span>
                    <span className="text-slate-400">→</span>
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-100 font-bold text-emerald-700">{catOf(sim.after)}</span>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 p-4 text-base text-amber-900 leading-relaxed">
              <b>Catatan:</b> Hasil ini adalah estimasi edukatif, bukan pengukuran emisi individual yang presisi.
            </div>

            <button
              onClick={onComplete}
              className="w-full px-6 py-3.5 rounded-2xl bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 transition"
            >
              ✓ Tandai Eksplorasi Selesai
            </button>
          </>
        )}
      </div>
    </div>
  );
}