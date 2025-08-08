// /app/about-us/page.tsx
export const dynamic = "force-dynamic";

import { getBlocksForPage } from "~/server/blocks";
import { EditableBlock } from "~/components/EditableBlock";

export default async function AboutUsPage() {
  const blockMap = await getBlocksForPage("/about-us");

  return (
    <div>
      <h1>About Us</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", alignItems: "center" }}>
        <EditableBlock
          relUrl="/about-us"
          blockKey="slogan"
          isAdmin={true}
          initialContent={blockMap["slogan"]?.content}
          blockType={blockMap["slogan"]?.blockType ?? "TEXT"}
        />

        <EditableBlock
          relUrl="/about-us"
          blockKey="main-text"
          isAdmin={true}
          initialContent={blockMap["main-text"]?.content}
          blockType={blockMap["main-text"]?.blockType ?? "TEXT"}
        />
      </div>
    </div>
  );
}
