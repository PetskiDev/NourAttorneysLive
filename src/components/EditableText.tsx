import { getBlocksForPage } from "~/server/blocks";
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
  return typeof value === "string" && (TAGS as readonly string[]).includes(value);
}

export async function EditableText({
  relUrl,
  blockKey,
  isAdmin = false,
}: {
  relUrl: string;
  blockKey: string;
  isAdmin?: boolean;
}) {
  // Always fetch on the server
  const blocks = await getBlocksForPage(relUrl);
  const block = blocks[blockKey] as
    | { content: string | null; elementTag?: string | null }
    | undefined;
  const content: string | null = block?.content ?? null;
  const elementTag = block?.elementTag;
  const tag: Tag = isTag(elementTag) ? elementTag : "p";

  const TagToRender: Tag = tag;

  return (
    <div style={{ position: "relative" }}>
      {content ? (
        TagToRender === "p" ? (
          <p>{content}</p>
        ) : TagToRender === "h1" ? (
          <h1>{content}</h1>
        ) : TagToRender === "h2" ? (
          <h2>{content}</h2>
        ) : TagToRender === "h3" ? (
          <h3>{content}</h3>
        ) : TagToRender === "h4" ? (
          <h4>{content}</h4>
        ) : TagToRender === "h5" ? (
          <h5>{content}</h5>
        ) : TagToRender === "h6" ? (
          <h6>{content}</h6>
        ) : TagToRender === "div" ? (
          <div>{content}</div>
        ) : TagToRender === "span" ? (
          <span>{content}</span>
        ) : TagToRender === "small" ? (
          <small>{content}</small>
        ) : TagToRender === "blockquote" ? (
          <blockquote>{content}</blockquote>
        ) : TagToRender === "ul" ? (
          <ul>{content}</ul>
        ) : TagToRender === "ol" ? (
          <ol>{content}</ol>
        ) : TagToRender === "li" ? (
          <li>{content}</li>
        ) : (
          <p>{content}</p>
        )
      ) : null}

      {isAdmin && (
        <EditableTextClient
          relUrl={relUrl}
          blockKey={blockKey}
          initialContent={content ?? ""}
          initialTag={TagToRender}
        />
      )}
    </div>
  );
}

