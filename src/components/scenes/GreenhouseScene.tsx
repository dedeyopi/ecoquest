import { motion } from 'framer-motion';

interface Props {
  level?: number;
  animated?: boolean;
}

export default function GreenhouseScene({ level = 50, animated = true }: Props) {
  const p = Math.max(0, Math.min(1, level / 100));

  // Jumlah panas yang terperangkap (0-5) & yang lolos
  const trappedCount = Math.round(p * 5);
  const escapedCount = 5 - trappedCount;

  // Ketebalan lapisan gas
  const hazeOpacity = 0.08 + p * 0.55;
  const gasCount = Math.round(10 + p * 32);

  // Posisi
  const sunX = 60, sunY = 68;
  const groundY = 265;
  const groundX = [140, 200, 260, 320, 380]; // titik jatuh cahaya

  // ============ JALUR CAHAYA MATAHARI (dari matahari ke tanah) ============
  const solarPaths = groundX.map((gx, i) => {
    const cx = sunX + (gx - sunX) * 0.4;
    const cy = sunY + 80 + i * 10;
    return `M ${sunX + 25},${sunY + 20} Q ${cx},${cy} ${gx},${groundY}`;
  });

  // ============ JALUR PANAS YANG LOLOS (naik lurus ke atas) ============
  // Mengarah ke atas dengan sedikit melengkung ke kiri
  const escapePaths = groundX.map((gx, i) => {
    const topX = gx - 55 + (i - 2) * 8;
    const topY = 15;
    return `M ${gx},${groundY - 5} Q ${gx - 30},150 ${topX},${topY}`;
  });

  // ============ JALUR PANAS YANG TERPERANGKAP (naik lalu balik) ============
  // Bengkok seperti huruf U terbalik
  const trapPaths = groundX.map((gx, i) => {
    const peakX = gx - 22 + (i - 2) * 6;
    const peakY = 80 + Math.abs(i - 2) * 20;
    // Naik ke puncak lalu turun lagi ke tanah (sedikit bergeser)
    return `M ${gx},${groundY - 5} Q ${gx - 20},170 ${peakX},${peakY} Q ${peakX + 45},${peakY + 70} ${gx + 32},${groundY}`;
  });

  return (
    <svg viewBox="0 0 480 400" className="w-full h-auto block rounded-2xl" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Diagram efek rumah kaca beranimasi">
      <defs>
        {/* ==== SKY ==== */}
        <linearGradient id="ghSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0f1e" />
          <stop offset="15%" stopColor="#0c2a4a" />
          <stop offset="45%" stopColor="#1e6ca8" />
          <stop offset="100%" stopColor="#bae6fd" />
        </linearGradient>

        {/* ==== ATMOSFER HAZE ==== */}
        <linearGradient id="ghHaze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b45309" stopOpacity={hazeOpacity * 0.4} />
          <stop offset="20%" stopColor="#d97706" stopOpacity={hazeOpacity * 1.2} />
          <stop offset="60%" stopColor="#f59e0b" stopOpacity={hazeOpacity} />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity={hazeOpacity * 0.3} />
        </linearGradient>

        {/* ==== MATAHARI ==== */}
        <radialGradient id="ghSun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="40%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>

        {/* ==== TANAH ==== */}
        <linearGradient id="ghGround" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="40%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#166534" />
        </linearGradient>

        {/* ==== GLOW ==== */}
        <filter id="ghGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* ==== ARROW MARKERS (panah besar) ==== */}
        <marker id="arrowSolar" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 12 6 L 0 12 L 3 6 Z" fill="#fbbf24" />
        </marker>
        <marker id="arrowEscape" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 12 6 L 0 12 L 3 6 Z" fill="#f87171" />
        </marker>
        <marker id="arrowTrap" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 12 6 L 0 12 L 3 6 Z" fill="#dc2626" />
        </marker>

        {/* ==== PATH REFS for animateMotion ==== */}
        {solarPaths.map((d, i) => (
          <path key={`sp${i}`} id={`ghSolarPath${i}`} d={d} fill="none" />
        ))}
        {escapePaths.map((d, i) => (
          <path key={`ep${i}`} id={`ghEscapePath${i}`} d={d} fill="none" />
        ))}
        {trapPaths.map((d, i) => (
          <path key={`tp${i}`} id={`ghTrapPath${i}`} d={d} fill="none" />
        ))}
      </defs>

      {/* ============ SKY ============ */}
      <rect width="480" height="400" fill="url(#ghSky)" />

      {/* Bintang kecil di "luar angkasa" */}
      {animated && [30, 120, 230, 350, 420, 460].map((x, i) => (
        <motion.circle
          key={x}
          cx={x}
          cy={8 + (i % 3) * 8}
          r={1.2}
          fill="#e0f2fe"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.5 + i * 0.3, repeat: Infinity }}
        />
      ))}

      {/* ============ ATMOSFER HAZE ============ */}
      <rect width="480" height="290" fill="url(#ghHaze)" />

      {/* ============ PARTIKEL GAS RUMAH KACA (mengapung) ============ */}
      <g>
        {Array.from({ length: gasCount }, (_, k) => {
          const x = (k * 47 + 13) % 460 + 10;
          const y = 30 + (k * 31) % 230;
          const r = 1.5 + (k % 3) * 0.9;
          const dur = 4 + (k % 5) * 1.2;
          const delay = -(k * 0.45);
          return (
            <motion.circle
              key={k}
              cx={x}
              cy={y}
              r={r}
              fill="#fef3c7"
              opacity={0.5 + p * 0.4}
              animate={animated ? {
                cy: [y, y - 12, y],
                cx: [x, x + 6, x],
              } : {}}
              transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          );
        })}
      </g>

      {/* ============ MATAHARI ============ */}
      <g transform={`translate(${sunX}, ${sunY})`}>
        {animated && (
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          >
            {Array.from({ length: 16 }, (_, k) => {
              const angle = (k * 22.5) * Math.PI / 180;
              const x1 = Math.cos(angle) * 30;
              const y1 = Math.sin(angle) * 30;
              const x2 = Math.cos(angle) * 46;
              const y2 = Math.sin(angle) * 46;
              return (
                <line
                  key={k}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="#fcd34d" strokeWidth="2.5" strokeLinecap="round" opacity={0.75}
                />
              );
            })}
          </motion.g>
        )}
        <circle r="30" fill="#fcd34d" opacity={0.3} />
        <circle r="24" fill="url(#ghSun)" />
      </g>

      {/* ============================================================
         PANAS YANG KELUAR (digambar dulu agar tidak menutupi solar)
         - Yang LOLOS: panah panjang ke atas, dashed, merah muda
         - Yang TERPERANGKAP: panah bengkok balik, merah tua solid
         ============================================================ */}
      {groundX.map((gx, i) => {
        const isTrapped = i < trappedCount;
        const d = isTrapped ? trapPaths[i] : escapePaths[i];
        return (
          <path
            key={`heatPath${i}`}
            d={d}
            stroke={isTrapped ? '#dc2626' : '#f87171'}
            strokeWidth={isTrapped ? 3.5 : 2.8}
            fill="none"
            opacity={isTrapped ? 0.9 : 0.65}
            strokeLinecap="round"
            strokeDasharray={isTrapped ? '0' : '7 5'}
            markerEnd={isTrapped ? 'url(#arrowTrap)' : 'url(#arrowEscape)'}
          />
        );
      })}

      {/* ============================================================
         CAHAYA MATAHARI MASUK — panah kuning besar
         ============================================================ */}
      {solarPaths.map((d, i) => (
        <path
          key={`solarPath${i}`}
          d={d}
          stroke="#fbbf24"
          strokeWidth="4.5"
          fill="none"
          opacity={0.9}
          strokeLinecap="round"
          markerEnd="url(#arrowSolar)"
        />
      ))}

      {/* ============ FOTON BERGERAK — CAHAYA (kuning) ============ */}
      {animated && solarPaths.map((_, i) => (
        <circle
          key={`solarPhoton${i}`}
          r="5"
          fill="#fde047"
          filter="url(#ghGlow)"
          color="#fde047"
        >
          <animateMotion
            dur={`${2 + i * 0.15}s`}
            begin={`${-i * 0.4}s`}
            repeatCount="indefinite"
          >
            <mpath href={`#ghSolarPath${i}`} />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;1;0"
            dur={`${2 + i * 0.15}s`}
            begin={`${-i * 0.4}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* ============ FOTON BERGERAK — PANAS (merah) ============ */}
      {animated && groundX.map((_, i) => {
        const isTrapped = i < trappedCount;
        const pathId = isTrapped ? `ghTrapPath${i}` : `ghEscapePath${i}`;
        const dur = isTrapped ? 3.5 + i * 0.2 : 3 + i * 0.2;
        return (
          <circle
            key={`heatPhoton${i}`}
            r="4.5"
            fill="#ef4444"
            filter="url(#ghGlow)"
            color="#ef4444"
          >
            {isTrapped ? (
              <animateMotion
                dur={`${dur}s`}
                begin={`${-i * 0.4}s`}
                repeatCount="indefinite"
                keyPoints="0;0.5;0.5;1"
                keyTimes="0;0.35;0.55;1"
                calcMode="linear"
              >
                <mpath href={`#${pathId}`} />
              </animateMotion>
            ) : (
              <animateMotion
                dur={`${dur}s`}
                begin={`${-i * 0.4}s`}
                repeatCount="indefinite"
              >
                <mpath href={`#${pathId}`} />
              </animateMotion>
            )}
            <animate
              attributeName="opacity"
              values="0;1;1;1;0"
              dur={`${dur}s`}
              begin={`${-i * 0.4}s`}
              repeatCount="indefinite"
            />
          </circle>
        );
      })}

      {/* ============ TANAH MELENGKUNG ============ */}
      <path d="M 0,275 Q 240,245 480,275 L 480,400 L 0,400 Z" fill="url(#ghGround)" />
      <path d="M 0,275 Q 240,245 480,275" stroke="#86efac" strokeWidth="2.5" fill="none" opacity={0.6} />

      {/* Rumah */}
      <g transform="translate(218, 258)">
        <ellipse cx="17" cy="3" rx="22" ry="4" fill="#000" opacity="0.18" />
        <rect x="0" y="0" width="34" height="22" fill="#fef3c7" stroke="#92400e" strokeWidth="0.8" />
        <polygon points="-4,0 17,-16 38,0" fill="#dc2626" stroke="#7f1d1d" strokeWidth="0.8" />
        <rect x="14" y="10" width="8" height="12" fill="#78350f" />
        <rect x="4" y="6" width="6" height="6" fill="#60a5fa" stroke="#1e40af" strokeWidth="0.4" />
        <rect x="24" y="6" width="6" height="6" fill="#60a5fa" stroke="#1e40af" strokeWidth="0.4" />
      </g>

      {/* Pohon */}
      <g transform="translate(310, 262)">
        <ellipse cx="0" cy="2" rx="18" ry="3" fill="#000" opacity="0.2" />
        <rect x="-3" y="-22" width="6" height="22" fill="#6b3f1e" />
        <ellipse cx="0" cy="-30" rx="18" ry="16" fill="#166534" />
        <ellipse cx="-4" cy="-32" rx="12" ry="10" fill="#22c55e" />
        <ellipse cx="5" cy="-28" rx="8" ry="6" fill="#4ade80" opacity="0.7" />
      </g>

      {/* Heat shimmer dari tanah */}
      {animated && [180, 240, 300, 360].map((x, k) => (
        <motion.path
          key={x}
          stroke="#fb923c"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          d={`M ${x},265 Q ${x + 6},252 ${x},240`}
          animate={{
            d: [
              `M ${x},265 Q ${x + 6},252 ${x},240`,
              `M ${x},265 Q ${x - 6},252 ${x},240`,
              `M ${x},265 Q ${x + 6},252 ${x},240`,
            ],
            opacity: [0, 0.55, 0],
          }}
          transition={{ duration: 1.8, delay: -k * 0.4, repeat: Infinity }}
        />
      ))}

      {/* ============================================================
         LABEL & INDIKATOR
         ============================================================ */}
      {/* Label lapisan gas */}
      <g transform="translate(12, 12)">
        <rect x="0" y="0" width="180" height="24" rx="12" fill="rgba(15,23,42,0.75)" />
        <text x="90" y="17" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">
          Lapisan gas rumah kaca
        </text>
      </g>

      {/* Status badge di tengah atas */}
      {p < 0.3 && (
        <g transform="translate(240, 20)">
          <rect x="-105" y="0" width="210" height="26" rx="13" fill="rgba(16,185,129,0.9)" />
          <text x="0" y="17" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">
            ✅ Banyak panas lolos ke angkasa
          </text>
        </g>
      )}
      {p >= 0.3 && p < 0.65 && (
        <g transform="translate(240, 20)">
          <rect x="-125" y="0" width="250" height="26" rx="13" fill="rgba(217,119,6,0.9)" />
          <text x="0" y="17" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">
            ⚠️ Sebagian panas mulai terperangkap
          </text>
        </g>
      )}
      {p >= 0.65 && (
        <g transform="translate(240, 20)">
          <rect x="-135" y="0" width="270" height="26" rx="13" fill="rgba(220,38,38,0.92)" />
          <text x="0" y="17" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">
            🔥 Banyak panas terperangkap di atmosfer
          </text>
        </g>
      )}

      {/* Legend kiri bawah */}
      <g transform="translate(12, 340)">
        <rect x="0" y="0" width="200" height="50" rx="10" fill="rgba(15,23,42,0.75)" />
        <line x1="14" y1="16" x2="34" y2="16" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
        <text x="42" y="20" fontSize="11" fill="#fff" fontWeight="600">Cahaya Matahari</text>
        <line x1="14" y1="36" x2="34" y2="36" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" />
        <text x="42" y="40" fontSize="11" fill="#fff" fontWeight="600">Inframerah (panas)</text>
      </g>

      {/* Indikator kanan bawah */}
      <g transform="translate(268, 340)">
        <rect x="0" y="0" width="200" height="50" rx="10" fill="rgba(15,23,42,0.75)" />
        <text x="100" y="18" textAnchor="middle" fontSize="11" fill="#fef3c7" fontWeight="600">
          Energi terperangkap
        </text>
        <text x="100" y="40" textAnchor="middle" fontSize="18" fill="#fff" fontWeight="800">
          {Math.round(p * 100)}%
        </text>
      </g>

      {/* Info kecil: berapa lolos vs terperangkap */}
      <g transform="translate(240, 305)">
        <rect x="-110" y="-12" width="220" height="22" rx="11" fill="rgba(15,23,42,0.55)" />
        <text x="0" y="3" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">
          {escapedCount} lolos ke angkasa • {trappedCount} terperangkap
        </text>
      </g>
    </svg>
  );
}