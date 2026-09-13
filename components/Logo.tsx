type LogoProps = { className?: string; compact?: boolean };

export function Logo({ className = '', compact = false }: LogoProps) {
  return (
    <span className={`rd-brand-lockup ${compact ? 'rd-brand-lockup--compact' : ''} ${className}`}>
      <svg className="brand-mark" viewBox="0 0 128 128" role="img" aria-label="Raj Delight logo">
        <defs>
          <linearGradient id="rdLogoGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f4e1b0" />
            <stop offset=".45" stopColor="#d4ad69" />
            <stop offset="1" stopColor="#8f672f" />
          </linearGradient>
        </defs>
        <path d="M44 19 51 8l13 8 13-8 7 11" fill="none" stroke="url(#rdLogoGold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M51 16 64 11l13 5" fill="none" stroke="url(#rdLogoGold)" strokeWidth="1.2" opacity=".65" />
        <circle cx="64" cy="67" r="50" fill="#14100d" stroke="url(#rdLogoGold)" strokeWidth="2.2" />
        <circle cx="64" cy="67" r="42" fill="none" stroke="url(#rdLogoGold)" strokeWidth="1.2" strokeDasharray="1 5" opacity=".7" />
        <path d="M43 49h21c9.7 0 15 4.5 15 12.2 0 5.3-2.5 8.7-7.3 10.8l8.3 11.8H68.8L62 74.6h-7.4v9.9H43V49Zm11.6 8.1v9.4h8.5c3.6 0 5.5-1.5 5.5-4.7 0-3.1-1.9-4.7-5.5-4.7h-8.5Z" fill="url(#rdLogoGold)" />
        <path d="M68 56c8.5 0 15.2 6.8 15.2 15.2S76.5 86.5 68 86.5c-3 0-5.9-.9-8.1-2.5" fill="none" stroke="url(#rdLogoGold)" strokeWidth="3" strokeLinecap="round" />
        <path d="M32 42c6.5-7 16.8-11.7 28.3-12.3M96 42c-6.5-7-16.8-11.7-28.3-12.3" fill="none" stroke="url(#rdLogoGold)" strokeWidth="1.5" strokeLinecap="round" opacity=".72" />
        <path d="M44 104c6.1 4 12.8 6.1 20 6.1s13.9-2.1 20-6.1" fill="none" stroke="url(#rdLogoGold)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M58 114h12" stroke="url(#rdLogoGold)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <span className="rd-brand-copy">
        <strong>Raj Delight</strong>
        <small>Chandausi</small>
      </span>
    </span>
  );
}
