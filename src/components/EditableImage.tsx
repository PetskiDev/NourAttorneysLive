"use client";

import { useState } from "react";
import styles from "./EditableBlock.module.css";
import Image from "next/image";
import type { BlockType } from "@prisma/client";
import { useRouter } from "next/navigation";
import MediaLibraryModal from "./MediaLibraryModal";

export function EditableImage({
  relUrl,
  blockKey,
  isAdmin = false,
  initialUrl,
}: {
  relUrl: string;
  blockKey: string;
  isAdmin?: boolean;
  initialUrl?: string | null;
}) {
  const [url, setUrl] = useState<string | null>(initialUrl ?? null);
  const [showMedia, setShowMedia] = useState(false);
  const router = useRouter();

  const saveBlock = async (selectedUrl: string) => {
    try {
      const res = await fetch("/api/blocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          relUrl,
          key: blockKey,
          content: selectedUrl,
          blockType: "IMAGE" as BlockType,
        }),
      });

      if (res.ok) {
        setUrl(selectedUrl);
        router.refresh();
      } else {
        console.error(await res.text());
      }
    } catch (e) {
      console.error("Save failed", e);
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {url ? (
        <Image src={url} alt={blockKey} className={styles.image} fill sizes="100vw" style={{ objectFit: "cover" }} />
      ) : !isAdmin ? null : (
        <p className={styles.placeholder}>Click edit to select an image</p>
      )}

      {isAdmin && (
        <button
          className={styles.editBtn}
          onClick={() => {
            setShowMedia(true);
          }}
        >
          ✏️
        </button>
      )}

      <MediaLibraryModal
        open={showMedia}
        onClose={() => setShowMedia(false)}
        onSelect={(selectedUrl) => {
          void saveBlock(selectedUrl);
          setShowMedia(false);
        }}
      />
    </div>
  );
}


