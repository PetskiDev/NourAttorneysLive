import EditablePersonImage from "~/components/EditablePersonImage";
import styles from "./people.module.css";
import Image from "next/image";
import { EditableText } from "~/components/EditableText";
import { getPeopleCached } from "~/server/cachedReads";

export const revalidate = false;

const cx = (...cls: Array<string | false | undefined>) =>
  cls.filter(Boolean).join(" ");

export default async function PeoplePage() {
  const people = await getPeopleCached();

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
            <div>
              <EditableText
               className="headline_1"
                relUrl="/people"
                blockKey="headline"
              />
            </div>
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
            <h4>
              <EditableText
               className="subheadline_2"
                relUrl="/people"
                blockKey="subheadline"
              />
            </h4>
          </div>
        </div>
      </section>
      <section id="people-actual">
        <div className={cx("containerr", "team", styles.teamContainer)}>
          {/* DESKTOP (your existing layout, unchanged) */}
          <div className={styles.desktop}>
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
                const EMPTY = new Set([1, 5, 8, 10, 12, 14]); // 0-based
                const CYCLE = 17;
                const items: React.ReactNode[] = [];
                let idx = 0;
                let pos = 0;

                while (idx < remaining.length) {
                  const cyclePos = pos % CYCLE;
                  if (EMPTY.has(cyclePos)) {
                    items.push(
                      <div
                        key={`empty-${pos}`}
                        className={styles.memberCard}
                      />,
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

          {/* MOBILE (<1024px): same structure (teamTop → mainMember + membersOne, then membersTwo) */}
          <div className={styles.mobile}>
            <div className={styles.teamTop}>
              {/* mainMember */}
              <div className={styles.mainMember}>
                {main && <MemberCard person={main} />}
              </div>

              {/* membersOne — next 2 people, no gaps */}
              <div className={styles.membersOne}>
                {rest.slice(0, 2).map((person) => (
                  <MemberCard key={person.id} person={person} />
                ))}
              </div>
            </div>

            {/* membersTwo — rest of the people, no gaps */}
            <div className={styles.membersTwo}>
              {rest.slice(2).map((person) => (
                <MemberCard key={person.id} person={person} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
