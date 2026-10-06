import { motion } from 'framer-motion';

interface Props { animated?: boolean; }

export default function CityScene({ animated = true }: Props) {
  const buildings = [
    { x: 20,  y: 130, w: 55, h: 145, style: 'modern' },
    { x: 85,  y: 100, w: 45, h: 175, style: 'old' },
    { x: 140, y: 150, w: 60, h: 125, style: 'modern' },
    { x: 210, y: 80,  w: 52, h: 195, style: 'tower' },
    { x: 270, y: 145, w: 62, h: 130, style: 'old' },
    { x: 340, y: 118, w: 55, h: 157, style: 'modern' },
    { x: 405, y: 138, w: 60, h: 137, style: 'modern' },
  ];

  return (
    <svg viewBox="0 0 480 300" className="w-full h-auto block rounded-2xl" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="cSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="55%" stopColor="#bcc7d4" />
          <stop offset="100%" stopColor="#dce4ee" />
        </linearGradient>
        {buildings.map((b, i) => (
          <linearGradient key={i} id={`bld-${i}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={['#7a8694', '#8a95a3', '#6e7a88'][i % 3]} />
            <stop offset="55%" stopColor={['#94a3b8', '#a3afbd', '#8593a3'][i % 3]} />
            <stop offset="100%" stopColor={['#7a8694', '#8a95a3', '#6e7a88'][i % 3]} />
          </linearGradient>
        ))}
      </defs>

      <rect width="480" height="300" fill="url(#cSky)" />

      {/* Smog */}
      <ellipse cx="240" cy="80" rx="280" ry="60" fill="#cbd5e1" opacity={0.45} />

      {/* Gedung jauh */}
      <g opacity={0.4}>
        <rect x="0" y="140" width="35" height="80" fill="#8593a3" />
        <rect x="42" y="158" width="28" height="62" fill="#8593a3" />
        <rect x="380" y="150" width="30" height="70" fill="#8593a3" />
      </g>

      {/* Gedung utama + jendela berkelip */}
      {buildings.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={`url(#bld-${i})`} />
          <rect x={b.x + b.w - 6} y={b.y} width="6" height={b.h} fill="#4a5563" opacity={0.5} />
          <rect x={b.x - 2} y={b.y - 4} width={b.w + 4} height="4" fill="#5a6675" />
          {/* Jendela */}
          {Array.from({ length: Math.floor(b.w / 16) }, (_, c) =>
            Array.from({ length: Math.floor(b.h / 22) }, (_, r) => {
              const wx = b.x + 8 + c * 16;
              const wy = b.y + 12 + r * 22;
              const lit = (r + c + b.x) % 3 !== 0;
              return (
                <motion.rect
                  key={`${c}-${r}`}
                  x={wx} y={wy} width="9" height="13" rx="0.5"
                  fill={lit ? '#fde68a' : '#94a3b8'}
                  animate={lit && animated ? { opacity: [0.5, 1, 0.5] } : {}}
                  transition={{ duration: 3 + (r % 3), delay: (r * c) % 7 * 0.4, repeat: Infinity }}
                />
              );
            })
          )}
          {b.style === 'tower' && (
            <>
              <rect x={b.x + b.w / 2 - 1} y={b.y - 22} width="2" height="20" fill="#3a4453" />
              <motion.circle
                cx={b.x + b.w / 2} cy={b.y - 24} r="2.5" fill="#ef4444"
                animate={animated ? { opacity: [1, 0.2, 1] } : {}}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
            </>
          )}
        </g>
      ))}

      {/* Jalan */}
      <rect x="0" y="248" width="480" height="52" fill="#1e2833" />
      <rect x="0" y="248" width="480" height="5" fill="#94a3b8" />
      <rect x="0" y="272" width="480" height="3" fill="#e2e8f0" opacity={0.65} strokeDasharray="30 20" />

      {/* Mobil bergerak */}
      <motion.g
        initial={{ x: -80 }}
        animate={animated ? { x: [-80, 560] } : {}}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      >
        <rect x="60" y="278" width="52" height="14" rx="3" fill="#dc2626" />
        <path d="M72 278 L78 268 L96 268 L102 278 Z" fill="#dc2626" />
        <path d="M74 277 L79 270 L95 270 L99 277 Z" fill="#1e293b" opacity={0.85} />
        <rect x="108" y="280" width="4" height="4" rx="1" fill="#fde047" />
        <circle cx="72" cy="294" r="5" fill="#1e293b" />
        <circle cx="100" cy="294" r="5" fill="#1e293b" />
      </motion.g>

      {/* Asap pabrik */}
      {animated && [35, 60, 450].map((cx, i) => (
        <motion.ellipse
          key={cx}
          cx={cx} cy={90 + i * 3} rx={9 - i} ry={6 - i * 0.5}
          fill="#94a3b8" opacity={0.55}
          animate={{ cy: [90, 40], opacity: [0.6, 0], scale: [1, 1.7] }}
          transition={{ duration: 6, delay: i * 1.5, repeat: Infinity }}
        />
      ))}
    </svg>
  );
}