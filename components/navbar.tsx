"use client"

import { useState } from "react"
import Link from "next/link"

const menuItems = [
  { href: "/contacts", label: "Contacts" },
  { href: "/cv", label: "CV" },
  { href: "/jasa", label: "Jasa & Layanan" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-[#E8E2D9]">
      <nav className="max-w-[720px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-xl font-semibold text-[#1A1A1A] hover:text-[#C97B10] transition-colors"
          onClick={() => setOpen(false)}
        >
          Sunnysid33
        </Link>

        {/* Burger button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-md hover:bg-[#F5F5F5] transition-colors"
        >
          <span
            className={`block w-5 h-px bg-[#7A6A55] transition-all duration-200 origin-center ${
              open ? "rotate-45 translate-y-[6px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-[#7A6A55] transition-all duration-200 ${
              open ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-[#7A6A55] transition-all duration-200 origin-center ${
              open ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Dropdown menu */}
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out border-b border-[#E8E2D9] ${
          open ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-w-[720px] mx-auto px-6 py-3 flex flex-col gap-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-sm text-[#7A6A55] hover:text-[#C97B10] py-2 border-b border-[#F0EBE3] last:border-0 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
