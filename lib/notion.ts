import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const DATABASE_ID = "8aefbe72282e4290b1e98f5f21944386";

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

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") 
    .replace(/\s+/g, "-")           
    .replace(/-+/g, "-")           
    .replace(/^-|-$/g, "");       
}


function getRichTextContent(richText: RichTextItemResponse[]): string {
  return richText.map((item) => item.plain_text).join("");
}

function getPropertyValue(
  page: PageObjectResponse,
  propertyName: string
): string {
  const property = page.properties[propertyName];
  if (!property) return "";

  switch (property.type) {
    case "title":
      return getRichTextContent(property.title);
    case "rich_text":
      return getRichTextContent(property.rich_text);
    case "select":
      return property.select?.name || "";
    case "date":
      return property.date?.start || "";
    default:
      return "";
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: "Status",
        select:{
          equals: "Published",
        },
      },
      sorts: [
        {
          property: "Publish Date",
          direction: "descending",
        },
      ],
    });

    return response.results
      .filter((page): page is PageObjectResponse => "properties" in page)
      .map((page) => ({
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

export async function getPostsByCategory(category: string): Promise<Post[]> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: "Status",
            select: {
              equals: "Published",
            },
          },
          {
        property: "Category",
        select: {
          equals: category,
          },
        },
       ],
      },
      sorts: [
        {
          property: "Publish Date",
          direction: "descending",
        },
      ],
    });

    return response.results
      .filter((page): page is PageObjectResponse => "properties" in page)
      .map((page) => ({
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

export async function getPostBySlug(
  slug: string
): Promise<PostWithContent | null> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: "Status",
        select: {
          equals: "Published",
        },
      },
      sorts: [
        {
          property: "Publish Date",
          direction: "descending",
        },
      ],
    });

    const page = response.results
      .filter((p): p is PageObjectResponse => "properties" in p)
      .find((p) => slugify(getPropertyValue(p, "Title")) === slug);

    if (!page) return null;

    const blocksResponse = await notion.blocks.children.list({
      block_id: page.id,
    });

    return {
      id: page.id,
      title: getPropertyValue(page, "Title"),
      category: getPropertyValue(page, "Category"),
      tag: getPropertyValue(page, "Tag"),
      excerpt: getPropertyValue(page, "Excerpt"),
      date: getPropertyValue(page, "Publish Date"),
      slug: slug,
      content: blocksResponse.results.filter(
        (block): block is BlockObjectResponse => "type" in block
      ),
    };
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getPosts();
  return posts.map((post) => post.slug).filter(Boolean);
}
