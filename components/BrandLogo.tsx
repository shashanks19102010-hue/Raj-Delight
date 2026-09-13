type BrandLogoProps = {
  compact?: boolean;
  showWordmark?: boolean;
  className?: string;
};

export function BrandLogo({ compact = false, showWordmark = true, className = '' }: BrandLogoProps) {
  return (
    <span className={`brand-logo ${compact ? 'brand-logo--compact' : ''} ${className}`} aria-label="Raj Delight">
      <svg className="brand-logo__mark" viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <linearGradient id="rd-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f1d99a" />
            <stop offset="0.42" stopColor="#c79c4f" />
            <stop offset="1" stopColor="#8b662e" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="46" fill="none" stroke="url(#rd-gold)" strokeWidth="2" />
        <circle cx="60" cy="60" r="40" fill="none" stroke="url(#rd-gold)" strokeWidth="1" opacity="0.75" />
        <path d="M31 69c7-7 13-15 14-29 10 3 19 9 26 17 4 5 4 10 0 15-5 7-13 10-24 8" fill="none" stroke="url(#rd-gold)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M45 37h29M45 43h13v40M58 51h13c7 0 10 4 10 9s-3 9-10 9H58" fill="none" stroke="url(#rd-gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 86c10 7 22 10 36 10s26-3 36-10" fill="none" stroke="url(#rd-gold)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M43 19l17-8 17 8-4 4-13-5-13 5z" fill="url(#rd-gold)" />
        <path d="M39 17c3-3 7-6 11-8l3 9M81 17c-3-3-7-6-11-8l-3 9" fill="none" stroke="url(#rd-gold)" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M56 10h8l3 7h-14z" fill="url(#rd-gold)" />
        <path d="M20 57h7M93 57h7M60 20v-5M60 95v-5" stroke="#d7b66f" strokeWidth="1" opacity="0.8" />
      </svg>
      {showWordmark ? (
        <span className="brand-logo__wordmark">
          <strong>RAJ DELIGHT</strong>
          <small>CHANDAUSI</small>
        </span>
      ) : null}
    </span>
  );
}
