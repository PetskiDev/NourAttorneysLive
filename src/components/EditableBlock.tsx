"use client";

import { useEffect, useState } from "react";
import styles from "./EditableBlock.module.css";
import Image from "next/image";
import type { BlockType } from "@prisma/client";
import { useRouter } from "next/navigation";

interface EditableBlockProps {
  relUrl: string;
  blockKey: string;
  width?: number;
  height?: number;
  isAdmin?: boolean;
  initialContent?: string | null;
  blockType: BlockType;
}

export const EditableBlock = ({
  relUrl,
  blockKey,
  width = 300,
  height = 100,
  isAdmin = false,
  initialContent,
  blockType,
}: EditableBlockProps) => {
  const [content, setContent] = useState<string | null>(initialContent ?? null);
  const [editing, setEditing] = useState(false);
  const [newContent, setNewContent] = useState("");
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
          blockType,
        }),
      });
      console.log("Saving block:", { relUrl, blockKey, newContent, blockType });

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

  const renderContent = () => {
    if (!content && !isAdmin) return null;

    if (blockType === "IMAGE") {
      return (
        <Image src={content ?? ""} alt={blockKey} className={styles.image} />
      );
    } else if (blockType === "HTML") {
      return <div dangerouslySetInnerHTML={{ __html: content ?? "" }} />;
    } else {
      return <p>{content ?? "Click edit to enter content"}</p>;
    }
  };

  return (
    <div className={styles.wrapper} style={{ width, height }}>
      {renderContent()}

      {isAdmin && (
        <button
          className={styles.editBtn}
          onClick={() => {
            setNewContent(content ?? "");
            setEditing(true);
          }}
        >
          ✏️
        </button>
      )}

      {editing && (
        <div className={styles.modal}>
          <textarea
            rows={6}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <div className={styles.controls}>
            <button onClick={saveBlock}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};
