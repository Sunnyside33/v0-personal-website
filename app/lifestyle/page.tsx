import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/notion";
import { PostCard } from "@/components/post-card";

export const metadata: Metadata = {
  title: "Lifestyle",
  description:
    "Book reviews, life in Surabaya, and personal reflections from Sunnysid33.",
};

export const revalidate = 3600;

export default async function LifestylePage() {
  const posts = await getPostsByCategory("Lifestyle");

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-12">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-4 text-balance">
          Lifestyle
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Book reviews, life in Surabaya, and personal reflections. A peek into
          the everyday moments that shape my world.
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
