"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MediaLibraryModal from "./MediaLibraryModal";
import styles from "./EditablePersonImage.module.css"
import { useIsAdmin } from "./useIsAdmin";

export default function EditablePersonImage({
  personId,
  initialUrl,
  alt,
}: {
  personId: number;
  initialUrl?: string | null;
  alt?: string;
}) {
  const [url, setUrl] = useState<string | null>(initialUrl ?? null);
  const [showMedia, setShowMedia] = useState(false);
  const router = useRouter();
  const isAdmin = useIsAdmin();

  async function save(selectedUrl: string) {
    try {
      const res = await fetch(`/api/people/${personId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: selectedUrl }),
      });
      if (!res.ok) throw new Error(`Failed to update: ${res.status}`);
      setUrl(selectedUrl);
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {url ? (
        <Image
          src={url}
          alt={alt ?? "Person image"}
          className={styles.image}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      ) : !isAdmin ? null : (
        <p className={styles.placeholder}>Click edit to select an image</p>
      )}

      {isAdmin && (
        <button className={styles.editBtn} onClick={() => setShowMedia(true)}>
          ✏️
        </button>
      )}

      <MediaLibraryModal
        open={showMedia}
        onClose={() => setShowMedia(false)}
        onSelect={(selectedUrl) => {
          void save(selectedUrl);
          setShowMedia(false);
        }}
      />
    </>
  );
}
