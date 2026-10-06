import { useState } from 'react';
import GreenhouseScene from '@/components/scenes/GreenhouseScene';

export default function GreenhouseLab({ onComplete }: { onComplete?: () => void }) {
  const [level, setLevel] = useState(30);

  return (
    <div className="grid lg:grid-cols-2 gap-6 items-start">
      <div className="rounded-2xl overflow-hidden">
        <GreenhouseScene level={level} />
      </div>
      <div className="space-y-4">
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-5">
          <div className="flex justify-between items-center mb-3">
            <span className="text-base font-semibold text-slate-700">🌫️ Konsentrasi Gas Rumah Kaca</span>
            <span className="text-lg font-extrabold text-orange-600">{level}</span>
          </div>
          <input
            type="range" min="0" max="100" step="1" value={level}
            onChange={(e) => setLevel(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-slate-400 mt-2">
            <span>Rendah</span><span>Tinggi</span>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-5">
          <div className="font-bold text-orange-900 mb-2">Apa yang terjadi?</div>
          <p className="text-base leading-relaxed text-orange-900">
            Semakin tinggi konsentrasi gas rumah kaca, semakin banyak radiasi inframerah yang
            dipancarkan Bumi diserap dan dipancarkan kembali ke permukaan. Energi yang terperangkap
            bertambah dan suhu rata-rata permukaan cenderung meningkat.
          </p>
        </div>

        <div className="rounded-2xl border-2 border-slate-200 bg-white p-5">
          <div className="font-bold text-slate-800 mb-2">Catatan Ilmiah</div>
          <ul className="text-base text-slate-600 space-y-2 list-disc pl-5">
            <li>Efek rumah kaca alami <b>diperlukan</b> agar Bumi tetap hangat.</li>
            <li>Masalah muncul ketika konsentrasinya <b>meningkat</b>.</li>
            <li>Model ini <b>konseptual</b>, bukan perhitungan suhu sebenarnya.</li>
          </ul>
        </div>

        {onComplete && (
          <button
            onClick={onComplete}
            className="w-full px-6 py-3.5 rounded-2xl bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 transition"
          >
            ✓ Tandai Eksplorasi Selesai
          </button>
        )}
      </div>
    </div>
  );
}