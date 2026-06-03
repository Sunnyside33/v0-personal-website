import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <nav className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-xl font-semibold text-foreground hover:text-primary transition-colors"
        >
          Sunnysid33
        </Link>
        <Link
          href="/contacts"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Contacts
        </Link>
      </nav>
    </header>
  );
}
