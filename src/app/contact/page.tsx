import { EditableText } from "~/components/EditableText";
import styles from "./contact.module.css";
import Image from "next/image";
import Link from "next/link";

export default async function ContactPage() {
  return (
    <main>
      <section className={styles.contactHero}>
        <div className="containerr">
          <div className={styles.leftHero}>
          <EditableText
            relUrl="/contact"
            blockKey="hero-title"
            placeholderTag="h1"
            className="headline_1_1"
            placeholderContent="NOUR ATTORNEYS"
          />
          <EditableText
            relUrl="/contact"
            blockKey="hero-subtitle"
            placeholderTag="h5"
            className="accent_text_2"
            placeholderContent="We stand for integrity, innovation, and real connection. Your journey matters, and we&apos;re here to support it through expert legal care, smarter systems, and a human- first approach."
          />
          </div>

          <div className={styles.rightHero}>
            <div className={styles.rightHeroBox}>
              <EditableText
                relUrl="/contact"
                blockKey="book-title"
                placeholderTag="h4"
                className="subheadline_2 antiselector"
                placeholderContent="Book a consultation"
              />
              <h6 className="subheadline_4 antiselector">
                To book a consultation, use <Link style={{borderBottom: "1px solid #101010"}} href={"/."}>the link</Link>
              </h6>
              <EditableText
                relUrl="/contact"
                blockKey="book-policy"
                placeholderTag="p"
                className="body_text antiselector"
                placeholderContent="Office visits are by appointment only and subject to office policy."
              />
              <Image
                src={"/contact-small-element-1.svg"}
                width={30}
                height={30}
                alt="element"
              />
            </div>

            <div className={styles.rightHeroBox}>
              <EditableText
                relUrl="/contact"
                blockKey="contactus-title"
                placeholderTag="h4"
                className="subheadline_2 antiselector"
                placeholderContent="contact us"
              />
              <div className={styles.boxLinkDiv}>
                <EditableText
                  relUrl="/contact"
                  blockKey="telephone-label"
                  placeholderTag="h6"
                  className="subheadline_4 antiselector"
                  placeholderContent="Telephone:"
                />
                <Link className="subheadline_4 antiselector" href={"tel:+971 58 555 2999"}>
                  <EditableText
                    relUrl="/contact"
                    blockKey="telephone-value"
                    placeholderTag="span"
                    placeholderContent={"+971 58 555 2999"}
                  />
                </Link>
              </div>
              <div className={styles.boxLinkDiv}>
                <EditableText
                  relUrl="/contact"
                  blockKey="whatsapp-label"
                  placeholderTag="h6"
                  className="subheadline_4 antiselector"
                  placeholderContent="WhatsApp:"
                />
                <Link className="subheadline_4 antiselector" href={"tel:+971 58 555 2999"}>
                  <EditableText
                    relUrl="/contact"
                    blockKey="whatsapp-value"
                    placeholderTag="span"
                    placeholderContent={"+971 58 555 2999"}
                  />
                </Link>
              </div>
              <div className={styles.boxLinkDiv}>
                <EditableText
                  relUrl="/contact"
                  blockKey="email-label"
                  placeholderTag="h6"
                  className="subheadline_4 antiselector"
                  placeholderContent="Email:"
                />
                <Link
                  className="subheadline_4 antiselector"
                  href={"mailto:info@nourattorneys.com"}
                >
                  <EditableText
                    relUrl="/contact"
                    blockKey="email-value"
                    placeholderTag="span"
                    placeholderContent={"info@nourattorneys.com"}
                  />
                </Link>
              </div>
              <div className={styles.boxLinkDiv}>
                <Link className="subheadline_4 antiselector" href={"tel:+971 58 555 2999"}>
                  <EditableText
                    relUrl="/contact"
                    blockKey="emergency-cta"
                    placeholderTag="div"
                    placeholderContent="Emergency legal support"
                  />
                  <Image
                    src={"/diagonal-arrow.svg"}
                    width={15}
                    height={15}
                    alt="arrow"
                  />
                </Link>
              </div>
              <Image
                src={"/contact-small-element-2.svg"}
                width={30}
                height={30}
                alt="element"
              />
            </div>

            <div className={styles.rightHeroBox}>
              <EditableText
                relUrl="/contact"
                blockKey="ai-title"
                placeholderTag="h4"
                className="subheadline_2 antiselector"
                placeholderContent="AI assistant"
              />
              <div className={styles.aiContactBox}>
                <Link className="subheadline_4 antiselector" href={"./"}>
                  Open.
                </Link>
                <EditableText
                  relUrl="/contact"
                  blockKey="ai-tagline"
                  placeholderTag="div"
                  className="subheadline_4 antiselector"
                  placeholderContent="Chat.Solved."
                />
              </div>
              <Image
                src={"/contact-small-element-3.svg"}
                width={30}
                height={30}
                alt="element"
              />
            </div>
          </div>

          <Image src={"contact-element.svg"} className={styles.contactAbs} alt="element" width={1000} height={700}/>
        </div>
      </section>

      <section className={styles.contactMain}>
        <div className="containerr">
          <h3 className="subheadline_2 antiselector">
            At Nour Attorneys <span className="mobnot">Law Firm,</span> we believe that the foundation of a
            successful legal practice
          </h3>
          <EditableText
            relUrl="/contact"
            blockKey="main-subheadline-2"
            placeholderTag="h3"
            className="subheadline_2 antiselector"
            placeholderContent="lies in cultivating strong, lasting relationships with our clients."
          />
          <EditableText
            relUrl="/contact"
            blockKey="main-accent-1"
            placeholderTag="h5"
            className="accent_text_2 mobnot antiselector"
            placeholderContent="we provide bespoke legal services characterized by the highest levels of quality, professionalism, and strategic insight. Our"
          />
          <EditableText
            relUrl="/contact"
            blockKey="main-accent-2"
            placeholderTag="h5"
            className="accent_text_2 mobnot antiselector"
            placeholderContent="commitment to these principles is not merely aspirational; it is embedded in our core service standards, which guide every interaction and every mandate we undertake."
          />

          <EditableText
            relUrl="/contact"
            blockKey="main-accent-mobile"
            placeholderTag="h5"
            className="accent_text_2 mob antiselector"
            placeholderContent="we provide bespoke legal services characterized by the highest levels of quality, professionalism, and strategic insight. Our commitment to these principles is not merely aspirational; it is embedded in our core service standards, which guide every interaction and every mandate we undertake."
          />
          <div className={styles.contactRow}>
            <div className={styles.contactLeft}>
              <div className="title_3">STAY CONNECTED</div>
            </div>
            <div className={styles.contactRight}>
              <div className="line antiline"></div>
              <div className={`${styles.contactElement}`}>
                <EditableText
                  relUrl="/contact"
                  blockKey="quickhelp-title"
                  placeholderTag="div"
                  className="title_1 antiselector"
                  placeholderContent="NEED QUICK HELP?"
                />
                <EditableText
                  relUrl="/contact"
                  blockKey="quickhelp-text"
                  placeholderTag="p"
                  className="body_text antiselector"
                  placeholderContent="Use our smart legal assistant."
                />
                <Link href={"tel:+971 58 555 2999"}>
                  <EditableText
                    relUrl="/contact"
                    blockKey="quickhelp-cta"
                    placeholderTag="div"
                    placeholderContent="Contact us"
                  />
                  <Image
                    src={"/diagonal-arrow.svg"}
                    width={15}
                    height={15}
                    alt="arrow"
                  />
                </Link>
              </div>

              <div className="line antiline"></div>
                <div className={`${styles.contactElement}`}>
                <EditableText
                  relUrl="/contact"
                  blockKey="mailinglist-title"
                  placeholderTag="div"
                  className="title_1 antiselector"
                  placeholderContent="Join Our Mailing List"
                />
                <EditableText
                  relUrl="/contact"
                  blockKey="mailinglist-text"
                  placeholderTag="p"
                  className="body_text antiselector"
                  placeholderContent="Get insights, events, and legal updates straight to your inbox. We respect your privacy. No spam. Ever."
                />
                <Link href={"tel:+971 58 555 2999"}>
                  <EditableText
                    relUrl="/contact"
                    blockKey="mailinglist-cta"
                    placeholderTag="div"
                    placeholderContent="Subscribe"
                  />
                  <Image
                    src={"/diagonal-arrow.svg"}
                    width={15}
                    height={15}
                    alt="arrow"
                  />
                </Link>
              </div>

              <div className="line antiline"></div>
                <div className={`${styles.contactElement}`}>
                <EditableText
                  relUrl="/contact"
                  blockKey="events-title"
                  placeholderTag="div"
                  className="title_1 antiselector"
                  placeholderContent="Events & Webinars"
                />
                <EditableText
                  relUrl="/contact"
                  blockKey="events-text"
                  placeholderTag="p"
                  className="body_text antiselector"
                  placeholderContent="Discover how we&apos;re redefining legal practice - attend our events."
                />
                <Link href={"tel:+971 58 555 2999"}>
                  <EditableText
                    relUrl="/contact"
                    blockKey="events-cta"
                    placeholderTag="div"
                    placeholderContent="Register"
                  />
                  <Image
                    src={"/diagonal-arrow.svg"}
                    width={15}
                    height={15}
                    alt="arrow"
                  />
                </Link>
              </div>

              <div className="line antiline"></div>
                <div className={`${styles.contactElement}`}>
                <EditableText
                  relUrl="/contact"
                  blockKey="careers-title"
                  placeholderTag="div"
                  className="title_1 antiselector"
                  placeholderContent="Careers & Internships"
                />
                <EditableText
                  relUrl="/contact"
                  blockKey="careers-text"
                  placeholderTag="p"
                  className="body_text antiselector"
                  placeholderContent="Connect your passion to a bigger mission - join our team."
                />
                <Link href={"tel:+971 58 555 2999"}>
                  <EditableText
                    relUrl="/contact"
                    blockKey="careers-cta"
                    placeholderTag="div"
                    placeholderContent="Join our team"
                  />
                  <Image
                    src={"/diagonal-arrow.svg"}
                    width={15}
                    height={15}
                    alt="arrow"
                  />
                </Link>
              </div>

              <div className="line antiline"></div>
                <div className={`${styles.contactElement}`}>
                <EditableText
                  relUrl="/contact"
                  blockKey="visit-title"
                  placeholderTag="div"
                  className="title_1 antiselector"
                  placeholderContent="Visit Us"
                />
                <EditableText
                  relUrl="/contact"
                  blockKey="visit-text"
                  placeholderTag="p"
                  className="body_text antiselector"
                  placeholderContent="Find our office location."
                />
                <Link href={"tel:+971 58 555 2999"}>
                  <EditableText
                    relUrl="/contact"
                    blockKey="visit-cta"
                    placeholderTag="div"
                    placeholderContent="Go to map"
                  />
                  <Image
                    src={"/diagonal-arrow.svg"}
                    width={15}
                    height={15}
                    alt="arrow"
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="line"></div>

          <div className={styles.contactRow}>
            <div className={styles.contactLeft}>
              <div className="title_3">follow us online</div>
            </div>
            <div className={styles.contactRight}>
              <div className={styles.contactGrid}>
                <div>
                  <EditableText
                    relUrl="/contact"
                    blockKey="social-linkedin-title"
                    placeholderTag="div"
                    className="title_1 antiselector"
                    placeholderContent="LinkedIn"
                  />
                  <Link href={"tel:+971 58 555 2999"}>
                    <EditableText
                      relUrl="/contact"
                      blockKey="social-linkedin-cta"
                      placeholderTag="div"
                      placeholderContent="Legal updates"
                    />
                    <Image
                      src={"/diagonal-arrow.svg"}
                      width={15}
                      height={15}
                      alt="arrow"
                    />
                  </Link>
                </div>

                <div>
                  <EditableText
                    relUrl="/contact"
                    blockKey="social-instagram-title"
                    placeholderTag="div"
                    className="title_1 antiselector"
                    placeholderContent="instagram"
                  />
                  <Link href={"tel:+971 58 555 2999"}>
                    <EditableText
                      relUrl="/contact"
                      blockKey="social-instagram-cta"
                      placeholderTag="div"
                      placeholderContent="Behind the scenes"
                    />
                    <Image
                      src={"/diagonal-arrow.svg"}
                      width={15}
                      height={15}
                      alt="arrow"
                    />
                  </Link>
                </div>

                <div>
                  <EditableText
                    relUrl="/contact"
                    blockKey="social-twitter-title"
                    placeholderTag="div"
                    className="title_1 antiselector"
                    placeholderContent="Twitter/X"
                  />
                  <Link href={"tel:+971 58 555 2999"}>
                    <EditableText
                      relUrl="/contact"
                      blockKey="social-twitter-cta"
                      placeholderTag="div"
                      placeholderContent="Quick news"
                    />
                    <Image
                      src={"/diagonal-arrow.svg"}
                      width={15}
                      height={15}
                      alt="arrow"
                    />
                  </Link>
                </div>

                <div>
                  <EditableText
                    relUrl="/contact"
                    blockKey="social-youtube-title"
                    placeholderTag="div"
                    className="title_1 antiselector"
                    placeholderContent="YouTube"
                  />
                  <Link href={"tel:+971 58 555 2999"}>
                    <EditableText
                      relUrl="/contact"
                      blockKey="social-youtube-cta"
                      placeholderTag="div"
                      placeholderContent="Legal knowledge"
                    />
                    <Image
                      src={"/diagonal-arrow.svg"}
                      width={15}
                      height={15}
                      alt="arrow"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="line"></div>

          <div className={styles.contactRow}>
            <div className={styles.contactLeft}>
              <EditableText
                relUrl="/contact"
                blockKey="location-title"
                placeholderTag="div"
                className="title_3"
                placeholderContent="Location"
              />
            </div>
            <div className={styles.contactRight}>
              <div className={styles.contactRightThree}>
                <div className={styles.contactRightThreeRow}>
                  <EditableText
                    relUrl="/contact"
                    blockKey="loc-uae-title"
                    placeholderTag="div"
                    className="title_1 antiselector"
                    placeholderContent="UAE"
                  />
                  <EditableText
                    relUrl="/contact"
                    blockKey="loc-uae-text"
                    placeholderTag="p"
                    className="body_text antiselector"
                    placeholderContent="Dubai- Ajman - Fujairah - Ras Al Khaimah"
                  />
                </div>
                <div className={styles.contactRightThreeRow}>
                  <EditableText
                    relUrl="/contact"
                    blockKey="loc-egypt-title"
                    placeholderTag="div"
                    className="title_1 antiselector"
                    placeholderContent="Egypt"
                  />
                  <EditableText
                    relUrl="/contact"
                    blockKey="loc-egypt-text"
                    placeholderTag="p"
                    className="body_text antiselector"
                    placeholderContent="Cairo - El Mansoura"
                  />
                </div>
                <div className={styles.contactRightThreeRow}>
                  <EditableText
                    relUrl="/contact"
                    blockKey="loc-partners-title"
                    placeholderTag="div"
                    className="title_1 antiselector"
                    placeholderContent="Associated Partners"
                  />
                  <EditableText
                    relUrl="/contact"
                    blockKey="loc-partners-text"
                    placeholderTag="p"
                    className="body_text antiselector"
                    placeholderContent="KSA - India - Bangladesh - Sri Lanka - Turkey - Syria"
                  />
                </div>
                <div className={styles.contactRightThreeRow}>
                  <div className="title_1 mobnot antiselector">
                    Working hours<br></br>(offices in UAE and Egypt)
                  </div>
                  <EditableText
                    relUrl="/contact"
                    blockKey="hours-title-mobile"
                    placeholderTag="div"
                    className="title_1 mob antiselector"
                    placeholderContent="Working hours (offices in UAE and Egypt)"
                  />
                  <EditableText
                    relUrl="/contact"
                    blockKey="hours-text"
                    placeholderTag="p"
                    className="body_text antiselector"
                    placeholderContent="Mon-Fri: 9am - 6pm"
                  />
                </div>
                <div className="footnote_2 antiselector">
                  * Nour Attorneys is trademark for Nour Attorneys Law Firm
                  entities, each of which may be independent.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
