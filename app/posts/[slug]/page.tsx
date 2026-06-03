import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllSlugs } from "@/lib/notion";
import { NotionRenderer } from "@/components/notion-renderer";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export const revalidate = 3600;

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const categoryHref =
    post.category === "TTRPG"
      ? "/ttrpg"
      : post.category === "Math"
        ? "/math"
        : post.category === "Lifestyle"
          ? "/lifestyle"
          : "/";

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Link
            href={categoryHref}
            className="text-sm font-medium text-primary bg-secondary px-3 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {post.category}
          </Link>
          {post.tag && (
            <span className="text-sm text-muted-foreground">{post.tag}</span>
          )}
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            {post.excerpt}
          </p>
        )}
        {formattedDate && (
          <time className="text-sm text-muted-foreground">{formattedDate}</time>
        )}
      </header>

      <div className="border-t border-border pt-10">
        <NotionRenderer blocks={post.content} />
      </div>

      <footer className="mt-16 pt-8 border-t border-border">
        <Link
          href={categoryHref}
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to {post.category}
        </Link>
      </footer>
    </article>
  );
}
