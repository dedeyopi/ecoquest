import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '@/context/StudentContext';
import { useToast } from '@/hooks/useToast';
import EarthScene from '@/components/scenes/EarthScene';

const CLASSES = ['IX-A','IX-B','IX-C','IX-D','IX-E','IX-F','IX-G','IX-H','IX-I'];

export default function LoginPage() {
  const [name, setName] = useState('');
  const [cls, setCls] = useState('');
  const [error, setError] = useState('');
  const { login } = useStudent();
  const { push } = useToast();
  const navigate = useNavigate();

  const particles = useMemo(
    () => Array.from({ length: 24 }, (_, i) => ({
      id: i,
      icon: ['🍃','🌿','✨','💧','🦋','🌸','🍀','🌱','💫'][i % 9],
      left: Math.random() * 100,
      delay: Math.random() * 18,
      duration: 14 + Math.random() * 12,
      size: 10 + Math.random() * 18,
    })),
    [],
  );

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) { setError('Mohon isi nama lengkapmu.'); return; }
    if (!cls) { setError('Mohon pilih kelasmu.'); return; }
    login(name.trim(), cls);
    push(`Selamat datang, ${name.split(' ')[0]}! 🌱`);
    navigate('/');
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 overflow-hidden">
      {/* Kiri: ilustrasi + animasi */}
      <div className="relative hidden lg:flex items-center justify-center aurora-bg p-10 overflow-hidden">
        {/* Partikel daun */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute bottom-[-60px] pointer-events-none z-[2]"
            style={{ left: `${p.left}%`, fontSize: p.size }}
            animate={{
              y: [0, -window.innerHeight - 100],
              rotate: [0, 360],
              opacity: [0, .8, .8, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {p.icon}
          </motion.div>
        ))}

        <div className="absolute top-10 -left-10 w-72 h-72 rounded-full bg-emerald-400/30 blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 -right-10 w-80 h-80 rounded-full bg-cyan-400/30 blur-3xl animate-float" />
        <div className="absolute top-1/3 right-1/4 w-56 h-56 rounded-full bg-teal-300/25 blur-3xl animate-float-slow" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          className="relative w-full max-w-md text-center z-10"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/25 animate-float-slow backdrop-blur-sm">
            <EarthScene />
          </div>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: .5 }}
            className="mt-6 text-emerald-50 text-xl font-semibold leading-relaxed drop-shadow"
          >
            "Bumi punya banyak masalah.<br />Sains membantu kita memahaminya."
          </motion.p>
        </motion.div>
      </div>

      {/* Kanan: form */}
      <div className="relative flex items-center justify-center p-6 sm:p-10 bg-[#f6fdf9] overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-emerald-100 blur-3xl opacity-70" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-cyan-100 blur-3xl opacity-70" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .55 }}
          className="relative w-full max-w-lg z-10"
        >
          <div className="lg:hidden mb-6 rounded-3xl overflow-hidden shadow-soft">
            <EarthScene />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-emerald-700 tracking-tight">
              ECOQUEST <span className="text-3xl inline-block animate-float">🌱</span>
            </h1>
            <p className="mt-3 text-lg font-semibold text-slate-700">
              Kenali Masalahnya. Buktikan Penyebabnya. Temukan Solusinya.
            </p>
            <p className="mt-1 text-base text-slate-500">
              Petualangan Sains untuk Memahami dan Menjaga Lingkungan Kita
            </p>
          </div>

          <form onSubmit={onSubmit} className="bg-white rounded-3xl shadow-card border border-emerald-100 p-7">
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Selamat Datang di ECOQUEST 🌱</h2>
            <p className="text-slate-500 mb-6">Isi data di bawah untuk memulai petualanganmu.</p>

            <label className="block text-base font-semibold text-slate-700 mb-2" htmlFor="inpName">
              Nama Lengkap
            </label>
            <input
              id="inpName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Nadia Putri"
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none text-lg mb-5 transition"
            />

            <label className="block text-base font-semibold text-slate-700 mb-2" htmlFor="inpClass">
              Kelas
            </label>
            <select
              id="inpClass"
              value={cls}
              onChange={(e) => setCls(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none text-lg mb-6 bg-white transition"
            >
              <option value="">Pilih kelas…</option>
              {CLASSES.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: .98 }}
              className="relative w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xl font-bold shadow-soft overflow-hidden"
            >
              <span className="relative z-10">MULAI PETUALANGAN 🌿</span>
              <motion.div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(120deg, transparent 20%, rgba(255,255,255,.5) 50%, transparent 80%)',
                  backgroundSize: '200% 100%',
                }}
                animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
              />
            </motion.button>

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-rose-50 text-rose-700 text-base font-medium">
                {error}
              </div>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Progres belajarmu disimpan otomatis di perangkat ini.
          </p>
        </motion.div>
      </div>

      <style>{`
        .aurora-bg {
          background: linear-gradient(-45deg, #064e3b, #059669, #0ea5e9, #06b6d4, #10b981, #0d9488);
          background-size: 400% 400%;
          animation: gradientShift 18s ease infinite;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}