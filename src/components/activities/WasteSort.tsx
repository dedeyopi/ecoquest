import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WASTE_ITEMS, BINS, type WasteItem } from '@/data/activities';

export default function WasteSort() {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ correct: boolean; item: WasteItem } | null>(null);
  const [stats, setStats] = useState({ correct: 0, total: 0 });

  const remaining = WASTE_ITEMS.filter((i) => !placed[i.id]);

  function handleDrop(binKey: string) {
    if (!selected) return;
    const item = WASTE_ITEMS.find((i) => i.id === selected);
    if (!item) return;
    const correct = item.cat === binKey;
    setPlaced((p) => ({ ...p, [item.id]: binKey }));
    setStats((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setFeedback({ correct, item });
    setSelected(null);
    setTimeout(() => setFeedback(null), 2400);
  }

  return (
    <div className="space-y-5">
      {/* Items */}
      <div>
        <div className="text-base font-semibold text-slate-600 mb-3">Benda yang harus dipilah:</div>
        <div className="flex flex-wrap gap-3 min-h-[60px] p-3 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200">
          <AnimatePresence>
            {remaining.length === 0 ? (
              <div className="text-emerald-700 font-bold py-3">✅ Semua benda sudah dipilah!</div>
            ) : (
              remaining.map((i) => (
                <motion.button
                  key={i.id}
                  layout
                  initial={{ opacity: 0, scale: .9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: .8 }}
                  onClick={() => setSelected(selected === i.id ? null : i.id)}
                  className={`px-4 py-3 rounded-2xl border-2 bg-white text-base font-semibold transition ${
                    selected === i.id
                      ? 'border-emerald-500 ring-4 ring-emerald-100'
                      : 'border-slate-200 hover:border-emerald-400'
                  }`}
                >
                  <span className="text-xl mr-2">{i.icon}</span>
                  {i.name}
                </motion.button>
              ))
            )}
          </AnimatePresence>
        </div>
        {selected && (
          <p className="text-emerald-700 text-base font-semibold mt-3">
            👉 Sekarang pilih wadah tujuan di bawah.
          </p>
        )}
      </div>

      {/* Bins */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {BINS.map((b) => (
          <motion.button
            key={b.key}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: .97 }}
            onClick={() => handleDrop(b.key)}
            className="p-4 rounded-2xl border-2 border-slate-200 bg-white hover:border-emerald-400 hover:bg-emerald-50 transition text-center min-h-[110px] flex flex-col items-center justify-center"
          >
            <div className="text-3xl mb-1">{b.icon}</div>
            <div className="text-base font-bold text-slate-700 leading-tight">{b.label}</div>
            <div className="text-xs text-slate-400 mt-1">{b.desc}</div>
          </motion.button>
        ))}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`p-4 rounded-2xl ${
              feedback.correct ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
            }`}
          >
            <b>{feedback.correct ? '✅ Tepat!' : '❌ Belum tepat.'}</b>{' '}
            {feedback.item.icon} {feedback.item.name} seharusnya masuk ke{' '}
            <b>{BINS.find((b) => b.key === feedback.item.cat)?.label}</b>.
          </motion.div>
        )}
      </AnimatePresence>

      {stats.total > 0 && (
        <div className="rounded-2xl bg-emerald-50 border-2 border-emerald-200 p-4 text-base font-semibold text-emerald-800">
          Benar: {stats.correct} dari {stats.total} pemilahan
        </div>
      )}
    </div>
  );
}