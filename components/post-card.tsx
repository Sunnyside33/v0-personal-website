import Link from "next/link";
import type { Post } from "@/lib/notion";

export function PostCard({ post }: { post: Post }) {
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <article className="group">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="py-6 border-b border-border hover:bg-secondary/30 transition-colors -mx-4 px-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            {post.tag && (
              <span className="text-xs font-medium text-primary bg-secondary px-2 py-1 rounded">
                {post.tag}
              </span>
            )}
            {formattedDate && (
              <time className="text-sm text-muted-foreground">
                {formattedDate}
              </time>
            )}
          </div>
          <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2 text-balance">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-muted-foreground leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
