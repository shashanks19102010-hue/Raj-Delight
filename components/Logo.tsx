type LogoProps = { className?: string; compact?: boolean };

export function Logo({ className = '' }: LogoProps) {
  return (
    <span className={`rd-brand-lockup ${className}`}>
      <img className="brand-mark" src="/raj-delight-mark.svg" alt="Raj Delight emblem" />
      <span className="rd-brand-copy">
        <strong>Raj Delight</strong>
        <small>Chandausi</small>
      </span>
    </span>
  );
}
