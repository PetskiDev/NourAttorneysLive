import EditablePersonImage from "~/components/EditablePersonImage";
import { getPeopleCached } from "~/server/cachedReads";
import styles from "./people.module.css";
import Image from "next/image";
import { EditableText } from "~/components/EditableText";
import { getBlocksForPage } from "~/server/blocks";

export const dynamic = "force-static";
const cx = (...cls: Array<string | false | undefined>) =>
  cls.filter(Boolean).join(" ");

export default async function PeoplePage() {
  const blockMap = await getBlocksForPage("/people");
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
            <div className="headline_1">
              <EditableText
                relUrl="/people"
                blockKey="headline"
                isAdmin={true}
                initialContent={blockMap["headline"]?.content}
                initialTag={blockMap["headline"]?.elementTag ?? "h1"}
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
            <h4 className="subheadline_2">
              <EditableText
                relUrl="/people"
                blockKey="subheadline"
                isAdmin={true}
                initialContent={blockMap["subheadline"]?.content}
                initialTag={blockMap["subheadline"]?.elementTag ?? "h4"}
              />
            </h4>
          </div>
        </div>
      </section>
      <section id="people-actual">
        <div className={cx("containerr", "team", styles.teamContainer)}>
          <div className={cx("containerr", "team", styles.teamContainer)}>
  {/* DESKTOP layout */}
  <div className={`${styles.teamTop} ${styles.onlyDesktop}`}>
    <div className={styles.mainMember}>
      {main && <MemberCard person={main} />}
    </div>
    <div className={styles.membersOne}>
      {/* existing EMPTY slot mapping logic */}
    </div>
  </div>
  <div className={`${styles.membersTwo} ${styles.onlyDesktop}`}>
    {/* existing EMPTY slot mapping logic */}
  </div>

  {/* MOBILE layout */}
  <div className={`${styles.teamTop} ${styles.onlyMobile}`}>
    <div className={styles.mainMember}>
      {main && <MemberCard person={main} />}
    </div>
    <div className={styles.membersOne}>
      {rest.slice(0, 2).map((person) => (
        <MemberCard key={person.id} person={person} />
      ))}
    </div>
  </div>
  <div className={`${styles.membersTwo} ${styles.onlyMobile}`}>
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
