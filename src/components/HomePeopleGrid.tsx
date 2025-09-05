import Link from "next/link";
import Image from "next/image";
import styles from "./HomePeopleGrid.module.css";
import { getFirstSixPeopleCached } from "~/server/cachedReads";
import AnimatedCard from "./AnimatedCard"; // adjust path if needed

// Server Component: SSR grid of first 6 people
export default async function HomePeopleGrid() {
  const people = await getFirstSixPeopleCached();

  // Desktop ≥900px: 4x2 with slot 3 empty and slot 6 as link
  const desktopSlots: Array<React.ReactNode> = [];
  {
    let p = 0;
    for (let i = 0; i < 8; i++) {
      if (i === 2) {
        desktopSlots.push(
          <AnimatedCard key={`d-empty-${i}`}>
            <div className={styles.empty} />
          </AnimatedCard>,
        );
        continue;
      }
      if (i === 5) {
        desktopSlots.push(
          <AnimatedCard key="d-view">
            <div className={`${styles.card} ${styles.viewAllCard}`}>
              <div className={styles.imageWrap}>
                <Link href="/people" className={styles.viewAll}>
                  <span className="button_link">View All</span>
                  <Image
                    src={"/diagonal-arrow.svg"}
                    alt="arrow"
                    width={30}
                    height={30}
                  />
                </Link>
              </div>
            </div>
          </AnimatedCard>,
        );
        continue;
      }
      const person = people[p++];
      desktopSlots.push(
        <AnimatedCard key={`d-${i}`}>
          {renderPersonCard(person, `d-${i}`)}
        </AnimatedCard>,
      );
    }
  }

  // Tablet <900px ≥450px: 3x2 with slot 4 as link, no empty
  const tabletSlots: Array<React.ReactNode> = [];
  {
    let p = 0;
    for (let i = 0; i < 6; i++) {
      if (i === 3) {
        tabletSlots.push(
          <AnimatedCard key="t-view">
            <div className={`${styles.card} ${styles.viewAllCard}`}>
              <div className={styles.imageWrap}>
                <Link href="/people" className={styles.viewAll}>
                  <span className="button_link">View All</span>
                  <Image
                    src={"/diagonal-arrow.svg"}
                    alt="arrow"
                    width={30}
                    height={30}
                  />
                </Link>
              </div>
            </div>
          </AnimatedCard>,
        );
        continue;
      }
      const person = people[p++];
      tabletSlots.push(
        <AnimatedCard key={`t-${i}`}>
          {renderPersonCard(person, `t-${i}`)}
        </AnimatedCard>,
      );
    }
  }

  // Mobile <450px: 2x3 with 6 people, link below grid
  const mobileSlots: Array<React.ReactNode> = [];
  {
    for (let i = 0; i < Math.min(6, people.length); i++) {
      mobileSlots.push(
        <AnimatedCard key={`m-${i}`}>
          {renderPersonCard(people[i], `m-${i}`)}
        </AnimatedCard>,
      );
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.desktop}>
        <div className={styles.grid4}>{desktopSlots}</div>
      </div>

      <div className={styles.tablet}>
        <div className={styles.grid3}>{tabletSlots}</div>
      </div>

      <div className={styles.mobile}>
        <div className={styles.grid2}>{mobileSlots}</div>
        <AnimatedCard>
          <Link href="/people" className={styles.viewAllBelow}>
            <span className="button_link">View All</span>
            <Image
              src={"/diagonal-arrow.svg"}
              alt="arrow"
              width={30}
              height={30}
            />
          </Link>
        </AnimatedCard>
      </div>
    </section>
  );
}

function renderPersonCard(
  person:
    | { id: number; name: string; role: string; imageUrl: string | null }
    | undefined,
  key: string,
) {
  if (!person) return <div key={`pad-${key}`} className={styles.card} />;
  return (
    <div key={person.id} className={styles.card}>
      <div className={styles.imageWrap}>
        {person.imageUrl ? (
          <Image
            src={person.imageUrl}
            alt={person.name}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        ) : null}
      </div>
      <div className={styles.title + " title_1"}>{person.name}</div>
      <div className={styles.subtitle + " subtitle_1" + " animselector"}>
        {person.role}
      </div>
    </div>
  );
}
