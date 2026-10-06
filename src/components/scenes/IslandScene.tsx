import { motion } from 'framer-motion';

interface Props { forest?: number; poll?: number; animated?: boolean; }

export default function IslandScene({ forest = 70, poll = 20, animated = true }: Props) {
  const trees = Math.max(1, Math.round(forest / 20));
  const isPoll = poll > 45;

  return (
    <svg viewBox="0 0 480 300" className="w-full h-auto block rounded-2xl" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="iSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={isPoll ? '#a8a29e' : '#87ceeb'} />
          <stop offset="100%" stopColor={isPoll ? '#d6d3d1' : '#d4eef7'} />
        </linearGradient>
        <linearGradient id="iSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={isPoll ? '#4a5a68' : '#0ea5e9'} />
          <stop offset="100%" stopColor={isPoll ? '#2a3a48' : '#075985'} />
        </linearGradient>
        <linearGradient id="iIsl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={isPoll ? '#8a9a4a' : '#86efac'} />
          <stop offset="100%" stopColor={isPoll ? '#4a5a1a' : '#166534'} />
        </linearGradient>
      </defs>

      <rect width="480" height="300" fill="url(#iSky)" />
      <motion.circle
        cx="410" cy="46" r="22" fill="#fde68a"
        animate={animated ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 3.4, repeat: Infinity }}
        style={{ transformOrigin: '410px 46px' }}
      />

      {/* Awan drift */}
      <motion.g
        animate={animated ? { x: [-100, 580] } : {}}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        opacity={0.8}
      >
        <ellipse cx="90" cy="44" rx="34" ry="10" fill="#fff" />
        <ellipse cx="70" cy="50" rx="22" ry="7" fill="#fff" />
      </motion.g>

      {/* Laut */}
      <rect y="150" width="480" height="150" fill="url(#iSea)" />

      {/* Ombak */}
      <motion.path
        d="M-240 170 q60 -6 120 0 q60 6 120 0 q60 -6 120 0 q60 6 120 0 L720 300 L-240 300 Z"
        fill={isPoll ? '#4a5a68' : '#0ea5e9'} opacity={0.45}
        animate={animated ? { x: [0, -240] } : {}}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
      />

      {/* Pulau */}
      <ellipse cx="240" cy="196" rx={100 + forest * 0.5} ry="46" fill="url(#iIsl)" />
      <ellipse cx="240" cy="212" rx={95 + forest * 0.45} ry="28" fill="#fde68a" opacity={0.85} />

      {/* Pohon */}
      {Array.from({ length: trees }, (_, k) => {
        const x = 170 + (k * 32) % 150;
        const y = 195 + (k % 2) * 8;
        return (
          <g key={k} transform={`translate(${x}, ${y})`}>
            <ellipse cx="0" cy="2" rx="16" ry="3" fill="#000" opacity={0.2} />
            <rect x="-3" y="-20" width="6" height="20" fill="#6b3f1e" />
            <ellipse cx="0" cy="-28" rx="16" ry="14" fill={isPoll ? '#3a4a1a' : '#166534'} />
            <ellipse cx="-4" cy="-30" rx="10" ry="9" fill={isPoll ? '#4a5a2a' : '#22c55e'} />
          </g>
        );
      })}

      {/* Pencemaran */}
      {isPoll && animated && (
        <motion.ellipse
          cx="148" cy="160" rx="8" ry="5" fill="#6b7280" opacity={0.6}
          animate={{ cy: [160, 120], opacity: [0.6, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      )}
      {isPoll && (
        <g transform="translate(140, 170)">
          <rect x="0" y="14" width="40" height="22" fill="#6b7280" />
          <rect x="6" y="0" width="8" height="14" fill="#4b5563" />
        </g>
      )}

      {/* Burung */}
      {!isPoll && animated && (
        <motion.g
          initial={{ x: -60 }}
          animate={{ x: [-60, 540] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        >
          <path d="M0 82 q5 -4 10 0 q5 -4 10 0" stroke="#1e293b" strokeWidth="1.5" fill="none" opacity={0.7} strokeLinecap="round" />
        </motion.g>
      )}
    </svg>
  );
}