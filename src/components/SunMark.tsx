export function SunMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="var(--bg-elev)" stroke="var(--line)" />
      <circle cx="16" cy="16" r="5.5" fill="var(--btn-bg)" />
      <g stroke="var(--btn-bg)" strokeWidth="1.6" strokeLinecap="round">
        <line x1="16" y1="5" x2="16" y2="7.4" />
        <line x1="16" y1="24.6" x2="16" y2="27" />
        <line x1="5" y1="16" x2="7.4" y2="16" />
        <line x1="24.6" y1="16" x2="27" y2="16" />
        <line x1="8.6" y1="8.6" x2="10.3" y2="10.3" />
        <line x1="21.7" y1="21.7" x2="23.4" y2="23.4" />
        <line x1="8.6" y1="23.4" x2="10.3" y2="21.7" />
        <line x1="21.7" y1="10.3" x2="23.4" y2="8.6" />
      </g>
    </svg>
  );
}
