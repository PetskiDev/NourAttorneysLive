import { getBlocksForPage } from "~/server/blocks";
import { EditableText } from "~/components/EditableText";

export default async function AboutUsPage() {
  const blockMap: Record<string, { content: string; blockType: string; elementTag?: string | null }> = await getBlocksForPage("/about-us");

  return (
    <div>
      <h1>About Us</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", alignItems: "center" }}>
        <EditableText
          relUrl="/about-us"
          blockKey="slogan"
          isAdmin={true}
          initialContent={blockMap["slogan"]?.content}
          initialTag={blockMap["slogan"]?.elementTag ?? "h2"}
        />

        <EditableText
          relUrl="/about-us"
          blockKey="main-text"
          isAdmin={true}
          initialContent={blockMap["main-text"]?.content}
          initialTag={blockMap["main-text"]?.elementTag ?? "p"}
        />
      </div>
    </div>
  );
}
