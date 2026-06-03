import Image from "next/image";

export function FriedEggAvatar({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/telor.png"
      alt="Avatar"
      width={120}
      height={120}
      className={`rounded-full object-cover ${className}`}
    />
  );
}
