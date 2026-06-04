const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = "8aefbe72282e4290b1e98f5f21944386";
const BASE = "https://api.notion.com/v1";

const headers = {
  Authorization: `Bearer ${NOTION_TOKEN}`,
  "Notion-Version": "2022-06-28",
  "Content-Type": "application/json",
};

export interface Post {
  id: string;
  title: string;
  category: string;
  tag: string;
  excerpt: string;
  date: string;
  slug: string;
}

export interface PostWithContent extends Post {
  content: BlockObjectResponse[];
}

// ── Types for raw Notion API response
interface NotionPage {
  id: string;
  properties: Record<string, any>;
}

interface BlockObjectResponse {
  id: string;
  type: string;
  [key: string]: any;
}

// ── Auto-generate slug from title
function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// ── Extract text from Notion rich text array
function getRichText(richText: any[]): string {
  if (!richText) return "";
  return richText.map((item: any) => item.plain_text).join("");
}

// ── Extract property value from a Notion page
function getPropertyValue(page: NotionPage, name: string): string {
  const prop = page.properties[name];
  if (!prop) return "";

  switch (prop.type) {
    case "title":
      return getRichText(prop.title);
    case "rich_text":
      return getRichText(prop.rich_text);
    case "select":
      return prop.select?.name || "";
    case "date":
      return prop.date?.start || "";
    default:
      return "";
  }
}

// ── Fetch all Published posts
export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${BASE}/databases/${DATABASE_ID}/query`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        filter: {
          property: "Status",
          select: { equals: "Published" },
        },
        sorts: [{ property: "Publish Date", direction: "descending" }],
      }),
    });

    if (!res.ok) {
      console.error("Notion API error:", res.status, await res.text());
      return [];
    }

    const data = await res.json();

    return data.results
      .filter((page: any) => page.properties)
      .map((page: any) => ({
        id: page.id,
        title: getPropertyValue(page, "Title"),
        category: getPropertyValue(page, "Category"),
        tag: getPropertyValue(page, "Tag"),
        excerpt: getPropertyValue(page, "Excerpt"),
        date: getPropertyValue(page, "Publish Date"),
        slug: slugify(getPropertyValue(page, "Title")),
      }));
  } catch (error) {
    console.error("Error fetching posts from Notion:", error);
    return [];
  }
}

// ── Fetch posts by category (Published only)
export async function getPostsByCategory(category: string): Promise<Post[]> {
  try {
    const res = await fetch(`${BASE}/databases/${DATABASE_ID}/query`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        filter: {
          and: [
            {
              property: "Status",
              select: { equals: "Published" },
            },
            {
              property: "Category",
              select: { equals: category },
            },
          ],
        },
        sorts: [{ property: "Publish Date", direction: "descending" }],
      }),
    });

    if (!res.ok) {
      console.error("Notion API error:", res.status, await res.text());
      return [];
    }

    const data = await res.json();

    return data.results
      .filter((page: any) => page.properties)
      .map((page: any) => ({
        id: page.id,
        title: getPropertyValue(page, "Title"),
        category: getPropertyValue(page, "Category"),
        tag: getPropertyValue(page, "Tag"),
        excerpt: getPropertyValue(page, "Excerpt"),
        date: getPropertyValue(page, "Publish Date"),
        slug: slugify(getPropertyValue(page, "Title")),
      }));
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return [];
  }
}

// ── Fetch single post by slug (auto-generated from title)
export async function getPostBySlug(
  slug: string
): Promise<PostWithContent | null> {
  try {
    const res = await fetch(`${BASE}/databases/${DATABASE_ID}/query`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        filter: {
          property: "Status",
          select: { equals: "Published" },
        },
        sorts: [{ property: "Publish Date", direction: "descending" }],
      }),
    });

    if (!res.ok) {
      console.error("Notion API error:", res.status, await res.text());
      return null;
    }

    const data = await res.json();

    const page = data.results
      .filter((p: any) => p.properties)
      .find((p: any) => slugify(getPropertyValue(p, "Title")) === slug);

    if (!page) return null;

    // Fetch page content (blocks)
    const blocksRes = await fetch(
      `${BASE}/blocks/${page.id}/children?page_size=100`,
      { headers }
    );

    if (!blocksRes.ok) return null;

    const blocksData = await blocksRes.json();

    return {
      id: page.id,
      title: getPropertyValue(page, "Title"),
      category: getPropertyValue(page, "Category"),
      tag: getPropertyValue(page, "Tag"),
      excerpt: getPropertyValue(page, "Excerpt"),
      date: getPropertyValue(page, "Publish Date"),
      slug: slug,
      content: blocksData.results.filter(
        (block: any) => block.type
      ),
    };
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

// ── Get all slugs (for generateStaticParams)
export async function getAllSlugs(): Promise<string[]> {
  const posts = await getPosts();
  return posts.map((post) => post.slug).filter(Boolean);
}
