"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./EditableBlock.module.css";
import type { BlockType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useIsAdmin } from "./useIsAdmin";

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

export default function EditableTextClient({
  relUrl,
  blockKey,
  initialContent,
  initialTag = "p",
}: {
  relUrl: string;
  blockKey: string;
  initialContent: string;
  initialTag?: Tag;
}) {
  const [editing, setEditing] = useState(false);
  const [newContent, setNewContent] = useState(initialContent ?? "");
  const [tag, setTag] = useState<Tag>(initialTag ?? "p");
  const [mounted, setMounted] = useState(false); // for portals (Next.js/SSR)
  const router = useRouter();
  const isAdmin = useIsAdmin();

  // Ensure `document` exists before portal usage
  useEffect(() => setMounted(true), []);

  const lockVirtualScroll = (locked: boolean) => {
    try {
      window.dispatchEvent(
        new CustomEvent("virtualscroll:lock", { detail: { locked } })
      );
    } catch {}
  };

  const openEditor = () => {
    setNewContent(initialContent ?? "");
    setEditing(true);
    lockVirtualScroll(true);
  };

  const closeEditor = () => {
    setEditing(false);
    lockVirtualScroll(false);
  };

  // Safety net: unlock on unmount if still locked
  useEffect(() => {
    return () => {
      lockVirtualScroll(false);
    };
  }, []);

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
        closeEditor();
        router.refresh();
      } else {
        console.error(await res.text());
      }
    } catch (e) {
      console.error("Save failed", e);
    }
  };

  const deleteBlock = async () => {
    if (!confirm("Delete this block? This cannot be undone.")) return;
    try {
      const res = await fetch("/api/blocks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ relUrl, key: blockKey }),
      });

      if (res.ok) {
        closeEditor();
        router.refresh();
      } else {
        console.error(await res.text());
      }
    } catch (e) {
      console.error("Delete failed", e);
    }
  };

  const overlay = (
    <div
      // NOTE: now truly fixed to the viewport because it's portaled to <body>
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 10000000000000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
      className={styles.bigOverlayDiv}
      role="dialog"
      aria-modal="true"
      aria-label="Edit text block"
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
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 8 }}>
          <select value={tag} onChange={(e) => setTag(e.target.value as Tag)}>
            {TAGS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <button onClick={saveBlock}>Save</button>
          <button onClick={closeEditor}>Cancel</button>
          <button onClick={deleteBlock} style={{ color: "#b00020" }}>Delete</button>
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
  );

  return (
    <>
      {!editing && isAdmin && (
        <button
          className={styles.editBtn}
          style={{ left: -10, right: "auto", top: -15, zIndex: 100000 }}
          onClick={openEditor}
        >
          ✏️
        </button>
      )}

      {editing && mounted && createPortal(overlay, document.body)}
    </>
  );
}
