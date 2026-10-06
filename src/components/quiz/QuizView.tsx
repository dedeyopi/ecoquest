import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Question, MasteryRecord } from '@/types';
import { useStudent } from '@/context/StudentContext';
import { useToast } from '@/hooks/useToast';
import { fireConfetti } from '@/lib/utils';

interface Props {
  questions: Question[];
  competencyId: string;
  badge: string;
  remediation: Record<string, string>;
  onComplete?: (score: number, record: MasteryRecord) => void;
  onNextMission?: () => void;
}

export default function QuizView({
  questions,
  competencyId,
  badge,
  remediation,
  onComplete,
  onNextMission,
}: Props) {
  const { updateMastery, awardBadge, student } = useStudent();
  const { push } = useToast();
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | number[] | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongSkills, setWrongSkills] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState<MasteryRecord | null>(null);

  const cur = questions[idx];
  const isMulti = cur.type === 'multi';
  const isTF = cur.type === 'tf';
  const opts = isTF ? ['Benar', 'Salah'] : cur.options || [];

  function submit() {
    if (picked === null) return;
    if (isMulti && (picked as number[]).length === 0) return;
    let correct = false;
    let correctSet: number[] = [];
    if (isMulti) {
      correctSet = cur.answers || [];
      const pickedArr = picked as number[];
      correct =
        pickedArr.length === correctSet.length &&
        correctSet.every((x) => pickedArr.includes(x));
    } else {
      const correctIdx = isTF
  ? (cur.answer ? 0 : 1)
  : (typeof cur.answer === 'number' ? cur.answer : 0);
correctSet = [correctIdx];
      correct = (picked as number) === correctSet[0];
    }
    if (correct) setScore((s) => s + 1);
    else if (cur.skill) setWrongSkills((w) => [...new Set([...w, cur.skill])]);
    setAnswered(true);
  }

  function next() {
    if (idx < questions.length - 1) {
      setIdx(idx + 1);
      setPicked(null);
      setAnswered(false);
      return;
    }
    const computed = Math.round((score / questions.length) * 100);
    const status: MasteryRecord['status'] =
      computed >= 80 ? 'mastered' : computed >= 60 ? 'developing' : 'needs_remediation';
    const record: MasteryRecord = {
      status,
      score: computed,
      lastScore: computed,
      attempts: (student.mastery[competencyId]?.attempts || 0) + 1,
      updated: Date.now(),
    };
    updateMastery(competencyId, record);
    setResult(record);
    setFinished(true);
    if (computed >= 80) {
      const isNew = awardBadge(badge);
      fireConfetti(isNew ? 80 : 50, student.settings.reduceMotion);
      if (isNew) push('🏅 Badge baru terbuka!');
    }
    onComplete?.(computed, record);
  }

  function isCorrect(): boolean {
    if (!answered) return false;
    if (isMulti) {
      const pickedArr = picked as number[];
      const correctSet = cur.answers || [];
      return (
        pickedArr.length === correctSet.length &&
        correctSet.every((x) => pickedArr.includes(x))
      );
    }
    const correctIdx = isTF
  ? (cur.answer ? 0 : 1)
  : (typeof cur.answer === 'number' ? cur.answer : 0);
return picked === correctIdx;
  }

  /* ============ HASIL AKHIR ============ */
  if (finished && result) {
    const statusLabel =
      result.score >= 80
        ? '🌱 MASTERED'
        : result.score >= 60
        ? '📈 DEVELOPING'
        : '🛠️ NEED SUPPORT';
    const color =
      result.score >= 80 ? 'emerald' : result.score >= 60 ? 'amber' : 'rose';

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-2xl border-2 border-${color}-300 bg-${color}-50 p-6 text-center`}
      >
        <div className="text-6xl mb-3">
          {result.score >= 80 ? '🎉' : result.score >= 60 ? '📈' : '🛠️'}
        </div>
        <div className={`text-4xl font-extrabold text-${color}-700`}>
          {result.score}%
        </div>
        <div className={`text-xl font-bold text-${color}-800 mt-2`}>
          {statusLabel}
        </div>
        <div className="text-base text-slate-600 mt-2">
          Benar {score} dari {questions.length} soal
        </div>

        {result.score >= 80 ? (
          <div className="mt-6 p-5 rounded-2xl bg-white border-2 border-emerald-200 text-left">
            <div className="font-bold text-emerald-800 mb-2">
              🌱 Kompetensi ini telah dikuasai!
            </div>
            <p className="text-base text-slate-700">
              Lanjutkan ke misi berikutnya atau coba lagi dengan soal berbeda.
            </p>
          </div>
        ) : (
          <div className="mt-6 p-5 rounded-2xl bg-white border-2 border-amber-200 text-left">
            <div className="font-bold text-amber-800 mb-3">
              📘 Konsepmu belum sepenuhnya kuat.
            </div>
            <ul className="space-y-3">
              {(wrongSkills.length ? wrongSkills : Object.keys(remediation)).map(
                (s) => (
                  <li
                    key={s}
                    className="p-4 rounded-xl bg-amber-50 border border-amber-200"
                  >
                    <div className="font-bold text-amber-900 mb-1">{s}</div>
                    <div
                      className="text-base text-slate-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: remediation[s] || '' }}
                    />
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <button
            onClick={onNextMission}
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 transition"
          >
            Lanjutkan →
          </button>
        </div>
      </motion.div>
    );
  }

  /* ============ SOAL ============ */
  const canSubmit =
    picked !== null && (!isMulti || (picked as number[]).length > 0);

  return (
    <div className="rounded-2xl border-2 border-emerald-300 bg-white p-5 sm:p-6">
      {/* Header soal */}
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="text-sm font-bold text-emerald-700">
            Soal {idx + 1} dari {questions.length}
          </div>
          {cur.difficulty && (
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                cur.difficulty === 'mudah'
                  ? 'bg-emerald-100 text-emerald-700'
                  : cur.difficulty === 'sedang'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-rose-100 text-rose-700'
              }`}
            >
              {cur.difficulty.toUpperCase()}
            </span>
          )}
        </div>
        <div className="h-2.5 w-40 rounded-full bg-emerald-100 overflow-hidden">
          <motion.div
            className="h-full bg-emerald-600 rounded-full"
            animate={{ width: `${(idx / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <p className="text-lg font-semibold text-slate-800 mb-2">{cur.q}</p>
      {isMulti && (
        <p className="text-sm text-emerald-700 font-semibold mb-4">
          Pilih semua jawaban yang benar (boleh lebih dari satu).
        </p>
      )}

      {/* Opsi jawaban */}
      <div className="space-y-2.5 mt-4">
        {opts.map((o, oi) => {
          const selected = isMulti
            ? ((picked as number[]) || []).includes(oi)
            : picked === oi;

          /* ------ LOGIKA WARNA ------ */
          let cls =
            'border-slate-200 bg-white hover:border-emerald-400 hover:bg-emerald-50/40';

          if (answered) {
            /* SETELAH submit: tampilkan benar/salah */
            const correctSet = isMulti
  ? cur.answers || []
  : [isTF
      ? (cur.answer ? 0 : 1)
      : (typeof cur.answer === 'number' ? cur.answer : 0)];
            const pickedSet = isMulti
              ? (picked as number[]) || []
              : [picked as number];
            if (correctSet.includes(oi))
              cls = 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200';
            else if (pickedSet.includes(oi))
              cls = 'border-rose-500 bg-rose-50 ring-2 ring-rose-200';
            else cls = 'opacity-50 border-slate-200 bg-white';
          } else if (selected) {
            /* SEBELUM submit: highlight pilihan user */
            cls =
              'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200 shadow-sm';
          }

          return (
            <motion.button
              key={oi}
              disabled={answered}
              onClick={() => {
                if (isMulti) {
                  const arr = (picked as number[]) || [];
                  setPicked(
                    arr.includes(oi) ? arr.filter((x) => x !== oi) : [...arr, oi]
                  );
                } else {
                  setPicked(oi);
                }
              }}
              whileHover={answered ? {} : { scale: 1.005 }}
              whileTap={answered ? {} : { scale: 0.995 }}
              className={`w-full text-left px-5 py-3.5 rounded-2xl border-2 text-base font-medium transition-all duration-200 ${cls}`}
            >
              <span className="flex items-center gap-3">
                {/* Bulatan huruf / ceklis */}
                <span
                  className={`inline-flex w-8 h-8 rounded-full items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                    selected
                      ? answered
                        ? isCorrect()
                          ? 'bg-emerald-500 text-white'
                          : correctSetIncludes(oi, cur, isMulti, isTF)
                          ? 'bg-emerald-500 text-white'
                          : 'bg-rose-500 text-white'
                        : 'bg-emerald-500 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {selected ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    String.fromCharCode(65 + oi)
                  )}
                </span>
                <span
                  className={
                    selected ? 'font-semibold text-emerald-900' : ''
                  }
                >
                  {o}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Tombol Kunci Jawaban */}
      {!answered && (
        <motion.button
          onClick={submit}
          disabled={!canSubmit}
          whileHover={canSubmit ? { scale: 1.01 } : {}}
          whileTap={canSubmit ? { scale: 0.99 } : {}}
          className={`mt-5 px-6 py-3 rounded-2xl font-bold text-lg transition-all ${
            canSubmit
              ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-soft'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {isMulti ? 'Kunci Jawaban' : 'Kunci Jawaban'}
        </motion.button>
      )}

      {/* Feedback setelah submit */}
      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-5 p-5 rounded-2xl border-2 ${
              isCorrect()
                ? 'bg-emerald-100 border-emerald-300'
                : 'bg-amber-100 border-amber-300'
            }`}
          >
            <div
              className={`font-bold mb-2 text-lg ${
                isCorrect() ? 'text-emerald-900' : 'text-amber-900'
              }`}
            >
              {isCorrect() ? '✅ Bagus!' : '💡 Belum tepat'}
            </div>
            <p
              className={`text-base leading-relaxed ${
                isCorrect() ? 'text-emerald-900' : 'text-amber-900'
              }`}
            >
              {cur.explain}
            </p>
            <button
              onClick={next}
              className="mt-4 px-6 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 transition"
            >
              {idx < questions.length - 1 ? 'Soal Berikutnya →' : 'Lihat Hasil'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Helper kecil untuk menentukan kelas bulatan */
function correctSetIncludes(
  oi: number,
  cur: Question,
  isMulti: boolean,
  isTF: boolean
): boolean {
  if (isMulti) return (cur.answers || []).includes(oi);
  const correctIdx = isTF ? (cur.answer ? 0 : 1) : cur.answer ?? 0;
  return oi === correctIdx;
}