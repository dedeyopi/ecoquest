import { motion } from 'framer-motion';

interface Props {
  dirty?: boolean;
  animated?: boolean;
}

export default function RiverScene({ dirty = false, animated = true }: Props) {
  // ==== WARNA ====
  // Air versi kotor: slate blue-gray (jelas = air), bukan coklat
  const skyTop = dirty ? '#8a8a8a' : '#87ceeb';
  const skyBot = dirty ? '#b8b8b8' : '#d4eef7';
  const waterTop = dirty ? '#3e4a56' : '#7ec8e3';
  const waterMid = dirty ? '#252e38' : '#3ba3d0';
  const waterBot = dirty ? '#12171c' : '#0369a1';
  const bankTop = dirty ? '#8a7a5a' : '#6ba644';
  const bankBot = dirty ? '#5a4a2a' : '#3d6b1f';
  const mtnFar = dirty ? '#5a5a5a' : '#5a8a3a';
  const mtnNear = dirty ? '#4a4a48' : '#4a7a2a';

  return (
    <svg viewBox="0 0 480 300" className="w-full h-auto block rounded-2xl" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`skyR-${dirty}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={skyTop} />
          <stop offset="100%" stopColor={skyBot} />
        </linearGradient>
        <linearGradient id={`waterR-${dirty}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={waterTop} />
          <stop offset="55%" stopColor={waterMid} />
          <stop offset="100%" stopColor={waterBot} />
        </linearGradient>
        <linearGradient id={`bankR-${dirty}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={bankTop} />
          <stop offset="100%" stopColor={bankBot} />
        </linearGradient>
        <radialGradient id={`sunR-${dirty}`}>
          <stop offset="0%" stopColor="#fffbe0" />
          <stop offset="100%" stopColor="#f5c542" />
        </radialGradient>
        <linearGradient id="oilSlick" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.85" />
          <stop offset="40%" stopColor="#4c1d95" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#1e293b" stopOpacity="0.75" />
        </linearGradient>
      </defs>

      <rect width="480" height="300" fill={`url(#skyR-${dirty})`} />

      {/* Matahari */}
      {!dirty && (
        <>
          <circle cx="400" cy="52" r="34" fill="#fff9c4" opacity={0.35} />
          <motion.circle
            cx="400" cy="52" r="22" fill={`url(#sunR-${dirty})`}
            animate={animated ? { scale: [1, 1.06, 1] } : {}}
            transition={{ duration: 3.4, repeat: Infinity }}
            style={{ transformOrigin: '400px 52px' }}
          />
        </>
      )}

      {/* Awan */}
      <motion.g
        animate={animated ? { x: [-140, 620] } : {}}
        transition={{ duration: dirty ? 60 : 55, repeat: Infinity, ease: 'linear' }}
        opacity={dirty ? 0.85 : 0.75}
      >
        <ellipse cx="100" cy={dirty ? 60 : 45} rx="42" ry="12" fill={dirty ? '#9ca3af' : '#fff'} />
        <ellipse cx="80" cy="60" rx="28" ry="9" fill={dirty ? '#9ca3af' : '#fff'} />
        <ellipse cx="130" cy="60" rx="26" ry="8" fill={dirty ? '#9ca3af' : '#fff'} />
      </motion.g>

      {/* Gunung berlapis — abu-abu saat dirty */}
      <path d="M0 155 L60 108 L120 142 L190 100 L260 145 L330 118 L400 152 L480 130 L480 175 L0 175 Z"
        fill={mtnFar} opacity={dirty ? 0.75 : 0.55} />
      <path d="M0 168 L90 138 L180 158 L270 132 L360 155 L450 138 L480 148 L480 185 L0 185 Z"
        fill={mtnNear} opacity={dirty ? 0.85 : 0.6} />

      {/* Bank belakang — tan/khaki */}
      <rect x="0" y="180" width="480" height="24" fill={`url(#bankR-${dirty})`} />

      {/* Pohon tepi (versi bersih) */}
      {!dirty && (
        <>
          <Tree x={50} y={190} h={68} />
          <Tree x={415} y={192} h={62} />
        </>
      )}

      {/* Pabrik (versi dirty) */}
      {dirty && (
        <g transform="translate(370, 132)">
          <rect x="0" y="22" width="62" height="34" fill="#3a3a3a" />
          <rect x="8" y="2" width="12" height="22" fill="#2a2a2a" />
          <rect x="30" y="10" width="10" height="14" fill="#2a2a2a" />
          <rect x="4" y="30" width="6" height="6" fill="#fbbf24" opacity={0.85} />
          <rect x="42" y="30" width="6" height="6" fill="#fbbf24" opacity={0.55} />
          {/* Pipa buang ke sungai */}
          <rect x="-22" y="48" width="24" height="6" fill="#2a2a2a" />
          <rect x="-24" y="50" width="4" height="4" fill="#111" />
        </g>
      )}

      {/* Asap pabrik */}
      {dirty && animated && (
        <>
          <motion.ellipse
            cx="378" cy="128" rx="10" ry="7" fill="#6b7280" opacity={0.55}
            animate={{ cy: [128, 70], opacity: [0.55, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
          />
          <motion.ellipse
            cx="400" cy="135" rx="8" ry="5" fill="#9ca3af" opacity={0.45}
            animate={{ cy: [135, 80], opacity: [0.45, 0] }}
            transition={{ duration: 7, delay: -3, repeat: Infinity }}
          />
        </>
      )}

      {/* ============ AIR SUNGAI ============ */}
      <path d="M0 204 q60 -6 120 0 q60 6 120 0 q60 -6 120 0 q60 6 120 0 L480 300 L0 300 Z"
        fill={`url(#waterR-${dirty})`} />

      {/* Garis permukaan air (mempertegas bahwa ini air) */}
      <path d="M0 204 q60 -6 120 0 q60 6 120 0 q60 -6 120 0 q60 6 120 0"
        stroke={dirty ? '#0a0e12' : '#4ba8d4'}
        strokeWidth="1.5"
        fill="none"
        opacity={dirty ? 0.8 : 0.5}
      />

      {/* Refleksi permukaan */}
      <path d="M0 214 q120 -6 240 0 q120 6 240 0 L480 224 L0 224 Z"
        fill={dirty ? '#5a6a78' : '#a5dcf0'}
        opacity={dirty ? 0.18 : 0.35}
      />

      {/* Ombak bergerak */}
      <motion.path
        d="M-240 242 q60 -8 120 0 q60 8 120 0 q60 -8 120 0 q60 8 120 0 L720 300 L-240 300 Z"
        fill={dirty ? '#12171c' : '#0369a1'} opacity={0.35}
        animate={animated ? { x: [0, -240] } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      <motion.path
        d="M-240 260 q60 -8 120 0 q60 8 120 0 q60 -8 120 0 q60 8 120 0 L720 300 L-240 300 Z"
        fill={dirty ? '#080c10' : '#024a7a'} opacity={0.4}
        animate={animated ? { x: [0, -240] } : {}}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      {/* Konten dalam air */}
      {dirty ? <DirtyContent animated={animated} /> : <CleanContent animated={animated} />}

      {/* Bank depan (foreground) */}
      <path d="M0 300 L0 278 q60 -6 120 -2 q60 4 120 -1 q60 -5 120 0 q60 5 120 -3 L480 300 Z"
        fill={dirty ? '#3a2a18' : '#2d5a1a'} opacity={0.9} />

      {/* Burung (versi bersih) */}
      {!dirty && animated && (
        <>
          <motion.g
            initial={{ x: -60 }}
            animate={{ x: [-60, 540], y: [0, -18, 0] }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
          >
            <path d="M0 68 q6 -5 12 0 q6 -5 12 0" stroke="#1e293b" strokeWidth="1.6" fill="none" opacity={0.65} strokeLinecap="round" />
          </motion.g>
          <motion.g
            initial={{ x: -100 }}
            animate={{ x: [-100, 580], y: [0, -12, 0] }}
            transition={{ duration: 34, delay: -8, repeat: Infinity, ease: 'linear' }}
          >
            <path d="M0 88 q5 -4 10 0 q5 -4 10 0" stroke="#1e293b" strokeWidth="1.4" fill="none" opacity={0.5} strokeLinecap="round" />
          </motion.g>
        </>
      )}
    </svg>
  );
}

/* ============================================================
   IKAN — pakai SVG native <animateTransform>
   Struktur berlapis:
     <g transform="translate(0, y)">              ← Y
       <g>  <animateTransform translate X />       ← Gerak horizontal
         <g>  <animateTransform scale flip />      ← Berbalik arah
           <fish body centered at (0,0) />
         </g>
       </g>
     </g>
   ============================================================ */
function Fish({
  color, finColor, size, duration, delay, y, animated,
}: {
  color: string;
  finColor: string;
  size: number;
  duration: number;
  delay: number;
  y: number;
  animated: boolean;
}) {
  const body = (
    <>
      <ellipse cx="0" cy="0" rx={13 * size} ry={6.5 * size} fill={color} />
      <ellipse cx="-1" cy={-2 * size} rx={9 * size} ry={2.5 * size} fill="#fff" opacity={0.25} />
      <path d={`M${-13 * size} 0 l${-7 * size} ${-5 * size} l0 ${10 * size} Z`} fill={finColor} />
      <path d={`M0 ${-6 * size} l${3 * size} ${-5 * size} l${4 * size} ${5 * size} Z`} fill={finColor} />
      <path d={`M0 ${6 * size} l${2 * size} ${4 * size} l${4 * size} ${-4 * size} Z`} fill={finColor} opacity={0.85} />
      <circle cx={8 * size} cy={-1.5 * size} r={1.6 * size} fill="#fff" />
      <circle cx={8.5 * size} cy={-1.5 * size} r={1 * size} fill="#1e293b" />
    </>
  );

  // Versi statis (jika animated=false)
  if (!animated) {
    return (
      <g transform={`translate(180, ${y})`}>
        {body}
      </g>
    );
  }

  // Versi beranimasi
  return (
    <g transform={`translate(0, ${y})`}>
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="-100 0; 380 0; 380 0; -100 0; -100 0"
          keyTimes="0; 0.45; 0.5; 0.95; 1"
          dur={`${duration}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
        <g>
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1 1; 1 1; -1 1; -1 1; 1 1"
            keyTimes="0; 0.45; 0.5; 0.95; 1"
            dur={`${duration}s`}
            begin={`${delay}s`}
            repeatCount="indefinite"
          />
          {body}
        </g>
      </g>
    </g>
  );
}

/* ============================================================
   SUNGAI BERSIH
   ============================================================ */
function CleanContent({ animated }: { animated: boolean }) {
  return (
    <g>
      {/* Tanaman air */}
      <g opacity={0.9}>
        <path d="M38 250 q-4 -20 2 -30 q4 10 1 30 Z" fill="#3d8a3a" />
        <path d="M50 252 q-3 -18 4 -24 q3 8 0 24 Z" fill="#4a9a4d" />
        <ellipse cx="46" cy="224" rx="5" ry="3.5" fill="#6bb86e" />
        <path d="M62 254 q-2 -14 3 -20 q2 6 0 20 Z" fill="#4a9a4d" opacity={0.8} />
      </g>

      {/* Ikan — Y di dalam zona air (204–300) */}
      <Fish color="#f97316" finColor="#ea580c" size={1}   duration={14} delay={0}  y={234} animated={animated} />
      <Fish color="#fbbf24" finColor="#f59e0b" size={0.8} duration={18} delay={-7} y={260} animated={animated} />
      <Fish color="#f472b6" finColor="#ec4899" size={0.9} duration={16} delay={-3} y={278} animated={animated} />

      {/* Gelembung jernih */}
      {animated && [180, 290, 380].map((cx, i) => (
        <motion.circle
          key={cx}
          cx={cx} cy={260} r={2.2 + i * 0.3}
          fill="#fff" opacity={0.55}
          animate={{ cy: [260, 215], opacity: [0.55, 0] }}
          transition={{ duration: 5, delay: i * 1.4, repeat: Infinity }}
        />
      ))}
    </g>
  );
}

/* ============================================================
   SUNGAI TERCEMAR
   ============================================================ */
function DirtyContent({ animated }: { animated: boolean }) {
  return (
    <g>
      {/* Oli / lapisan minyak — 2 patch saja agar air tetap terlihat */}
      <ellipse cx="120" cy="220" rx="60" ry="7" fill="url(#oilSlick)" opacity={0.7} />
      <ellipse cx="360" cy="232" rx="55" ry="6" fill="url(#oilSlick)" opacity={0.65} />

      {/* Lumpur di dasar (subtle, tidak menutupi) */}
      <ellipse cx="150" cy="285" rx="70" ry="10" fill="#0a0805" opacity={0.6} />
      <ellipse cx="350" cy="290" rx="90" ry="12" fill="#0a0805" opacity={0.6} />

      {/* ===== SAMPAH MENGAPUNG ===== */}
      {/* Botol plastik */}
      <g transform="translate(90, 218) rotate(-15)">
        <rect x="-4" y="-10" width="8" height="20" rx="2" fill="#3b82f6" />
        <rect x="-3" y="-13" width="6" height="4" rx="1" fill="#1e40af" />
      </g>
      <g transform="translate(240, 226) rotate(20)">
        <rect x="-3.5" y="-9" width="7" height="18" rx="2" fill="#ef4444" />
        <rect x="-2.5" y="-12" width="5" height="3.5" rx="1" fill="#991b1b" />
      </g>
      <g transform="translate(415, 244) rotate(-8)">
        <rect x="-3" y="-8" width="6" height="16" rx="2" fill="#22c55e" />
        <rect x="-2" y="-11" width="4" height="3" rx="1" fill="#15803d" />
      </g>

      {/* Kaleng */}
      <g transform="translate(160, 245) rotate(25)">
        <rect x="-4" y="-7" width="8" height="14" rx="1.5" fill="#cbd5e1" />
        <ellipse cx="0" cy="-7" rx="4" ry="1.2" fill="#94a3b8" />
      </g>
      <g transform="translate(345, 262) rotate(-12)">
        <rect x="-3.5" y="-6" width="7" height="12" rx="1.5" fill="#fbbf24" />
      </g>

      {/* Kantong plastik */}
      <g transform="translate(200, 220)" opacity={0.85}>
        <path d="M-8 0 q-3 -6 2 -8 q4 -3 8 0 q3 2 6 0 q5 -2 3 4 q-1 4 -6 4 q-3 0 -5 -2 q-2 -1 -4 0 q-3 1 -4 2 Z" fill="#e5e7eb" />
      </g>
      <g transform="translate(375, 224)" opacity={0.8}>
        <path d="M-6 0 q-2 -5 2 -6 q3 -2 6 0 q2 1 4 0 q3 -1 2 3 q-1 3 -4 3 q-2 0 -4 -1 q-1 -1 -3 0 q-2 1 -3 1 Z" fill="#fecaca" />
      </g>

      {/* Ban bekas */}
      <g transform="translate(280, 250)">
        <ellipse cx="0" cy="0" rx="11" ry="5" fill="#1f2937" />
        <ellipse cx="0" cy="0" rx="5" ry="2" fill="#0f172a" />
      </g>

      {/* Styrofoam */}
      <g transform="translate(60, 254) rotate(-10)">
        <rect x="-9" y="-5" width="18" height="10" rx="1.5" fill="#f3f4f6" />
        <rect x="-6" y="-3" width="12" height="6" rx="1" fill="#e5e7eb" />
      </g>
      <g transform="translate(440, 268) rotate(12)">
        <rect x="-7" y="-4" width="14" height="8" rx="1" fill="#f9fafb" />
      </g>

      {/* Sachet */}
      <g transform="translate(310, 234) rotate(15)">
        <rect x="-6" y="-4" width="12" height="8" rx="1" fill="#dc2626" />
        <rect x="-6" y="-4" width="12" height="2" fill="#fbbf24" />
      </g>
      <g transform="translate(140, 268) rotate(-20)">
        <rect x="-5" y="-3.5" width="10" height="7" rx="1" fill="#a78bfa" />
      </g>

      {/* Ikan mati mengapung (perut ke atas) */}
      <g transform="translate(195, 240)">
        <ellipse cx="0" cy="0" rx="10" ry="4.5" fill="#94a3b8" />
        <ellipse cx="0" cy="-1" rx="7" ry="2.5" fill="#cbd5e1" />
        <path d="M-10 0 l-4 -3 l0 6 Z" fill="#94a3b8" />
        <circle cx="6" cy="0" r="1.2" fill="#475569" />
      </g>
      <g transform="translate(385, 256) rotate(8)">
        <ellipse cx="0" cy="0" rx="8" ry="3.5" fill="#a3a3a3" />
        <ellipse cx="0" cy="-0.5" rx="5" ry="2" fill="#d4d4d4" />
        <path d="M-8 0 l-3 -2 l0 4 Z" fill="#a3a3a3" />
        <circle cx="5" cy="0" r="1" fill="#525252" />
      </g>

      {/* Gelembung pembusukan */}
      {animated && [110, 190, 270, 350, 420].map((cx, i) => (
        <motion.circle
          key={cx}
          cx={cx} cy={275} r={2.5 + (i % 2) * 1}
          fill="#a3a3a3" opacity={0.5}
          animate={{ cy: [275, 225], opacity: [0.5, 0] }}
          transition={{ duration: 5, delay: i * 0.8, repeat: Infinity }}
        />
      ))}

      {/* Limbah cair dari pipa pabrik */}
      {animated && (
        <motion.g
          animate={{ x: [0, 50], opacity: [0, 0.75, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <ellipse cx="346" cy="204" rx="6" ry="3" fill="#5a3a20" />
          <ellipse cx="355" cy="206" rx="9" ry="3.5" fill="#4a2a18" opacity={0.8} />
          <ellipse cx="366" cy="208" rx="11" ry="4" fill="#3a2010" opacity={0.6} />
        </motion.g>
      )}

      {/* Buih hijau di tepi */}
      <ellipse cx="40" cy="280" rx="35" ry="5" fill="#4d5a2a" opacity={0.6} />
      <ellipse cx="450" cy="288" rx="40" ry="6" fill="#3d4a1f" opacity={0.55} />

      {/* Cabang busuk */}
      <g transform="translate(70, 268) rotate(-12)" opacity={0.75}>
        <path d="M-18 0 q9 -2 18 0 q9 2 18 0" stroke="#3a2418" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M-6 -1 q4 -3 8 -1" stroke="#2a1808" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}

/* ============================================================
   POHON TEPI SUNGAI
   ============================================================ */
function Tree({ x, y, h }: { x: number; y: number; h: number }) {
  const trunkH = h * 0.42;
  const crownR = h * 0.38;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <ellipse cx="0" cy="2" rx={crownR * 0.9} ry={crownR * 0.22} fill="#000" opacity={0.18} />
      <path d={`M-4 0 L-3 ${-trunkH} L3 ${-trunkH} L4 0 Z`} fill="#6b3f1e" />
      <ellipse cx="0" cy={-trunkH - crownR * 0.55} rx={crownR * 1.05} ry={crownR * 0.85} fill="#166534" />
      <ellipse cx={-crownR * 0.3} cy={-trunkH - crownR * 0.75} rx={crownR * 0.55} ry={crownR * 0.5} fill="#22c55e" opacity={0.9} />
      <ellipse cx={crownR * 0.35} cy={-trunkH - crownR * 0.6} rx={crownR * 0.4} ry={crownR * 0.35} fill="#4ade80" opacity={0.7} />
    </g>
  );
}