import { getBlocksForPage } from "~/server/blocks";
import { EditableText } from "~/components/EditableText";
import styles from "./about-us.module.css";
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

      <section className={styles.aboutOne}>
        <div className="containerr">
          <div className={styles.aboutOneLeft}>
            <Image src={"/about-1.jpeg"} height={300} width={140} alt="image" />
          </div>

          <div className={styles.aboutOneRight}>
            <EditableText
              relUrl="/about-us"
              blockKey="about-one"
              isAdmin={true}
              initialContent={blockMap["about-one"]?.content}
              initialTag={blockMap["about-one"]?.elementTag ?? "h1"}
            />

            <Image src={"/about-2.jpeg"} height={600} width={240} alt="image" />
          </div>
        </div>
      </section>
    </main>
  );
}
