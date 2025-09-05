import { EditableText } from "~/components/EditableText";
import { EditableImage } from "~/components/EditableImage";
import PartnersList from "~/components/PartnersList";
import LatestInsightsServer from "~/components/LatestInsightsServer";
import HomePeopleGrid from "~/components/HomePeopleGrid";
import styles from "./index.module.css";
import Link from "next/link";
import Image from "next/image";
import SvgResetter from "~/components/SvgResetter";

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

          {/* Updated to SvgResetter */}
          <SvgResetter
            src="/home-line-1.svg"
            alt="line"
            className={styles.line1}
            width={40}
            height={40}
          />
          <SvgResetter
            src="/home-line-2.svg"
            alt="line"
            className={styles.line2}
            width={40}
            height={40}
          />
          <svg
            className={styles.line3}
            width="802"
            height="376"
            viewBox="-2 0 804 376"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M800 0.6116 V147.446"
              stroke="#8F91AF"
              stroke-width="1.5"
              stroke-dasharray="147.1"
              stroke-dashoffset="147.1"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                from="0"
                to="1"
                dur="0.05s"
                begin="3s"
                fill="freeze"
              />
              <animate
                id="anim1"
                attributeName="stroke-dashoffset"
                from="147.1"
                to="0"
                dur="0.2s"
                begin="3.05s"
                fill="freeze"
                calcMode="linear"
              />
            </path>

            <path
              d="M800 147.446 H4.67969"
              stroke="#8F91AF"
              stroke-width="1.5"
              stroke-dasharray="796.1"
              stroke-dashoffset="796.1"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                from="0"
                to="1"
                dur="0.05s"
                begin="anim1.end"
                fill="freeze"
              />
              <animate
                id="anim2"
                attributeName="stroke-dashoffset"
                from="796.1"
                to="0"
                dur="0.6s"
                begin="anim1.end+0.05s"
                fill="freeze"
                calcMode="linear"
              />
            </path>

            <path
              d="M4.67969 147.446 V366.831"
              stroke="#8F91AF"
              stroke-width="1.5"
              stroke-dasharray="219.1"
              stroke-dashoffset="219.1"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                from="0"
                to="1"
                dur="0.05s"
                begin="anim2.end"
                fill="freeze"
              />
              <animate
                id="anim3"
                attributeName="stroke-dashoffset"
                from="219.1"
                to="0"
                dur="0.4s"
                begin="anim2.end+0.05s"
                fill="freeze"
                calcMode="linear"
              />
            </path>

            <path
              d="M5.17969 366.831 
         C7.23169 367.087 8.81934 368.838 8.81934 370.96 
         C8.81932 373.258 6.95745 375.121 4.66016 375.121 
         C2.36273 375.121 0.5 373.258 0.5 370.96 
         C0.5 368.838 2.08775 367.087 4.13965 366.831"
              stroke="#8F91AF"
              stroke-width="1.5"
              stroke-dasharray="30.1"
              stroke-dashoffset="30.1"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                from="0"
                to="1"
                dur="0.05s"
                begin="anim3.end"
                fill="freeze"
              />
              <animate
                id="anim4"
                attributeName="stroke-dashoffset"
                from="30.1"
                to="0"
                dur="0.3s"
                begin="anim3.end+0.05s"
                fill="freeze"
                calcMode="linear"
              />
            </path>

            <path
              d="M800 147.446H4.67969V366.831C6.73169 367.087 8.31934 368.838 8.31934 370.96C8.81932 373.258 6.45745 375.121 4.16016 375.121C1.86273 375.121 1.64877e-05 373.258 0 370.96C0 368.838 1.58775 367.087 3.63965 366.831V146.406H798.96V0.611572H800V147.446Z"
              fill="#8F91AF"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                from="0"
                to="1"
                dur="0.3s"
                begin="anim4.end"
                fill="freeze"
              />
            </path>

            <rect
              width="82"
              height="5"
              transform="matrix(0 1 1 0 799 0)"
              fill="url(#paint0_linear_107237_8873)"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                from="0"
                to="1"
                dur="0.2s"
                begin="3s"
                fill="freeze"
              />
            </rect>

            <defs>
              <linearGradient
                id="paint0_linear_107237_8873"
                x1="0"
                y1="2.5"
                x2="82"
                y2="2.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#0033A0" />
                <stop offset="1" stop-color="#0033A0" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>

          <SvgResetter
            src="/home-line-6.svg"
            alt="line"
            className={styles.line6}
            width={40}
            height={40}
          />
        </div>

        <SvgResetter
          src="/home-line-4.svg"
          alt="line"
          className={styles.line4}
          width={40}
          height={40}
        />
        <svg
          width="805"
          height="355"
          viewBox="-34 -28 845 395"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.line5}
        >
          <g transform="translate(835,10) scale(-1,1)">
            <path
              d="M0 355H1.24902C222.254 129.436 504.862 4.07474 798.398 3.81543
             C798.636 5.41636 800.016 6.64453 801.682 6.64453
             C803.514 6.6444 805 5.15695 805 3.32227
             C805 1.48755 803.514 0.000132083 801.682 0
             C800.009 0 798.626 1.23819 798.396 2.84863
             C504.347 3.10886 221.257 128.825 0 355Z"
              stroke="#8F91AF"
              stroke-width="1.5"
              stroke-dasharray="2930"
              stroke-dashoffset="2930"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                from="0"
                to="1"
                begin="4.5s"
                dur="0.1s"
                fill="freeze"
              />
              <animate
                attributeName="stroke-dashoffset"
                from="2930"
                to="0"
                begin="4.5s"
                dur="1.5s"
                fill="freeze"
                calcMode="linear"
              />
            </path>

            <path
              d="M0 355H1.24902C222.254 129.436 504.862 4.07474 798.398 3.81543
             C798.636 5.41636 800.016 6.64453 801.682 6.64453
             C803.514 6.6444 805 5.15695 805 3.32227
             C805 1.48755 803.514 0.000132083 801.682 0
             C800.009 0 798.626 1.23819 798.396 2.84863
             C504.347 3.10886 221.257 128.825 0 355Z"
              fill="#8F91AF"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                from="0"
                to="1"
                begin="6.5s"
                dur="0.3s"
                fill="freeze"
              />
            </path>
          </g>
        </svg>
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
                Win More
                <br />
                Deals
              </h5>
              <p className="body_text">through superior legal strategy</p>
            </div>

            <div className={styles.aboutBox}>
              <h3 className="subheadline_2">.04</h3>
              <h5 className="subheadline_2">
                Eliminate
                <br />
                contract risks
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
              <h3 className="headline_3 antiselector">[01]</h3>
            </div>
            <div className={styles.expertiseBlackRowRight}>
              <h3 className="headline_3 antiselector">DRAFTING CONTRACTS</h3>
            </div>
          </div>
          <div className={styles.expertiseRow}>
            <div></div>
            <div className="title_2 antiselector">
              <div className="antiselector">
                <span>Shareholder Agreement:</span>
                <span>
                  it clearly define the rights, responsibilities, and
                  obligations of all owners, safeguarding their interests and
                  preventing future disputes
                </span>
              </div>
              <div className=" antiselector">
                <span>Complex Agreement:</span>
                <span>
                  we helps you expand your business by letting others use your
                  brand and system, ensuring everyone follows the rules
                </span>
              </div>
              <div className=" antiselector">
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
              <h3 className="headline_3 antiselector">[02]</h3>
            </div>
            <div className={styles.expertiseBlackRowRight}>
              <h3 className="headline_3 antiselector">LITIGATION SERVICES</h3>
            </div>
          </div>
          <div className={styles.expertiseRow}>
            <div></div>
            <div className="title_2 antiselector">
              <div className=" antiselector">
                <span>Commercial & Civil litigation:</span>
                <span>
                  representing client in court disputes such as: employment,
                  rental, property & commercial cases
                </span>
              </div>
              <div className=" antiselector">
                <span>Debt Recovery:</span>
                <span>
                  through Civil cases and Criminal actions in order to collect
                  and recover monetary claims{" "}
                </span>
              </div>
              <div className=" antiselector">
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
              <h3 className="headline_3 antiselector">[03]</h3>
            </div>
            <div className={styles.expertiseBlackRowRight}>
              <h3 className="headline_3 antiselector">Corporate Services</h3>
            </div>
          </div>
          <div className={styles.expertiseRow}>
            <div></div>
            <div className="title_2 antiselector">
              <div className=" antiselector">
                <span>Mergers and Acquisitions:</span>
                <span>
                  our documented procedures guarantee adherence to all relevant
                  legislation and regulations across our local & international
                  operations
                </span>
              </div>
              <div className=" antiselector">
                <span>Corporate Restructuring Services:</span>
                <span>
                  addressing debt, optimizing capital structure, and securing
                  new financing and etc.{" "}
                </span>
              </div>
              <div className=" antiselector">
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
              <h3 className="headline_3 antiselector">[04]</h3>
            </div>
            <div className={styles.expertiseBlackRowRight}>
              <h3 className="headline_3 antiselector">
                Business set up and Compliance
              </h3>
            </div>
          </div>
          <div className={styles.expertiseRow}>
            <div></div>
            <div>
              <div className=" antiselector">
                <span>Company Formation:</span>
                <span>
                  incorporating offshore, freezone, mainland with most strategic
                  structure
                </span>
              </div>
              <div className=" antiselector">
                <span>Bank account opening:</span>
                <span>
                  preparation of documents and taxation consultancies,
                  application filing drafting shareholder resolution and legal
                  operation{" "}
                </span>
              </div>
              <div className=" antiselector">
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
              <h3 className="headline_3 antiselector">[05]</h3>
            </div>
            <div className={styles.expertiseBlackRowRight}>
              <h3 className="headline_3 antiselector">
                Notarization & Attestation
              </h3>
            </div>
          </div>
          <div className={styles.expertiseRow}>
            <div></div>
            <div className="title_2 antiselector">
              <div className=" antiselector">
                <span>True copy attestation:</span>
                <span>
                  birth certificates, passport attestation, marriage
                  certificates, educational certificates and etc.
                </span>
              </div>
              <div className=" antiselector">
                <span>Public & private notary:</span>
                <span>
                  including drafting and notarizing POA, shareholder
                  resolutions, agreements and etc.{" "}
                </span>
              </div>
              <div className=" antiselector">
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
              <h3 className="headline_3 antiselector">[06]</h3>
            </div>
            <div className={styles.expertiseBlackRowRight}>
              <h3 className="headline_3 antiselector">Other services</h3>
            </div>
          </div>
          <div className={styles.expertiseRow}>
            <div></div>
            <div className="title_2 antiselector">
              <div className=" antiselector">
                <span>SPL Trustee Services:</span>
                <span>
                  Special Purpose Legal (SPL) structures, ensuring compliance,
                  asset protection, and fiduciary oversight
                </span>
              </div>
              <div className=" antiselector">
                <span>Pre-Dispute Management:</span>
                <span>
                  we help with conflicts through early risk assessment,
                  strategic communication, and contract clarity{" "}
                </span>
              </div>
              <div className=" antiselector">
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
                  <div className="title_2 antiselector">
                    Build Your Business with Unshakeable Legal Confidence{" "}
                  </div>
                  <Image
                    alt="balls"
                    src={"/balls1.svg"}
                    width={25}
                    height={25}
                  />
                </div>
                <p className="subtitle_2 antiselector">
                  Growing your business creates complex legal challenges. We
                  build a comprehensive legal framework — your business&apos;s
                  legal operating system. This provides smart contracts and
                  clear policies, giving you the confidence to operate, make
                  bold decisions and grow without constant legal.
                </p>
              </div>
              <div className="study-box">
                <div>
                  <div className="title_2 antiselector">
                    The Strategic Components That Power Your Legal Success{" "}
                  </div>
                  <Image
                    alt="balls"
                    src={"/balls2.svg"}
                    width={25}
                    height={25}
                  />
                </div>
                <p className="subtitle_2 antiselector">
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
                  <div className="title_2 antiselector">
                    The Life-Changing Benefits That Transform Your Success{" "}
                  </div>
                  <Image
                    alt="balls"
                    src={"/balls3.svg"}
                    width={25}
                    height={25}
                  />
                </div>
                <p className="subtitle_2 antiselector">
                  We deliver five benefits: risk transformation enabling growth,
                  proactive protection preventing surprises, financial freedom
                  through cost control, operational excellence accelerating
                  everything, and knowledge empowerment building lasting
                  capabilities.
                </p>
              </div>
              <div className="study-box">
                <div>
                  <div className="title_2 antiselector">
                    Our Proven Process for Building Your Legal Foundation{" "}
                  </div>
                  <Image
                    alt="balls"
                    src={"/balls4.svg"}
                    width={25}
                    height={25}
                  />
                </div>
                <p className="subtitle_2 antiselector">
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
