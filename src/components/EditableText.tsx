import { getBlocksForPage } from "~/server/blocks";
import type { ElementType } from "react";
import EditableTextClient from "./EditableTextClient";

const TAGS = [
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "div",
  "span",
  "small",
  "blockquote",
  "ul",
  "ol",
  "li",
] as const;

type Tag = (typeof TAGS)[number];

function isTag(value: unknown): value is Tag {
  return (
    typeof value === "string" && (TAGS as readonly string[]).includes(value)
  );
}

export async function EditableText({
  relUrl,
  blockKey,
  placeholderContent,
  placeholderTag,
  className,
}: {
  relUrl: string;
  blockKey: string;
  /** Optional fallback content to display when DB content is missing. Not persisted. */
  placeholderContent?: string;
  /** Optional fallback tag to use with placeholder content. Defaults to "p". */
  placeholderTag?: string;
  /** Optional classes applied to the rendered element (uses global.css). */
  className?: string;
}) {
  // Always fetch on the server
  const blocks = await getBlocksForPage(relUrl);
  const block = blocks[blockKey] as
    | { content: string | null; elementTag?: string | null }
    | undefined;
  const dbContent: string | null = block?.content ?? null;
  const dbElementTag = block?.elementTag;
  const dbTag: Tag = isTag(dbElementTag) ? dbElementTag : "p";

  const hasDbContent =
    dbContent !== null && dbContent !== undefined && dbContent !== "";
  const effectiveContent: string | null = hasDbContent
    ? dbContent
    : (placeholderContent ?? null);
  const tag: Tag = hasDbContent
    ? dbTag
    : isTag(placeholderTag)
      ? placeholderTag
      : "p";

  const TagToRender: Tag = tag;

  const TagComponent = TagToRender as ElementType;

  return (
    <TagComponent style={{ position: "relative" }} className={className}>
      {effectiveContent ?? null}

      <EditableTextClient
        relUrl={relUrl}
        blockKey={blockKey}
        initialContent={hasDbContent ? (dbContent ?? "") : ""}
        initialTag={TagToRender}
      />
    </TagComponent>
  );
}