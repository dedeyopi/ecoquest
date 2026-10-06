import { motion } from 'framer-motion';

interface Props { animated?: boolean; }

export default function VolcanoScene({ animated = true }: Props) {
  return (
    <svg viewBox="0 0 480 300" className="w-full h-auto block rounded-2xl" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="vSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c2d12" />
          <stop offset="40%" stopColor="#c2410c" />
          <stop offset="75%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#fed7aa" />
        </linearGradient>
        <linearGradient id="vMtn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a4a4a" />
          <stop offset="50%" stopColor="#3a3530" />
          <stop offset="100%" stopColor="#1f1a15" />
        </linearGradient>
        <linearGradient id="vMtnL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a5550" />
          <stop offset="100%" stopColor="#2a2520" />
        </linearGradient>
        <radialGradient id="vCrater" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="40%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </radialGradient>
        <linearGradient id="vLava" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="vGround" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a3a2a" />
          <stop offset="100%" stopColor="#1f1812" />
        </linearGradient>
        <radialGradient id="vGlow">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Langit merah vulkanik */}
      <rect width="480" height="300" fill="url(#vSky)" />

      {/* Glow dari kawah */}
      <motion.circle
        cx="240" cy="100" r="120" fill="url(#vGlow)"
        animate={animated ? { opacity: [0.5, 0.9, 0.5], scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ transformOrigin: '240px 100px' }}
      />

      {/* Asap besar vulkanik */}
      {animated && [0, 1, 2, 3].map((i) => (
        <motion.ellipse
          key={i}
          cx={240 + (i - 1.5) * 22}
          cy={50}
          rx={38 - i * 4}
          ry={18 - i * 2}
          fill={['#4a4a4a', '#6b6b6b', '#8a8a8a', '#a3a3a3'][i]}
          opacity={0.75 - i * 0.08}
          animate={{
            cy: [50, -10, -70],
            cx: [240 + (i - 1.5) * 22, 240 + (i - 1.5) * 30, 240 + (i - 1.5) * 45],
            scale: [1, 1.6, 2.4],
            opacity: [0.75 - i * 0.08, 0.5, 0],
          }}
          transition={{ duration: 9, delay: i * 1.6, repeat: Infinity }}
        />
      ))}

      {/* Gunung jauh (siluet) */}
      <path d="M-20 240 L80 130 L180 240 Z" fill="#5a3a2a" opacity={0.5} />
      <path d="M300 240 L400 140 L500 240 Z" fill="#5a3a2a" opacity={0.5} />

      {/* Gunung utama — bentuk kerucut dengan sisi bervariasi */}
      <path d="M110 240 Q150 200 200 110 L220 90 L260 90 L280 110 Q330 200 370 240 Z" fill="url(#vMtn)" />
      {/* Highlight kiri (cahaya dari kiri) */}
      <path d="M110 240 Q150 200 200 110 L220 90 L230 92 Q200 130 170 190 L130 240 Z" fill="url(#vMtnL)" opacity={0.7} />
      {/* Retakan/uratan batuan */}
      <path d="M180 200 L200 170 L210 180 L195 210 Z" fill="#1a1510" opacity={0.5} />
      <path d="M280 195 L300 165 L310 180 L290 215 Z" fill="#1a1510" opacity={0.45} />
      <path d="M150 235 L165 210 L175 225 L160 240 Z" fill="#1a1510" opacity={0.4} />

      {/* Kawah */}
      <ellipse cx="240" cy="92" rx="38" ry="12" fill="#1a0f0a" />
      <ellipse cx="240" cy="92" rx="34" ry="10" fill="#3a1a10" />
      <motion.ellipse
        cx="240" cy="92" rx="26" ry="7" fill="url(#vCrater)"
        animate={animated ? { opacity: [0.7, 1, 0.7], scale: [1, 1.08, 1] } : {}}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{ transformOrigin: '240px 92px' }}
      />

      {/* Semburan lava keluar dari kawah */}
      {animated && [0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={240 + (i - 1) * 8}
          cy={86}
          r={3}
          fill="#fbbf24"
          animate={{
            cy: [86, 40, -20],
            cx: [240 + (i - 1) * 8, 240 + (i - 1) * 15, 240 + (i - 1) * 20],
            opacity: [1, 0.7, 0],
            scale: [1, 0.6, 0.3],
          }}
          transition={{ duration: 3, delay: i * 0.8, repeat: Infinity }}
        />
      ))}

      {/* Aliran lava di sisi gunung */}
      <path d="M230 95 Q225 130 215 165 Q210 195 200 220" stroke="url(#vLava)" strokeWidth="4" fill="none" strokeLinecap="round" opacity={0.9} />
      <path d="M250 95 Q258 125 270 155 Q278 185 285 215" stroke="url(#vLava)" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity={0.85} />
      <path d="M240 95 Q238 130 235 165 Q233 195 232 220" stroke="#f97316" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity={0.7} />

      {/* Tanah/gunung kecil di depan */}
      <path d="M0 240 L80 200 L180 240 Z" fill="#3a2a1a" opacity={0.6} />
      <path d="M280 240 L400 195 L480 240 Z" fill="#3a2a1a" opacity={0.6} />
      <rect y="238" width="480" height="62" fill="url(#vGround)" />

      {/* Batu vulkanik */}
      <ellipse cx="60" cy="260" rx="14" ry="5" fill="#2a1a10" />
      <ellipse cx="90" cy="270" rx="10" ry="4" fill="#3a2418" />
      <ellipse cx="420" cy="255" rx="12" ry="4" fill="#2a1a10" />
      <ellipse cx="440" cy="268" rx="9" ry="3" fill="#3a2418" />

      {/* Burung menjauh (siluet kecil) */}
      {animated && (
        <motion.g
          initial={{ x: 480 }}
          animate={{ x: [480, -60] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          <path d="M0 70 q6 -5 12 0 q6 -5 12 0" stroke="#1a0f0a" strokeWidth="1.6" fill="none" opacity={0.7} strokeLinecap="round" />
        </motion.g>
      )}
    </svg>
  );
}