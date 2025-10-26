import { getBlocksForPage } from "~/server/blocks";
import { EditableText } from "~/components/EditableText";
import styles from "./ads.module.css";
import Image from "next/image";
import { EditableImage } from "~/components/EditableImage";
import Link from "next/link";

export default async function Advertisement() {
  return (
    <main>
      <section className={styles.adsHero}>
        <div className="containerr">
          <EditableText
            relUrl="/ads"
            blockKey="hero-title"
            placeholderTag="h1"
            className="headline_1_3"
            placeholderContent="TAX CONSULTATION"
          />
          <EditableText
            relUrl="/ads"
            blockKey="hero-description"
            placeholderTag="p"
            className="subtitle_2"
            placeholderContent="Navigating the complexities of tax laws and regulations is crucial for individuals and businesses to ensure compliance, optimize financial outcomes, and avoid penalties."
          />
          <Image src={"/tax-image.jpg"} alt="image" height={300} width={700} />
          
        </div>
        <Image
            src={"/tax-element.svg"}
            alt="element"
            width={1000}
            height={400}
            className={styles.heroAbs}
          />
      </section>
      <section className={styles.adsOne}>
        <div className="containerr">
          <h4 className="accent_text_1">
            nour attorneys provides{" "}
            <span className="blue-text">[comprehensive]</span> Tax Consultation
            services, offering expert guidance on a wide range of tax-related
            matters
          </h4>

          <div className={styles.approachBox}>
            <EditableText
              relUrl="/ads"
              blockKey="approach-title"
              placeholderTag="h3"
              className="headline_3"
              placeholderContent="APPROACH"
            />
            <div className={styles.approachRow}>
              <EditableText
                relUrl="/ads"
                blockKey="approach-item-1-title"
                placeholderTag="div"
                className="title_1"
                placeholderContent="Tax Planning and Strategy"
              />
              <div>
                <EditableText
                  relUrl="/ads"
                  blockKey="approach-item-1-text"
                  placeholderTag="p"
                  className="subtitle_2"
                  placeholderContent="We work closely with clients to develop personalized tax planning strategies that align with their financial goals. This includes advising on tax-efficient structures for businesses, investment vehicles, and personal wealth management to minimize tax liabilities within legal frameworks."
                />
              </div>
            </div>
            <div className="line"></div>
            <div className={styles.approachRow}>
              <div className="title_1">Compliance and Reportin</div>
              <div>
                <p className="subtitle_2">
                  We ensure full compliance with all applicable tax laws and
                  regulations, assisting with the preparation and filing of
                  various tax returns, including corporate tax, personal income
                  tax, VAT, and other indirect taxes. We keep you updated on
                  legislative changes to maintain ongoing compliance.
                </p>
              </div>
            </div>
            <div className="line"></div>
            <div className={styles.approachRow}>
              <div className="title_1">Tax Advisory for Businesses</div>
              <div>
                <p className="subtitle_2">
                  We provide specialized tax advice for businesses on matters
                  such as corporate restructuring, mergers and acquisitions,
                  international taxation, transfer pricing, and employee
                  taxation. Our goal is to help businesses optimize their tax
                  position and manage tax risks effectively.
                </p>
              </div>
            </div>
            <div className="line"></div>
            <div className={styles.approachRow}>
              <div className="title_1">Individual Tax Services</div>
              <div>
                <p className="subtitle_2">
                  We offer comprehensive tax services for individuals, including
                  personal income tax planning, wealth and estate tax planning,
                  and advice on tax implications of investments, property, and
                  international income. We help individuals navigate their tax
                  obligations and maximize after-tax income.
                </p>
              </div>
            </div>
            <div className="line"></div>
            <div className={styles.approachRow}>
              <div className="title_1">Tax Dispute Resolution</div>
              <div>
                <p className="subtitle_2">
                  In the event of tax audits, assessments, or disputes with tax
                  authorities, we provide robust representation and strategic
                  advice. Our team is skilled in negotiating with tax
                  authorities, preparing appeals, and representing clients in
                  tax litigation.
                </p>
              </div>
            </div>
            <div className="line"></div>
            <div className={styles.approachRow}>
              <div className="title_1">International Taxation</div>
              <div>
                <p className="subtitle_2">
                  For clients with cross-border activities, we provide expert
                  advice on international tax laws, double taxation treaties,
                  and foreign tax credits. We help navigate the complexities of
                  international tax regimes to ensure compliance and prevent
                  double taxation.
                </p>
              </div>
            </div>
            <div className="line"></div>
            <div className={styles.approachRow}>
              <div className="title_1">VAT and Indirect Taxes</div>
              <div>
                <p className="subtitle_2">
                  We offer specialized consultation on Value Added Tax (VAT) and
                  other indirect taxes, including registration, compliance,
                  return filing, and advisory on specific transactions to ensure
                  adherence to indirect tax regulations.
                </p>
              </div>
            </div>
            <div className="line"></div>
          </div>
        </div>
      </section>
      <section className={styles.benefits}>
        <div className="containerr">
          <h5 className="headline_2">BENEFITS</h5>
          <h4 className="accent_text_2">
            we assist clients in understanding their tax obligations, developing
            effective tax planning strategies, and resolving tax disputes
          </h4>
          <div className={styles.benefitsBoxes}>
            <div className={styles.benefitBox}>
              <div className={styles.benefitBoxTop}>
                <h2 className="subheadline_2">Optimized Tax Position</h2>
                <p className="body_text">
                  Develop effective tax strategies to minimize tax liabilities
                  and maximize financial returns within legal boundaries.
                </p>
              </div>
              <div>
                <h3 className="headline_1_5">.01</h3>
              </div>
            </div>
            <div className={styles.benefitBox}>
              <div className={styles.benefitBoxTop}>
                <h2 className="subheadline_2">Regulatory Compliance</h2>
                <p className="body_text">
                  Ensure full adherence to all local and international tax laws,
                  avoiding penalties, fines, and legal challenges.
                </p>
              </div>
              <div>
                <h3 className="headline_1_5">.02</h3>
              </div>
            </div>
            <div className={styles.benefitBox}>
              <div className={styles.benefitBoxTop}>
                <h2 className="subheadline_2">Optimized Tax Position</h2>
                <p className="body_text">
                  Develop effective tax strategies to minimize tax liabilities
                  and maximize financial returns within legal boundaries.
                </p>
              </div>
              <div>
                <h3 className="headline_1_5">.01</h3>
              </div>
            </div>
            <div className={styles.benefitBox}>
              <div className={styles.benefitBoxTop}>
                <h2 className="subheadline_2">Risk Mitigation</h2>
                <p className="body_text">
                  Proactively identify and manage tax risks, protecting your
                  assets and business from potential tax disputes.
                </p>
              </div>
              <div>
                <h3 className="headline_1_5">.03</h3>
              </div>
            </div>
            <div className={styles.benefitBox}>
              <div className={styles.benefitBoxTop}>
                <h2 className="subheadline_2">Optimized Tax Position</h2>
                <p className="body_text">
                  Develop effective tax strategies to minimize tax liabilities
                  and maximize financial returns within legal boundaries.
                </p>
              </div>
              <div>
                <h3 className="headline_1_5">.01</h3>
              </div>
            </div>
            <div className={styles.benefitBox}>
              <div className={styles.benefitBoxTop}>
                <h2 className="subheadline_2">Strategic Financial Planning</h2>
                <p className="body_text">
                  Integrate tax considerations into your overall financial
                  planning, leading to more informed and tax-efficient
                  decisions.
                </p>
              </div>
              <div>
                <h3 className="headline_1_5">.04</h3>
              </div>
            </div>
            <div className={styles.benefitBox}>
              <div className={styles.benefitBoxTop}>
                <h2 className="subheadline_2">Peace of Mind</h2>
                <p className="body_text">
                  Gain confidence knowing that your tax affairs are
                  professionally managed and compliant with evolving tax
                  landscapes.
                </p>
              </div>
              <div>
                <h3 className="headline_1_5">.05</h3>
              </div>
            </div>
            <div className={styles.benefitBox}>
              <div className={styles.benefitBoxTop}>
                <h2 className="subheadline_2">Expert Representation</h2>
                <p className="body_text">
                  Receive strong advocacy and support in dealing with tax
                  authorities and resolving tax disputes.
                </p>
              </div>
              <div>
                <h3 className="headline_1_5">.06</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.experts}>
        <div className="containerr">
          <h5 className="headline_2 antiselector">OUR EXPERTS</h5>
          <div className={styles.expertsRow}>
            <div className={styles.expertsLeft}>
              <Image
                src={"/tax-image-2.jpg"}
                alt="tax"
                width={300}
                height={150}
              />
            </div>
            <div className={styles.expertsRight}>
              <p className="body_text antiselector">
                Our dedicated Tax Consultation team combines decades of
                practical tax experience with in-depth knowledge of local and
                international tax legislation, including UAE Corporate Tax, VAT
                regulations, and free zone-specific compliance requirements. We
                offer more than theoretical advice - we deliver tailored tax
                strategies that address the unique challenges faced by
                businesses operating in the Emirates, from mainland companies to
                DIFC/ADGM entities.
              </p>
              <p className="body_text antiselector">
                By merging technical expertise with financial analysis skills,
                we go beyond basic compliance to develop tax optimization
                solutions that legally reduce your liabilities while aligning
                with FTA regulations and global tax standards. Whether
                you&apos;re an expanding multinational or a local startup, our
                approach ensures you avoid costly penalties and capitalize on
                every available incentive.
              </p>

              <EditableImage relUrl="/ads" blockKey="mobile-image" placeholderUrl="/tax-image-2.jpg"/>
              <p className="body_text antiselector">
                Understanding that tax complexities can hinder growth in the
                UAE&apos;s competitive landscape, we provide end-to-end support:
                from initial tax health checks and compliance planning to audit
                defense and dispute resolution with the Federal Tax Authority.
                Let us handle your tax burdens while you focus on growing your
                business - because in the dynamic UAE market, smart tax planning
                isn&apos;t just compliance, it&apos;s a competitive advantage.
              </p>
              <Link href={"/contact"}>
                <span className="button_link">Contact Us</span>
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
      <section className={styles.reviews}>
        <div className="containerr">
          <h5 className="headline_2">REVIEWS</h5>
          <h4 className="subheadline_2 mobnot">
            Trusted by businesses across industries, our clients consistently
            praise our ability to deliver results while ensuring full
            compliance. Their{" "}
            <span className="blue-text">[successfull stories]</span> speak
            volumes{" "}
          </h4>
          <h4 className="subheadline_2 mobnot">about our commitment to excellence.</h4>
          <h4 className="subheadline_2 mob">Trusted by businesses across industries, our clients consistently
            praise our ability to deliver results while ensuring full
            compliance. Their{" "}
            <span className="blue-text">[successfull stories]</span> speak
            volumes{" "} about our commitment to excellence.</h4>
          <div className={styles.reviewsBoxes}>
            <div className={styles.reviewBox}>

            </div>
            <div className={styles.reviewBox}>
              <div className="title_2 antiselector">Business protection & legal victory</div>
              <p className="body_text antiselector">
                When a client dispute threatened my business, Nour Attorneys
                didn&apos;t just win my case - they secured full reimbursement for
                all legal fees and expenses as outlined in our contract. Their
                meticulous attention to detail and unwavering courtroom support
                delivered the favorable outcome I needed to protect my venture
                and eliminate legal risks.
              </p>
            </div>
            <div className={styles.reviewBox}>

            </div>
            <div className={styles.reviewBox}>
              <div className="title_2 antiselector">
                First-class service & strategic legal expertise
              </div>
              <p className="body_text antiselector">
                Mr. Nour delivers first-class legal service by valuing my time
                and adjusting his working hours to my business preferences. His
                prompt responses with clear, business-tailored advice, combined
                with his courtroom performance - winning my landlord case and
                negotiating a new lease-proves his strategic qualification
                across different law spheres. This client-focused approach makes
                him the ideal legal partner for any businessman.
              </p>
            </div>
            <div className={styles.reviewBox}>
              <div className="title_2 antiselector">
                Strategic UAE legal expertise & client advocacy
              </div>
              <p className="body_text antiselector">
                For my UAE business needs, Nour Attorneys exceeded expectations
                through their strategic thinking and keen understanding of UAE
                law. Nour crafts and executes effective strategies tailored to
                each case, proving to be a game-changer. They don&apos;t just
                represent your interests - they advocate passionately as if your
                business were their own.
              </p>
            </div>
            <div className={styles.reviewBox}>

            </div>
            <div className={styles.reviewBox}>
              <div className="title_2 antiselector">Speed advantage</div>
              <p className="body_text antiselector">
                From dozens of lawyers contacted, Nour Attorneys is the ONLY one
                that works with real speed. My requests are fulfilled within
                days, instead of weeks with other lawyers. This responsiveness,
                quality, professionalism, and value secure long-term business
                relationships.
              </p>
            </div>
            <div className={styles.reviewBox}>

            </div>
            <div className={styles.reviewBox}>
            </div>

            <div className={styles.reviewBox}>
              <div className="title_2 antiselector">Responsive service & value</div>
              <p className="body_text antiselector">
                Nour Attorneys provides excellent legal advice with exceptional
                responsiveness to client requests and minimal service charges
                compared to other Dubai law firms. Their quick assistance
                provides strategic value for urgent legal needs.
              </p>
            </div>
            <div className={styles.reviewBox}>
              <div className="title_2 antiselector">Business conduct excellence</div>
              <p className="body_text antiselector">
                After over a year with Mr. Mohamed and his team, our experience
                summarizes in three words: honesty, reliability, punctuality.
                Their consistent business conduct makes them trusted strategic
                partners.
              </p>
            </div>

            
            <div className={styles.reviewBox}>

            </div>


            <div className={styles.reviewBox}>

            </div>
            <div className={styles.reviewBox}>
              <div className="title_2 antiselector">Business professional excellence</div>
              <p className="body_text antiselector">
                Nour Attorneys helped me obtain the best possible case outcome.
                Mr. Nour&apos;s kindness, patience, and professionalism demonstrate
                he is a great asset to the firm, delivering results that exceed
                expectations.
              </p>
            </div>
            <div className={styles.reviewBox}>
              <Link href={"./"}>
                <span className="button_link">All Reviews</span>
                <Image
                  src={"/diagonal-arrow.svg"}
                  alt="arrow"
                  width={30}
                  height={30}
                />
              </Link>
            </div>
            <div className={styles.reviewBox}>
              <div className="title_2 antiselector">Human-centered approach</div>
              <p className="body_text antiselector">
                Who thought lawyers could be human? Mohammed delivers exactly
                that through his top-class, supportive, and personally engaged
                business model that transforms the legal experience.
              </p>
            </div>
          </div>
          <Link href={"/contact"} className="mob">
                <span className="button_link">All Reviews</span>
                <Image
                  src={"/diagonal-arrow.svg"}
                  alt="arrow"
                  width={30}
                  height={30}
                />
              </Link>
        </div>
      </section>
    </main>
  );
}
