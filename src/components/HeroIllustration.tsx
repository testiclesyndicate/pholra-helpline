import React from 'react';

export const HeroIllustration: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  return (
    <svg
      viewBox="0 0 520 400"
      role="img"
      aria-label="Illustration of a farmer tending a green field with crops, a water drop and the sun"
      style={{ width: '100%', height: 'auto', ...style }}
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdf8ec" />
          <stop offset="100%" stopColor="#f6efdc" />
        </linearGradient>
        <linearGradient id="field" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c2410c" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id="hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>

      <rect width="520" height="400" rx="28" fill="url(#sky)" />

      {/* Sun and rays */}
      <circle cx="424" cy="86" r="34" fill="#f59e0b" opacity=".95" />
      <g stroke="#d97706" strokeWidth="5" strokeLinecap="round" opacity=".8">
        <line x1="424" y1="34" x2="424" y2="20" />
        <line x1="424" y1="138" x2="424" y2="152" />
        <line x1="372" y1="86" x2="358" y2="86" />
        <line x1="476" y1="86" x2="490" y2="86" />
        <line x1="387" y1="49" x2="377" y2="39" />
        <line x1="461" y1="123" x2="471" y2="133" />
        <line x1="461" y1="49" x2="471" y2="39" />
        <line x1="387" y1="123" x2="377" y2="133" />
      </g>

      {/* Clouds / Birds in distance */}
      <g stroke="#9a7b56" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M 80 80 Q 95 65 110 80 Q 125 65 140 80" />
        <path d="M 220 60 Q 232 48 244 60 Q 256 48 268 60" />
      </g>

      {/* Distant Hills - Golden Harvest Ridges */}
      <path d="M 0 260 Q 140 180 300 240 Q 420 190 520 230 L 520 400 L 0 400 Z" fill="url(#hill)" />

      {/* Main Terraced Field - Rich Fertile Soil */}
      <path d="M 0 290 Q 160 250 340 300 Q 440 280 520 310 L 520 400 L 0 400 Z" fill="url(#field)" />

      {/* Soil Furrows / Contours */}
      <path d="M 0 330 Q 180 295 380 345 Q 460 330 520 350" stroke="#451a03" strokeWidth="4" fill="none" opacity=".4" />
      <path d="M 0 365 Q 200 335 420 375 Q 480 365 520 380" stroke="#381502" strokeWidth="4" fill="none" opacity=".4" />

      {/* Crops Growing - Golden Wheat and Ripe Grain */}
      {[50, 110, 170, 230, 290, 350, 410, 470].map((x, i) => (
        <g key={i} transform={`translate(${x}, ${320 + (i % 2) * 15})`}>
          <path d="M 0 0 C -8 -15 -14 -25 0 -35 C 14 -25 8 -15 0 0" fill="#fde68a" stroke="#78350f" strokeWidth="2" />
          <path d="M 0 -8 C -18 -18 -18 -32 -6 -38 C -4 -25 0 -18 0 -8" fill="#fbbf24" />
          <path d="M 0 -8 C 18 -18 18 -32 6 -38 C 4 -25 0 -18 0 -8" fill="#f59e0b" />
        </g>
      ))}

      {/* Farmer Figure */}
      <g transform="translate(180, 175)">
        {/* Shadow */}
        <ellipse cx="28" cy="115" rx="36" ry="9" fill="#451a03" opacity=".35" />
        {/* Legs */}
        <rect x="18" y="70" width="8" height="40" rx="3" fill="#ffffff" />
        <rect x="30" y="70" width="8" height="40" rx="3" fill="#ffffff" />
        {/* Shoes */}
        <ellipse cx="20" cy="110" rx="6" ry="3" fill="#5a3d24" />
        <ellipse cx="32" cy="110" rx="6" ry="3" fill="#5a3d24" />
        {/* Body / Kurta */}
        <path d="M 12 35 L 44 35 L 48 76 L 8 76 Z" fill="#d97706" rx="6" />
        {/* Head */}
        <circle cx="28" cy="22" r="11" fill="#c48a58" />
        {/* Turban (Pagri) */}
        <path d="M 14 18 C 14 6 42 6 42 18 C 44 22 40 25 28 25 C 16 25 12 22 14 18 Z" fill="#ffffff" />
        <circle cx="28" cy="12" r="4" fill="#fde68a" />
        {/* Arms holding plant stem / tool */}
        <path d="M 12 40 Q -2 55 10 65" stroke="#c48a58" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M 44 40 Q 52 52 38 65" stroke="#c48a58" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* Seedling held in hand - Golden ripe ear of grain */}
        <circle cx="24" cy="65" r="4" fill="#f59e0b" />
        <path d="M 24 65 Q 18 55 24 50 Q 30 55 24 65" fill="#fbbf24" />
      </g>

      {/* Water Droplet symbol overlay */}
      <g transform="translate(70, 140)">
        <circle cx="20" cy="20" r="24" fill="#fef3c7" stroke="#fed7aa" strokeWidth="2" />
        <path d="M 20 6 C 14 14 10 20 10 26 A 10 10 0 0 0 30 26 C 30 20 26 14 20 6 Z" fill="#b45309" />
      </g>
    </svg>
  );
};
