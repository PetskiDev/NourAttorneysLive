import { EditableText } from "~/components/EditableText";
import { EditableImage } from "~/components/EditableImage";
import PartnersList from "~/components/PartnersList";
import LatestInsightsServer from "~/components/LatestInsightsServer";

export default async function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Project Unknown</h1>

      <h2>theproject</h2>

      <EditableText relUrl="/" blockKey="text1" />
      <EditableText
        relUrl="/"
        blockKey="text2"
        placeholderContent="Placeholder content"
        placeholderTag="h1"
        className="subtitle_1"
      />
      <h2>TIP</h2>

      <div style={{ width: 100, height: 100, position: "relative" }}>
        <EditableImage relUrl="/" blockKey="image1" />
      </div>
      <PartnersList />
      <LatestInsightsServer />
    </main>
  );
}
