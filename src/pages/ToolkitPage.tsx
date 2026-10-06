import { GLOSSARY } from '@/data/glossary';

export default function ToolkitPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800">🔬 Science Toolkit</h1>
        <p className="text-slate-500 mt-2 text-lg">Peta konsep dan kamus istilah untuk membantumu memahami isu lingkungan.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-card border border-emerald-100 p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-slate-800 mb-5">🧠 Peta Konsep</h2>
        <div className="overflow-x-auto">
          <svg viewBox="0 0 760 420" className="w-full h-auto" style={{ minWidth: 560 }}>
            <defs>
              <linearGradient id="cmA" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a7f3d0" /><stop offset="100%" stopColor="#6ee7b7" /></linearGradient>
              <linearGradient id="cmB" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#bae6fd" /><stop offset="100%" stopColor="#7dd3fc" /></linearGradient>
              <linearGradient id="cmC" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fde68a" /><stop offset="100%" stopColor="#fcd34d" /></linearGradient>
              <linearGradient id="cmD" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fecaca" /><stop offset="100%" stopColor="#fca5a5" /></linearGradient>
            </defs>
            <rect x="270" y="14" width="220" height="54" rx="14" fill="url(#cmA)" stroke="#059669" strokeWidth="2" />
            <text x="380" y="47" textAnchor="middle" fontSize="17" fontWeight="700" fill="#064e3b">Aktivitas Manusia</text>
            <line x1="380" y1="68" x2="380" y2="106" stroke="#94a3b8" strokeWidth="2.5" />
            <rect x="270" y="106" width="220" height="54" rx="14" fill="url(#cmB)" stroke="#0284c7" strokeWidth="2" />
            <text x="380" y="139" textAnchor="middle" fontSize="17" fontWeight="700" fill="#0c4a6e">Perubahan Lingkungan</text>
            <line x1="380" y1="160" x2="380" y2="196" stroke="#94a3b8" strokeWidth="2.5" />
            <line x1="120" y1="196" x2="640" y2="196" stroke="#94a3b8" strokeWidth="2.5" />
            <line x1="120" y1="196" x2="120" y2="222" stroke="#94a3b8" strokeWidth="2.5" />
            <line x1="380" y1="196" x2="380" y2="222" stroke="#94a3b8" strokeWidth="2.5" />
            <line x1="640" y1="196" x2="640" y2="222" stroke="#94a3b8" strokeWidth="2.5" />
            <rect x="26" y="222" width="188" height="56" rx="14" fill="url(#cmC)" stroke="#d97706" strokeWidth="2" />
            <text x="120" y="256" textAnchor="middle" fontSize="15" fontWeight="700" fill="#78350f">Pencemaran</text>
            <rect x="286" y="222" width="188" height="56" rx="14" fill="url(#cmC)" stroke="#d97706" strokeWidth="2" />
            <text x="380" y="256" textAnchor="middle" fontSize="15" fontWeight="700" fill="#78350f">Perubahan Iklim</text>
            <rect x="546" y="222" width="188" height="56" rx="14" fill="url(#cmC)" stroke="#d97706" strokeWidth="2" />
            <text x="640" y="250" textAnchor="middle" fontSize="14" fontWeight="700" fill="#78350f">Kehilangan</text>
            <text x="640" y="268" textAnchor="middle" fontSize="14" fontWeight="700" fill="#78350f">Biodiversitas</text>
            <line x1="120" y1="278" x2="120" y2="306" stroke="#94a3b8" strokeWidth="2.5" />
            <line x1="380" y1="278" x2="380" y2="306" stroke="#94a3b8" strokeWidth="2.5" />
            <line x1="640" y1="278" x2="640" y2="306" stroke="#94a3b8" strokeWidth="2.5" />
            <line x1="120" y1="306" x2="640" y2="306" stroke="#94a3b8" strokeWidth="2.5" />
            <line x1="380" y1="306" x2="380" y2="330" stroke="#94a3b8" strokeWidth="2.5" />
            <rect x="270" y="330" width="220" height="52" rx="14" fill="url(#cmD)" stroke="#dc2626" strokeWidth="2" />
            <text x="380" y="362" textAnchor="middle" fontSize="16" fontWeight="700" fill="#7f1d1d">Dampak</text>
            <line x1="380" y1="382" x2="380" y2="400" stroke="#94a3b8" strokeWidth="2.5" />
            <rect x="180" y="400" width="400" height="18" rx="9" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
            <text x="380" y="414" textAnchor="middle" fontSize="13" fontWeight="700" fill="#064e3b">Mitigasi • Adaptasi • Konservasi</text>
          </svg>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-card border border-emerald-100 p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-slate-800 mb-5">📚 Glosarium</h2>
        <div className="space-y-3">
          {GLOSSARY.map((g) => (
            <details key={g.term} className="rounded-2xl border-2 border-emerald-100 bg-emerald-50/30 overflow-hidden group">
              <summary className="px-5 py-4 font-bold text-slate-800 flex items-center justify-between hover:bg-emerald-50 transition cursor-pointer">
                <span className="text-lg">{g.term}</span>
                <span className="text-emerald-600 text-xl group-open:rotate-45 transition-transform">＋</span>
              </summary>
              <div className="px-5 pb-5 space-y-3 border-t border-emerald-100 pt-4">
                <div><span className="text-sm font-bold text-emerald-700">Sederhana:</span> <span className="text-base text-slate-700">{g.simple}</span></div>
                <div><span className="text-sm font-bold text-emerald-700">Ilmiah:</span> <span className="text-base text-slate-700">{g.sci}</span></div>
                <div><span className="text-sm font-bold text-emerald-700">Contoh:</span> <span className="text-base text-slate-700">{g.ex}</span></div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}