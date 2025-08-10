import EditablePersonImage from "~/components/EditablePersonImage";
import { db } from "~/server/db";
import styles from "./people.module.css";
import Image from "next/image";

export const dynamic = "force-static";
const cx = (...cls: Array<string | false | undefined>) =>
  cls.filter(Boolean).join(" ");

export default async function PeoplePage() {
  const people = await db.people.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main style={{ height: 2000 }}>
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
        <div className={styles.mainPerson}></div>
      </section>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 16,
        }}
      >
        {people.map((p) => (
          <article
            key={p.id}
            style={{
              border: "1px solid #eee",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <div style={{ width: "100%", height: 180, position: "relative" }}>
              <EditablePersonImage
                personId={p.id}
                initialUrl={p.imageUrl ?? null}
                isAdmin={true}
                alt={p.name}
              />
            </div>
            <div style={{ padding: 12 }}>
              <div style={{ fontWeight: 700 }}>{p.name}</div>
              <div style={{ color: "#666" }}>{p.role}</div>
            </div>
          </article>
        ))}
      </div>

      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
    </main>
  );
}
