import { EditableText } from "~/components/EditableText";
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
          <EditableText
            relUrl="/"
            blockKey="hero-h1-1"
            placeholderTag="h1"
            className="headline_1_1 hones"
            placeholderContent="YOUR"
          />
          <EditableText
            relUrl="/"
            blockKey="hero-h1-2"
            placeholderTag="h1"
            className="headline_1_1 hones"
            placeholderContent="TRUSTED PARTNER IN"
          />
          <EditableText
            relUrl="/"
            blockKey="hero-h1-3"
            placeholderTag="h1"
            className="headline_1_1 hones"
            placeholderContent="LEGAL MATTERS"
          />
          <EditableText
            relUrl="/"
            blockKey="hero-h2"
            placeholderTag="h2"
            className="thehtwob"
            placeholderContent="your trusted partner in legal matters"
          />
          <div className={styles.absText}>
            <h4 className="thehgourr">
              Nour Attorneys transforms legal risks into strategic advantages,
              through our integrity, we treat every client matter as a duty with
              <span>honesty, devotion, and sincerity,</span> guided by a deep
              sense of self-accountability: “All for one, one for all.”
            </h4>
          </div>

          <div className={`${styles.homeMobile} mob custom-line custom-linee`}>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <Link href={"/contact"}>
            <EditableText
              relUrl="/"
              blockKey="hero-cta-contact"
              placeholderTag="span"
              placeholderContent="contact us"
            />
          </Link>

          {/* Updated to SvgResetter */}
          <svg
            width="1628"
            height="157"
            viewBox="0 0 1628 157"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.line1}
          >
            <path
              d="M1628 154H435.561V3H0"
              stroke="#8F91AF"
              strokeWidth="1.5"
              fill="none"
              stroke-dasharray="1775"
              stroke-dashoffset="1775"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="1775"
                to="0"
                dur="1s"
                fill="freeze"
                calcMode="linear"
              />
            </path>

            <rect
              width="82"
              height="6"
              transform="matrix(-1 0 0 1 1628 151)"
              fill="url(#paint0_linear_107238_8876)"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;1"
                dur="0.2s"
                begin="0s"
                fill="freeze"
              />
            </rect>

            <rect
              width="82"
              height="6"
              fill="url(#paint1_linear_107238_8876)"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;1"
                dur="0.2s"
                begin="1s"
                fill="freeze"
              />
            </rect>

            <defs>
              <linearGradient
                id="paint0_linear_107238_8876"
                x1="0"
                y1="3"
                x2="82"
                y2="3"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#0033A0" />
                <stop offset="1" stop-color="#0033A0" stop-opacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_107238_8876"
                x1="0"
                y1="3"
                x2="82"
                y2="3"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#0033A0" />
                <stop offset="1" stop-color="#0033A0" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>

          <svg
            width="1164"
            height="158"
            viewBox="0 0 1164 158"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.line2}
          >
            <path
              d="M0 3H434.259V155H1164"
              stroke="#8F91AF"
              strokeWidth="1.5"
              fill="none"
              stroke-dasharray="1330.1"
              stroke-dashoffset="1330.1"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="1330.1"
                to="0"
                dur="1s"
                begin="0.5s"
                fill="freeze"
                calcMode="linear"
              />
            </path>

            <rect width="82" height="6" fill="url(#fadeLeft)" opacity="0">
              <animate
                attributeName="opacity"
                values="0;1"
                dur="0.3s"
                begin="0.5s"
                fill="freeze"
              />
            </rect>

            <rect
              x="1082"
              y="152"
              width="82"
              height="6"
              fill="url(#fadeRight)"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;1"
                dur="0.3s"
                begin="1s"
                fill="freeze"
              />
            </rect>

            <defs>
              <linearGradient
                id="fadeLeft"
                gradientUnits="objectBoundingBox"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0" stop-color="#0033A0" />
                <stop offset="1" stop-color="#0033A0" stop-opacity="0" />
              </linearGradient>

              <linearGradient
                id="fadeRight"
                gradientUnits="objectBoundingBox"
                x1="1"
                y1="0"
                x2="0"
                y2="0"
              >
                <stop offset="0" stop-color="#0033A0" />
                <stop offset="1" stop-color="#0033A0" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>

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
              strokeWidth="1.5"
              stroke-dasharray="147.1"
              stroke-dashoffset="147.1"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                from="0"
                to="1"
                dur="0.03s"
                begin="1.03s"
                fill="freeze"
              />
              <animate
                id="anim1"
                attributeName="stroke-dashoffset"
                from="147.1"
                to="0"
                dur="0.12s"
                begin="1.06s"
                fill="freeze"
                calcMode="linear"
              />
            </path>

            <path
              d="M800 147.446 H4.67969"
              stroke="#8F91AF"
              strokeWidth="1.5"
              stroke-dasharray="796.1"
              stroke-dashoffset="796.1"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                from="0"
                to="1"
                dur="0.03s"
                begin="anim1.end"
                fill="freeze"
              />
              <animate
                id="anim2"
                attributeName="stroke-dashoffset"
                from="796.1"
                to="0"
                dur="0.36s"
                begin="anim1.end+0.03s"
                fill="freeze"
                calcMode="linear"
              />
            </path>

            <path
              d="M4.67969 147.446 V366.831"
              stroke="#8F91AF"
              strokeWidth="1.5"
              stroke-dasharray="219.1"
              stroke-dashoffset="219.1"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                from="0"
                to="1"
                dur="0.03s"
                begin="anim2.end"
                fill="freeze"
              />
              <animate
                id="anim3"
                attributeName="stroke-dashoffset"
                from="219.1"
                to="0"
                dur="0.24s"
                begin="anim2.end+0.03s"
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
              strokeWidth="1.5"
              stroke-dasharray="30.1"
              stroke-dashoffset="30.1"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                from="0"
                to="1"
                dur="0.03s"
                begin="anim3.end"
                fill="freeze"
              />
              <animate
                id="anim4"
                attributeName="stroke-dashoffset"
                from="30.1"
                to="0"
                dur="0.18s"
                begin="anim3.end+0.03s"
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
                dur="0.18s"
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
                dur="0.12s"
                begin="1.03s"
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

        <svg
          width="805"
          height="355"
          className={styles.line4}
          viewBox="14 -28 845 395"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-anim="line4"
        >
          <path
            d="M0 355H1.24902C222.254 129.436 504.862 4.07474 798.398 3.81543
       C798.636 5.41636 800.016 6.64453 801.682 6.64453
       C803.514 6.6444 805 5.15695 805 3.32227
       C805 1.48755 803.514 0.000132083 801.682 0
       C800.009 0 798.626 1.23819 798.396 2.84863
       C504.347 3.10886 221.257 128.825 0 355Z"
            transform="translate(-10,10)"
            stroke="#8F91AF"
            strokeWidth="1.5"
            stroke-linecap="butt"
            pathLength="3000"
            stroke-dasharray="0 3000"
            stroke-dashoffset="0"
            fill="#8F91AF"
            fill-opacity="0"
          >
            <animate
              attributeName="stroke-dasharray"
              from="0 3000"
              to="3000 0"
              dur="2s"
              fill="freeze"
              calcMode="linear"
              begin="indefinite"
              data-delay="0"
            />
            <animate
              attributeName="fill-opacity"
              from="0"
              to="1"
              dur="0.2s"
              fill="freeze"
              begin="indefinite"
              data-delay="2"
            />
          </path>
        </svg>

        <svg
          width="805"
          height="355"
          viewBox="-34 -28 845 395"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.line5}
          data-anim="line5"
        >
          <g transform="translate(835,10) scale(-1,1)">
            <path
              d="M0 355H1.24902C222.254 129.436 504.862 4.07474 798.398 3.81543
         C798.636 5.41636 800.016 6.64453 801.682 6.64453
         C803.514 6.6444 805 5.15695 805 3.32227
         C805 1.48755 803.514 0.000132083 801.682 0
         C800.009 0 798.626 1.23819 798.396 2.84863
         C504.347 3.10886 221.257 128.825 0 355Z"
              transform="translate(0,0)"
              stroke="#8F91AF"
              strokeWidth="1.5"
              stroke-linecap="butt"
              pathLength="2930"
              stroke-dasharray="0 2930"
              stroke-dashoffset="0"
              fill="#8F91AF"
              fill-opacity="0"
            >
              <animate
                attributeName="stroke-dasharray"
                from="0 2930"
                to="2930 0"
                dur="2s"
                fill="freeze"
                calcMode="linear"
                begin="indefinite"
                data-delay="0"
              />
              <animate
                attributeName="fill-opacity"
                from="0"
                to="1"
                dur="0.2s"
                fill="freeze"
                begin="indefinite"
                data-delay="2"
              />
            </path>
          </g>
        </svg>
      </section>

      <section className={styles.about}>
        <div className="containerr">
          <EditableText
            relUrl="/"
            blockKey="about-title"
            placeholderTag="h2"
            className="headline_2"
            placeholderContent="ABOUT US"
          />

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
          <EditableText
            relUrl="/"
            blockKey="people-title"
            placeholderTag="h2"
            className="headline_2"
            placeholderContent="OUR PEOPLE"
          />
          <HomePeopleGrid />
        </div>
      </section>

      <section className={styles.expertise}>
        <div className="containerr">
          <EditableText
            relUrl="/"
            blockKey="expertise-title"
            placeholderTag="h2"
            className="headline_2"
            placeholderContent="EXPERTISE"
          />
          <div className={styles.expertiseBlackRow}>
            <div className={styles.expertiseBlackRowLeft}>
              <EditableText
                relUrl="/"
                blockKey="expertise-01-number"
                placeholderTag="h3"
                className="headline_3 antiselector"
                placeholderContent="[01]"
              />
            </div>
            <div className={styles.expertiseBlackRowRight}>
              <EditableText
                relUrl="/"
                blockKey="expertise-01-title"
                placeholderTag="h3"
                className="headline_3 antiselector"
                placeholderContent="DRAFTING CONTRACTS"
              />
            </div>
          </div>
          <div className={styles.expertiseRow}>
            <div></div>
            <div className="title_2 antiselector">
              <div className="antiselector">
                <EditableText
                  relUrl="/"
                  blockKey="expertise-01-item-1-label"
                  placeholderTag="span"
                  placeholderContent="Shareholder Agreement:"
                />
                <EditableText
                  relUrl="/"
                  blockKey="expertise-01-item-1-text"
                  placeholderTag="span"
                  placeholderContent="it clearly define the rights, responsibilities, and obligations of all owners, safeguarding their interests and preventing future disputes"
                />
              </div>
              <div className=" antiselector">
                <EditableText
                  relUrl="/"
                  blockKey="expertise-01-item-2-label"
                  placeholderTag="span"
                  placeholderContent="Complex Agreement:"
                />
                <EditableText
                  relUrl="/"
                  blockKey="expertise-01-item-2-text"
                  placeholderTag="span"
                  placeholderContent="we helps you expand your business by letting others use your brand and system, ensuring everyone follows the rules"
                />
              </div>
              <div className=" antiselector">
                <EditableText
                  relUrl="/"
                  blockKey="expertise-01-item-3-label"
                  placeholderTag="span"
                  placeholderContent="Employment & Executive Compensation Contracts:"
                />
                <EditableText
                  relUrl="/"
                  blockKey="expertise-01-item-3-text"
                  placeholderTag="span"
                  placeholderContent="sets clear terms for hiring key people, ensuring they&apos;re motivated and their roles are defined"
                />
              </div>
            </div>
          </div>

          <div className={styles.expertiseBlackRow}>
            <div className={styles.expertiseBlackRowLeft}>
              <EditableText
                relUrl="/"
                blockKey="expertise-02-number"
                placeholderTag="h3"
                className="headline_3 antiselector"
                placeholderContent="[02]"
              />
            </div>
            <div className={styles.expertiseBlackRowRight}>
              <EditableText
                relUrl="/"
                blockKey="expertise-02-title"
                placeholderTag="h3"
                className="headline_3 antiselector"
                placeholderContent="LITIGATION SERVICES"
              />
            </div>
          </div>
          <div className={styles.expertiseRow}>
            <div></div>
            <div className="title_2 antiselector">
              <div className=" antiselector">
                <EditableText
                  relUrl="/"
                  blockKey="expertise-02-item-1-label"
                  placeholderTag="span"
                  placeholderContent="Commercial & Civil litigation:"
                />
                <EditableText
                  relUrl="/"
                  blockKey="expertise-02-item-1-text"
                  placeholderTag="span"
                  placeholderContent="representing client in court disputes such as: employment, rental, property & commercial cases"
                />
              </div>
              <div className=" antiselector">
                <EditableText
                  relUrl="/"
                  blockKey="expertise-02-item-2-label"
                  placeholderTag="span"
                  placeholderContent="Debt Recovery:"
                />
                <EditableText
                  relUrl="/"
                  blockKey="expertise-02-item-2-text"
                  placeholderTag="span"
                  placeholderContent="through Civil cases and Criminal actions in order to collect and recover monetary claims"
                />
              </div>
              <div className=" antiselector">
                <EditableText
                  relUrl="/"
                  blockKey="expertise-02-item-3-label"
                  placeholderTag="span"
                  placeholderContent="Compensation claims:"
                />
                <EditableText
                  relUrl="/"
                  blockKey="expertise-02-item-3-text"
                  placeholderTag="span"
                  placeholderContent="litigated through Civil, Criminal, Labour, Commercial and rental cases"
                />
              </div>
            </div>
          </div>

          <div className={styles.expertiseBlackRow}>
            <div className={styles.expertiseBlackRowLeft}>
              <EditableText
                relUrl="/"
                blockKey="expertise-03-number"
                placeholderTag="h3"
                className="headline_3 antiselector"
                placeholderContent="[03]"
              />
            </div>
            <div className={styles.expertiseBlackRowRight}>
              <EditableText
                relUrl="/"
                blockKey="expertise-03-title"
                placeholderTag="h3"
                className="headline_3 antiselector"
                placeholderContent="Corporate Services"
              />
            </div>
          </div>
          <div className={styles.expertiseRow}>
            <div></div>
            <div className="title_2 antiselector">
              <div className=" antiselector">
                <EditableText
                  relUrl="/"
                  blockKey="expertise-03-item-1-label"
                  placeholderTag="span"
                  placeholderContent="Mergers and Acquisitions:"
                />
                <EditableText
                  relUrl="/"
                  blockKey="expertise-03-item-1-text"
                  placeholderTag="span"
                  placeholderContent="our documented procedures guarantee adherence to all relevant legislation and regulations across our local & international operations"
                />
              </div>
              <div className=" antiselector">
                <EditableText
                  relUrl="/"
                  blockKey="expertise-03-item-2-label"
                  placeholderTag="span"
                  placeholderContent="Corporate Restructuring Services:"
                />
                <EditableText
                  relUrl="/"
                  blockKey="expertise-03-item-2-text"
                  placeholderTag="span"
                  placeholderContent="addressing debt, optimizing capital structure, and securing new financing and etc."
                />
              </div>
              <div className=" antiselector">
                <EditableText
                  relUrl="/"
                  blockKey="expertise-03-item-3-label"
                  placeholderTag="span"
                  placeholderContent="Trademark and patent Registration services:"
                />
                <EditableText
                  relUrl="/"
                  blockKey="expertise-03-item-3-text"
                  placeholderTag="span"
                  placeholderContent="local & WIPO (World Intellectual Property Organization) under the PCT Protocol"
                />
              </div>
            </div>
          </div>

          <div className={styles.expertiseBlackRow}>
            <div className={styles.expertiseBlackRowLeft}>
              <EditableText
                relUrl="/"
                blockKey="expertise-04-number"
                placeholderTag="h3"
                className="headline_3 antiselector"
                placeholderContent="[04]"
              />
            </div>
            <div className={styles.expertiseBlackRowRight}>
              <EditableText
                relUrl="/"
                blockKey="expertise-04-title"
                placeholderTag="h3"
                className="headline_3 antiselector"
                placeholderContent="Business set up and Compliance"
              />
            </div>
          </div>
          <div className={styles.expertiseRow}>
            <div></div>
            <div>
              <div className=" antiselector">
                <EditableText
                  relUrl="/"
                  blockKey="expertise-04-item-1-label"
                  placeholderTag="span"
                  placeholderContent="Company Formation:"
                />
                <EditableText
                  relUrl="/"
                  blockKey="expertise-04-item-1-text"
                  placeholderTag="span"
                  placeholderContent="incorporating offshore, freezone, mainland with most strategic structure"
                />
              </div>
              <div className=" antiselector">
                <EditableText
                  relUrl="/"
                  blockKey="expertise-04-item-2-label"
                  placeholderTag="span"
                  placeholderContent="Bank account opening:"
                />
                <EditableText
                  relUrl="/"
                  blockKey="expertise-04-item-2-text"
                  placeholderTag="span"
                  placeholderContent="preparation of documents and taxation consultancies, application filing drafting shareholder resolution and legal operation"
                />
              </div>
              <div className=" antiselector">
                <EditableText
                  relUrl="/"
                  blockKey="expertise-04-item-3-label"
                  placeholderTag="span"
                  placeholderContent="Compliance:"
                />
                <EditableText
                  relUrl="/"
                  blockKey="expertise-04-item-3-text"
                  placeholderTag="span"
                  placeholderContent="advising on regulatory obligations, drafting internal policies, and conducting legal audits"
                />
              </div>
            </div>
          </div>

          <div className={styles.expertiseBlackRow}>
            <div className={styles.expertiseBlackRowLeft}>
              <EditableText
                relUrl="/"
                blockKey="expertise-05-number"
                placeholderTag="h3"
                className="headline_3 antiselector"
                placeholderContent="[05]"
              />
            </div>
            <div className={styles.expertiseBlackRowRight}>
              <EditableText
                relUrl="/"
                blockKey="expertise-05-title"
                placeholderTag="h3"
                className="headline_3 antiselector"
                placeholderContent="Notarization & Attestation"
              />
            </div>
          </div>
          <div className={styles.expertiseRow}>
            <div></div>
            <div className="title_2 antiselector">
              <div className=" antiselector">
                <EditableText
                  relUrl="/"
                  blockKey="expertise-05-item-1-label"
                  placeholderTag="span"
                  placeholderContent="True copy attestation:"
                />
                <EditableText
                  relUrl="/"
                  blockKey="expertise-05-item-1-text"
                  placeholderTag="span"
                  placeholderContent="birth certificates, passport attestation, marriage certificates, educational certificates and etc."
                />
              </div>
              <div className=" antiselector">
                <EditableText
                  relUrl="/"
                  blockKey="expertise-05-item-2-label"
                  placeholderTag="span"
                  placeholderContent="Public & private notary:"
                />
                <EditableText
                  relUrl="/"
                  blockKey="expertise-05-item-2-text"
                  placeholderTag="span"
                  placeholderContent="including drafting and notarizing POA, shareholder resolutions, agreements and etc."
                />
              </div>
              <div className=" antiselector">
                <EditableText
                  relUrl="/"
                  blockKey="expertise-05-item-3-label"
                  placeholderTag="span"
                  placeholderContent="Private lawyer notarization:"
                />
                <EditableText
                  relUrl="/"
                  blockKey="expertise-05-item-3-text"
                  placeholderTag="span"
                  placeholderContent="drafting and notarizing affidavits and private agreements, nominee agreements and etc."
                />
              </div>
            </div>
          </div>

          <div className={styles.expertiseBlackRow}>
            <div className={styles.expertiseBlackRowLeft}>
              <EditableText
                relUrl="/"
                blockKey="expertise-06-number"
                placeholderTag="h3"
                className="headline_3 antiselector"
                placeholderContent="[06]"
              />
            </div>
            <div className={styles.expertiseBlackRowRight}>
              <EditableText
                relUrl="/"
                blockKey="expertise-06-title"
                placeholderTag="h3"
                className="headline_3 antiselector"
                placeholderContent="Other services"
              />
            </div>
          </div>
          <div className={styles.expertiseRow}>
            <div></div>
            <div className="title_2 antiselector">
              <div className=" antiselector">
                <EditableText
                  relUrl="/"
                  blockKey="expertise-06-item-1-label"
                  placeholderTag="span"
                  placeholderContent="SPL Trustee Services:"
                />
                <EditableText
                  relUrl="/"
                  blockKey="expertise-06-item-1-text"
                  placeholderTag="span"
                  placeholderContent="Special Purpose Legal (SPL) structures, ensuring compliance, asset protection, and fiduciary oversight"
                />
              </div>
              <div className=" antiselector">
                <EditableText
                  relUrl="/"
                  blockKey="expertise-06-item-2-label"
                  placeholderTag="span"
                  placeholderContent="Pre-Dispute Management:"
                />
                <EditableText
                  relUrl="/"
                  blockKey="expertise-06-item-2-text"
                  placeholderTag="span"
                  placeholderContent="we help with conflicts through early risk assessment, strategic communication, and contract clarity"
                />
              </div>
              <div className=" antiselector">
                <EditableText
                  relUrl="/"
                  blockKey="expertise-06-item-3-label"
                  placeholderTag="span"
                  placeholderContent="Travel Ban verification:"
                />
                <EditableText
                  relUrl="/"
                  blockKey="expertise-06-item-3-text"
                  placeholderTag="span"
                  placeholderContent="providing travel ban verification services to the clients for checking their travel ban status"
                />
              </div>
            </div>
          </div>

          <div className={styles.expertiseRow}>
            <div></div>
            <div>
              <Link href={"/expertise"}>
                <EditableText
                  relUrl="/"
                  blockKey="cta-all-services"
                  placeholderTag="span"
                  className="button_link"
                  placeholderContent="All Services"
                />
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
          <EditableText
            relUrl="/"
            blockKey="frameworks-title"
            placeholderTag="h2"
            className="headline_2"
            placeholderContent="frameworks"
          />

          <h6 className="accent_text_1 mobnot">
            NOUR ATTORNEYS ENABLE YOU TO{" "}
            <span className="blue-text">[FUTURE-PROOF YOUR SUCCESS]</span> BY
            CONVERTING LEGAL RISKS INTO STRATEGIC SAFEGUARDS AND UNPREDICTABLE
            CHALLENGES INTO GROWTH CATALYSTS, GUARANTEEING
          </h6>
          <h6 className="accent_text_1 mobnot">
            <span className="blue-text">[SUSTAINABLE PROSPERITY]</span> FOR YOUR
            BUSINESS, PEOPLE, AND COMMUNITY, PROVING THAT VISIONARY LAW BUILDS
            LEGACIES.
          </h6>
          <h6 className="accent_text_1 mob">
            NOUR ATTORNEYS ENABLE YOU TO{" "}
            <span className="blue-text">[FUTURE-PROOF YOUR SUCCESS]</span> BY
            CONVERTING LEGAL RISKS INTO STRATEGIC SAFEGUARDS AND UNPREDICTABLE
            CHALLENGES INTO GROWTH CATALYSTS, GUARANTEEING
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
          <EditableText
            relUrl="/"
            blockKey="partnership-title"
            placeholderTag="h2"
            className="headline_2"
            placeholderContent="PARTNERSHIP"
          />
          <h4 className="subheadline_1">
            WE BUILD EVERY PARTNERSHIP FOR YOUR SUCCESS AND COLLABORATE WITH
            TOTAL DEDICATION
          </h4>
          <PartnersList />
        </div>
      </section>

      <section className={styles.insights}>
        <div className="containerr">
          <EditableText
            relUrl="/"
            blockKey="insights-title"
            placeholderTag="h2"
            className="headline_2"
            placeholderContent="INSIGHTS"
          />
          <LatestInsightsServer />
          <div className={styles.expertiseRow}>
            <div></div>
            <div>
              <Link href={"/insights"}>
                <EditableText
                  relUrl="/"
                  blockKey="cta-all-insights"
                  placeholderTag="span"
                  className="button_link"
                  placeholderContent="All Insights"
                />
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
