type LogoProps = { className?: string; compact?: boolean };

export function Logo({ className = '', compact = false }: LogoProps) {
  return (
    <div className={`brand-lockup ${compact ? 'brand-lockup--compact' : ''} ${className}`} aria-label="Raj Delight">
      <svg className="brand-mark" viewBox="0 0 96 96" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="rdGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ead39b" />
            <stop offset="0.55" stopColor="#c9a86a" />
            <stop offset="1" stopColor="#9d773b" />
          </linearGradient>
        </defs>
        <circle cx="48" cy="48" r="43" fill="#171412" stroke="url(#rdGold)" strokeWidth="2.5" />
        <circle cx="48" cy="48" r="37" fill="none" stroke="url(#rdGold)" strokeOpacity=".45" strokeWidth="1" />
        <path d="M28 29h24c12 0 19 6 19 15 0 6-3 10-8 13l10 12H61l-8-10H40v10H28V29Zm12 9v12h12c5 0 8-2 8-6s-3-6-8-6H40Z" fill="url(#rdGold)" />
        <path d="M31 70c5 4 11 6 17 6s12-2 17-6" fill="none" stroke="url(#rdGold)" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M33 20c4-4 9-6 15-6s11 2 15 6" fill="none" stroke="url(#rdGold)" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M24 20l-5-7 10 2 4-8 3 11M72 20l5-7-10 2-4-8-3 11" fill="none" stroke="url(#rdGold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="brand-wordmark">
        <span className="brand-name">Raj Delight</span>
        <span className="brand-sub">Chandausi</span>
      </div>
    </div>
  );
}
