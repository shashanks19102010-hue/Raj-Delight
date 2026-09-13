type LogoProps = { className?: string; compact?: boolean };

export function Logo({ className = '', compact = false }: LogoProps) {
  return (
    <span className={`rd-brand-lockup ${compact ? 'rd-brand-lockup--compact' : ''} ${className}`}>
      <svg className="brand-mark" viewBox="0 0 120 120" role="img" aria-label="Raj Delight emblem">
        <defs>
          <linearGradient id="rdLogoGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f4dfac" />
            <stop offset="0.5" stopColor="#c8a15b" />
            <stop offset="1" stopColor="#8f672f" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="55" fill="transparent" stroke="url(#rdLogoGold)" strokeWidth="1.7" />
        <circle cx="60" cy="60" r="48" fill="#15110e" stroke="url(#rdLogoGold)" strokeWidth="3" />
        <circle cx="60" cy="60" r="40" fill="none" stroke="url(#rdLogoGold)" strokeOpacity="0.42" strokeDasharray="1 4" strokeWidth="1.2" />
        <path d="M36 39h26c11.5 0 18.5 5.2 18.5 14.2 0 6.3-3.7 10.5-9.7 12.8l11.1 14.9H67.8L57.9 69H49v11.9H36V39Zm13 9.5v10.2h12c4.7 0 7.2-1.8 7.2-5.1 0-3.3-2.5-5.1-7.2-5.1H49Z" fill="url(#rdLogoGold)" />
        <path d="M38 28c6.8-5.5 14-8.2 22-8.2S75.2 22.5 82 28M41 91c5.8 4.7 12.2 7 19 7s13.2-2.3 19-7" fill="none" stroke="url(#rdLogoGold)" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M29 28c-4-3.1-6.8-6.2-8.6-10.2 6.6 1.1 11 2.5 15.1 5.2M91 28c4-3.1 6.8-6.2 8.6-10.2-6.6 1.1-11 2.5-15.1 5.2" fill="none" stroke="url(#rdLogoGold)" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M48 104c4.1 2.5 8.1 3.8 12 3.8s7.9-1.3 12-3.8" fill="none" stroke="url(#rdLogoGold)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M54 109h12" stroke="url(#rdLogoGold)" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
      {!compact && (
        <span className="rd-brand-copy">
          <strong>Raj Delight</strong>
          <small>Chandausi</small>
        </span>
      )}
      {compact && (
        <span className="rd-brand-copy">
          <strong>Raj Delight</strong>
          <small>Chandausi</small>
        </span>
      )}
    </span>
  );
}
