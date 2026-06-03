import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/notion";
import { PostCard } from "@/components/post-card";

export const metadata: Metadata = {
  title: "Math",
  description:
    "Mathematical concepts explained simply, puzzles, and teaching insights from Sunnysid33.",
};

export const revalidate = 3600;

export default async function MathPage() {
  const posts = await getPostsByCategory("Math");

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-12">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-4 text-balance">
          Math
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Mathematical concepts explained simply, puzzles, and teaching
          insights. Making numbers fun and accessible for everyone.
        </p>
      </header>

      {posts.length > 0 ? (
        <div className="space-y-2">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            No posts yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
