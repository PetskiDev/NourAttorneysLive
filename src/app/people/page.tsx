import EditablePersonImage from "~/components/EditablePersonImage";
import { db } from "~/server/db";
import styles from "./people.module.css";
import Image from "next/image";

export const dynamic = "force-static";
const cx = (...cls: Array<string | false | undefined>) =>
  cls.filter(Boolean).join(" ");

export default async function PeoplePage() {
  const people = await db.people.findMany({ orderBy: { createdAt: "desc" } });

  const [main, ...rest] = people; // first person is the big one

  const MemberCard = ({ person }: { person: (typeof people)[number] }) => (
    <div className={styles.memberCard}>
      <div>
        <EditablePersonImage
          personId={person.id}
          initialUrl={person.imageUrl ?? null}
          isAdmin={true}
          alt={person.name}
        />
      </div>
      <div className="title_1">{person.name}</div>
      <div className="subtitle_1">{person.role}</div>
    </div>
  );

  return (
    <main>
      <section id="people-top">
        <div className={cx("containerr", styles.peopleTopContainer)}>
          <div className={styles.peopleTopTop}>
            <h1 className="headline_1">OUR PEOPLE</h1>
            <div className={styles.circles}>
              <Image
                src="/people-circles.svg"
                alt="Circles"
                width={200}
                height={100}
                priority
              />
            </div>
          </div>
          <div className={styles.peopleTopBottom}>
            <h4 className="subheadline_2">
              team united by knowledge, integrity<br></br>and commitment to
              sustainable growth
            </h4>
          </div>
        </div>
      </section>
      <section id="people-actual">
        <div className={cx("containerr", "team", styles.teamContainer)}>
          <div className={styles.teamTop}>
            {/* mainMember (big) */}
            <div className={styles.mainMember}>
              {main && <MemberCard person={main} />}
            </div>

            {/* membersOne with fixed empty slots: 2nd, 5th, 7th (1-based) */}
            <div className={styles.membersOne}>
              {(() => {
                const EMPTY = new Set([1, 4, 6]); // 0-based positions to keep empty
                let iRest = 0;
                return Array.from({ length: 8 }).map((_, i) => {
                  if (EMPTY.has(i))
                    return (
                      <div key={`empty-${i}`} className={styles.memberCard} />
                    );
                  const person = rest[iRest++];
                  return person ? (
                    <MemberCard key={person.id} person={person} />
                  ) : (
                    <div key={`pad-${i}`} className={styles.memberCard} />
                  );
                });
              })()}
            </div>
          </div>
          <div className={styles.membersTwo}>
            {(() => {
              const remaining = rest.slice(5); // after main + membersOne
              const EMPTY = new Set([1, 5, 8, 10, 12, 14]); // 0-based => 2,6,9,11,13,15
              const CYCLE = 17; // 1..17 then repeat
              const items: React.ReactNode[] = [];
              let idx = 0;
              let pos = 0;

              while (idx < remaining.length) {
                const cyclePos = pos % CYCLE; // 0..16
                if (EMPTY.has(cyclePos)) {
                  items.push(
                    <div key={`empty-${pos}`} className={styles.memberCard} />,
                  );
                } else {
                  const person = remaining[idx++];
                  items.push(
                    person ? (
                      <MemberCard key={person.id} person={person} />
                    ) : (
                      <div key={`pad-${pos}`} className={styles.memberCard} />
                    ),
                  );
                }
                pos++;
              }
              return items;
            })()}
          </div>
        </div>
      </section>

    </main>
  );
}
