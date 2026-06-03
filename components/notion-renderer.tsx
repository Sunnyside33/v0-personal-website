import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

function getRichText(
  richText: Array<{ plain_text: string; annotations?: Record<string, boolean>; href?: string | null }>
): React.ReactNode {
  return richText.map((text, index) => {
    let content: React.ReactNode = text.plain_text;
    const annotations = text.annotations || {};

    if (annotations.bold) {
      content = <strong key={`bold-${index}`}>{content}</strong>;
    }
    if (annotations.italic) {
      content = <em key={`italic-${index}`}>{content}</em>;
    }
    if (annotations.code) {
      content = (
        <code
          key={`code-${index}`}
          className="bg-secondary px-1.5 py-0.5 rounded text-sm font-mono"
        >
          {content}
        </code>
      );
    }
    if (annotations.strikethrough) {
      content = <s key={`strike-${index}`}>{content}</s>;
    }
    if (annotations.underline) {
      content = <u key={`underline-${index}`}>{content}</u>;
    }
    if (text.href) {
      content = (
        <a
          key={`link-${index}`}
          href={text.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {content}
        </a>
      );
    }

    return <span key={index}>{content}</span>;
  });
}

function renderBlock(block: BlockObjectResponse): React.ReactNode {
  const { type, id } = block;

  switch (type) {
    case "paragraph": {
      const richText = block.paragraph.rich_text;
      if (richText.length === 0) return <div key={id} className="h-4" />;
      return (
        <p key={id} className="mb-4 leading-relaxed">
          {getRichText(richText)}
        </p>
      );
    }

    case "heading_1": {
      return (
        <h1
          key={id}
          className="font-serif text-3xl font-bold mt-8 mb-4 text-balance"
        >
          {getRichText(block.heading_1.rich_text)}
        </h1>
      );
    }

    case "heading_2": {
      return (
        <h2
          key={id}
          className="font-serif text-2xl font-semibold mt-6 mb-3 text-balance"
        >
          {getRichText(block.heading_2.rich_text)}
        </h2>
      );
    }

    case "heading_3": {
      return (
        <h3
          key={id}
          className="font-serif text-xl font-semibold mt-4 mb-2 text-balance"
        >
          {getRichText(block.heading_3.rich_text)}
        </h3>
      );
    }

    case "bulleted_list_item": {
      return (
        <li key={id} className="ml-4 mb-2">
          {getRichText(block.bulleted_list_item.rich_text)}
        </li>
      );
    }

    case "numbered_list_item": {
      return (
        <li key={id} className="ml-4 mb-2 list-decimal">
          {getRichText(block.numbered_list_item.rich_text)}
        </li>
      );
    }

    case "quote": {
      return (
        <blockquote
          key={id}
          className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground"
        >
          {getRichText(block.quote.rich_text)}
        </blockquote>
      );
    }

    case "code": {
      return (
        <pre
          key={id}
          className="bg-secondary rounded-lg p-4 my-4 overflow-x-auto"
        >
          <code className="text-sm font-mono">
            {block.code.rich_text.map((t) => t.plain_text).join("")}
          </code>
        </pre>
      );
    }

    case "divider": {
      return <hr key={id} className="my-8 border-border" />;
    }

    case "image": {
      const imageUrl =
        block.image.type === "external"
          ? block.image.external.url
          : block.image.file.url;
      const caption =
        block.image.caption.length > 0
          ? block.image.caption.map((t) => t.plain_text).join("")
          : "";
      return (
        <figure key={id} className="my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={caption || "Blog post image"}
            className="rounded-lg w-full"
          />
          {caption && (
            <figcaption className="text-center text-sm text-muted-foreground mt-2">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "callout": {
      return (
        <div
          key={id}
          className="bg-secondary rounded-lg p-4 my-4 flex items-start gap-3"
        >
          {block.callout.icon?.type === "emoji" && (
            <span className="text-xl">{block.callout.icon.emoji}</span>
          )}
          <div>{getRichText(block.callout.rich_text)}</div>
        </div>
      );
    }

    default:
      return null;
  }
}

export function NotionRenderer({ blocks }: { blocks: BlockObjectResponse[] }) {
  // Group list items together
  const groupedBlocks: Array<BlockObjectResponse | BlockObjectResponse[]> = [];
  let currentList: BlockObjectResponse[] = [];
  let currentListType: string | null = null;

  blocks.forEach((block) => {
    if (
      block.type === "bulleted_list_item" ||
      block.type === "numbered_list_item"
    ) {
      if (currentListType === block.type) {
        currentList.push(block);
      } else {
        if (currentList.length > 0) {
          groupedBlocks.push(currentList);
        }
        currentList = [block];
        currentListType = block.type;
      }
    } else {
      if (currentList.length > 0) {
        groupedBlocks.push(currentList);
        currentList = [];
        currentListType = null;
      }
      groupedBlocks.push(block);
    }
  });

  if (currentList.length > 0) {
    groupedBlocks.push(currentList);
  }

  return (
    <div className="prose-lg">
      {groupedBlocks.map((item, index) => {
        if (Array.isArray(item)) {
          const listType = item[0].type;
          const ListTag = listType === "numbered_list_item" ? "ol" : "ul";
          return (
            <ListTag key={`list-${index}`} className="mb-4 pl-4">
              {item.map((block) => renderBlock(block))}
            </ListTag>
          );
        }
        return renderBlock(item);
      })}
    </div>
  );
}
