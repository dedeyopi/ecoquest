import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { Award, Download, Printer, Lock, CheckCircle2, Sparkles } from 'lucide-react';
import { useStudent } from '@/context/StudentContext';
import { COMPETENCIES } from '@/data/competencies';
import { generateCertId } from '@/lib/utils';
import { useToast } from '@/hooks/useToast';

export default function CertificatePage() {
  const { student } = useStudent();
  const { push } = useToast();
  const certRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const mastered = COMPETENCIES.filter((c) => student.mastery[c.id]?.status === 'mastered');
  const totalScore = COMPETENCIES.reduce((a, c) => a + (student.mastery[c.id]?.score || 0), 0);
  const avgScore = Math.round(totalScore / COMPETENCIES.length);
  const isComplete = mastered.length === COMPETENCIES.length;
  const certId = generateCertId(student.name, student.className, student.createdAt);
  const today = new Date().toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  async function download() {
    if (!certRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(certRef.current, { pixelRatio: 2, backgroundColor: '#ffffff' });
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `Sertifikat-ECOQUEST-${student.name.replace(/\s+/g, '-')}.png`;
      a.click();
      push('Sertifikat berhasil diunduh 🎉');
    } catch {
      push('Gagal mengunduh sertifikat', 'error');
    } finally {
      setDownloading(false);
    }
  }

  if (!isComplete) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">🏆 Sertifikat Penyelesaian</h1>
          <p className="text-slate-500 mt-2 text-lg">
            Selesaikan seluruh 8 kompetensi untuk membuka sertifikat.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-card border-2 border-dashed border-slate-300 p-10 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-slate-100 grid place-items-center mx-auto mb-4">
            <Lock className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Sertifikat Terkunci</h2>
          <p className="text-base text-slate-500 max-w-xl mx-auto mb-6">
            Kamu telah menguasai <b>{mastered.length} dari {COMPETENCIES.length}</b> kompetensi.
            Selesaikan seluruhnya dengan skor <b>≥ 80%</b> untuk membuka sertifikat.
          </p>

          <div className="max-w-md mx-auto space-y-2 text-left">
            {COMPETENCIES.map((c) => {
              const rec = student.mastery[c.id];
              const done = rec?.status === 'mastered';
              return (
                <div key={c.id}
                     className={`flex items-center gap-3 p-3 rounded-xl border-2 ${
                       done ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-white'
                     }`}>
                  {done
                    ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    : <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-semibold text-slate-800 truncate">{c.title}</div>
                    {rec && <div className="text-sm text-slate-500">Skor: {rec.score}%</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="no-print flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
            <Award className="w-8 h-8 text-emerald-600" /> Sertifikat Penyelesaian
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Selamat! Kamu telah menyelesaikan seluruh kompetensi ECOQUEST.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={download}
            disabled={downloading}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold shadow-soft transition"
          >
            <Download className="w-5 h-5" />
            {downloading ? 'Mengunduh…' : 'Unduh PNG'}
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition"
          >
            <Printer className="w-5 h-5" /> Cetak PDF
          </button>
        </div>
      </div>

      {/* Certificate */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: .98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: .6 }}
        className="flex justify-center"
      >
        <div
          id="certificate-print"
          ref={certRef}
          className="relative bg-white shadow-2xl"
          style={{ width: '100%', maxWidth: 1123, aspectRatio: '1.414 / 1' }}
        >
          {/* Border luar */}
          <div className="absolute inset-0 p-6">
            <div className="w-full h-full rounded-lg p-1"
                 style={{ background: 'linear-gradient(135deg, #059669, #0d9488, #0891b2)' }}>
              <div className="w-full h-full bg-white rounded-md p-1">
                <div className="w-full h-full rounded-md border-2 border-emerald-200 relative overflow-hidden"
                     style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfeff 50%, #f0fdfa 100%)' }}>

                  {/* Ornamen sudut */}
                  <CornerOrnament className="top-2 left-2" />
                  <CornerOrnament className="top-2 right-2 rotate-90" />
                  <CornerOrnament className="bottom-2 left-2 -rotate-90" />
                  <CornerOrnament className="bottom-2 right-2 rotate-180" />

                  {/* Konten */}
                  <div className="relative h-full flex flex-col items-center justify-between px-16 py-10 text-center">

                    {/* Header */}
                    <div className="w-full">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 grid place-items-center text-2xl shadow-lg">
                          🌱
                        </div>
                        <div className="text-left">
                          <div className="text-2xl font-extrabold text-emerald-700 tracking-tight">ECOQUEST</div>
                          <div className="text-xs font-semibold text-slate-500 tracking-widest">MISI MENYELAMATKAN LINGKUNGAN</div>
                        </div>
                      </div>
                      <div className="h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent my-3" />
                    </div>

                    {/* Title */}
                    <div>
                      <div className="text-xs font-bold tracking-[0.3em] text-emerald-600 mb-2">
                        SERTIFIKAT PENYELESAIAN
                      </div>
                      <div className="text-[0.7rem] font-semibold tracking-widest text-slate-400 mb-6">
                        CERTIFICATE OF COMPLETION
                      </div>
                      <div className="text-sm text-slate-600 mb-1">Diberikan kepada</div>
                      <div className="text-4xl sm:text-5xl font-extrabold text-slate-800 mb-3 leading-tight">
                        {student.name}
                      </div>
                      <div className="text-base text-slate-600">
                        Kelas <b className="text-emerald-700">{student.className}</b> • SMP Kelas 9 Fase D
                      </div>
                    </div>

                    {/* Body */}
                    <div className="max-w-2xl">
                      <p className="text-base text-slate-700 leading-relaxed">
                        telah berhasil menyelesaikan seluruh <b>8 misi</b> pembelajaran
                        <b> Isu-Isu Lingkungan</b> dengan pendekatan <i>Scientific Inquiry</i>,
                        <i> Problem-Based Learning</i>, dan <i>Mastery Learning</i> pada aplikasi ECOQUEST.
                      </p>
                      <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200">
                        <Sparkles className="w-4 h-4 text-emerald-700" />
                        <span className="text-sm font-bold text-emerald-800">
                          Skor Rata-rata: {avgScore}% • 8/8 Kompetensi Dikuasai
                        </span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="w-full grid grid-cols-3 gap-6 items-end mt-2">
                      <div className="text-left">
                        <div className="text-[0.65rem] font-semibold tracking-widest text-slate-400 mb-1">NOMOR SERTIFIKAT</div>
                        <div className="text-sm font-mono font-bold text-slate-800">{certId}</div>
                        <div className="text-xs text-slate-500 mt-1">{today}</div>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 grid place-items-center text-4xl shadow-lg ring-4 ring-emerald-100">
                          🏅
                        </div>
                        <div className="text-[0.65rem] font-bold tracking-widest text-emerald-700 mt-2">VERIFIED</div>
                      </div>

                      <div className="text-right">
                        <div className="w-32 h-px bg-slate-400 ml-auto mb-1" />
                        <div className="text-xs font-semibold text-slate-700">Pengembang ECOQUEST</div>
                        <div className="text-[0.65rem] text-slate-500">Educational Technology</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <p className="no-print text-center text-sm text-slate-400">
        Sertifikat ini dapat diunduh sebagai PNG atau dicetak sebagai PDF (A4 landscape).
        Nomor sertifikat bersifat unik dan deterministik berdasarkan nama, kelas, dan tanggal mulai belajar.
      </p>
    </div>
  );
}

function CornerOrnament({ className = '' }: { className?: string }) {
  return (
    <svg className={`absolute w-16 h-16 text-emerald-400 ${className}`} viewBox="0 0 64 64" fill="none">
      <path d="M2 2 L20 2 M2 2 L2 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="2" cy="2" r="3" fill="currentColor" />
    </svg>
  );
}