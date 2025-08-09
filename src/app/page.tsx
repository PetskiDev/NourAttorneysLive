import { EditableText } from "~/components/EditableText";
import { EditableImage } from "~/components/EditableImage";
import { getBlocksForPage } from "~/server/blocks";

export default async function Home() {

  const blockMap = await getBlocksForPage("/");
  return (
    <main style={{ padding: 24 }}>
      <h1>Project Unknown</h1>

      <h2>theproject</h2>

      <EditableText
        relUrl="/"
        blockKey="text1"
        isAdmin={true}
        initialContent={blockMap["text1"]?.content}
        initialTag={blockMap["text1"]?.elementTag ?? "p"}
      />

        <h2>TIP</h2>

        <div style={{ width: 100, height: 100, position: "relative" }}>
          <EditableImage
            relUrl="/"
            blockKey="image1"
            isAdmin={true}
            initialUrl={blockMap["image1"]?.content}
          />
        </div>
    </main>
  );
}
