type LogoProps = { className?: string; compact?: boolean };

export function Logo({ className = '', compact = false }: LogoProps) {
  return (
    <div className={`brand-lockup ${compact ? 'brand-lockup--compact' : ''} ${className}`} aria-label="Raj Delight">
      <svg className="brand-mark" viewBox="0 0 120 120" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="rdGoldV4" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f1dca4" />
            <stop offset="0.48" stopColor="#cfaa66" />
            <stop offset="1" stopColor="#8d642d" />
          </linearGradient>
          <filter id="rdGlow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <path d="M60 5l7 12 13-5-1 14 14 1-8 11 11 9-14 4 4 13-15-1 0 15-11-7-11 7 0-15-15 1 4-13-14-4 11-9-8-11 14-1-1-14 13 5 7-12z" fill="#14110f" stroke="url(#rdGoldV4)" strokeWidth="2"/>
        <circle cx="60" cy="63" r="48" fill="#14110f" stroke="url(#rdGoldV4)" strokeWidth="2.6" filter="url(#rdGlow)"/>
        <circle cx="60" cy="63" r="41" fill="none" stroke="url(#rdGoldV4)" strokeOpacity=".42" strokeWidth="1" strokeDasharray="1 3"/>
        <path d="M36 45h25c11 0 17 5 17 13 0 6-3 10-9 12l11 15H67L57 73H49v12H36V45Zm13 9v10h11c5 0 8-2 8-5s-3-5-8-5H49Z" fill="url(#rdGoldV4)"/>
        <path d="M47 87c4 3 8 4 13 4s9-1 13-4M39 36c6-5 13-8 21-8s15 3 21 8" fill="none" stroke="url(#rdGoldV4)" strokeWidth="1.7" strokeLinecap="round"/>
        <path d="M31 32c-5-2-8-5-11-10 7 1 11 2 15 5M89 32c5-2 8-5 11-10-7 1-11 2-15 5" fill="none" stroke="url(#rdGoldV4)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M40 99c6 5 13 8 20 8s14-3 20-8" fill="none" stroke="url(#rdGoldV4)" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M54 104h12" stroke="url(#rdGoldV4)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <div className="brand-wordmark">
        <span className="brand-name">Raj Delight</span>
        <span className="brand-sub">Chandausi</span>
      </div>
    </div>
  );
}
