import Link from "next/link";

interface TopicCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

export function TopicCard({ title, description, href, icon }: TopicCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
          {icon}
        </div>
        <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
}
