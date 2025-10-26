"use client";

import { useState } from "react";
import styles from "./EditableBlock.module.css";
import type { BlockType } from "@prisma/client";
import { useRouter } from "next/navigation";
import MediaLibraryModal from "./MediaLibraryModal";
import { useIsAdmin } from "./useIsAdmin";

export default function EditableImageClient({
  relUrl,
  blockKey,
}: {
  relUrl: string;
  blockKey: string;
}) {
  const [showMedia, setShowMedia] = useState(false);
  const router = useRouter();
  const isAdmin = useIsAdmin();

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
      {isAdmin && (
        <button className={styles.editBtn} 
        style={{ left: -10, right: "auto", top: -15, zIndex: 100000 }}
        onClick={() => setShowMedia(true)}>
          ✏️
        </button>
      )}
      <MediaLibraryModal
        open={showMedia}
        onClose={() => setShowMedia(false)}
        onSelect={(selectedUrl) => void saveBlock(selectedUrl)}
      />
    </>
  );
}


