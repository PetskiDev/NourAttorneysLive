import { notFound } from "next/navigation";
import { getServiceBySlugCached } from "~/server/cachedReads";
import { EditableText } from "~/components/EditableText";
import styles from "./frameworksTemplate.module.css";
import Image from "next/image";
import { EditableImage } from "~/components/EditableImage";
import Link from "next/link";

export const revalidate = false;

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main>
      <section className={styles.frameworksHero}>
        <div className="containerr">
          <div className={styles.heroRow}>
            <div className={styles.heroLeft}>
              <h1 className="headline_1_3 mobnot">WE REMOVE LEGAL BARRIERS</h1>
              <h1 className="headline_1_3 mob">
                We remove legal barriers to your growth and success
              </h1>
            </div>
            <Image
              src={"./esg-mobile.svg"}
              width={100}
              height={20}
              alt="element"
            />
            <div className={styles.heroRight}>
              <div className="title_4">
                Build your business with unshakeable legal confidence. Discover
                how comprehensive legal frameworks transform uncertainty into
                competitive advantage and provide the foundation for sustainable
                success.
              </div>
            </div>
          </div>
          <div className={styles.heroRow}>
            <div className={styles.heroLeft}></div>
            <div className={styles.heroRight}>
              <h1 className="headline_1_3 mobnot">
                TO YOUR GROWTH AND SUCCESS
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.frameworksOne}>
        <div className="containerr">
          <div className={styles.oneLeft}>
            <div className="subtitle_4">
              The Challenge Every Growing Business Faces
            </div>
          </div>

          <div className={styles.oneRight}>
            <p className="body_text">
              You started your business with a vision and the determination to
              make it succeed. But as your company grows, you&apos;re
              discovering that every decision seems to have legal implications
              you never anticipated. Contract negotiations keep you awake at
              night wondering if you&apos;re protecting your interests. New
              hires raise employment law questions you&apos;re not equipped to
              answer. Client agreements leave you uncertain about liability
              exposure. Supplier relationships create compliance concerns you
              didn&apos;t know existed.
            </p>

            <p className="body_text">
              You want to move fast and seize opportunities, but you&apos;re
              afraid that one legal misstep could jeopardize everything
              you&apos;ve worked so hard to build. You know you need legal
              protection, but hiring a lawyer for every decision isn&apos;t
              practical or affordable. What you really need is something more
              fundamental - the confidence that comes from having a solid legal
              foundation that protects you while enabling the aggressive growth
              you&apos;re seeking.
            </p>

            <p className="body_text">
              This isn&apos;t just about avoiding problems. It&apos;s about
              building a business that can thrive in today&apos;s complex legal
              environment. You want to make bold decisions, pursue ambitious
              opportunities, and focus on what you do best - growing your
              business - without constantly worrying about legal landmines.
            </p>

            <div className="title_3">
              The Legal Foundation That Transforms How You Do Business
            </div>

            <p className="body_text">
              We don&apos;t just provide legal services - we build comprehensive
              legal frameworks that give you the confidence to operate and grow
              your business without fear. Think of it as creating a legal
              operating system for your business that handles routine matters
              automatically while flagging when you need specialized attention.
            </p>

            <p className="body_text">
              A legal framework isn&apos;t just a collection of documents or
              policies. It&apos;s a comprehensive system that becomes the
              backbone of how you operate, protecting your interests while
              enabling efficient, confident decision-making at every level of
              your organization. When properly implemented, it transforms your
              relationship with legal risk from constant anxiety to strategic
              advantage.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.frameworksTwo}>
        <div className="containerr">
          <div className={styles.twoLeft}>
            <div className="title_5">We stay ahead of legal changes:</div>
            <ul>
              <li className="subtitle_2">
                Legislative monitoring and adaptation
              </li>
              <li className="subtitle_2">
                Regulatory Intelligence and Implementation
              </li>
              <li className="subtitle_2">Judicial decision integration</li>
              <li className="subtitle_2">
                International standards and best practices
              </li>
            </ul>
          </div>
          <div className={styles.twoRight}>
            <Image
              src={"/f-template-1.jpg"}
              alt="framework"
              width={230}
              height={230}
            />
          </div>
        </div>
      </section>

      <section className={styles.frameworksThree}>
        <div className="containerr">
          <h4 className="headline_4">
            The Comprehensive{" "}
            <span className="blue-text">[Protection System]</span> We Build for
            You
          </h4>

<div className="line"></div>
          <div className={styles.threeRow}>
            <div className={styles.threeLeft}>
              <div className="title_5">[01]</div>
              <div className="title_5">
                Smart Contract Systems That Work in Your Favor
              </div>
            </div>
            <div className={styles.threeRight}>
              <p className="body_text">
                Instead of starting from scratch with every agreement,
                you&apos;ll have master contracts developed over years of
                practice that cover every scenario we&apos;ve encountered. These
                aren&apos;t just templates downloaded from the internet -
                they&apos;re battle-tested agreements that incorporate lessons
                learned from hundreds of transactions and disputes. They&apos;re
                designed not just to protect you, but to strengthen your
                negotiating position so significantly that counterparties often
                seek favorable settlements because your legal position is
                unassailable.
              </p>
              <p className="body_text">
                These master agreements become your competitive advantage. While
                your competitors are spending time and money negotiating basic
                terms, you&apos;re moving quickly with proven frameworks that
                protect your interests and accelerate deal closure. Your
                suppliers, clients, and partners quickly learn that working with
                you means working with someone who has their legal house in
                order.
              </p>
            </div>
          </div>

<div className="line"></div>
          <div className={styles.threeRow}>
            <div className={styles.threeLeft}>
              <div className="title_5">[02]</div>
              <div className="title_5">
                Clear Policies That Protect and Empower
              </div>
            </div>
            <div className={styles.threeRight}>
              <p className="body_text">
                You&apos;ll have straightforward guidelines that help you and
                your team make compliant decisions every day. No more guessing
                whether you&apos;re following the rules - you&apos;ll have clear
                procedures that ensure compliance while enabling efficient
                operations. These policies serve multiple purposes: they protect
                your business from legal risks, they educate your team about
                proper procedures, and they demonstrate to external parties that
                you operate professionally and responsibly.
              </p>
              <p className="body_text">
                These aren&apos;t bureaucratic obstacles that slow down your
                business. They&apos;re enablers that allow you to move faster
                because everyone knows the rules and can operate within them
                confidently. When your team understands the legal boundaries,
                they can push right up to those boundaries to maximize
                opportunities while staying safe.
              </p>
            </div>
          </div>

<div className="line"></div>
          <div className={styles.threeRow}>
            <div className={styles.threeLeft}>
              <div className="title_5">[03]</div>
              <div className="title_5">
                Proactive Risk Management That Keeps You Ahead
              </div>
            </div>
            <div className={styles.threeRight}>
              <p className="body_text">
                Legal landscapes change constantly. New regulations emerge,
                court decisions create new precedents, and industry standards
                evolve. We monitor these changes continuously and update your
                framework accordingly. You&apos;ll stay ahead of new
                requirements instead of scrambling to catch up after
                they&apos;re implemented.
              </p>
              <p className="body_text">
                This proactive approach means you&apos;re never caught off guard
                by legal changes. While your competitors are reacting to new
                regulations, you&apos;re already compliant and positioned to
                take advantage of opportunities that regulatory changes create.
                You become known in your industry as a company that&apos;s
                always ahead of the curve on legal matters.
              </p>
            </div>
          </div>

<div className="line"></div>
          <div className={styles.threeRow}>
            <div className={styles.threeLeft}>
              <div className="title_5">[04]</div>
              <div className="title_5">
                Training That Empowers Your Entire Team
              </div>
            </div>
            <div className={styles.threeRight}>
              <p className="body_text">
                Your staff will understand how to use your legal framework
                effectively, making smart decisions that protect the business
                while serving customers and growing revenue. This isn&apos;t
                just about compliance training - it&apos;s about empowering your
                team to operate confidently within legal boundaries while
                maximizing business opportunities.
              </p>
              <p className="body_text">
                When your team understands the legal framework, they become
                force multipliers for your business. They can handle routine
                legal matters without escalation, they can spot potential issues
                before they become problems, and they can communicate with
                confidence to clients and partners about your company&apos;s
                professional approach to legal matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.frameworksFour}>
        <div className="containerr">
          <h4 className="subheadline_2">
            This framework proves essential across diverse industries. It
            delivers critical solutions in
          </h4>

          <h4 className="subheadline_2">
            key situations, ensuring stability and growth
          </h4>

          <div className="studies-boxes">
            <div className={styles.studyAbs}>
              <div className="descriptor_1">Essential for any industry</div>
            </div>
            <div className="studies-boxes-top">
              <div className="study-box">
                <div>
                  <div className="title_2">
                    Growing businesses facing complexity
                  </div>
                  <Image
                    alt="balls"
                    src={"/balls1.svg"}
                    width={25}
                    height={25}
                  />
                </div>
                <p className="subtitle_2">
                  If your business is expanding rapidly, entering new markets,
                  or dealing with increasingly sophisticated clients and
                  suppliers, you need a legal framework that can scale with your
                  growth. The informal approaches that worked when you were
                  small become dangerous liabilities as you grow.
                </p>
              </div>
              <div className="study-box">
                <div>
                  <div className="title_2">
                    Investment and transaction-heavy operations
                  </div>
                  <Image
                    alt="balls"
                    src={"/balls2.svg"}
                    width={25}
                    height={25}
                  />
                </div>
                <p className="subtitle_2">
                  Whether you are an active investor, a business that engages in
                  multiple transactions on a daily basis, or an individual with
                  significant ongoing contractual relationships, having a
                  standardized framework saves you from having to invent new
                  remedies for each transaction.
                </p>
              </div>
            </div>

            <div className="studies-boxes-bottom">
              <div className="study-box">
                <div>
                  <div className="title_2">
                    Regulated industries and compliance-heavy environments
                  </div>
                  <Image
                    alt="balls"
                    src={"/balls3.svg"}
                    width={25}
                    height={25}
                  />
                </div>
                <p className="subtitle_2">
                  If your business operates in an environment with significant
                  regulatory requirements, a framework ensures you stay
                  compliant while maintaining operational efficiency. This is
                  crucial in finance, healthcare, technology, international
                  trade.
                </p>
              </div>
              <div className="study-box">
                <div>
                  <div className="title_2">
                    Businesses seeking competitive advantage
                  </div>
                  <Image
                    alt="balls"
                    src={"/balls4.svg"}
                    width={25}
                    height={25}
                  />
                </div>
                <p className="subtitle_2">
                  Companies that can move quickly and confidently on legal
                  matters have a significant competitive advantage. While
                  competitors are consulting lawyers for routine decisions,
                  you&apos;re executing with confidence based on your established
                  framework.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.frameworksFive}>
        <div className="containerr">
          <h4 className="subheadline_2">
            When you know you&apos;re legally protected, you
          </h4>
          <h4 className="subheadline_2">
            can focus on <span className="blue-text">[what you do best]:</span>{" "}
            pursue ambitious goals, enter new markets, and build strategic
            partnerships with confidence because you know your legal foundation
            is solid.
          </h4>

          <div className={styles.fiveRow}>
            <div className={styles.fiveLeft}>
              <Image
                src={"/f-template-2.jpg"}
                alt="framework"
                width={230}
                height={230}
              />
            </div>
            <div className={styles.fiveRight}>
              <p className="body_text">
                Our clients consistently report that having a comprehensive
                legal framework transforms their relationship with their
                business. They sleep better because they&apos;re not worried
                about legal issues. They make decisions faster because they
                understand the legal landscape. They grow more aggressively
                because they&apos;re confident in their protection.
              </p>

              <p className="body_text">
                More importantly, they find that their legal framework becomes a
                competitive advantage. They can move faster than competitors who
                are still figuring out legal issues case by case. They can offer
                more attractive terms to clients because their risk management
                is superior. They can attract better partners and suppliers
                because they&apos;re known for professional, legally sound
                operations.
              </p>

              <Image
                src={"/f-template-2.jpg"}
                alt="framework"
                width={230}
                height={230}
              />

              <div className="title_3">
                Your Path to Legal Confidence and Business Growth
              </div>

              <p className="body_text">
                The investment you make in creating a robust legal framework
                pays dividends every day through the confidence it provides and
                the problems it prevents. More importantly, it enables the kind
                of aggressive, confident business growth that creates lasting
                success.
              </p>

              <p className="body_text">
                If you&apos;re ready to transform your relationship with legal
                risk and build your business with complete confidence,
                we&apos;re here to help you create the legal foundation that
                will support your growth for years to come.
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
    </main>
  );
}
