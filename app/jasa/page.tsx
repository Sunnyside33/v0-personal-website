import Link from "next/link"

const services = [
  {
    icon: "⚔️",
    name: "Private Session (GM Service)",
    tagline: "Online maupun offline, siap mengadventure!",
    desc: "Aku akan memimpin sesi Pathfinder 2e untuk grupmu, mulai dari setup module di Foundry VTT, musik dan SFX ambient, hingga cerita yang berkembang sesuai keputusan karaktermu.",
    features: [
      "Sesi online via Foundry VTT atau offline (Surabaya area)",
      "Module resmi Paizo siap pakai",
      "Musik, ambient sound, dan SFX in-session",
      "Cerita disesuaikan dengan karakter & grupmu",
      "Cocok untuk pemula — aku bantu jelasin sistem PF2e",
    ],
    price: "Mulai Rp 30.000 / sesi per orang",
    waLink: "https://wa.wizard.id/Sunnysid33",
    waLabel: "Book Sesi via WhatsApp",
  },
  {
    icon: "🖥️",
    name: "Sewa Foundry VTT",
    tagline: "Server stabil, setup mudah, langsung main!",
    desc: "Punya grup dan GM sendiri, tapi terkendala biaya server Foundry? Gunakan server DigitalOcean pribadiku yang stabil dan responsif. Aku bantu setup penuh.",
    features: [
      "Server DigitalOcean — uptime stabil & cepat",
      "Bantuan instalasi system & module pilihanmu",
      "Akses penuh sebagai GM ke world milikmu",
      "Support via WhatsApp selama masa sewa",
      "Flexibel — sewa per hari sesuai kebutuhan",
    ],
    price: "Rp 20.000 / hari",
    waLink: "https://wa.wizard.id/FoundryVTT",
    waLabel: "Sewa Foundry via WhatsApp",
  },
]

export const metadata = {
  title: "Jasa & Layanan",
  description: "Jasa GM Pathfinder 2e dan sewa Foundry VTT bersama Sunnysid33.",
}

export default function JasaPage() {
  return (
    <div className="max-w-[720px] mx-auto px-8">

      {/* HERO */}
      <section className="pt-14 pb-10 border-b border-[#E8E2D9]">
        <Link href="/" className="inline-flex items-center gap-1.5 text-[13px] text-[#7A6A55] hover:text-[#C97B10] transition-colors mb-8">
          ← Kembali
        </Link>
        <p className="text-[11px] tracking-[0.12em] uppercase text-[#E8832A] mb-3 flex items-center gap-2">
          <span className="inline-block w-4 h-px bg-[#E8832A]" />
          Layanan
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A] leading-tight mb-3">
          Jasa GM & Foundry VTT
        </h1>
        <p className="text-[#7A6A55] text-base max-w-[480px] leading-relaxed">
          Mau main Pathfinder 2e tapi belum punya GM? Atau butuh server Foundry yang stabil?{" "}
          <em>Aku siap membantu.</em>
        </p>
      </section>

      {/* SERVICE CARDS */}
      <section className="py-10 flex flex-col gap-6">
        {services.map((s) => (
          <div
            key={s.name}
            className="bg-white border border-[#E8E2D9] border-t-2 border-t-[#F5A623] rounded-xl overflow-hidden hover:shadow-sm transition-shadow"
          >
            {/* Card header */}
            <div className="bg-[#FAFAFA] border-b border-[#E8E2D9] px-6 py-5">
              <span className="text-3xl mb-3 block">{s.icon}</span>
              <div className="font-serif font-semibold text-[#1A1A1A] text-lg mb-1">{s.name}</div>
              <div className="text-[13px] text-[#7A6A55] italic">{s.tagline}</div>
            </div>

            {/* Card body */}
            <div className="px-6 py-6">
              <p className="text-[14px] text-[#7A6A55] leading-relaxed mb-5">{s.desc}</p>

              {/* Features */}
              <ul className="flex flex-col mb-6">
                {s.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-[13.5px] text-[#1A1A1A] py-2.5 border-b border-[#F0EBE3] last:border-0"
                  >
                    <span className="text-[#F5A623] mt-0.5 flex-shrink-0 text-xs">✦</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Price box */}
              <div className="bg-[#1A1A1A] rounded-lg px-5 py-3.5 flex items-center justify-between mb-5">
                <span className="text-[11px] tracking-widest uppercase text-white/40 font-medium">Harga</span>
                <span className="font-serif font-semibold text-[#F5A623] text-base">{s.price}</span>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={s.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1db954] text-white text-[13px] font-semibold py-3 rounded-lg transition-colors"
              >
                📱 {s.waLabel}
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* NOTE */}
      <div className="bg-[#FDE8B8] border border-[#E8E2D9] border-l-[3px] border-l-[#F5A623] rounded-r-xl px-6 py-5 mb-14">
        <div className="text-[11px] tracking-widest uppercase text-[#C97B10] mb-2 font-medium">💡 Catatan</div>
        <p className="text-[13.5px] text-[#7A6A55] leading-relaxed">
          Untuk sesi offline, saat ini hanya melayani area <strong className="text-[#1A1A1A]">Surabaya dan sekitarnya</strong>.
          Untuk sesi online, bisa dari mana saja di Indonesia. Tidak familiar dengan Pathfinder 2e?
          Tenang — aku menyediakan <strong className="text-[#1A1A1A]">sesi orientasi gratis</strong> untuk pemula dalam paket GM Service.
          Hubungi via WhatsApp untuk diskusi lebih lanjut!
        </p>
      </div>

    </div>
  )
}
