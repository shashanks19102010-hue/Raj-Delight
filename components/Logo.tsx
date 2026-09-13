type LogoProps = { className?: string; compact?: boolean };

export function Logo({ className = '', compact = false }: LogoProps) {
  return (
    <div className={`brand-lockup ${compact ? 'brand-lockup--compact' : ''} ${className}`} aria-label="Raj Delight">
      <svg className="brand-mark" viewBox="0 0 96 96" role="img" aria-hidden="true">
        <circle cx="48" cy="48" r="42" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M28 60c10-7 16-16 16-31 9 4 17 9 23 17 3 4 3 8 0 12-4 6-10 8-18 8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M39 29h19M39 34h8v30M47 42h10c6 0 9 4 9 8s-3 8-9 8H47" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 73c9 7 20 11 32 11s23-4 32-11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <div className="brand-wordmark">
        <span className="brand-name">Raj Delight</span>
        <span className="brand-sub">Chandausi</span>
      </div>
    </div>
  );
}
