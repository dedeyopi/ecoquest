import { motion } from 'framer-motion';

interface WaterState {
  limbah?: number;
  kekeruh?: number;
  ph?: number;
  oksigen?: number;
  organik?: number;
}

interface Props { state?: WaterState; animated?: boolean; }

function lerpColor(c1: string, c2: string, t: number): string {
  const hex = (h: string) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const [r1, g1, b1] = hex(c1), [r2, g2, b2] = hex(c2);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

export default function WaterQualityScene({ state = {}, animated = true }: Props) {
  const { limbah = 20, kekeruh = 15, ph = 7, oksigen = 8, organik = 15 } = state;

  let score = 100;
  score -= limbah * 0.30;
  score -= kekeruh * 0.22;
  score -= Math.abs(ph - 7) * 7;
  score -= Math.max(0, 8 - oksigen) * 8;
  score -= organik * 0.18;
  score = Math.max(0, Math.min(100, score));
  const norm = score / 100;

  const waterTop = lerpColor('#7ec8e3', '#6b5540', 1 - norm);
  const waterMid = lerpColor('#3ba3d0', '#4a3828', 1 - norm);
  const waterBot = lerpColor('#0369a1', '#2a1e12', 1 - norm);
  const skyTop = lerpColor('#87ceeb', '#a8a29e', 1 - norm);
  const skyBot = lerpColor('#d4eef7', '#d6d3d1', 1 - norm);

  const hasFish = score >= 55;
  const hasManyFish = score >= 75;
  const hasPlants = score >= 45;
  const hasLitter = score <= 60;
  const hasSmoke = score <= 45;
  const litterCount = Math.round((1 - norm) * 6);

  return (
    <svg viewBox="0 0 480 300" className="w-full h-auto block rounded-2xl" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="wqSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={skyTop} />
          <stop offset="100%" stopColor={skyBot} />
        </linearGradient>
        <linearGradient id="wqWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={waterTop} />
          <stop offset="55%" stopColor={waterMid} />
          <stop offset="100%" stopColor={waterBot} />
        </linearGradient>
      </defs>

      <rect width="480" height="300" fill="url(#wqSky)" />

      {/* Matahari */}
      <motion.circle
        cx="400" cy="52" r="22" fill="#f5c542"
        opacity={0.5 + norm * 0.5}
        animate={animated ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 3.4, repeat: Infinity }}
        style={{ transformOrigin: '400px 52px' }}
      />

      {/* Awan */}
      <motion.g
        animate={animated ? { x: [-100, 580] } : {}}
        transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
        opacity={0.75}
      >
        <ellipse cx="100" cy="48" rx="38" ry="11" fill="#fff" />
        <ellipse cx="80" cy="54" rx="24" ry="8" fill="#fff" />
      </motion.g>

      {/* Bukit */}
      <path
        d="M0 160 L70 115 L130 145 L200 108 L280 148 L350 122 L420 155 L480 138 L480 190 L0 190 Z"
        fill={norm > 0.5 ? '#5a8a3a' : '#8a7a5c'}
        opacity={0.4 + norm * 0.25}
      />

      {/* Bank */}
      <rect y="188" width="480" height="26" fill={norm > 0.5 ? '#6ba644' : '#8a7a5c'} />

      {/* Pohon tepi */}
      {norm > 0.4 && (
        <g transform="translate(45, 195)">
          <path d="M-3 0 L-2 -22 L2 -22 L3 0 Z" fill="#6b3f1e" />
          <ellipse cx="0" cy="-34" rx="18" ry="16" fill="#166534" />
          <ellipse cx="-4" cy="-36" rx="12" ry="10" fill="#22c55e" />
        </g>
      )}

      {/* Air */}
      <path d="M0 205 q60 -5 120 0 q60 5 120 0 q60 -5 120 0 q60 5 120 0 L480 300 L0 300 Z"
        fill="url(#wqWater)" />

      {/* Ombak */}
      <motion.path
        d="M-240 240 q60 -6 120 0 q60 6 120 0 q60 -6 120 0 q60 6 120 0 L720 300 L-240 300 Z"
        fill={waterBot} opacity={0.3}
        animate={animated ? { x: [0, -240] } : {}}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
      />

      {/* Sampah */}
      {hasLitter && Array.from({ length: litterCount }, (_, k) => {
        const x = 40 + k * 68 + (k % 2) * 15;
        const y = 225 + (k * 13) % 40;
        const colors = ['#e5e7eb', '#ef4444', '#f59e0b', '#475569', '#a3a3a3', '#dc2626'];
        return (
          <ellipse key={k} cx={x} cy={y} rx={6 + k % 3} ry={2 + k % 2}
            fill={colors[k % colors.length]} opacity={0.9} />
        );
      })}

      {/* Gelembung */}
      {hasLitter && animated && [150, 280].map((cx, i) => (
        <motion.circle
          key={cx} cx={cx} cy={240} r={2.5 + i * 0.5}
          fill="#e5e7eb" opacity={0.5}
          animate={{ cy: [240, 180], opacity: [0.5, 0] }}
          transition={{ duration: 5, delay: i * 1.5, repeat: Infinity }}
        />
      ))}

      {/* Ikan */}
      {hasFish && animated && (
        <>
          <motion.g
            animate={{ x: [-120, 200, 200, -120] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ellipse cx="220" cy="238" rx={hasManyFish ? 12 : 8} ry={hasManyFish ? 6 : 4}
              fill="#f97316" opacity={norm} />
            <path d="M208 238 l-6 -4 l0 8 Z" fill="#ea580c" opacity={norm} />
            <circle cx="229" cy="236" r="1.5" fill="#1e293b" opacity={norm} />
          </motion.g>
          {hasManyFish && (
            <>
              <motion.g
                animate={{ x: [-100, 300, 300, -100] }}
                transition={{ duration: 18, delay: -5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ellipse cx="330" cy="248" rx="10" ry="5" fill="#fbbf24" opacity={norm} />
                <path d="M320 248 l-5 -3 l0 6 Z" fill="#f59e0b" opacity={norm} />
                <circle cx="338" cy="247" r="1.3" fill="#1e293b" opacity={norm} />
              </motion.g>
              <motion.g
                animate={{ x: [-80, 240, 240, -80] }}
                transition={{ duration: 16, delay: -9, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ellipse cx="120" cy="252" rx="9" ry="4.5" fill="#f472b6" opacity={norm} />
                <path d="M111 252 l-5 -3 l0 6 Z" fill="#ec4899" opacity={norm} />
              </motion.g>
            </>
          )}
        </>
      )}

      {/* Ikan sekarat */}
      {!hasFish && hasLitter && (
        <ellipse cx="230" cy="245" rx="9" ry="4" fill="#94a3b8" opacity={0.5} />
      )}

      {/* Tanaman air */}
      {hasPlants && (
        <g opacity={0.5 + norm * 0.5}>
          <path d="M50 255 q-3 -18 2 -26 q3 8 1 26 Z" fill="#3d8a3a" />
          <path d="M60 258 q-2 -16 3 -22 q2 6 0 22 Z" fill="#4a9a4d" />
        </g>
      )}

      {/* Asap pabrik */}
      {hasSmoke && animated && (
        <motion.ellipse
          cx="400" cy="135" rx="10" ry="6" fill="#6b7280"
          opacity={(1 - norm) * 0.7}
          animate={{ cy: [135, 90], opacity: [(1 - norm) * 0.7, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      )}

      {/* Bank depan */}
      <path d="M0 300 L0 278 q60 -6 120 -2 q60 4 120 -1 q60 -5 120 0 q60 5 120 -3 L480 300 Z"
        fill={norm > 0.5 ? '#2d5a1a' : '#4a3a28'} opacity={0.85} />
    </svg>
  );
}