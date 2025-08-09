import { EditableBlock } from "~/components/EditableBlock"
import { getBlocksForPage } from "~/server/blocks";

export default async function Home() {

  const blockMap = await getBlocksForPage("/");
  return (
    <main style={{ padding: 24 }}>
      <h1>Project Unknown</h1>

      <EditableBlock
          relUrl="/"
          blockKey="text1"
          isAdmin={true}
          initialContent={blockMap["text1"]?.content}
          blockType={blockMap["text1"]?.blockType ?? "TEXT"}
        />

        <h2>TIP</h2>

        <EditableBlock
          relUrl="/"
          blockKey="text2"
          isAdmin={true}
          initialContent={blockMap["text2"]?.content}
          blockType={blockMap["text2"]?.blockType ?? "TEXT"}
        />
    </main>
  );
}
