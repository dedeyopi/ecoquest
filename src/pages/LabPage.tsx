import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStudent } from '@/context/StudentContext';
import { MISSIONS } from '@/data/missions';

const LABS = [
  { id: 'm2', icon: '💧', title: 'Lab Maya — Kualitas Air', desc: 'Ubah parameter limbah, pH, dan oksigen terlarut, lalu amati kondisi ekosistem sungai.' },
  { id: 'm3', icon: '🌡️', title: 'Lab Maya — Efek Rumah Kaca', desc: 'Atur konsentrasi gas rumah kaca dan amati energi yang terperangkap di atmosfer.' },
  { id: 'm5', icon: '🏝️', title: 'Simulasi — Ekosistem Pulau', desc: 'Ubah luas habitat, pencemaran, dan koridor satwa, lalu lihat perubahan populasi.' },
  { id: 'm6', icon: '⚡', title: 'Kalkulator Jejak Karbon', desc: 'Hitung estimasi relatif jejak karbon harianmu dan uji skenario "bagaimana jika".' },
  { id: 'm4', icon: '♻️', title: 'Pilah Sampah & Mikroplastik', desc: 'Latih pemilahan sampah dan ikuti proses pembentukan mikroplastik.' },
  { id: 'm7', icon: '📊', title: 'Investigasi Data', desc: 'Latih kemampuan membaca grafik dan menarik kesimpulan ilmiah.' },
];

export default function LabPage() {
  const { student } = useStudent();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800">🔬 Lab Maya</h1>
        <p className="text-slate-500 mt-2 text-lg">Simulasi dan aktivitas interaktif untuk menguji konsep secara langsung.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {LABS.map((l, i) => {
          const idx = MISSIONS.findIndex((x) => x.id === l.id);
          const prev = idx > 0 ? MISSIONS[idx - 1] : null;
          const unlocked = idx === 0 || !!student.mastery[prev!.competency]?.attempts;
          return (
            <motion.div
              key={l.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                to={unlocked ? `/misi/${l.id}` : '#'}
                onClick={(e) => !unlocked && e.preventDefault()}
                className={`block text-left p-6 rounded-3xl border-2 bg-white transition ${
                  unlocked
                    ? 'border-emerald-100 hover:border-emerald-400 hover:bg-emerald-50/50 shadow-card'
                    : 'border-slate-100 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="text-4xl mb-3">{l.icon}</div>
                <div className="text-lg font-bold text-slate-800">{l.title}</div>
                <div className="text-base text-slate-500 mt-1 leading-relaxed">{l.desc}</div>
                {!unlocked && (
                  <div className="text-sm text-slate-400 mt-3 font-semibold">
                    🔒 Terkunci — selesaikan misi sebelumnya
                  </div>
                )}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}