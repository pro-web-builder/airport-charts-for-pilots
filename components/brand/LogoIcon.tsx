type LogoIconProps = {
  className?: string;
  withBackground?: boolean;
};

export function LogoIcon({ className, withBackground = false }: LogoIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Airport Charts For Pilots"
    >
      {withBackground && <rect width="64" height="64" rx="14" fill="#05070d" />}
      <rect x="8" y="44" width="48" height="6" rx="3" fill="#e9edf5" />
      <rect x="13" y="46.25" width="4" height="1.5" fill="#0078ff" />
      <rect x="23" y="46.25" width="4" height="1.5" fill="#0078ff" />
      <rect x="33" y="46.25" width="4" height="1.5" fill="#0078ff" />
      <rect x="43" y="46.25" width="4" height="1.5" fill="#0078ff" />
      <path d="M32 6 L46 34 L34 30 L38 42 L32 37 L26 42 L30 30 L18 34 Z" fill="#f4f7fb" />
      <path d="M46 34 L39 31.5 L41.5 36 Z" fill="#0078ff" />
      <path d="M18 34 L25 31.5 L22.5 36 Z" fill="#0078ff" />
    </svg>
  );
}
