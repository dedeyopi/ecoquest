import { motion } from 'framer-motion';

export default function EarthScene() {
  // Bintang-bintang dengan seed acak stabil
  const stars = Array.from({ length: 14 }, (_, i) => ({
    cx: (i * 137) % 480,
    cy: (i * 89) % 480,
    r: 1.2 + (i % 3) * 0.6,
    delay: (i * 0.4) % 3,
  }));

  return (
    <svg viewBox="0 0 480 480" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="earth-space" cx="50%" cy="45%" r="75%">
          <stop offset="0%" stopColor="#0f766e" />
          <stop offset="55%" stopColor="#064e3b" />
          <stop offset="100%" stopColor="#022c22" />
        </radialGradient>
        <radialGradient id="earth-globe" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="25%" stopColor="#7dd3fc" />
          <stop offset="55%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0c4a6e" />
        </radialGradient>
        <linearGradient id="earth-land" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="60%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <radialGradient id="earth-atmo" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#34d399" stopOpacity="0" />
          <stop offset="100%" stopColor="#34d399" stopOpacity=".35" />
        </radialGradient>
        <filter id="earth-glow">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <rect width="480" height="480" fill="url(#earth-space)" />

      {/* Bintang berkelip */}
      {stars.map((s, i) => (
        <motion.circle
          key={i}
          cx={s.cx} cy={s.cy} r={s.r}
          fill="#a7f3d0"
          animate={{ opacity: [.2, 1, .2] }}
          transition={{ duration: 2.8, delay: s.delay, repeat: Infinity }}
        />
      ))}

      {/* Cincin orbit */}
      <motion.circle
        cx="240" cy="240" r="164"
        fill="none" stroke="#34d399" strokeWidth="1.4"
        opacity=".45" strokeDasharray="7 11"
        style={{ transformOrigin: '240px 240px' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <motion.circle
        cx="240" cy="240" r="184"
        fill="none" stroke="#22d3ee" strokeWidth="1"
        opacity=".35" strokeDasharray="3 14"
        style={{ transformOrigin: '240px 240px' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />

      {/* Atmosfer berdenyut */}
      <motion.circle
        cx="240" cy="240" r="152"
        fill="url(#earth-atmo)"
        animate={{ opacity: [.7, 1, .7], scale: [1, 1.02, 1] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '240px 240px' }}
      />

      {/* Globe */}
      <g filter="url(#earth-glow)">
        <circle cx="240" cy="240" r="132" fill="url(#earth-globe)" />
        <path
          d="M150 200 q40 -34 92 -14 q36 14 66 -8 q26 26 -6 52 q-40 30 -96 14 q-46 -12 -56 -44 Z"
          fill="url(#earth-land)" opacity=".95"
        />
        <path
          d="M262 300 q46 -20 82 4 q12 30 -22 42 q-46 14 -72 -12 q-8 -18 12 -34 Z"
          fill="url(#earth-land)" opacity=".9"
        />
        <path
          d="M182 118 q34 -14 58 6 q-6 24 -38 24 q-28 -4 -20 -30 Z"
          fill="url(#earth-land)" opacity=".8"
        />
        {/* Highlight */}
        <ellipse cx="196" cy="176" rx="70" ry="44" fill="#ffffff" opacity=".18" />
        <circle cx="240" cy="240" r="132" fill="none" stroke="#bae6fd" strokeWidth="1.6" opacity=".65" />
      </g>
    </svg>
  );
}