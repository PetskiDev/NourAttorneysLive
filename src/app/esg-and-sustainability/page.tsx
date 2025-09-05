// import { getBlocksForPage } from "~/server/blocks";
// import { EditableText } from "~/components/EditableText";
import styles from "./EsgAndSustainability.module.css";
import Image from "next/image";
// import { EditableImage } from "~/components/EditableImage";

export default async function esgPage() {
  //   const blockMap = await getBlocksForPage("/esg-and-sustainability");

  return (
    <main>
      <section className={styles.esgHero}>
        <div className="containerr">
          <h1 className="headline_1_3 antiselector">ESG & SUSTAINABILITY</h1>

          <h6 className="accent_text_3 antiselector">We believe in the power of</h6>
          <h6 className="accent_text_3 antiselector">
            giving back to the world around us. Giving back is to provide to our
            universe with all within, our clients, team, communities,
          </h6>
          <h6 className="accent_text_3 antiselector">
            and environment,and, it&#39;s how we stay connected to our humanity and
            create a positive and lasting impact. It&#39;s not only a value,
          </h6>
          <h6 className="accent_text_3 antiselector">
            but a commitment rooted in care and sincerity. By supporting those
            in need, we preserve our humanity and investing a better future for
            everyone we serve. Our approach includes
          </h6>
          <h6 className="accent_text_3 antiselector">
            improving quality and time-frame of services, building flexible
            legal frameworks that solve today&#39;s problems with preparing for the
            future.
          </h6>

          <h5>
            We believe in the power of giving back to the world around us.
            Giving back is to provide to our universe with all within, team, our
            clients, communities, and environment,and, it&#39;s how we stay{" "}
          </h5>
          <h5>
            connected to our humanity and create a positive and lasting impact.
          </h5>
          <h5>
            Our approach includes improving quality and time-frame of services,
            building flexible legal frameworks that solve today&#39;s problems with
            preparing for the future.
          </h5>

          <h4>
            We believe in the power of giving back to the world around us.
            Giving back is to provide to our universe with all within, team, our
            clients, communities, and environment,and, It&#39;s how we stay
            connected to our humanity and create a positive and lasting impact.
            <br></br>
            <br></br>
            Our approach includes improving quality and time-frame of services,
            building flexible legal frameworks that solve today&#39;s problems with
            preparing for the future.
          </h4>

          <div>
            <span className="title_5 antiselector">INTEGRITY</span>
            <span className="title_5 antiselector">RELIABILITY</span>
            <span className="title_5 antiselector">INNOVATION</span>
          </div>

          <Image width={270} height={320} src={"/esg-element.svg"} alt="esg" />
          <Image
            width={270}
            height={320}
            src={"/esg-mobile.svg"}
            alt="esg"
            className={styles.line1}
          />
        </div>
      </section>

      <section className={styles.esgOne}>
        <div className="containerr">
          <div className={styles.esgOneLeft}>
            <Image width={270} height={320} src={"/esg1.jpg"} alt="esg" />
          </div>

          <div className={styles.esgOneRight}>
            <div>
              <span></span>
              <div className="title_3 antiselector">SUSTAINABLE LEGAL FOUNDATIONS</div>
            </div>
            <p className="body_text antiselector">
              Nour Attorneys is the official legal partner of the SECOTO
              Organization. From COP28 to the World Green Cup, we&#39;re dedicated
              to supporting all initiatives that connect communities with nature
              and promote environmental awareness through heritages, arts and
              more. Nour Attorneys are committed to helping our clients build
              empires that are not just legally sound but also socially and
              environmentally responsible. Sustainability goes even in our legal
              solutions by providing long-lasting legal frameworks that ensure
              business sustainability for the client in the long term to
              withstand legal risks and unpredicted challenges.
            </p>
            <div>
              <span></span>
              <div className="title_3 antiselector">INNOVATING LEGAL FRAMEWORKS</div>
            </div>
            <p className="body_text antiselector">
              Nour Attorneys&#39; bespoke strategies are designed to adapt to the
              changing issues our clients face, enabling them to stay ahead in
              today&#39;s competitive and fast-paced world. Nour Attorneys don&#39;t
              just follow the rules; Nour Attorneys lead with innovative, tech
              driven legal solutions that guarantee precision and efficiency.
            </p>
            <div>
              <span></span>
              <div className="title_3 antiselector">
                EMPOWERING COMMUNITIES, BUILDING FUTURES
              </div>
            </div>
            <p className="body_text antiselector">
              At Nour Attorneys, we always think outside the box. The primary
              focus is to empower our community through strategic investments
              that foster growth and create new opportunities. We actively
              support our local initiatives, ensuring that our community members
              thrive. We aim to create a strong yet lasting impact that not only
              help individuals today but also sets the foundation for future
              generations through investments and partnerships. By integrating
              our expertise and resources, we empower those we serve to build
              stronger and more resilient communities.
            </p>
            <div>
              <span></span>
              <div className="title_3 antiselector">LEGAL KNOWLEDGE FOR GROWTH</div>
            </div>
            <p className="body_text antiselector">
              We strongly believe that continuous learning is key to growth. To
              ensure Nour Attorneys&#39; legal advisors are always at the forefront
              of legal updates and advancements, we are integrating learning
              goals as part of Key Performance Indicators (KPIs) and sponsoring
              team educational courses. We also sponsor and dedicate initiatives
              to promoting legal knowledge, including our free legal webinars
              available on our channels and legal publications.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.esgTwo}>
        <div className="containerr">
          <h4 className="headline_4">
            Nour Attorneys integrates{" "}
            <span className="blue-text"> [ESG principles] </span> into every
            legal solution, ensuring sustainable and compliant
          </h4>
          <h4 className="headline_4">
            business practices for{" "}
            <span className="blue-text">[lasting success]</span>
          </h4>
          <div className="line"></div>
          <div className={styles.esgTwoRow}>
            <div className={styles.esgTwoRowLeft}>
              <div className="title_5 antiselector">[01]</div>
              <div className="title_5 antiselector">E-ENVIRONMENTAL</div>
            </div>
            <div className={styles.esgTwoRowRight}>
              <p className="subtitle_2 antiselector">
                <strong>Paperless Operations:</strong> transition to a fully
                digital system to reduce paper usage, utilizing e-signatures,
                cloud storage, AI-driven document management.
              </p>
              <p className="subtitle_2 antiselector">
                <strong>Green Office Practices:</strong> implement
                energy-efficient lighting, reduce plastic waste, and encourage
                remote work to lower the firm&#39;s carbon footprint.
              </p>
              <p className="subtitle_2 antiselector">
                <strong>Sustainable Procurement:</strong> partner with
                eco-friendly vendors for office supplies, catering, and
                operational needs.
              </p>
              <p className="subtitle_2 antiselector">
                <strong>Carbon Offsetting:</strong> support global carbon offset
                programs and consider reducing travel emissions by prioritizing
                virtual client meetings.
              </p>
              <p className="subtitle_2 antiselector">
                <strong>Eco-Conscious Legal Advice:</strong> guide clients on
                compliance with environmental regulations and sustainable
                business strategies.
              </p>
            </div>
          </div>
          <div className="line"></div>
          <div className={styles.esgTwoRow}>
            <div className={styles.esgTwoRowLeft}>
              <div className="title_5 antiselector">[02]</div>
              <div className="title_5 antiselector">S-SOCIAL</div>
            </div>
            <div className={styles.esgTwoRowRight}>
              <p className="subtitle_2 antiselector">
                <strong>Community Legal Support:</strong> publish legal
                publications, webinars, and educational legal materials for
                common subjects such as labor laws, offering pro-bone or
                discounted legal services.
              </p>
              <p className="subtitle_2 antiselector">
                <strong>Employee Well-being & Development:</strong> provide
                wellness programs, flexible work arrangements, and Continuous
                legal training for professional growth.
              </p>
              <p className="subtitle_2 antiselector">
                <strong>Ethical Client Selection:</strong> prioritize working
                with clients who align with ethical, sustainable, and socially
                responsible business models.
              </p>
              <p className="subtitle_2 antiselector">
                <strong>Community Engagement:</strong> support local charities,
                legal awareness programs, and mentorship initiatives for young
                lawyers and trainees.
              </p>
            </div>
          </div>
          <div className="line"></div>
          <div className={styles.esgTwoRow}>
            <div className={styles.esgTwoRowLeft}>
              <div className="title_5 antiselector">[03]</div>
              <div className="title_5 antiselector">G-GOVERNANCE</div>
            </div>
            <div className={styles.esgTwoRowRight}>
              <p className="subtitle_2 antiselector">
                <strong>Committee Management:</strong> transition to internal
                committee management, led by team members, to ensure long-term
                business sustainability.
              </p>
              <p className="subtitle_2 antiselector">
                <strong>Joint Beneficiaries:</strong> change our beneficiary
                structure to a foundation model with clear profit rights for
                stakeholders and a profit share for team members and a
                supporting fund to ensure long term sustainable growth and
                stability.
              </p>
              <p className="subtitle_2 antiselector">
                <strong>Single Founder to Foundation:</strong> transition of
                ownership to the foundation, with clear and regulated rules and
                regulations, ensures that our message and vision will continue
                for generations to come, preventing future beneficiaries from
                altering the business course against it mission and values.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
