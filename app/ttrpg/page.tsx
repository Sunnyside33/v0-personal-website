import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/notion";
import { PostCard } from "@/components/post-card";

export const metadata: Metadata = {
  title: "TTRPG",
  description:
    "Adventures in tabletop roleplaying, campaign stories, and Game Master tips from Sunnysid33.",
};

export const revalidate = 3600;

export default async function TTRPGPage() {
  const posts = await getPostsByCategory("TTRPG");

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-12">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-4 text-balance">
          TTRPG
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Adventures in tabletop roleplaying, campaign stories, and Game Master
          tips. Join me as I explore the world of dice and imagination.
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
