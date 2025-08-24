import { getBlocksForPage } from "~/server/blocks";
import { EditableText } from "~/components/EditableText";
import styles from "./frameworks.module.css";
import Image from "next/image";
import { EditableImage } from "~/components/EditableImage";
import Link from "next/link";

export default async function AboutUsPage() {
  const blockMap = await getBlocksForPage("/about-us");

  return (
    <main>
      <section className={styles.frameworksHero}>
        <div className="containerr">
          <h1 className="headline_1">LEGAL FRAMEWORKS</h1>
          <Image
            src={"./esg-mobile.svg"}
            width={100}
            height={20}
            alt="element"
          />
          <div className="subheadline_1">Exceptional success</div>
          <p>
            The most successful{" "}
            <span>businesses, investors, and professionals</span> don&apos;t
            wait for legal problems to force their hand. They proactively build
            the legal foundations that enable confident growth and exceptional
            success. Legal framework isn&apos;t just about avoiding problems -
            it&apos;s about <span>creating the foundation</span> for exceptional
            success.
          </p>
          <Image
            src={"./frameworks-element.svg"}
            width={100}
            height={20}
            alt="element"
          />
        </div>
      </section>

      <section className={styles.frameworksMain}>
        <div className="containerr">
          <h4 className="subheadline_2">
            the difference between businesses, investors, and professionals who
            thrive and those who struggle often comes down to one factor:{" "}
            <span className="blue-text">[legal confidence].</span> Our
            frameworks give it to
          </h4>
          <h4 className="subheadline_2">
            pursue aggressive growth while knowing you&apos;re fully protected
            at every step.
          </h4>
          <div className={styles.frameworksRow}>
            <div></div>
            <div>
              <p className="body_text">
                When you know you&apos;re comprehensively protected and
                operating on solid legal ground, you can pursue opportunities
                aggressively, make decisions quickly, and focus your energy on
                growth rather than worry.
              </p>
              <p className="body_text">
                When legal uncertainty no longer holds you back, when you can
                move confidently on opportunities, when your operations run
                smoothly because everyone knows the rules, when your reputation
                for professionalism opens doors - that&apos;s when you realize
                the true value of having the right legal foundation.
              </p>
              <p className="body_text">
                Every successful business, investor, and professional reaches a
                critical moment when informal approaches to legal matters become
                dangerous liabilities. You&apos;ve worked too hard building your
                success to let legal uncertainty slow you down or put everything
                at risk. What you need isn&apos;t just legal services - you need
                a comprehensive legal foundation that transforms legal
                complexity from an obstacle into a competitive advantage.
              </p>
              <p className="body_text">
                Whether you&apos;re a growing business ready to scale, an active
                investor protecting and expanding your portfolio, or a
                professional managing significant transactions, the right legal
                framework doesn&apos;t just protect you - it accelerates your
                success by giving you the confidence to move boldly while
                staying completely protected.
              </p>
            </div>
          </div>
          <div className={styles.frameworksRowTwo}>
            <div>
              <p className="descriptor_1">
                Who Thrives with Our Legal Frameworks
              </p>
            </div>
            <div>
              <div className="title_2">
                Growing businesses ready to scale without legal anxiety
              </div>
              <p className="body_text">
                You&apos;ve built something meaningful, and now you&apos;re
                ready to take it to the next level. But growth brings complexity
                - more contracts, more employees, more regulations, more risks.
                You need legal systems that scale with your ambitions, not
                bureaucracy that slows you down. Our frameworks give you the
                confidence to pursue aggressive growth while knowing you&apos;re
                fully protected at every step.
              </p>
              <div className="title_2">
                Strategic investors seeking competitive advantage
              </div>
              <p className="body_text">
                Whether you&apos;re building a portfolio or making strategic
                investments, you understand that legal protection isn&apos;t
                just about avoiding problems - it&apos;s about positioning
                yourself to capitalize on opportunities others miss. Our
                frameworks give you the legal confidence to move quickly on
                deals while ensuring your interests are protected in every
                transaction.
              </p>
              <div className="title_2">
                Active professionals managing complex transactions
              </div>
              <p className="body_text">
                If you&apos;re handling regular transactions, managing multiple
                client relationships, or operating in legally complex
                environments, you need systems that protect your interests while
                enabling efficient operations. Our frameworks eliminate the need
                to reinvent legal protections for every deal, giving you
                standardized excellence that impresses clients and protects your
                interests.
              </p>
            </div>
          </div>

          <div className={styles.frameworksRowTwo}>
            <div>
              <p className="descriptor_1">
                Your Complete Legal Transformation Package
              </p>
            </div>
            <div>
              <div className="title_2">
                Master legal documents that give you the upper hand
              </div>
              <p className="body_text">
                Forget generic templates and one-size-fits-all contracts.
                You&apos;ll receive battle-tested agreements developed through
                years of real-world experience, incorporating lessons learned
                from hundreds of transactions and disputes. These aren&apos;t
                just protective documents - they&apos;re strategic tools that
                strengthen your negotiating position and often compel favorable
                settlements because your legal position is unassailable.
              </p>
              <div className="title_2">
                Proactive risk management that keeps you ahead
              </div>
              <p className="body_text">
                Instead of reacting to legal problems after they arise,
                you&apos;ll have comprehensive systems that identify and
                neutralize risks before they become costly disputes. We monitor
                regulatory changes, track industry developments, and update your
                framework continuously so you&apos;re always ahead of the curve
                while your competitors are scrambling to catch up.
              </p>
              <div className="title_2">
                Implementation support that ensures success
              </div>
              <p className="body_text">
                Having great legal documents isn&apos;t enough - you need to
                know how to use them effectively. We provide comprehensive
                training for your team, integration support for your operations,
                and ongoing guidance to ensure your framework becomes a powerful
                tool for growth rather than a shelf full of unused documents.
              </p>
            </div>
          </div>

          <div className={styles.frameworksRow}>
            <div></div>
            <div>
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

          <h4 className="subheadline_2 mobnot">
            Dive deeper into each component of our
          </h4>
          <h4 className="subheadline_2 mobnot">
            <span className="blue-text">[comprehensive legal framework]</span>{" "}
            approach. Each section provides detailed insights into how we
            transform legal uncertainty into your competitive advantage.
          </h4>
          <h2 className="subheadline_2 mob">
            Dive deeper into each component of our{" "}
            <span className="blue-text">[comprehensive legal framework]</span>{" "}
            approach. Each section provides detailed insights into how we
            transform legal uncertainty into your competitive advantage.
          </h2>

          <div className={styles.frameworksRowThree}>
            <div>
              <div className="title_5">[01] Core Framework Foundation</div>
            </div>
            <div>
              <div className="title_2">
                Build your business with unshakeable legal confidence
              </div>
              <p className="subtitle_2">
                Discover how comprehensive legal frameworks transform
                uncertainty into competitive advantage and provide the
                foundation for sustainable success. Learn how to operate with
                complete confidence while pursuing aggressive growth without
                legal anxiety holding you back.
              </p>
              <Link href="./">
                <div>Learn more</div>
                <Image
                  width={15}
                  height={15}
                  src={"/diagonal-arrow.svg"}
                  alt="arrow"
                />
              </Link>
            </div>
          </div>

          <div className={styles.frameworksRowThree}>
            <div>
              <div className="title_5">[02] Framework Architecture</div>
            </div>
            <div>
              <div className="title_2">
                The strategic components that power your legal success
              </div>
              <p className="subtitle_2">
                Explore the five essential building blocks that create
                comprehensive protection while enabling efficient operations and
                confident decision-making. Understand how these strategic
                components work together to create unstoppable success.
              </p>
              <Link href="./">
                <div>Learn more</div>
                <Image
                  width={15}
                  height={15}
                  src={"/diagonal-arrow.svg"}
                  alt="arrow"
                />
              </Link>
            </div>
          </div>

          <div className={styles.frameworksRowThree}>
            <div>
              <div className="title_5">[03] Risk Transformation</div>
            </div>
            <div>
              <div className="title_2">
                Turn legal risks into competitive advantages
              </div>
              <p className="subtitle_2">
                Learn advanced strategies that identify and neutralize legal
                risks before they become costly problems, keeping you ahead of
                challenges that derail competitors. Transform fear of legal
                problems into confidence that drives exceptional growth.
              </p>
              <Link href="./">
                <div>Learn more</div>
                <Image
                  width={15}
                  height={15}
                  src={"/diagonal-arrow.svg"}
                  alt="arrow"
                />
              </Link>
            </div>
          </div>

          <div className={styles.frameworksRowThree}>
            <div>
              <div className="title_5">[04] Client Transformation</div>
            </div>
            <div>
              <div className="title_2">
                The life-changing benefits that transform your success
              </div>
              <p className="subtitle_2">
                Experience the specific advantages and outcomes that our
                frameworks deliver, from cost savings and risk reduction to
                operational efficiency and strategic growth. Understand the
                complete transformation from legal anxiety to unstoppable
                confidence.
              </p>
              <Link href="./">
                <div>Learn more</div>
                <Image
                  width={15}
                  height={15}
                  src={"/diagonal-arrow.svg"}
                  alt="arrow"
                />
              </Link>
            </div>
          </div>

          <div className={styles.frameworksRowThree}>
            <div>
              <div className="title_5">[05] Partnership Approach</div>
            </div>
            <div>
              <div className="title_2">
                Why our success is built on your success
              </div>
              <p className="subtitle_2">
                Understand our strategic partnership approach that creates
                mutual growth and exceptional value. Discover how your success
                becomes our success story and why this creates superior outcomes
                for everyone involved.
              </p>
              <Link href="./">
                <div>Learn more</div>
                <Image
                  width={15}
                  height={15}
                  src={"/diagonal-arrow.svg"}
                  alt="arrow"
                />
              </Link>
            </div>
          </div>

          <div className={styles.frameworksRowThree}>
            <div>
              <div className="title_5">[06] Implementation Process</div>
            </div>
            <div>
              <div className="title_2">
                Our proven process for building your legal foundation
              </div>
              <p className="subtitle_2">
                Follow our step-by-step methodology for building and
                implementing frameworks that deliver measurable results and
                lasting value. From initial discovery to complete
                implementation, understand exactly how we&apos;ll work together
                to transform your legal position.
              </p>
              <Link href="./">
                <div>Learn more</div>
                <Image
                  width={15}
                  height={15}
                  src={"/diagonal-arrow.svg"}
                  alt="arrow"
                />
              </Link>
            </div>
          </div>

          <h4 className="subheadline_2">
            What This <span className="blue-text">[Transformation]</span> Means
            for Your Success
          </h4>

          <div className="studies-boxes">
            <div className="studies-boxes-top">
              <div className="study-box">
                <div>
                  <div className="title_2">
                    Proactive protection that prevents costly surprises
                  </div>
                  <Image
                    alt="balls"
                    src={"/balls1.svg"}
                    width={25}
                    height={25}
                  />
                </div>
                <p className="subtitle_2">
                  You&apos;ll sleep better knowing that potential legal issues are
                  identified and addressed before they become expensive
                  problems. Your framework acts as an early warning system,
                  catching issues while they&apos;re still manageable and inexpensive
                  to resolve.
                </p>
              </div>
              <div className="study-box">
                <div>
                  <div className="title_2">
                    Dramatic cost savings that improve your bottom line
                  </div>
                  <Image
                    alt="balls"
                    src={"/balls2.svg"}
                    width={25}
                    height={25}
                  />
                </div>
                <p className="subtitle_2">
                  By handling routine legal matters through your framework
                  instead of hiring lawyers for every decision, you&apos;ll reduce
                  your legal expenses significantly while actually improving
                  your legal protection. The framework pays for itself many
                  times over through the problems it prevents.
                </p>
              </div>
            </div>

            <div className="studies-boxes-bottom">
              <div className="study-box">
                <div>
                  <div className="title_2">
                    Operational efficiency that accelerates growth
                  </div>
                  <Image
                    alt="balls"
                    src={"/balls3.svg"}
                    width={25}
                    height={25}
                  />
                </div>
                <p className="subtitle_2">
                  Your team will operate more efficiently because they have
                  clear guidelines and proven processes. Deals close faster
                  because your legal position is clear and strong. Negotiations
                  proceed smoothly because counterparties recognize they&apos;re
                  dealing with a professionally managed organization.
                </p>
              </div>
              <div className="study-box">
                <div>
                  <div className="title_2">
                    Strategic growth foundation that scales with success
                  </div>
                  <Image
                    alt="balls"
                    src={"/balls4.svg"}
                    width={25}
                    height={25}
                  />
                </div>
                <p className="subtitle_2">
                  As your business grows, your investments expand, or your
                  professional activities become more complex, your framework
                  grows with you. You&apos;re not constantly rebuilding legal
                  protections - you&apos;re building on a foundation that becomes
                  stronger and more valuable over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
