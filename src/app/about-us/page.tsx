import { getBlocksForPage } from "~/server/blocks";
import { EditableText } from "~/components/EditableText";
import styles from "./about-us.module.css";
import Image from "next/image";
import { EditableImage } from "~/components/EditableImage";

export default async function AboutUsPage() {
  const blockMap = await getBlocksForPage("/about-us");

  return (
    <main>
      <section className={styles.aboutHero}>
        <div className="containerr">
          <EditableText
            relUrl="/about-us"
            blockKey="headline"
            className="headline_1_2"
          />

          <div>
            <EditableText
              className="accent_text_2"
              relUrl="/about-us"
              blockKey="accent_1"
            />
            <EditableText
              className="accent_text_2"
              relUrl="/about-us"
              blockKey="accent_2"
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
            <Image src={"/about-1.jpg"} height={300} width={140} alt="image" />
          </div>

          <div className={styles.aboutOneRight}>
            <div>
              <EditableText
                className="subheadline_2"
                relUrl="/about-us"
                blockKey="about-one"
              />
            </div>

            <Image src={"/about-2.jpg"} height={600} width={240} alt="image" />
          </div>
        </div>
      </section>

      <section className={styles.aboutTwo}>
        <div className="containerr">
          <div className={styles.aboutTwoLine}>
            <div>
              <div>
                <span>[01]</span>
              </div>
              <div>
                <EditableText
                  className="title_5"
                  relUrl="/about-us"
                  blockKey="about-approach"
                />
              </div>
            </div>
            <EditableText
              className="body_text"
              relUrl="/about-us"
              blockKey="about-ap-1"
            />
            <div>
              <p className="body_text">
                just for today but for the future. True legal expertise isn’t
                just about knowing the law, but it’s also about understanding
                people, businesses, and the world and market they operate in.
              </p>
            </div>
          </div>
          <div className={styles.aboutTwoLine}>
            <div>
              <div>
                <span>[02]</span>
              </div>
              <div>
                <EditableText
                  className="title_5"
                  placeholderContent="Our Vision"
                  relUrl="/about-us"
                  blockKey="about-vision"
                />
              </div>
            </div>
            <EditableText
              relUrl="/about-us"
              blockKey="about-vi-1"
              placeholderContent="Nour Attorneys strives to be more than just legal advisors; we are partners in progress, empowering businesses and individuals with the knowledge, support, and strategies they need to succeed. Through sustainability, education, and investment in our"
              className="body_text"
            />
            <EditableText
              relUrl="/about-us"
              blockKey="about-vi-2"
              className="body_text"
              placeholderContent="people and community, we are building a lasting legacy of trust, growth, and positive change."
            />
          </div>
          <div className={styles.aboutTwoLine}>
            <div>
              <div>
                <span>[03]</span>
              </div>
              <div>
                <EditableText
                  className="title_5"
                  relUrl="/about-us"
                  blockKey="about-mission"
                  placeholderContent="OUR MISSION"
                />
              </div>
            </div>
            <EditableText
              className="body_text"
              relUrl="/about-us"
              blockKey="about-mi-1"
              placeholderContent="Through the utilization of innovative technology, alternative dispute resolution, and sustainable legal practices, Nour Attorneys ensures that its clients receive proactive, transparent and personalized legal to withstand legal risks and unpredicted legal "
            />
            <EditableText
              className="body_text"
              relUrl="/about-us"
              blockKey="about-mi-2"
              placeholderContent="challenges. Along with providing legal solutions, we develop legal frameworks for long-term sustainability to support our clients&apos; legal risks management, establishing a partnership based on trust, strategy, and discretion."
            />
          </div>
        </div>
      </section>

      <section className={styles.aboutNumbers}>
        <div className="containerr">
          <div className={styles.numbersLeft}>
            <div className={styles.numbersLeftTop}>
              <div className={styles.numbersInner}>
                <EditableText
                  relUrl="/about-us"
                  blockKey="consulatitons-provided"
                  placeholderContent="12466"
                  placeholderTag="h4"
                  className="headline_5"
                />
                <p className="body-text">legal consulatitons were probided</p>
              </div>
            </div>

            <div className={styles.numbersLeftBottom}>
              <div className={styles.numbersInner}>
                <EditableText
                  relUrl="/about-us"
                  blockKey="contract-drafted"
                  placeholderContent="14680"
                  placeholderTag="h4"
                  className="headline_5"
                />
                <p className="body-text">contract drafted</p>
              </div>
            </div>
          </div>

          <div className={styles.numbersRight}>
            <div className={styles.numbersRightTop}>
              <div className={styles.numbersInner}>
                <EditableText
                  relUrl="/about-us"
                  blockKey="transaction-completed"
                  placeholderContent="3455"
                  placeholderTag="h4"
                  className="headline_5"
                />
                <p className="body-text">commercial transactions completed</p>
              </div>
            </div>

            <div className={styles.numbersRightBottom}>
              <div className={styles.numbersInner}>
                <EditableText
                  relUrl="/about-us"
                  blockKey="win-rate"
                  placeholderContent="93.7 %"
                  placeholderTag="h4"
                  className="headline_5"
                />
                <p className="body-text">case win rate</p>
              </div>
            </div>
          </div>

          <div className={styles.numbersAbs}>
            <p className="title_3">
              At Nour Attorneys, we see our role as more than just providing
              legal services, we protect your interests and secure your future
            </p>

            <p className="subtitle_4">Do not settle for average</p>
          </div>
        </div>
      </section>

      <section className={styles.history}>
        <div className="containerr">
          <h2 className="headline_2">OUR HISTORY</h2>

          <h5 className="accent_text_2">
            Nour Attorneys was founded in the year 2009 and started its
            operation from a small office with one lawyer, Nour. Nour was
            determined and aimed to achieve the leading positions in the field
          </h5>

          <h5 className="accent_text_2">
            of corporate law in the middle east by providing unique services
            that thrives the legal community to follow his steps.
          </h5>

          <div className={styles.timelineDiv}>
            <div>
              <Image
                alt="timeline"
                src={"/timeline.png"}
                height={100}
                width={85}
              />
            </div>

            <div>
              <p className="body_text">
                Nour began his legal career in 2007 after graduating from
                Egypt&apos;s Faculty of Law. He gained valuable experience handling
                civil, corporate and tax cases before founding Nour Attorneys in
                May, 2009. Recognizing greater opportunities abroad, Nour
                relocated to Abu Dhabi in 2010, advising international clients
                on complex transactions. His expertise in joint ventures and
                real estate deals quickly established his reputation.
              </p>
              <p className="body_text">
                In 2017, Nour moved his practice to Dubai to better serve
                growing client demand in the emirate. The same year, he
                qualified to practice before Appeal Courts, expanding his legal
                capabilities. By 2019, Nour Attorneys had become a recognized
                brand across the Middle East. Known for innovative solutions,
                the firm specialized in cross-border business matters.
              </p>
              <p className="body_text">
                Today, Nour Attorneys continues growing through strategic
                partnerships. The firm remains committed to excellence while
                expanding its regional presence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.caseStudies}>
        <div className="containerr">
          <h2 className="headline_2">case studies</h2>

          <h6 className="accent_text_1">
            Behind every case lies a story of strategy, precision, and human
            impact. Our case studies don’t just document victories - they reveal
            how
            <span className="blue-text">
              &nbsp;[legal insight transforms challenges]&nbsp;
            </span>
            into
          </h6>
          <h6 className="accent_text_1">
            opportunities. As the best precedents are built through partnership.
          </h6>

          <div className="studies-boxes">
            <div className="studies-boxes-top">
              <div className="study-box">
                <div>
                  <div className="title_2">
                    Corporate defense: neutralizing a hostile takeover
                  </div>
                  <Image
                    alt="balls"
                    src={"/balls1.svg"}
                    width={25}
                    height={25}
                  />
                </div>
                <p className="subtitle_2">
                  A technology startup faced a forced buyout - we drafted a
                  shareholder agreement with strategic veto power. The offer
                  failed and the client received $20 million in growth
                  financing.
                </p>
              </div>
              <div className="study-box">
                <div>
                  <div className="title_2">
                    ESG breakthrough: from greenwashing to industry leader
                  </div>
                  <Image
                    alt="balls"
                    src={"/balls2.svg"}
                    width={25}
                    height={25}
                  />
                </div>
                <p className="subtitle_2">
                  The manufacturer faced reputational damage due to
                  environmental claims - we rewrote the contracts to include
                  verifiable metrics. In a year the company was ranked 3rd in
                  the ESG rating.
                </p>
              </div>
            </div>

            <div className="studies-boxes-bottom">
              <div className="study-box">
                <div>
                  <div className="title_2">
                    Arbitration win: turning the tables on a $50M Default
                  </div>
                  <Image
                    alt="balls"
                    src={"/balls3.svg"}
                    width={25}
                    height={25}
                  />
                </div>
                <p className="subtitle_2">
                  A contractor refused payment, citing &quot;breach of
                  contract&quot; - we exposed flawed arbitration clauses and
                  shifted the forum. The client recovered every dollar, plus 12%
                  penalties.
                </p>
              </div>
              <div className="study-box">
                <div>
                  <div className="title_2">
                    Tax revival: resurrecting a cross-border deal
                  </div>
                  <Image
                    alt="balls"
                    src={"/balls4.svg"}
                    width={25}
                    height={25}
                  />
                </div>
                <p className="subtitle_2">
                  A European holding company bled €2M yearly from double
                  taxation - we restructured its entity chain via treaty
                  jurisdictions. Now, they save €1.8M annually, compliantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.founder}>
        <div className="containerr">
          <div className={styles.founderTop}>
            <div style={{ marginLeft: "25%" }}>
              <div className="descriptor_2">FOUNDER</div>
              <h5 className="accent_text_3">
                Mohamed Noureldin is the visionary behind Nour Attorneys, a
                leader who goes beyond traditional legal services to create
                meaningful impact. Nour’s
              </h5>
            </div>
          </div>
          <div className={styles.founderMid}>
            <h5 className="accent_text_3">
              background reflects a commitment to excellence, shaping a firm
              that blends deep legal expertise with a forward-thinking approach.
              Nour is not just the founder but an active force behind every
              strategic decision, ensuring that Nour Attorneys operates with the
              highest standards of service, innovation, and client care.
            </h5>
          </div>

          <div className={styles.founderBottom}>
            <div className={styles.founderBottomLeft}></div>
            <div className={styles.founderBottomRight}>
              <p className="body_text">
                With extensive experience in corporate law, dispute resolution,
                and business legal advisory, Nour has established a reputation
                for delivering bespoke legal solutions with precision and
                integrity. Nour&apos;s background reflects a commitment to
                excellence, shaping a firm that blends deep legal expertise with
                a forward-thinking approach.
              </p>

              <Image
                src={"/founder.jpg"}
                height={600}
                width={240}
                alt="image"
              />

              <div className="body_text">
                Message from Mohamed Noureldin, Founder
              </div>

              <div className={styles.threePart}>
                <div></div>
                <p className="body_text">
                  Dear Friends, Colleagues, and Valued Clients,<br></br>
                  <br></br>
                  Nour Attorneys Law Firm was established not merely as a legal
                  practice, but with a profound passion for helping others – a
                  desire that has been with me since my childhood. I have always
                  aspired to contribute meaningfully to the lives of people and
                  to the growth of our community, making efforts that can bring
                  about noticeable, positive change. When I speak of “People and
                  Community,” I envision an inclusive circle that embraces
                  myself, my family, my esteemed colleagues and their families,
                  and, of course, our valued clients, their team members, and
                  their families. It is this expansive vision that guides our
                  work and our understanding of our purpose.<br></br>
                  <br></br>
                  For our clients, our constant aim is to be more than just a
                  service provider; we strive to be a valuable asset that
                  consistently delivers high-quality legal services and
                  contributes to a better legal and business environment. We
                  believe that by fostering a supportive and ethical legal
                  framework, we help your businesses and corporate endeavors to
                  flourish and achieve even greater heights. Therefore, I
                  respectfully disagree with the common notion that a law firm’s
                  biggest asset is its clients. Instead, we focus on how you,
                  our clients, perceive us – as a trusted asset and a dedicated
                  partner in your business journey.
                </p>
                <p className="body_text">
                  To my colleagues, the dedicated members of our Firm,
                  regardless of position or title: you are the true investors in
                  Nour Attorneys. You contribute your invaluable time, effort,
                  and expertise to our collective business capital, fostering
                  growth in all aspects of our lives and working towards a
                  shared mission. This mission remains ours, a testament to our
                  collective endeavor, irrespective of the duration of our
                  individual parts in it. Always remember, you are not merely
                  the capital of this business; you are the investors who commit
                  your most valuable resources in exchange for mutual benefits
                  that enrich the lives of everyone around us.<br></br>
                  <br></br>
                  For our societies – our beloved UAE, and the diverse
                  communities of each of our members and clients, irrespective
                  of religion, race, or ethnicity – we aim to contribute
                  significantly through our shared success and the growth we
                  aspire to bring to every individual and entity we can reach.
                  <br></br>
                  <br></br>
                  This message is a sincere reflection of my feelings and bona
                  fide intentions, drafted from the heart and dedicated to each
                  and every one of you. It is my earnest hope that during our
                  shared journey, we will all find the peace and fulfillment we
                  seek through the discovery of our true selves, and in doing
                  so, achieve the goals that we deem most meaningful in this
                  life.<br></br>
                  <br></br>
                  Best regards,<br></br>Mohamed Noureldin
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
