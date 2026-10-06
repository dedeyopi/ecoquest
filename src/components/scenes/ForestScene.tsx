import { motion } from 'framer-motion';

interface Props { cut?: boolean; animated?: boolean; }

export default function ForestScene({ cut = false, animated = true }: Props) {
  const trees = [
    { x: 55, y: 220, h: 105, delay: 0 },
    { x: 160, y: 228, h: 90, delay: 0.6 },
    { x: 290, y: 232, h: 118, delay: 1.2 },
    { x: 400, y: 226, h: 100, delay: 1.8 },
  ];

  return (
    <svg viewBox="0 0 480 300" className="w-full h-auto block rounded-2xl" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`fSky-${cut}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={cut ? '#d4a574' : '#87ceeb'} />
          <stop offset="100%" stopColor={cut ? '#f5e6c8' : '#d4eef7'} />
        </linearGradient>
        <linearGradient id={`fGround-${cut}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={cut ? '#b8a878' : '#6ba644'} />
          <stop offset="100%" stopColor={cut ? '#7a6a48' : '#3d6b1f'} />
        </linearGradient>
        <linearGradient id="trunkG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3d2515" />
          <stop offset="50%" stopColor="#6b3f1e" />
          <stop offset="100%" stopColor="#4a2c14" />
        </linearGradient>
        <radialGradient id="fSun">
          <stop offset="0%" stopColor="#fffbe0" />
          <stop offset="100%" stopColor="#f5c542" />
        </radialGradient>
      </defs>

      <rect width="480" height="300" fill={`url(#fSky-${cut})`} />

      {/* Matahari */}
      <circle cx="400" cy="52" r="34" fill="#fff9c4" opacity={0.35} />
      <motion.circle
        cx="400" cy="52" r="24" fill="url(#fSun)"
        animate={animated ? { scale: [1, 1.06, 1] } : {}}
        transition={{ duration: 3.4, repeat: Infinity }}
        style={{ transformOrigin: '400px 52px' }}
      />

      {/* Awan */}
      <motion.g
        animate={animated ? { x: [-120, 600] } : {}}
        transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
        opacity={0.75}
      >
        <ellipse cx="100" cy="46" rx="34" ry="10" fill="#fff" />
        <ellipse cx="80" cy="52" rx="22" ry="7" fill="#fff" />
      </motion.g>

      {/* Bukit jauh */}
      <path d="M0 200 L80 168 L160 188 L240 160 L340 182 L420 158 L480 178 L480 220 L0 220 Z"
        fill={cut ? '#c8b898' : '#5a8a3a'} opacity={0.45} />

      {/* Tanah */}
      <rect y="200" width="480" height="100" fill={`url(#fGround-${cut})`} />

      {cut ? (
        <>
          {/* Tunggul dengan bekas tebangan yang jelas */}
          {[
            { x: 70,  h: 42, angle: -8 },
            { x: 150, h: 36, angle: 5 },
            { x: 250, h: 40, angle: -3 },
            { x: 340, h: 34, angle: 6 },
            { x: 420, h: 38, angle: -5 },
          ].map((s, k) => (
            <g key={k} transform={`translate(${s.x}, 210)`}>
              {/* Bayangan */}
              <ellipse cx="0" cy="2" rx={s.h * 0.55} ry={s.h * 0.18} fill="#000" opacity={0.25} />
              {/* Badan tunggul */}
              <path d={`M${-s.h * 0.5} 0 L${-s.h * 0.4} ${-s.h * 0.9} Q0 ${-s.h * 0.95} ${s.h * 0.4} ${-s.h * 0.9} L${s.h * 0.5} 0 Z`}
                fill="url(#trunkG)" />
              {/* Serat batang */}
              <path d={`M${-s.h * 0.3} 0 L${-s.h * 0.25} ${-s.h * 0.85}`} stroke="#2a1808" strokeWidth="0.7" opacity={0.5} />
              <path d={`M${s.h * 0.2} 0 L${s.h * 0.18} ${-s.h * 0.85}`} stroke="#2a1808" strokeWidth="0.7" opacity={0.5} />
              {/* Permukaan potongan (top face) */}
              <ellipse cx="0" cy={-s.h * 0.9} rx={s.h * 0.42} ry={s.h * 0.13} fill="#c99562" />
              <ellipse cx="0" cy={-s.h * 0.9} rx={s.h * 0.3} ry={s.h * 0.09} fill="#a87a48" />
              {/* Cincin tahun */}
              <ellipse cx="0" cy={-s.h * 0.9} rx={s.h * 0.15} ry={s.h * 0.04} fill="none" stroke="#7a5a30" strokeWidth="0.5" />
            </g>
          ))}

          {/* Serbuk kayu di tanah */}
          <ellipse cx="150" cy="245" rx="22" ry="4" fill="#c99562" opacity={0.6} />
          <ellipse cx="340" cy="255" rx="18" ry="3" fill="#c99562" opacity={0.5} />

          {/* Excavator bergerak */}
          <motion.g
            initial={{ x: -80 }}
            animate={animated ? { x: [-80, 380, -80] } : {}}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transform: 'translateY(200px)' }}
          >
            {/* Body */}
            <rect x="0" y="-18" width="44" height="18" rx="3" fill="#d97706" />
            <rect x="0" y="-18" width="44" height="6" rx="3" fill="#f59e0b" />
            {/* Kabin */}
            <rect x="6" y="-26" width="26" height="10" rx="1.5" fill="#f59e0b" />
            <rect x="9" y="-24" width="20" height="6" rx="1" fill="#60a5fa" opacity={0.9} />
            {/* Roda */}
            <circle cx="8" cy="2" r="5" fill="#1e293b" />
            <circle cx="8" cy="2" r="2" fill="#64748b" />
            <circle cx="36" cy="2" r="5" fill="#1e293b" />
            <circle cx="36" cy="2" r="2" fill="#64748b" />
            {/* Lengan excavator */}
            <path d="M44 -12 L58 -22 L70 -14" stroke="#d97706" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M70 -14 L78 -18 L80 -8 L74 -4 Z" fill="#78350f" />
          </motion.g>

          {/* Asap mesin */}
          {animated && (
            <motion.ellipse
              cx="280" cy="185" rx="12" ry="7" fill="#94a3b8" opacity={0.5}
              animate={{ cy: [185, 140], opacity: [0.5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          )}

          {/* Area gundul */}
          <ellipse cx="360" cy="240" rx="60" ry="18" fill="#8a7a5c" opacity={0.6} />
          <ellipse cx="120" cy="260" rx="50" ry="14" fill="#8a7a5c" opacity={0.5} />

          {/* Burung menjauh (indikasi habitat terganggu) */}
          {animated && (
            <motion.g
              initial={{ x: 200 }}
              animate={{ x: [200, 600] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            >
              <path d="M0 60 q6 -5 12 0 q6 -5 12 0" stroke="#3a2a1a" strokeWidth="1.6" fill="none" opacity={0.6} strokeLinecap="round" />
            </motion.g>
          )}
        </>
      ) : (
        <>
          {/* Pohon realistis */}
          {trees.map((t, i) => (
            <Tree key={i} x={t.x} y={t.y} h={t.h} />
          ))}

          {/* Semak kecil */}
          <ellipse cx="240" cy="265" rx="22" ry="10" fill="#2d7a3e" />
          <ellipse cx="245" cy="262" rx="14" ry="7" fill="#3d9a52" />
          <ellipse cx="60" cy="272" rx="18" ry="8" fill="#2d7a3e" />

          {/* Kupu-kupu terbang (non-linear dengan easeInOut) */}
          {animated && (
            <motion.g
              animate={{
                x: [-40, 400, -40],
                y: [0, -30, 0],
              }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transform: 'translate(160px, 220px)' }}
            >
              <motion.ellipse
                cx="-3" cy="0" rx="4" ry="3" fill="#f472b6"
                animate={{ rx: [4, 2, 4] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              />
              <motion.ellipse
                cx="3" cy="0" rx="4" ry="3" fill="#fbbf24"
                animate={{ rx: [4, 2, 4] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              />
            </motion.g>
          )}

          {/* Burung */}
          {animated && (
            <motion.g
              initial={{ x: -60 }}
              animate={{ x: [-60, 540], y: [0, -18, 0] }}
              transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
            >
              <path d="M0 68 q6 -5 12 0 q6 -5 12 0" stroke="#1e293b" strokeWidth="1.6" fill="none" opacity={0.7} strokeLinecap="round" />
            </motion.g>
          )}
        </>
      )}
    </svg>
  );
}

function Tree({ x, y, h }: { x: number; y: number; h: number }) {
  const trunkH = h * 0.45;
  const crownR = h * 0.38;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <ellipse cx="0" cy="2" rx={crownR * 0.9} ry={crownR * 0.22} fill="#000" opacity={0.18} />
      {/* Batang */}
      <path d={`M-4 0 L-3 ${-trunkH} L3 ${-trunkH} L4 0 Z`} fill="url(#trunkG)" />
      <path d={`M-2 ${-trunkH * 0.5} L0 ${-trunkH * 0.45} L2 ${-trunkH * 0.5}`} stroke="#2a1808" strokeWidth="0.6" fill="none" opacity={0.6} />
      {/* Dedaunan */}
      <ellipse cx="0" cy={-trunkH - crownR * 0.55} rx={crownR * 1.05} ry={crownR * 0.85} fill="#166534" />
      <ellipse cx={-crownR * 0.3} cy={-trunkH - crownR * 0.75} rx={crownR * 0.55} ry={crownR * 0.5} fill="#22c55e" opacity={0.9} />
      <ellipse cx={crownR * 0.35} cy={-trunkH - crownR * 0.6} rx={crownR * 0.4} ry={crownR * 0.35} fill="#4ade80" opacity={0.7} />
    </g>
  );
}