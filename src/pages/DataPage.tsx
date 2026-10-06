import { useState } from 'react';
import { motion } from 'framer-motion';

export default function DataPage() {
  const pollutants = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const fish = pollutants.map((p) => Math.round(Math.max(4, Math.min(120, 120 * Math.exp(-p / 38)))));

  const W = 520, H = 260, PAD = 48;
  const x = (i: number) => PAD + (i / (pollutants.length - 1)) * (W - PAD - 20);
  const y = (v: number) => H - PAD - (v / 130) * (H - PAD - 24);
  const path = fish.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');

  const QS = [
    { id: 'c1', q: 'Apa pola yang terlihat pada grafik?',
      opts: ['Semakin tinggi konsentrasi polutan, semakin sedikit jumlah ikan', 'Semakin tinggi polutan, semakin banyak ikan', 'Jumlah ikan tidak berubah', 'Jumlah ikan naik lalu turun lalu naik'], ans: 0 },
    { id: 'c2', q: 'Variabel apa yang ditunjukkan pada sumbu horizontal (X)?',
      opts: ['Konsentrasi polutan', 'Jumlah ikan', 'Suhu air', 'Waktu pengamatan'], ans: 0 },
    { id: 'c3', q: 'Apakah data ini sudah membuktikan hubungan sebab-akibat secara pasti?',
      opts: ['Ya, pasti sebab-akibat', 'Belum pasti — data menunjukkan korelasi, masih perlu mempertimbangkan faktor lain', 'Data tidak dapat dibaca', 'Tidak ada hubungan sama sekali'], ans: 1 },
    { id: 'c4', q: 'Kesimpulan yang paling tepat adalah…',
      opts: ['Terdapat hubungan berlawanan arah, namun perlu data tambahan untuk memastikan sebab-akibatnya', 'Polutan pasti satu-satunya penyebab kematian ikan', 'Ikan mati karena bosan', 'Polutan membuat ikan bertambah banyak'], ans: 0 },
  ];

  const [answers, setAnswers] = useState<Record<string, number>>({});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800">📊 Investigasi Data</h1>
        <p className="text-slate-500 mt-2 text-lg">Latih literasi sains: membaca grafik, mengenali pola, dan menarik kesimpulan.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-card border border-emerald-100 p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-slate-800 mb-1">📈 Konsentrasi Polutan vs Jumlah Ikan</h2>
        <p className="text-sm text-slate-500 mb-3">Data simulasi untuk tujuan pembelajaran.</p>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          <rect x="0" y="0" width={W} height={H} fill="#fafafa" rx="12" />
          {[0, 25, 50, 75, 100, 125].map((v) => (
            <g key={v}>
              <line x1={PAD} y1={y(v)} x2={W - 20} y2={y(v)} stroke="#e2e8f0" />
              <text x={PAD - 8} y={y(v) + 5} fontSize="12" fill="#64748b" textAnchor="end">{v}</text>
            </g>
          ))}
          <line x1={PAD} y1={H - PAD} x2={W - 20} y2={H - PAD} stroke="#94a3b8" strokeWidth="2" />
          <line x1={PAD} y1="24" x2={PAD} y2={H - PAD} stroke="#94a3b8" strokeWidth="2" />
          <path d={path} fill="none" stroke="#0ea5e9" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          {fish.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="4.5" fill="#0284c7" />)}
          <text x={W / 2} y={H - 10} fontSize="13" fill="#475569" textAnchor="middle">Konsentrasi polutan (satuan relatif)</text>
          <text x="14" y={H / 2} fontSize="13" fill="#475569" textAnchor="middle" transform={`rotate(-90 14 ${H / 2})`}>Jumlah ikan (ekor)</text>
        </svg>
      </div>

      <div className="space-y-4">
        {QS.map((q) => {
          const picked = answers[q.id];
          return (
            <div key={q.id} className="bg-white rounded-2xl border-2 border-slate-200 p-5">
              <div className="text-base font-bold text-slate-800 mb-3">{q.q}</div>
              <div className="space-y-2.5">
                {q.opts.map((o, oi) => {
                  let cls = 'border-slate-200 bg-white hover:border-sky-400';
                  if (picked !== undefined) {
                    if (oi === q.ans) cls = 'border-emerald-400 bg-emerald-50';
                    else if (picked === oi) cls = 'border-rose-400 bg-rose-50';
                    else cls = 'border-slate-200 bg-white opacity-60';
                  }
                  return (
                    <button
                      key={oi}
                      disabled={picked !== undefined}
                      onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 text-base font-medium transition ${cls}`}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-3xl shadow-card border border-emerald-100 p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-slate-800 mb-4">🧭 Cara Membaca Grafik</h2>
        <ol className="space-y-3 text-base text-slate-700 list-decimal pl-6">
          <li>Baca <b>judul grafik</b> untuk mengetahui apa yang dibandingkan.</li>
          <li>Perhatikan <b>sumbu X</b> (horizontal) — biasanya variabel bebas.</li>
          <li>Perhatikan <b>sumbu Y</b> (vertikal) — biasanya variabel terikat.</li>
          <li>Periksa <b>satuan</b> pada setiap sumbu.</li>
          <li>Amati <b>pola</b>: naik, turun, mendatar, atau berfluktuasi.</li>
          <li>Cari <b>titik yang menyimpang</b> dari pola umum.</li>
          <li>Simpulkan secara <b>hati-hati</b>, sebutkan batasannya.</li>
        </ol>
      </div>
    </div>
  );
}