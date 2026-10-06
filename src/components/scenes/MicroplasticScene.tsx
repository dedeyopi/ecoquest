import { motion } from 'framer-motion';

interface Props { animated?: boolean; }

export default function MicroplasticScene({ animated = true }: Props) {
  const particles = Array.from({ length: 55 }, (_, k) => {
    const x = (k * 71) % 470 + 5;
    const y = (k * 47) % 240 + 10;
    const r = 1 + (k % 4) * 0.7;
    const colors = ['#f87171', '#fbbf24', '#34d399', '#e5e7eb', '#60a5fa', '#a78bfa'];
    return { id: k, x, y, r, color: colors[k % colors.length], dur: 3 + (k % 5), delay: -(k % 7) };
  });

  return (
    <svg viewBox="0 0 480 260" className="w-full h-auto block rounded-2xl" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="mpWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#0c4a6e" />
        </linearGradient>
      </defs>
      <rect width="480" height="260" fill="url(#mpWater)" />
      <ellipse cx="240" cy="30" rx="200" ry="40" fill="#fff" opacity={0.15} />

      {particles.map((p) => (
        <motion.circle
          key={p.id}
          cx={p.x} cy={p.y} r={p.r}
          fill={p.color} opacity={0.75}
          animate={animated ? { cy: [p.y, p.y - 8, p.y], cx: [p.x, p.x + 5, p.x] } : {}}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Gelembung */}
      {animated && [80, 380, 200].map((cx, i) => (
        <motion.circle
          key={cx}
          cx={cx} cy={240} r={3 + i}
          fill="#fff" opacity={0.5}
          animate={{ cy: [240, 100], opacity: [0.5, 0] }}
          transition={{ duration: 5, delay: i * 1.2, repeat: Infinity }}
        />
      ))}

      <text x="16" y="248" fontSize="12" fill="#e0f2fe" fontWeight="600">
        Partikel mikroplastik (&lt; 5 mm) — ilustrasi skematik
      </text>
    </svg>
  );
}