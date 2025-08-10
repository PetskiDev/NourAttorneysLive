"use client";

import { useState } from "react";
import styles from "./EditableBlock.module.css";
import type { BlockType } from "@prisma/client";
import { useRouter } from "next/navigation";

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

export function EditableText({
  relUrl,
  blockKey,
  isAdmin = false,
  initialContent,
  initialTag = "p",
}: {
  relUrl: string;
  blockKey: string;
  isAdmin?: boolean;
  initialContent?: string | null;
  initialTag?: string | null;
}) {
  const [content, setContent] = useState<string | null>(initialContent ?? null);
  const [editing, setEditing] = useState(false);
  const [newContent, setNewContent] = useState("");
  const isTag = (t: unknown): t is Tag => typeof t === "string" && (TAGS as readonly string[]).includes(t);
  const [tag, setTag] = useState<Tag>(isTag(initialTag) ? initialTag : "p");
  const router = useRouter();

  const saveBlock = async () => {
    try {
      const res = await fetch("/api/blocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          relUrl,
          key: blockKey,
          content: newContent,
          blockType: "TEXT" as BlockType,
          elementTag: tag,
        }),
      });

      if (res.ok) {
        setContent(newContent);
        setEditing(false);
        router.refresh();
      } else {
        console.error(await res.text());
      }
    } catch (e) {
      console.error("Save failed", e);
    }
  };

  const TagToRender = tag || "p";

  return (
    <div style={{ position: "relative" }}>
      {editing ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh"
          }}
        >
          <div
            style={{
              position: "relative",
              width: "90%",
              maxWidth: 400,
              height: "50vh",
              background: "#fff",
              borderRadius: 8,
              padding: 16,
            }}
          >
            {/* Absolute controls */}
            <div style={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 8 }}>
              <select value={tag} onChange={(e) => setTag(e.target.value as Tag)}>
                {TAGS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <button onClick={saveBlock}>Save</button>
              <button onClick={() => setEditing(false)}>Cancel</button>
            </div>

            <textarea
              rows={10}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              style={{
                width: "100%",
                height: "100%",
                paddingTop: 5,
                paddingBottom: 30,
                resize: "none",
              }}
            />
          </div>
        </div>
      ) : content ? (
        (
          TagToRender === "p" ? <p>{content}</p> :
          TagToRender === "h1" ? <h1>{content}</h1> :
          TagToRender === "h2" ? <h2>{content}</h2> :
          TagToRender === "h3" ? <h3>{content}</h3> :
          TagToRender === "h4" ? <h4>{content}</h4> :
          TagToRender === "h5" ? <h5>{content}</h5> :
          TagToRender === "h6" ? <h6>{content}</h6> :
          TagToRender === "div" ? <div>{content}</div> :
          TagToRender === "span" ? <span>{content}</span> :
          TagToRender === "small" ? <small>{content}</small> :
          TagToRender === "blockquote" ? <blockquote>{content}</blockquote> :
          TagToRender === "ul" ? <ul>{content}</ul> :
          TagToRender === "ol" ? <ol>{content}</ol> :
          TagToRender === "li" ? <li>{content}</li> :
          <p>{content}</p>
        )
      ) : !isAdmin ? null : (
        <p className={styles.placeholder}>Click edit to enter content</p>
      )}

      {isAdmin && !editing && (
        <button
          className={styles.editBtn}
          style={{ left: -10, right: "auto", top: -15 }}
          onClick={() => {
            setNewContent(content ?? "");
            setEditing(true);
          }}
        >
          ✏️
        </button>
      )}
    </div>
  );
}


