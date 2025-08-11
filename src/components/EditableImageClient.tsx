"use client";

import { useState } from "react";
import styles from "./EditableBlock.module.css";
import type { BlockType } from "@prisma/client";
import { useRouter } from "next/navigation";
import MediaLibraryModal from "./MediaLibraryModal";

export default function EditableImageClient({
  relUrl,
  blockKey,
}: {
  relUrl: string;
  blockKey: string;
}) {
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
        setShowMedia(false);
        router.refresh();
      } else {
        console.error(await res.text());
      }
    } catch (e) {
      console.error("Save failed", e);
    }
  };

  return (
    <>
      <button className={styles.editBtn} onClick={() => setShowMedia(true)}>
        ✏️
      </button>
      <MediaLibraryModal
        open={showMedia}
        onClose={() => setShowMedia(false)}
        onSelect={(selectedUrl) => void saveBlock(selectedUrl)}
      />
    </>
  );
}


