import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStudent } from '@/context/StudentContext';
import { MISSIONS } from '@/data/missions';
import MissionIntro from '@/components/mission/MissionIntro';
import QuizView from '@/components/quiz/QuizView';
import WasteSort from '@/components/activities/WasteSort';
import CarbonCalculator from '@/components/activities/CarbonCalculator';
import GreenhouseLab from '@/components/activities/GreenhouseLab';
import WaterLab from '@/components/activities/WaterLab';
import {
  RiverScene,
  ForestScene,
  CityScene,
  VolcanoScene,
  IslandScene,
  MicroplasticScene,
} from '@/components/scenes';

export default function MissionPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { student, markActivity } = useStudent();

  const mission = MISSIONS.find((m) => m.id === id);
  const [showIntro, setShowIntro] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [predict, setPredict] = useState<number | null>(null);
  const [miscon, setMiscon] = useState<number | null>(null);

  // Guard: mission tidak ditemukan
  if (!mission) {
    return (
      <div className="text-center py-20 text-xl text-slate-500">
        Misi tidak ditemukan.
      </div>
    );
  }

  const missionId = mission.id;
  const idx = MISSIONS.indexOf(mission);
  const prevMission = idx > 0 ? MISSIONS[idx - 1] : null;
  const unlocked =
    idx === 0 || !!(student.mastery[prevMission!.competency]?.attempts);

  // Guard: terkunci
  if (!unlocked) {
    return (
      <div className="bg-white rounded-3xl shadow-card border border-emerald-100 p-10 text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-slate-800">
          Misi ini masih terkunci
        </h2>
        <p className="text-slate-500 mt-2 text-lg">
          Selesaikan Mastery Check pada misi sebelumnya.
        </p>
        <button
          onClick={() => navigate('/misi')}
          className="mt-6 px-6 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 transition"
        >
          Kembali ke Peta Misi
        </button>
      </div>
    );
  }

  // ==== TAHAP 1: PENGANTAR KONTEKSTUAL ====
  if (showIntro) {
    return (
      <MissionIntro
        mission={mission}
        onStart={() => setShowIntro(false)}
        onBack={() => navigate('/misi')}
      />
    );
  }

  // ==== TAHAP 2: MATERI LENGKAP ====
  const rec = student.mastery[mission.competency];
  const explored = student.completedActivities.includes(missionId + '-explore');
  const explored2 = student.completedActivities.includes(missionId + '-explore2');
  const allExplored = explored && (!mission.explore2 || explored2);

  function handleExplorComplete() {
    markActivity(missionId + '-explore');
  }
  function handleExplor2Complete() {
    markActivity(missionId + '-explore2');
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header misi */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-soft">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
          <button
            onClick={() => setShowIntro(true)}
            className="text-emerald-100 hover:text-white text-base font-semibold"
          >
            ← Lihat Pengantar
          </button>
          <button
            onClick={() => navigate('/misi')}
            className="text-emerald-100 hover:text-white text-base font-semibold"
          >
            🗺️ Peta Misi
          </button>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 grid place-items-center text-3xl shrink-0">
            {mission.icon}
          </div>
          <div>
            <div className="text-emerald-100 font-semibold">
              Misi {mission.num} • Kompetensi: {mission.competencyTitle}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight mt-1">
              {mission.title}
            </h1>
            <p className="text-emerald-50 mt-1">{mission.subtitle}</p>
          </div>
        </div>
        {rec && (
          <div className="mt-5 inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/20">
            <span className="font-bold">Skor terbaik: {rec.score}%</span>
            <span className="text-emerald-100">•</span>
            <span className="font-bold">
              {rec.status === 'mastered'
                ? '🌱 MASTERED'
                : rec.status === 'developing'
                ? '📈 DEVELOPING'
                : '🛠️ PERLU LATIHAN'}
            </span>
          </div>
        )}
      </div>

      {/* LEVEL 1: Fenomena */}
      <Section level="LEVEL 1" title="Fenomena">
        <div className="grid md:grid-cols-2 gap-4 mb-5">
          {mission.phenomenon.visual()}
        </div>
        <p className="text-sm text-slate-400 italic mb-3">
          {mission.phenomenon.caption}
        </p>
        <p className="text-lg leading-relaxed text-slate-700">
          {mission.phenomenon.text}
        </p>
      </Section>

      {/* LEVEL 2: Pertanyaan Pemantik */}
      <Section
        level="LEVEL 2"
        title="Pertanyaan Pemantik"
        badgeClass="bg-sky-100 text-sky-700"
      >
        <p className="text-lg text-slate-700 mb-5">
          Jawab dulu sesuai dugaanmu — tidak apa-apa jika belum yakin.
        </p>
        <QuestionBlock
          q={mission.predict.q}
          options={mission.predict.options}
          answer={mission.predict.answer}
          explain={mission.predict.explain}
          picked={predict}
          onPick={setPredict}
          colorClass="sky"
        />
        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">⚠️</span>
            <h3 className="text-lg font-bold text-slate-800">
              Cek Miskonsepsi
            </h3>
          </div>
          <QuestionBlock
            q={mission.miscon.q}
            options={mission.miscon.options}
            answer={mission.miscon.answer}
            explain={mission.miscon.explain}
            picked={miscon}
            onPick={setMiscon}
            colorClass="amber"
          />
        </div>
      </Section>

      {/* LEVEL 3: Eksplorasi Interaktif */}
      <Section
        level="LEVEL 3"
        title="Eksplorasi Interaktif"
        badgeClass="bg-lime-100 text-lime-700"
      >
        <ExploreRouter
          mission={mission}
          onComplete={handleExplorComplete}
          onComplete2={handleExplor2Complete}
        />
      </Section>

      {/* LEVEL 4: Konsep Kunci */}
      <Section
        level="LEVEL 4"
        title="Konsep Kunci"
        badgeClass="bg-indigo-100 text-indigo-700"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          {mission.concept.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border-2 border-emerald-100 bg-emerald-50/40 p-5"
            >
              <div className="text-2xl mb-2">{c.icon}</div>
              <h3 className="text-lg font-bold text-emerald-800 mb-2">
                {c.title}
              </h3>
              <p className="text-base leading-relaxed text-slate-700">
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* LEVEL 5-6: Latihan Terbimbing */}
      <Section
        level="LEVEL 5–6"
        title="Latihan Terbimbing"
        badgeClass="bg-amber-100 text-amber-700"
      >
        <PracticeBlock mission={mission} />
      </Section>

      {/* LEVEL 7: Mastery Check */}
      <Section
        level="LEVEL 7"
        title="Mastery Check"
        badgeClass="bg-emerald-600 text-white"
        highlight
      >
        {!showQuiz ? (
          <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/40 p-6 text-center">
            {rec ? (
              <>
                <div className="text-5xl mb-3">
                  {rec.status === 'mastered'
                    ? '🌱'
                    : rec.status === 'developing'
                    ? '📈'
                    : '🛠️'}
                </div>
                <div className="text-xl font-extrabold text-slate-800 mb-2">
                  {rec.status === 'mastered'
                    ? 'MASTERED'
                    : rec.status === 'developing'
                    ? 'DEVELOPING'
                    : 'PERLU LATIHAN'}
                </div>
                <div className="text-base text-slate-600 mb-5">
                  Skor terbaik: <b>{rec.score}%</b> • Percobaan: {rec.attempts}
                </div>
                <button
                  onClick={() => setShowQuiz(true)}
                  className="px-6 py-3.5 rounded-2xl bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 transition"
                >
                  🔁 Coba Lagi
                </button>
              </>
            ) : (
              <>
                <div className="text-5xl mb-3">📝</div>
                <div className="text-xl font-extrabold text-slate-800 mb-2">
                  Siap mengerjakan Mastery Check?
                </div>
                <p className="text-base text-slate-600 mb-5 max-w-xl mx-auto">
                  {mission.mastery.length} soal • ambang mastery ≥ 80%
                </p>
                {!allExplored && (
                  <div className="mb-5 p-4 rounded-2xl bg-amber-100 border-2 border-amber-200 text-base text-amber-900 max-w-xl mx-auto">
                    💡 Disarankan menyelesaikan eksplorasi terlebih dahulu.
                  </div>
                )}
                <button
                  onClick={() => setShowQuiz(true)}
                  className="px-8 py-4 rounded-2xl bg-emerald-600 text-white font-bold text-xl hover:bg-emerald-700 shadow-soft transition"
                >
                  MULAI MASTERY CHECK
                </button>
              </>
            )}
          </div>
        ) : (
          <QuizView
            questions={mission.mastery}
            competencyId={mission.competency}
            badge={mission.badge}
            remediation={mission.remediation}
            onNextMission={() => {
              const next = MISSIONS[idx + 1];
              if (next) navigate(`/misi/${next.id}`);
              else navigate('/sertifikat');
            }}
          />
        )}
      </Section>

      {/* LEVEL 8: Aksi Nyata */}
      <Section
        level="LEVEL 8"
        title="Aksi Nyata"
        badgeClass="bg-teal-100 text-teal-700"
      >
        <div className="rounded-2xl bg-teal-50 border-2 border-teal-200 p-5">
          <p className="text-lg text-teal-900 leading-relaxed">
            {defaultAction(missionId)}
          </p>
        </div>
      </Section>
    </motion.div>
  );
}

/* =============== SUB-KOMPONEN =============== */

function Section({
  level,
  title,
  badgeClass = 'bg-emerald-100 text-emerald-700',
  highlight,
  children,
}: {
  level: string;
  title: string;
  badgeClass?: string;
  highlight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`bg-white rounded-3xl shadow-card border p-6 sm:p-8 ${
        highlight ? 'border-emerald-300 border-2' : 'border-emerald-100'
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-bold ${badgeClass}`}>
          {level}
        </span>
        <h2 className="text-xl font-extrabold text-slate-800">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function QuestionBlock({
  q,
  options,
  answer,
  explain,
  picked,
  onPick,
  colorClass,
}: {
  q: string;
  options: string[];
  answer: number;
  explain: string;
  picked: number | null;
  onPick: (i: number) => void;
  colorClass: 'sky' | 'amber';
}) {
  const cfg =
    colorClass === 'sky'
      ? {
          bg: 'bg-sky-50',
          border: 'border-sky-200',
          hover: 'hover:border-sky-400',
          text: 'text-sky-900',
        }
      : {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          hover: 'hover:border-amber-400',
          text: 'text-amber-900',
        };

  return (
    <div className={`rounded-2xl ${cfg.bg} border-2 ${cfg.border} p-5`}>
      <p className={`text-lg font-semibold ${cfg.text} mb-4`}>{q}</p>
      <div className="space-y-2.5">
        {options.map((o, i) => {
          let cls = `border-slate-200 bg-white ${cfg.hover}`;
          if (picked !== null) {
            if (i === answer) cls = 'border-emerald-400 bg-emerald-50';
            else if (picked === i) cls = 'border-rose-400 bg-rose-50';
            else cls = 'border-slate-200 bg-white opacity-70';
          }
          return (
            <button
              key={i}
              disabled={picked !== null}
              onClick={() => onPick(i)}
              className={`w-full text-left px-5 py-3.5 rounded-2xl border-2 text-base font-medium transition ${cls}`}
            >
              <span className="inline-block w-7 h-7 rounded-full bg-slate-100 text-center leading-7 font-bold mr-3 text-sm">
                {String.fromCharCode(65 + i)}
              </span>
              {o}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div
          className={`mt-4 p-4 rounded-2xl ${
            picked === answer
              ? 'bg-emerald-100 text-emerald-900'
              : 'bg-amber-100 text-amber-900'
          }`}
        >
          <div className="font-bold mb-1">
            {picked === answer ? '✅ Tepat!' : '💡 Belum tepat'}
          </div>
          <p className="text-base leading-relaxed">{explain}</p>
        </div>
      )}
    </div>
  );
}

function ExploreRouter({
  mission,
  onComplete,
  onComplete2,
}: {
  mission: any;
  onComplete: () => void;
  onComplete2: () => void;
}) {
  switch (mission.explore) {
    case 'detective':
      return (
        <div className="space-y-5">
          <p className="text-lg text-slate-700">
            Amati setiap situasi. Tentukan perubahan utama dan jenis penyebabnya.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden">
              <RiverScene dirty />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <ForestScene cut />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <VolcanoScene />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <CityScene />
            </div>
          </div>
          <button
            onClick={onComplete}
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 transition"
          >
            ✓ Tandai Eksplorasi Selesai
          </button>
        </div>
      );

    case 'waterlab':
      return <WaterLab onComplete={onComplete} />;

    case 'greenhouse':
      return <GreenhouseLab onComplete={onComplete} />;

    case 'wastesort':
      return (
        <div className="space-y-6">
          <p className="text-lg text-slate-700">
            Pilah setiap benda ke dalam kategori yang tepat.
          </p>
          <WasteSort />
          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              🔬 Dari Plastik Menjadi Mikroplastik
            </h3>
            <div className="rounded-2xl overflow-hidden">
              <MicroplasticScene />
            </div>
          </div>
          <button
            onClick={onComplete}
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 transition"
          >
            ✓ Tandai Eksplorasi Selesai
          </button>
        </div>
      );

    case 'island':
      return (
        <div className="space-y-5">
          <p className="text-lg text-slate-700">
            Ubah kondisi habitat dan amati pengaruhnya terhadap populasi.
          </p>
          <div className="rounded-2xl overflow-hidden">
            <IslandScene forest={70} poll={20} />
          </div>
          <button
            onClick={onComplete}
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 transition"
          >
            ✓ Tandai Eksplorasi Selesai
          </button>
        </div>
      );

    case 'carbon':
      return <CarbonCalculator onComplete={onComplete} />;

    case 'casefile':
      return (
        <div className="space-y-5">
          <p className="text-lg text-slate-700">
            Selesaikan enam langkah investigasi berikut.
          </p>
          <div className="rounded-2xl overflow-hidden">
            <RiverScene dirty />
          </div>
          <button
            onClick={onComplete}
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 transition"
          >
            ✓ Tandai Eksplorasi Selesai
          </button>
        </div>
      );

    case 'final':
      return (
        <div className="space-y-5">
          <p className="text-lg text-slate-700">
            Rancang solusi nyata sebagai Eco Consultant.
          </p>
          <div className="rounded-2xl bg-emerald-50 border-2 border-emerald-200 p-5">
            <div className="font-bold text-emerald-700 mb-2">
              🎯 ECO SOLUTION CHALLENGE
            </div>
            <p className="text-lg font-semibold text-slate-800">
              "Sekolah menghasilkan terlalu banyak sampah plastik setiap hari."
            </p>
          </div>
          <button
            onClick={onComplete}
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 transition"
          >
            ✓ Tandai Eksplorasi Selesai
          </button>
        </div>
      );

    default:
      return <p className="text-slate-500">Aktivitas tidak tersedia.</p>;
  }
}

function PracticeBlock({ mission }: { mission: any }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const q = mission.practice[idx];
  if (!q)
    return (
      <div className="text-emerald-700 font-bold text-lg">
        ✅ Latihan selesai.
      </div>
    );

  return (
    <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/40 p-5">
      <div className="text-sm font-bold text-amber-700 mb-2">
        Latihan {idx + 1} dari {mission.practice.length}
      </div>
      <p className="text-lg font-semibold text-slate-800 mb-4">{q.q}</p>
      <div className="space-y-2.5">
        {q.options.map((o: string, oi: number) => {
          let cls = 'border-slate-200 bg-white hover:border-amber-400';
          if (picked !== null) {
            if (oi === q.answer) cls = 'border-emerald-400 bg-emerald-50';
            else if (picked === oi) cls = 'border-rose-400 bg-rose-50';
            else cls = 'border-slate-200 bg-white opacity-60';
          }
          return (
            <button
              key={oi}
              disabled={picked !== null}
              onClick={() => setPicked(oi)}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 text-base font-medium transition ${cls}`}
            >
              {o}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div
          className={`mt-4 p-4 rounded-2xl ${
            picked === q.answer
              ? 'bg-emerald-100 text-emerald-900'
              : 'bg-amber-100 text-amber-900'
          }`}
        >
          <b>{picked === q.answer ? '✅ Tepat!' : '💡 Belum tepat.'}</b>{' '}
          {q.explain}
        </div>
      )}
      {picked !== null && idx < mission.practice.length - 1 && (
        <button
          onClick={() => {
            setIdx(idx + 1);
            setPicked(null);
          }}
          className="mt-4 px-5 py-3 rounded-xl bg-amber-600 text-white font-bold hover:bg-amber-700 transition"
        >
          Soal Berikutnya →
        </button>
      )}
    </div>
  );
}

function defaultAction(id: string): string {
  const map: Record<string, string> = {
    m1: 'Amati satu perubahan lingkungan di sekitarmu selama seminggu.',
    m2: 'Periksa satu sumber air di sekitar rumahmu. Catat warna, bau, dan organisme.',
    m3: 'Catat suhu ruanganmu pagi, siang, malam selama tiga hari.',
    m4: 'Pisahkan sampahmu selama tiga hari menjadi organik, daur ulang, residu, B3.',
    m5: 'Identifikasi tiga jenis tumbuhan atau hewan di sekitar rumahmu.',
    m6: 'Hitung perjalananmu selama seminggu. Tentukan satu yang bisa diubah.',
    m7: 'Pilih satu isu lingkungan di sekitarmu. Kumpulkan minimal tiga bukti.',
    m8: 'Terapkan rancangan solusimu selama dua minggu. Ukur indikatornya.',
  };
  return map[id] || 'Lakukan satu tindakan kecil di sekitarmu.';
}