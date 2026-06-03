import Link from "next/link"

const EGG_SVG = (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 mb-6">
    <rect width="200" height="200" fill="#F5A623" rx="100" />
    <ellipse cx="100" cy="115" rx="78" ry="58" fill="#FFFDF5" />
    <ellipse cx="82" cy="108" rx="12" ry="10" fill="#e8e0d0" />
    <ellipse cx="120" cy="122" rx="9" ry="7" fill="#e8e0d0" />
    <circle cx="100" cy="100" r="38" fill="#F5A623" />
    <circle cx="100" cy="98" r="36" fill="#E8922A" />
    <circle cx="91" cy="93" r="5" fill="#2C1F0A" />
    <circle cx="109" cy="93" r="5" fill="#2C1F0A" />
    <circle cx="89.5" cy="91.5" r="1.8" fill="white" />
    <circle cx="107.5" cy="91.5" r="1.8" fill="white" />
    <path d="M92 106 Q100 113 108 106" stroke="#2C1F0A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
)

const topics = [
  {
    href: "/ttrpg",
    icon: "🎲",
    title: "TTRPG",
    desc: "Pathfinder 2e, D&D, tips GM, dan dunia kampanye yang sedang dibangun.",
  },
  {
    href: "/math",
    icon: "📐",
    title: "Math",
    desc: "Perspektif guru matematika — cara berpikir, keindahan angka, cara mengajar yang seru.",
  },
  {
    href: "/lifestyle",
    icon: "📚",
    title: "Lifestyle",
    desc: "Isi rumah baru, bangun perpustakaan pribadi, dan buku-buku yang lagi dibaca.",
  },
]

const socials = [
  { href: "https://www.tiktok.com/@sunny.sid33", label: "📹 TikTok" },
  { href: "https://www.youtube.com/@Suryatamaa00", label: "▶️ YouTube" },
  { href: "https://www.instagram.com/suryatamaa._/", label: "📸 Instagram" },
]

export default function HomePage() {
  return (
    <div className="max-w-[720px] mx-auto px-8">
      {/* HERO */}
      <section className="pt-18 pb-14">
        {EGG_SVG}
        <p className="text-xs tracking-widest uppercase text-[#E8832A] mb-5 flex items-center gap-2">
          <span className="inline-block w-5 h-px bg-[#E8832A]" />
          Based in Surabaya, Indonesia
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-tight mb-4">
          Halo, saya{" "}
          <em className="not-italic text-[#C97B10]">Sunnysid33</em> —<br />
          GM, Math Teacher & Bookworm
        </h1>
        <p className="text-[#7A6A55] text-base max-w-[500px] leading-relaxed mb-8">
          Di sini saya nulis tentang hal-hal yang saya cintai: petualangan di meja TTRPG,
          keindahan matematika, dan ketenangan membangun rumah sambil ditemani buku.
        </p>
        <Link
          href="/ttrpg"
          className="inline-block bg-[#F5A623] text-[#1A1A1A] font-medium text-sm px-6 py-2.5 rounded hover:bg-[#C97B10] hover:text-white transition-colors"
        >
          Jelajahi konten →
        </Link>
      </section>

      <hr className="border-[#E8E2D9]" />

      {/* TOPICS */}
      <p className="text-[11px] tracking-[0.14em] uppercase text-[#7A6A55] mt-10 mb-5">
        Apa yang saya tulis
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
        {topics.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="bg-white border border-[#E8E2D9] rounded-xl p-5 hover:border-[#F5A623] hover:-translate-y-0.5 transition-all duration-150 block"
          >
            <span className="text-2xl mb-3 block">{t.icon}</span>
            <div className="font-serif font-semibold text-[#1A1A1A] mb-1">{t.title}</div>
            <p className="text-[13px] text-[#7A6A55] leading-snug">{t.desc}</p>
          </Link>
        ))}
      </div>

      <hr className="border-[#E8E2D9]" />

      {/* SOCIALS */}
      <p className="text-[11px] tracking-[0.14em] uppercase text-[#7A6A55] mt-10 mb-5">
        Temukan saya di
      </p>
      <div className="flex flex-wrap gap-2 mb-16">
        {socials.map((s) => (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-[#E8E2D9] rounded-full px-4 py-1.5 text-[13px] text-[#7A6A55] flex items-center gap-1.5 hover:border-[#F5A623] hover:text-[#C97B10] transition-colors"
          >
            {s.label}
          </a>
        ))}
      </div>
    </div>
  )
}
