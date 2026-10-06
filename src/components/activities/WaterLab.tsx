import { useState } from 'react';
import WaterQualityScene from '@/components/scenes/WaterQualityScene';
import { POLLUTION_OBJECTS } from '@/data/activities';

interface WaterState { limbah: number; kekeruh: number; ph: number; oksigen: number; organik: number; }

export default function WaterLab({ onComplete }: { onComplete?: () => void }) {
  const [v, setV] = useState<WaterState>({ limbah: 20, kekeruh: 15, ph: 7, oksigen: 8, organik: 15 });
  const [pollPick, setPollPick] = useState<number | null>(null);

  const score = (() => {
    let s = 100;
    s -= v.limbah * 0.30;
    s -= v.kekeruh * 0.22;
    s -= Math.abs(v.ph - 7) * 7;
    s -= Math.max(0, 8 - v.oksigen) * 8;
    s -= v.organik * 0.18;
    return Math.round(Math.max(0, Math.min(100, s)));
  })();

  const status = score >= 70 ? 'BAIK' : score >= 40 ? 'WASPADA' : 'TERCEMAR';
  const stColor = score >= 70 ? 'emerald' : score >= 40 ? 'amber' : 'rose';

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 px-4 py-2.5 text-sm font-semibold text-amber-800 inline-block">
        ⚠️ Data simulasi untuk tujuan pembelajaran — bukan pengukuran nyata.
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <div className="rounded-2xl overflow-hidden shadow-card">
            <WaterQualityScene state={v} />
          </div>
          <div className={`rounded-2xl border-2 border-${stColor}-300 bg-${stColor}-50 p-5`}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-slate-600">Kualitas Air</div>
              <div className={`text-2xl font-extrabold text-${stColor}-700`}>{status}</div>
            </div>
            <div className="h-3 rounded-full bg-white overflow-hidden">
              <div className={`h-full bg-${stColor}-500 rounded-full transition-all duration-500`}
                style={{ width: `${score}%` }} />
            </div>
            <div className="text-sm text-slate-500 mt-1">Indeks: {score}/100</div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {[
            { key: 'limbah' as const, label: '🏭 Jumlah Limbah', min: 0, max: 100, unit: '%', step: 1 },
            { key: 'kekeruh' as const, label: '🌫️ Kekeruhan', min: 0, max: 100, unit: '%', step: 1 },
            { key: 'ph' as const, label: '⚗️ pH Air', min: 3, max: 11, unit: '', step: 0.5 },
            { key: 'oksigen' as const, label: '💨 Oksigen Terlarut', min: 0, max: 12, unit: ' mg/L', step: 0.5 },
            { key: 'organik' as const, label: '🍂 Bahan Organik', min: 0, max: 100, unit: '%', step: 1 },
          ].map((s) => (
            <div key={s.key} className="rounded-2xl border-2 border-slate-200 bg-white p-4">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-base font-semibold text-slate-700">{s.label}</span>
                <span className="text-lg font-extrabold text-emerald-700">{v[s.key]}{s.unit}</span>
              </div>
              <input
                type="range" min={s.min} max={s.max} step={s.step} value={v[s.key]}
                onChange={(e) => setV((p) => ({ ...p, [s.key]: parseFloat(e.target.value) }))}
                className="w-full"
              />
            </div>
          ))}

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

      {/* Sumber polusi */}
      <div className="pt-6 border-t border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-3">🔍 Cari Sumber Polusi</h3>
        <p className="text-slate-600 mb-4">Klik objek untuk melihat sumber, polutan, dan dampaknya.</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
          {POLLUTION_OBJECTS.map((o, i) => (
            <button
              key={i}
              onClick={() => setPollPick(i)}
              className="p-4 rounded-2xl border-2 border-slate-200 bg-white hover:border-emerald-400 hover:bg-emerald-50 transition text-center"
            >
              <div className="text-3xl mb-2">{o.icon}</div>
              <div className="text-sm font-bold text-slate-700 leading-tight">{o.name}</div>
            </button>
          ))}
        </div>
        {pollPick !== null && (
          <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-5">
            <div className="text-2xl mb-2">{POLLUTION_OBJECTS[pollPick].icon}</div>
            <div className="font-extrabold text-lg text-slate-800 mb-3">{POLLUTION_OBJECTS[pollPick].name}</div>
            <div className="space-y-2 text-base">
              <div><span className="font-bold text-emerald-700">Polutan:</span> <span className="text-slate-700">{POLLUTION_OBJECTS[pollPick].pol}</span></div>
              <div><span className="font-bold text-emerald-700">Dampak:</span> <span className="text-slate-700">{POLLUTION_OBJECTS[pollPick].dampak}</span></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}