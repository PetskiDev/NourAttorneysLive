import { getBlocksForPage } from "~/server/blocks";
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
            <h1 className="headline_1_1">NOUR ATTORNEYS</h1>
            <h5 className="accent_text_2">
              We stand for integrity, innovation, and real connection. Your
              journey matters, and we&apos;re here to support it through expert
              legal care, smarter systems, and a human- first approach.
            </h5>
          </div>

          <div className={styles.rightHero}>
            <div className={styles.rightHeroBox}>
              <h4 className="subheadline_2">Book a consultation</h4>
              <h6 className="subheadline_4">
                To book a consultation, use <Link style={{borderBottom: "1px solid #101010"}} href={"/."}>the link</Link>
              </h6>
              <p className="body_text">
                Office visits are by appointment only and subject to office
                policy.
              </p>
              <Image
                src={"/contact-small-element-1.svg"}
                width={30}
                height={30}
                alt="element"
              />
            </div>

            <div className={styles.rightHeroBox}>
              <h4 className="subheadline_2">contact us</h4>
              <div className={styles.boxLinkDiv}>
                <h6 className="subheadline_4">Telephone:</h6>
                <Link className="subheadline_4" href={"tel:+971 58 555 2999"}>
                  +971 58 555 2999
                </Link>
              </div>
              <div className={styles.boxLinkDiv}>
                <h6 className="subheadline_4">WhatsApp:</h6>
                <Link className="subheadline_4" href={"tel:+971 58 555 2999"}>
                  +971 58 555 2999
                </Link>
              </div>
              <div className={styles.boxLinkDiv}>
                <h6 className="subheadline_4">Email:</h6>
                <Link
                  className="subheadline_4"
                  href={"mailto:info@nourattorneys.com"}
                >
                  info@nourattorneys.com
                </Link>
              </div>
              <div className={styles.boxLinkDiv}>
                <Link className="subheadline_4" href={"tel:+971 58 555 2999"}>
                  <div>Emergency legal support</div>
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
              <h4 className="subheadline_2">AI assistant</h4>
              <div className={styles.aiContactBox}>
                <Link className="subheadline_4" href={"./"}>
                  Open.
                </Link>
                <div className="subheadline_4">Chat.Solved.</div>
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
          <h3 className="subheadline_2">
            At Nour Attorneys Law Firm, we believe that the foundation of a
            successful legal practice
          </h3>
          <h3 className="subheadline_2">
            lies in cultivating strong, lasting relationships with our clients.
          </h3>
          <h5 className="accent_text_2 mobnot">
            we provide bespoke legal services characterized by the highest
            levels of quality, professionalism, and strategic insight. Our
          </h5>
          <h5 className="accent_text_2 mobnot">
            commitment to these principles is not merely aspirational; it is
            embedded in our core service standards, which guide every
            interaction and every mandate we undertake.
          </h5>

          <h5 className="accent_text_2 mob">
            we provide bespoke legal services characterized by the highest
            levels of quality, professionalism, and strategic insight. Our commitment to these principles is not merely aspirational; it is
            embedded in our core service standards, which guide every
            interaction and every mandate we undertake.
          </h5>
          <div className={styles.contactRow}>
            <div className={styles.contactLeft}>
              <div className="title_3">STAY CONNECTED</div>
            </div>
            <div className={styles.contactRight}>
              <div className="line"></div>
              <div className={`${styles.contactElement}`}>
                <div className="title_1">NEED QUICK HELP?</div>
                <p className="body_text">Use our smart legal assistant.</p>
                <Link href={"tel:+971 58 555 2999"}>
                  <div>Contact us</div>
                  <Image
                    src={"/diagonal-arrow.svg"}
                    width={15}
                    height={15}
                    alt="arrow"
                  />
                </Link>
              </div>

              <div className="line"></div>
              <div className={`${styles.contactElement}`}>
                <div className="title_1">Join Our Mailing List</div>
                <p className="body_text">
                  Get insights, events, and legal updates straight to your
                  inbox. We respect your privacy. No spam. Ever.
                </p>
                <Link href={"tel:+971 58 555 2999"}>
                  <div>Subscribe</div>
                  <Image
                    src={"/diagonal-arrow.svg"}
                    width={15}
                    height={15}
                    alt="arrow"
                  />
                </Link>
              </div>

              <div className="line"></div>
              <div className={`${styles.contactElement}`}>
                <div className="title_1">Events & Webinars</div>
                <p className="body_text">
                  Discover how we&apos;re redefining legal practice - attend our
                  events.
                </p>
                <Link href={"tel:+971 58 555 2999"}>
                  <div>Register</div>
                  <Image
                    src={"/diagonal-arrow.svg"}
                    width={15}
                    height={15}
                    alt="arrow"
                  />
                </Link>
              </div>

              <div className="line"></div>
              <div className={`${styles.contactElement}`}>
                <div className="title_1">Careers & Internships</div>
                <p className="body_text">
                  Connect your passion to a bigger mission - join our team.
                </p>
                <Link href={"tel:+971 58 555 2999"}>
                  <div>Join our team</div>
                  <Image
                    src={"/diagonal-arrow.svg"}
                    width={15}
                    height={15}
                    alt="arrow"
                  />
                </Link>
              </div>

              <div className="line"></div>
              <div className={`${styles.contactElement}`}>
                <div className="title_1">Visit Us</div>
                <p className="body_text">Find our office location.</p>
                <Link href={"tel:+971 58 555 2999"}>
                  <div>Go to map</div>
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
                  <div className="title_1">LinkedIn</div>
                  <Link href={"tel:+971 58 555 2999"}>
                    <div>Legal updates</div>
                    <Image
                      src={"/diagonal-arrow.svg"}
                      width={15}
                      height={15}
                      alt="arrow"
                    />
                  </Link>
                </div>

                <div>
                  <div className="title_1">instagram</div>
                  <Link href={"tel:+971 58 555 2999"}>
                    <div>Behind the scenes</div>
                    <Image
                      src={"/diagonal-arrow.svg"}
                      width={15}
                      height={15}
                      alt="arrow"
                    />
                  </Link>
                </div>

                <div>
                  <div className="title_1">Twitter/X</div>
                  <Link href={"tel:+971 58 555 2999"}>
                    <div>Quick news</div>
                    <Image
                      src={"/diagonal-arrow.svg"}
                      width={15}
                      height={15}
                      alt="arrow"
                    />
                  </Link>
                </div>

                <div>
                  <div className="title_1">YouTube</div>
                  <Link href={"tel:+971 58 555 2999"}>
                    <div>Legal knowledge</div>
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
              <div className="title_3">Location</div>
            </div>
            <div className={styles.contactRight}>
              <div className={styles.contactRightThree}>
                <div className={styles.contactRightThreeRow}>
                  <div className="title_1">UAE</div>
                  <p className="body_text">
                    Dubai- Ajman - Fujairah - Ras Al Khaimah
                  </p>
                </div>
                <div className={styles.contactRightThreeRow}>
                  <div className="title_1">Egypt</div>
                  <p className="body_text">Cairo - El Mansoura</p>
                </div>
                <div className={styles.contactRightThreeRow}>
                  <div className="title_1">Associated Partners</div>
                  <p className="body_text">
                    KSA - India - Bangladesh - Sri Lanka - Turkey - Syria
                  </p>
                </div>
                <div className={styles.contactRightThreeRow}>
                  <div className="title_1 mobnot">
                    Working hours<br></br>(offices in UAE and Egypt)
                  </div>
                  <div className="title_1 mob">
                    Working hours (offices in UAE and Egypt)
                  </div>
                  <p className="body_text">Mon-Fri: 9am - 6pm</p>
                </div>
                <div className="footnote_2">
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
