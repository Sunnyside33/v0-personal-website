export function FriedEggAvatar({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Egg white - organic blob shape */}
      <path
        d="M60 10C35 10 15 25 12 50C10 70 20 90 40 100C55 108 75 108 90 100C105 90 115 70 112 50C108 25 85 10 60 10Z"
        fill="#FFFFFF"
        stroke="#E8DFD4"
        strokeWidth="2"
      />
      {/* Subtle shadow on egg white */}
      <ellipse cx="60" cy="65" rx="35" ry="30" fill="#F5F0E8" opacity="0.5" />
      {/* Yolk */}
      <circle cx="60" cy="58" r="22" fill="#F5A623" />
      {/* Yolk highlight */}
      <ellipse cx="52" cy="50" rx="6" ry="4" fill="#FFD280" />
      {/* Small highlight */}
      <circle cx="68" cy="52" r="3" fill="#FFEDD0" />
      {/* Cute face - eyes */}
      <circle cx="52" cy="58" r="3" fill="#4A3728" />
      <circle cx="68" cy="58" r="3" fill="#4A3728" />
      {/* Eye highlights */}
      <circle cx="53" cy="57" r="1" fill="#FFFFFF" />
      <circle cx="69" cy="57" r="1" fill="#FFFFFF" />
      {/* Cute smile */}
      <path
        d="M55 66C55 66 60 70 65 66"
        stroke="#4A3728"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Rosy cheeks */}
      <ellipse cx="46" cy="62" rx="4" ry="2" fill="#FFB5B5" opacity="0.6" />
      <ellipse cx="74" cy="62" rx="4" ry="2" fill="#FFB5B5" opacity="0.6" />
    </svg>
  );
}
