import { getBlocksForPage } from "~/server/blocks";
import { EditableText } from "~/components/EditableText";
import styles from "./about-us.module.css"
import Image from "next/image";

export default async function AboutUsPage() {
    const blockMap = await getBlocksForPage("/about-us");

  return (
    <main>

      <section className={styles.aboutHero}>

        <div className="containerr">

            <div className="headline_1_2">
              <EditableText
                relUrl="/about-us"
                blockKey="headline"
                isAdmin={true}
                initialContent={blockMap["headline"]?.content}
                initialTag={blockMap["headline"]?.elementTag ?? "h1"}
              />
            </div>
            
            <div className="accent_text_2">
              <EditableText
                relUrl="/about-us"
                blockKey="accent_1"
                isAdmin={true}
                initialContent={blockMap["accent_1"]?.content}
                initialTag={blockMap["accent_1"]?.elementTag ?? "h1"}
              />
              <EditableText
                relUrl="/about-us"
                blockKey="accent_2"
                isAdmin={true}
                initialContent={blockMap["accent_2"]?.content}
                initialTag={blockMap["accent_2"]?.elementTag ?? "h1"}
              />
            </div>
            
            <Image
            src={"/about-hero.svg"}
            height={600}
            width={1400}
            alt="illustration"
            />

        </div>

      </section>

    </main>
  );
}
