import { motion } from 'framer-motion';
import { Mail, Github, Globe, MapPin, Award, Code2, BookOpen, FlaskConical, Heart } from 'lucide-react';

export default function DeveloperPage() {
  const skills = [
    'React & TypeScript',
    'Tailwind CSS',
    'Framer Motion',
    'SVG & Data Visualization',
    'Instructional Design',
    'Vite & Modern Build Tools',
  ];
  const roles = [
    { icon: Code2, title: 'Frontend Engineer', desc: 'Membangun antarmuka interaktif dan performan.' },
    { icon: BookOpen, title: 'Instructional Designer', desc: 'Merancang alur belajar berbasis mastery.' },
    { icon: FlaskConical, title: 'Science Communicator', desc: 'Menjembatani konsep ilmiah dan siswa SMP.' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-700 via-teal-700 to-cyan-800 text-white shadow-soft p-8 sm:p-12"
      >
        <div className="absolute inset-0 opacity-30"
             style={{ backgroundImage: 'radial-gradient(circle at 15% 20%, #34d399 0, transparent 45%), radial-gradient(circle at 85% 70%, #22d3ee 0, transparent 45%)' }} />

        <div className="relative grid md:grid-cols-[260px,1fr] gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, scale: .9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: .15, duration: .55 }}
            className="relative mx-auto"
          >
            <div className="absolute -inset-3 rounded-3xl bg-white/10 backdrop-blur-sm" />
            <img
              src="/developer.jpg"
              alt="Foto pengembang ECOQUEST"
              className="relative w-full max-w-[260px] aspect-square rounded-3xl object-cover border-4 border-white/30 shadow-2xl"
            />
            <motion.div
              className="absolute -bottom-3 -right-3 bg-emerald-500 text-white text-sm font-bold px-4 py-2 rounded-2xl shadow-lg"
              initial={{ rotate: -6 }}
              animate={{ rotate: 0 }}
              transition={{ delay: .6 }}
            >
              👋 Halo!
            </motion.div>
          </motion.div>

          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-sm font-semibold mb-3">
              Pengembang ECOQUEST
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Pengembang Aplikasi ECOQUEST
            </h1>
            <p className="mt-3 text-lg text-emerald-50 leading-relaxed max-w-2xl">
              Saya membangun ECOQUEST sebagai media pembelajaran IPA interaktif untuk siswa SMP Kelas 9.
              Fokus saya adalah merancang pengalaman belajar yang menggabungkan sains, simulasi, dan
              literasi lingkungan dalam satu alur yang menyenangkan namun tetap akurat secara ilmiah.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur border border-white/20">
                <MapPin className="w-4 h-4" /> Indonesia
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur border border-white/20">
                <Award className="w-4 h-4" /> Educational Technology
              </span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Roles */}
      <section className="grid sm:grid-cols-3 gap-4">
        {roles.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .1 * i }}
            className="bg-white rounded-3xl shadow-card border border-emerald-100 p-6"
          >
            <r.icon className="w-8 h-8 text-emerald-700 mb-3" />
            <div className="text-lg font-bold text-slate-800">{r.title}</div>
            <p className="text-base text-slate-500 mt-1 leading-relaxed">{r.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Skills + Visi */}
      <section className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl shadow-card border border-emerald-100 p-6 sm:p-8">
          <h2 className="text-xl font-extrabold text-slate-800 mb-5 flex items-center gap-2">
            <Code2 className="w-6 h-6 text-emerald-700" /> Keahlian
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-base font-semibold">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-card border border-emerald-100 p-6 sm:p-8">
          <h2 className="text-xl font-extrabold text-slate-800 mb-4 flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500" /> Visi
          </h2>
          <p className="text-base text-slate-700 leading-relaxed">
            Setiap siswa berhak belajar sains dengan cara yang bermakna — bukan hanya menghafal, tetapi
            benar-benar memahami masalah nyata di sekitarnya dan mampu merancang solusi. ECOQUEST
            dirancang untuk mewujudkan hal itu.
          </p>
        </div>
      </section>

      {/* Kontak */}
      <section className="bg-white rounded-3xl shadow-card border border-emerald-100 p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-slate-800 mb-5 flex items-center gap-2">
          <Mail className="w-6 h-6 text-emerald-700" /> Kontak & Kolaborasi
        </h2>
        <p className="text-base text-slate-600 mb-5">
          Terbuka untuk kolaborasi dalam pengembangan media pembelajaran, workshop, atau penelitian pendidikan.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <ContactCard icon={<Mail className="w-5 h-5" />} label="Email" value="dedeyopi@gmail.com" />
          <ContactCard icon={<Globe className="w-5 h-5" />} label="Website" value="https://sites.google.com/view/belajaripabersamapakdede" />
          <ContactCard icon={<Github className="w-5 h-5" />} label="GitHub" value="https://github.com/dedeyopi" />
        </div>
      </section>

      {/* Info versi */}
      <section className="bg-emerald-50 border-2 border-emerald-100 rounded-3xl p-6 sm:p-8">
        <div className="grid sm:grid-cols-3 gap-4 text-base">
          <div>
            <div className="text-sm text-slate-500 font-semibold">Aplikasi</div>
            <div className="text-lg font-bold text-slate-800">ECOQUEST v2.0</div>
          </div>
          <div>
            <div className="text-sm text-slate-500 font-semibold">Teknologi</div>
            <div className="text-lg font-bold text-slate-800">React + TS + Vite</div>
          </div>
          <div>
            <div className="text-sm text-slate-500 font-semibold">Target</div>
            <div className="text-lg font-bold text-slate-800">SMP Kelas 9 • Fase D</div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl border-2 border-slate-200 bg-slate-50/60 hover:border-emerald-300 transition">
      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 grid place-items-center shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-sm text-slate-500 font-semibold">{label}</div>
        <div className="text-base font-bold text-slate-800 truncate">{value}</div>
      </div>
    </div>
  );
}