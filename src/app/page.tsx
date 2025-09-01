import { EditableText } from "~/components/EditableText";
import { EditableImage } from "~/components/EditableImage";
import PartnersList from "~/components/PartnersList";
import LatestInsightsServer from "~/components/LatestInsightsServer";
import HomePeopleGrid from "~/components/HomePeopleGrid";
import styles from "./index.module.css";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  return (
    <main>
      <section style={{ paddingTop: 10 }} className={styles.hero}>
        <div className="containerr">
          <h1 className="headline_1_1">YOUR</h1>
          <h1 className="headline_1_1">TRUSTED PARTNER IN</h1>
          <h1 className="headline_1_1">LEGAL MATTERS</h1>
          <h2>your trusted partner in legal matters</h2>
          <div className={styles.absText}>
            <h4>
              Nour Attorneys transforms legal risks into strategic advantages,
              through our integrity, we treat every client matter as a duty with
              <span>honesty, devotion, and sincerity,</span> guided by a deep
              sense of self-accountability: “All for one, one for all.”
            </h4>
          </div>
          <Image
            src={"/home-mobile.svg"}
            alt="line"
            className={`${styles.homeMobile} mob`}
            width={40}
            height={40}
          />
          <Link href={"/contact"}>contact us</Link>
          <Image
            src={"/home-line-1.svg"}
            alt="line"
            className={styles.line1}
            width={40}
            height={40}
          />
          <Image
            src={"/home-line-2.svg"}
            alt="line"
            className={styles.line2}
            width={40}
            height={40}
          />
          <Image
            src={"/home-line-3.svg"}
            alt="line"
            className={styles.line3}
            width={40}
            height={40}
          />
          <Image
            src={"/home-line-6.svg"}
            alt="line"
            className={styles.line6}
            width={40}
            height={40}
          />
        </div>
        <Image
          src={"/home-line-4.svg"}
          alt="line"
          className={styles.line4}
          width={40}
          height={40}
        />
        <Image
          src={"/home-line-5.svg"}
          alt="line"
          className={styles.line5}
          width={40}
          height={40}
        />
      </section>

      <section className={styles.about}>
        <div className="containerr">
          <h2 className="headline_2">ABOUT US</h2>

          <h4 className="accent_text_1">
            FOR Ambitious individuals, Investors, BUSINESS OWNERS, AND
            CORPORATIONS <span className="blue-text">[WORLDWIDE]</span> WHO
            REFUSE TO LET LEGAL UNCERTAINTY LIMIT THEIR SUCCESS IN THE UAE OR
            LOCAL REGION, NOUR ATTORNEYS TRANSFORMS COMPLEX LEGAL{" "}
            <span className="blue-text">
              [CHALLENGES INTO STRATEGIC COMPETITIVE ADVANTAGES]
            </span>
            THROUGH PERSONALIZED LEGAL INTELLIGENCE
          </h4>

          <div className="custom-line">
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div className={styles.aboutBoxes}>
            <div className={styles.aboutBox}>
              <h3 className="subheadline_2">.01</h3>
              <h5 className="subheadline_2">Transform legal uncertainty</h5>
              <p className="body_text">into your competitive advantage</p>
            </div>

            <div className={styles.aboutBox}>
              <h3 className="subheadline_2">.02</h3>
              <h5 className="subheadline_2">Navigate complex deals</h5>
              <p className="body_text">with complete legal certainty</p>
            </div>

            <div className={styles.aboutBox}>
              <h3 className="subheadline_2">.03</h3>
              <h5 className="subheadline_2">
                Win More<br></br>Deals
              </h5>
              <p className="body_text">through superior legal strategy</p>
            </div>

            <div className={styles.aboutBox}>
              <h3 className="subheadline_2">.04</h3>
              <h5 className="subheadline_2">
                Eliminate<br></br>contract risks
              </h5>
              <p className="body_text">while creating competitive advantages</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.people}>
        <div className="containerr">
          <h2 className="headline_2">OUR PEOPLE</h2>
          <HomePeopleGrid />
        </div>
      </section>

      <section className={styles.expertise}>
        <div className="containerr">
          <h2 className="headline_2">EXPERTISE</h2>
          <div className={styles.expertiseBlackRow}>
            <div className={styles.expertiseBlackRowLeft}>
              <h3 className="headline_3">[01]</h3>
            </div>
            <div className={styles.expertiseBlackRowRight}>
              <h3 className="headline_3">DRAFTING CONTRACTS</h3>
            </div>
          </div>
          <div className={styles.expertiseRow}>
            <div></div>
            <div className="title_2">
              <div className="animated">
                <span>Shareholder Agreement:</span>
                <span>
                  it clearly define the rights, responsibilities, and
                  obligations of all owners, safeguarding their interests and
                  preventing future disputes
                </span>
              </div>
              <div className="animated">
                <span>Complex Agreement:</span>
                <span>
                  we helps you expand your business by letting others use your
                  brand and system, ensuring everyone follows the rules
                </span>
              </div>
              <div className="animated">
                <span>Employment & Executive Compensation Contracts:</span>
                <span>
                  sets clear terms for hiring key people, ensuring they&apos;re
                  motivated and their roles are defined
                </span>
              </div>
            </div>
          </div>

          <div className={styles.expertiseBlackRow}>
            <div className={styles.expertiseBlackRowLeft}>
              <h3 className="headline_3">[02]</h3>
            </div>
            <div className={styles.expertiseBlackRowRight}>
              <h3 className="headline_3">LITIGATION SERVICES</h3>
            </div>
          </div>
          <div className={styles.expertiseRow}>
            <div></div>
            <div className="title_2">
              <div className="animated">
                <span>Commercial & Civil litigation:</span>
                <span>
                  representing client in court disputes such as: employment,
                  rental, property & commercial cases
                </span>
              </div>
              <div className="animated">
                <span>Debt Recovery:</span>
                <span>
                  through Civil cases and Criminal actions in order to collect
                  and recover monetary claims{" "}
                </span>
              </div>
              <div className="animated">
                <span>Compensation claims:</span>
                <span>
                  litigated through Civil, Criminal, Labour, Commercial and
                  rental cases
                </span>
              </div>
            </div>
          </div>

          <div className={styles.expertiseBlackRow}>
            <div className={styles.expertiseBlackRowLeft}>
              <h3 className="headline_3">[03]</h3>
            </div>
            <div className={styles.expertiseBlackRowRight}>
              <h3 className="headline_3">Corporate Services</h3>
            </div>
          </div>
          <div className={styles.expertiseRow}>
            <div></div>
            <div className="title_2">
              <div className="animated">
                <span>Mergers and Acquisitions:</span>
                <span>
                  our documented procedures guarantee adherence to all relevant
                  legislation and regulations across our local & international
                  operations
                </span>
              </div>
              <div className="animated">
                <span>Corporate Restructuring Services:</span>
                <span>
                  addressing debt, optimizing capital structure, and securing
                  new financing and etc.{" "}
                </span>
              </div>
              <div className="animated">
                <span>Trademark and patent Registration services:</span>
                <span>
                  local & WIPO (World Intellectual Property Organization) under
                  the PCT Protocol{" "}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.expertiseBlackRow}>
            <div className={styles.expertiseBlackRowLeft}>
              <h3 className="headline_3">[04]</h3>
            </div>
            <div className={styles.expertiseBlackRowRight}>
              <h3 className="headline_3">Business set up and Compliance</h3>
            </div>
          </div>
          <div className={styles.expertiseRow}>
            <div></div>
            <div>
              <div className="animated">
                <span>Company Formation:</span>
                <span>
                  incorporating offshore, freezone, mainland with most strategic
                  structure
                </span>
              </div>
              <div className="animated">
                <span>Bank account opening:</span>
                <span>
                  preparation of documents and taxation consultancies,
                  application filing drafting shareholder resolution and legal
                  operation{" "}
                </span>
              </div>
              <div className="animated">
                <span>Compliance:</span>
                <span>
                  advising on regulatory obligations, drafting internal
                  policies, and conducting legal audits
                </span>
              </div>
            </div>
          </div>

          <div className={styles.expertiseBlackRow}>
            <div className={styles.expertiseBlackRowLeft}>
              <h3 className="headline_3">[05]</h3>
            </div>
            <div className={styles.expertiseBlackRowRight}>
              <h3 className="headline_3">Notarization & Attestation</h3>
            </div>
          </div>
          <div className={styles.expertiseRow}>
            <div></div>
            <div className="title_2">
              <div className="animated">
                <span>True copy attestation:</span>
                <span>
                  birth certificates, passport attestation, marriage
                  certificates, educational certificates and etc.
                </span>
              </div>
              <div className="animated">
                <span>Public & private notary:</span>
                <span>
                  including drafting and notarizing POA, shareholder
                  resolutions, agreements and etc.{" "}
                </span>
              </div>
              <div className="animated">
                <span>Private lawyer notarization:</span>
                <span>
                  drafting and notarizing affidavits and private agreements,
                  nominee agreements and etc.{" "}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.expertiseBlackRow}>
            <div className={styles.expertiseBlackRowLeft}>
              <h3 className="headline_3">[06]</h3>
            </div>
            <div className={styles.expertiseBlackRowRight}>
              <h3 className="headline_3">Other services</h3>
            </div>
          </div>
          <div className={styles.expertiseRow}>
            <div></div>
            <div className="title_2">
              <div className="animated">
                <span>SPL Trustee Services:</span>
                <span>
                  Special Purpose Legal (SPL) structures, ensuring compliance,
                  asset protection, and fiduciary oversight
                </span>
              </div>
              <div className="animated">
                <span>Pre-Dispute Management:</span>
                <span>
                  we help with conflicts through early risk assessment,
                  strategic communication, and contract clarity{" "}
                </span>
              </div>
              <div className="animated">
                <span>Travel Ban verification:</span>
                <span>
                  providing travel ban verification services to the clients for
                  checking their travel ban status{" "}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.expertiseRow}>
            <div></div>
            <div>
              <Link href={"/expertise"}>
                <span className="button_link">All Services</span>
                <Image
                  src={"/diagonal-arrow.svg"}
                  alt="arrow"
                  width={30}
                  height={30}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.caseStudies}>
        <div className="containerr">
          <h2 className="headline_2">frameworks</h2>

          <h6 className="accent_text_1">
            NOUR ATTORNEYS ENABLE YOU TO{" "}
            <span className="blue-text">[FUTURE-PROOF YOUR SUCCESS]</span> BY
            CONVERTING LEGAL RISKS INTO STRATEGIC SAFEGUARDS AND UNPREDICTABLE
            CHALLENGES INTO GROWTH CATALYSTS, GUARANTEEING
          </h6>
          <h6 className="accent_text_1">
            <span className="blue-text">[SUSTAINABLE PROSPERITY]</span> FOR YOUR
            BUSINESS, PEOPLE, AND COMMUNITY, PROVING THAT VISIONARY LAW BUILDS
            LEGACIES.
          </h6>

          <div className="studies-boxes">
            <div className={styles.studyAbs}>
              <div className="descriptor_1">
                Proving that law can be sustainable
              </div>
            </div>
            <div className="studies-boxes-top">
              <div className="study-box">
                <div>
                  <div className="title_2">
                    Build Your Business with Unshakeable Legal Confidence{" "}
                  </div>
                  <Image
                    alt="balls"
                    src={"/balls1.svg"}
                    width={25}
                    height={25}
                  />
                </div>
                <p className="subtitle_2">
                  Growing your business creates complex legal challenges. We
                  build a comprehensive legal framework — your business&apos;s legal
                  operating system. This provides smart contracts and clear
                  policies, giving you the confidence to operate, make bold
                  decisions and grow without constant legal.
                </p>
              </div>
              <div className="study-box">
                <div>
                  <div className="title_2">
                    The Strategic Components That Power Your Legal Success{" "}
                  </div>
                  <Image
                    alt="balls"
                    src={"/balls2.svg"}
                    width={25}
                    height={25}
                  />
                </div>
                <p className="subtitle_2">
                  Transforming scattered legal documents into integrated systems
                  that enable reliant growth. We build 5 strategic components:
                  compliance systems, master agreements, operational policies,
                  document templates, and industry standards that turn legal
                  requirements into competitive advantages.{" "}
                </p>
              </div>
            </div>

            <div className="studies-boxes-bottom">
              <div className="study-box">
                <div>
                  <div className="title_2">
                    The Life-Changing Benefits That Transform Your Success{" "}
                  </div>
                  <Image
                    alt="balls"
                    src={"/balls3.svg"}
                    width={25}
                    height={25}
                  />
                </div>
                <p className="subtitle_2">
                  We deliver five benefits: risk transformation enabling growth,
                  proactive protection preventing surprises, financial freedom
                  through cost control, operational excellence accelerating
                  everything, and knowledge empowerment building lasting
                  capabilities.
                </p>
              </div>
              <div className="study-box">
                <div>
                  <div className="title_2">
                    Our Proven Process for Building Your Legal Foundation{" "}
                  </div>
                  <Image
                    alt="balls"
                    src={"/balls4.svg"}
                    width={25}
                    height={25}
                  />
                </div>
                <p className="subtitle_2">
                  We use a proven seven-step transformation process: strategic
                  discovery, proposal development, stakeholder engagement, risk
                  assessment, transparent investment planning, meticulous
                  framework development, and implementation support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.partners}>
        <div className="containerr">
          <h2 className="headline_2">PARTNERSHIP</h2>
          <h4 className="subheadline_1">
            WE BUILD EVERY PARTNERSHIP FOR YOUR SUCCESS AND COLLABORATE WITH
            TOTAL DEDICATION
          </h4>
          <PartnersList />
        </div>
      </section>

      <section className={styles.insights}>
        <div className="containerr">
          <h2 className="headline_2">INSIGHTS</h2>
          <LatestInsightsServer />
          <div className={styles.expertiseRow}>
            <div></div>
            <div>
              <Link href={"/insights"}>
                <span className="button_link">All Insights</span>
                <Image
                  src={"/diagonal-arrow.svg"}
                  alt="arrow"
                  width={30}
                  height={30}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
