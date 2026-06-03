import { FriedEggAvatar } from "@/components/fried-egg-avatar";
import { TopicCard } from "@/components/topic-card";
import { SocialLinks } from "@/components/social-links";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mb-16">
        <FriedEggAvatar className="w-32 h-32 mb-6" />
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
          Hey, I&apos;m Sunnysid33
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-6">
          A Game Master, Math Teacher, and Bookworm based in Surabaya,
          Indonesia. I write about tabletop adventures, mathematical musings,
          and everyday life.
        </p>
        <SocialLinks />
      </section>

      {/* Topic Cards */}
      <section>
        <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 text-center">
          What I Write About
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <TopicCard
            title="TTRPG"
            description="Adventures in tabletop roleplaying, campaign stories, and Game Master tips."
            href="/ttrpg"
            icon={
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                />
              </svg>
            }
          />
          <TopicCard
            title="Math"
            description="Mathematical concepts explained simply, puzzles, and teaching insights."
            href="/math"
            icon={
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            }
          />
          <TopicCard
            title="Lifestyle"
            description="Book reviews, life in Surabaya, and personal reflections."
            href="/lifestyle"
            icon={
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            }
          />
        </div>
      </section>
    </div>
  );
}
