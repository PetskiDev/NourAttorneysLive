import Link from "next/link";
import Image from "next/image";
import styles from "./HomePeopleGrid.module.css";
import { getFirstSixPeopleCached } from "~/server/cachedReads";

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
          <div key={`d-empty-${i}`} className={styles.empty} />,
        );
        continue;
      }
      if (i === 5) {
        desktopSlots.push(
          <div key="d-view" className={`${styles.card} ${styles.viewAllCard}`}>
            <div className={styles.imageWrap}>
              <Link href="/people" className={styles.viewAll}>
                <span className="button_link">View All</span>
                <Image
                  src={"/diagonal-arrow.svg"}
                  alt="arrow"
                  width={30}
                  height={30}
                  objectPosition="top"
                />
              </Link>
            </div>
          </div>,
        );
        continue;
      }
      const person = people[p++];
      desktopSlots.push(renderPersonCard(person, `d-${i}`));
    }
  }

  // Tablet <900px ≥450px: 3x2 with slot 4 as link, no empty
  const tabletSlots: Array<React.ReactNode> = [];
  {
    let p = 0;
    for (let i = 0; i < 6; i++) {
      if (i === 3) {
        tabletSlots.push(
          <div key="t-view" className={`${styles.card} ${styles.viewAllCard}`}>
            <div className={styles.imageWrap}>
              <Link href="/people" className={styles.viewAll}>
                <span className="button_link">View All</span>
                <Image
                  src={"/diagonal-arrow.svg"}
                  alt="arrow"
                  width={30}
                  height={30}
                  objectPosition="top"
                />
              </Link>
            </div>
          </div>,
        );
        continue;
      }
      const person = people[p++];
      tabletSlots.push(renderPersonCard(person, `t-${i}`));
    }
  }

  // Mobile <450px: 2x3 with 6 people, link below grid
  const mobileSlots: Array<React.ReactNode> = [];
  {
    for (let i = 0; i < Math.min(6, people.length); i++) {
      mobileSlots.push(renderPersonCard(people[i], `m-${i}`));
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
        <Link href="/people" className={styles.viewAllBelow}>
          <span className="button_link">View All</span>
          <Image
            src={"/diagonal-arrow.svg"}
            alt="arrow"
            width={30}
            height={30}
          />
        </Link>
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
            style={{ objectFit: "cover" }}
          />
        ) : null}
      </div>
      <div className={styles.title + " title_1"}>{person.name}</div>
      <div className={styles.subtitle + " subtitle_1"}>{person.role}</div>
    </div>
  );
}
