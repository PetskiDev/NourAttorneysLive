import { EditableText } from "~/components/EditableText";
import styles from "./about-us.module.css";
import Image from "next/image";

export default async function AboutUsPage() {
  return (
    <main>
      <section className={styles.aboutHero}>
        <div className="containerr">
          <div className="headline_1_2">
            <EditableText
              relUrl="/about-us"
              blockKey="headline"
              isAdmin={true}
            />
          </div>

          <div className="accent_text_2">
            <EditableText
              relUrl="/about-us"
              blockKey="accent_1"
              isAdmin={true}
            />
            <EditableText
              relUrl="/about-us"
              blockKey="accent_2"
              isAdmin={true}
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
            />

            <Image src={"/about-2.jpeg"} height={600} width={240} alt="image" />
          </div>
        </div>
      </section>
    </main>
  );
}
