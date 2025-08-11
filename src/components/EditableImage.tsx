import Image from "next/image";
import { getBlocksForPage } from "~/server/blocks";
import EditableImageClient from "./EditableImageClient";
import styles from "./EditableBlock.module.css";

export async function EditableImage({
  relUrl,
  blockKey,
  placeholderUrl,
  placeholderAlt,
}: {
  relUrl: string;
  blockKey: string;
  /** Optional fallback URL when DB content is missing. Not persisted. */
  placeholderUrl?: string;
  /** Optional alt text for placeholder image. */
  placeholderAlt?: string;
}) {
  const blocks = await getBlocksForPage(relUrl);
  const block = blocks[blockKey] as { content: string | null } | undefined;
  const dbUrl = block?.content ?? null;
  const url = dbUrl ?? placeholderUrl ?? null;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {url ? (
        <Image
          src={url}
          alt={placeholderAlt ?? blockKey}
          className={styles.image}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      ) : null}

      <EditableImageClient relUrl={relUrl} blockKey={blockKey} />
    </div>
  );
}
