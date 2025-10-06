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
              <EditableText
                relUrl="/frameworks-template"
                blockKey="hero-title-desktop"
                placeholderContent="WE REMOVE LEGAL BARRIERS"
                placeholderTag="h1"
                className="headline_1_3 mobnot antiselector"
              />
              <EditableText
                relUrl="/frameworks-template"
                blockKey="hero-title-mobile"
                placeholderContent="We remove legal barriers to your growth and success"
                placeholderTag="h1"
                className="headline_1_3 mob antiselector"
              />
            </div>
            <Image
              src={"./esg-mobile.svg"}
              width={100}
              height={20}
              alt="element"
            />
            <div className={styles.heroRight}>
              <EditableText
                relUrl="/frameworks-template"
                blockKey="hero-description"
                placeholderContent="Build your business with unshakeable legal confidence. Discover how comprehensive legal frameworks transform uncertainty into competitive advantage and provide the foundation for sustainable success."
                placeholderTag="div"
                className="title_4 antiselector"
              />
            </div>
          </div>
          <div className={styles.heroRow}>
            <div className={styles.heroLeft}></div>
            <div className={styles.heroRight}>
              <EditableText
                relUrl="/frameworks-template"
                blockKey="hero-subtitle"
                placeholderContent="TO YOUR GROWTH AND SUCCESS"
                placeholderTag="h1"
                className="headline_1_3 mobnot antiselector"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.frameworksOne}>
        <div className="containerr">
          <div className={styles.oneLeft}>
            <EditableText
              relUrl="/frameworks-template"
              blockKey="challenge-title"
              placeholderContent="The Challenge Every Growing Business Faces"
              placeholderTag="div"
              className="subtitle_4 antiselector"
            />
          </div>

          <div className={styles.oneRight}>
            <EditableText
              relUrl="/frameworks-template"
              blockKey="challenge-paragraph-1"
              placeholderContent="You started your business with a vision and the determination to make it succeed. But as your company grows, you're discovering that every decision seems to have legal implications you never anticipated. Contract negotiations keep you awake at night wondering if you're protecting your interests. New hires raise employment law questions you're not equipped to answer. Client agreements leave you uncertain about liability exposure. Supplier relationships create compliance concerns you didn't know existed."
              placeholderTag="p"
              className="body_text antiselector"
            />

            <EditableText
              relUrl="/frameworks-template"
              blockKey="challenge-paragraph-2"
              placeholderContent="You want to move fast and seize opportunities, but you're afraid that one legal misstep could jeopardize everything you've worked so hard to build. You know you need legal protection, but hiring a lawyer for every decision isn't practical or affordable. What you really need is something more fundamental - the confidence that comes from having a solid legal foundation that protects you while enabling the aggressive growth you're seeking."
              placeholderTag="p"
              className="body_text antiselector"
            />

            <EditableText
              relUrl="/frameworks-template"
              blockKey="challenge-paragraph-3"
              placeholderContent="This isn't just about avoiding problems. It's about building a business that can thrive in today's complex legal environment. You want to make bold decisions, pursue ambitious opportunities, and focus on what you do best - growing your business - without constantly worrying about legal landmines."
              placeholderTag="p"
              className="body_text antiselector"
            />

            <EditableText
              relUrl="/frameworks-template"
              blockKey="framework-title"
              placeholderContent="The Legal Foundation That Transforms How You Do Business"
              placeholderTag="div"
              className="title_3 antiselector"
            />

            <EditableText
              relUrl="/frameworks-template"
              blockKey="framework-paragraph-1"
              placeholderContent="We don't just provide legal services - we build comprehensive legal frameworks that give you the confidence to operate and grow your business without fear. Think of it as creating a legal operating system for your business that handles routine matters automatically while flagging when you need specialized attention."
              placeholderTag="p"
              className="body_text antiselector"
            />

            <EditableText
              relUrl="/frameworks-template"
              blockKey="framework-paragraph-2"
              placeholderContent="A legal framework isn't just a collection of documents or policies. It's a comprehensive system that becomes the backbone of how you operate, protecting your interests while enabling efficient, confident decision-making at every level of your organization. When properly implemented, it transforms your relationship with legal risk from constant anxiety to strategic advantage."
              placeholderTag="p"
              className="body_text antiselector"
            />
          </div>
        </div>
      </section>

      <section className={styles.frameworksTwo}>
        <div className="containerr">
          <div className={styles.twoLeft}>
            <EditableText
              relUrl="/frameworks-template"
              blockKey="legal-changes-title"
              placeholderContent="We stay ahead of legal changes:"
              placeholderTag="div"
              className="title_5 antiselector"
            />
            <ul>
              <li className="subtitle_2 antiselector">
                <EditableText
                  relUrl="/frameworks-template"
                  blockKey="legal-changes-item-1"
                  placeholderContent="Legislative monitoring and adaptation"
                  placeholderTag="span"
                />
              </li>
              <li className="subtitle_2 antiselector">
                <EditableText
                  relUrl="/frameworks-template"
                  blockKey="legal-changes-item-2"
                  placeholderContent="Regulatory Intelligence and Implementation"
                  placeholderTag="span"
                />
              </li>
              <li className="subtitle_2 antiselector">
                <EditableText
                  relUrl="/frameworks-template"
                  blockKey="legal-changes-item-3"
                  placeholderContent="Judicial decision integration"
                  placeholderTag="span"
                />
              </li>
              <li className="subtitle_2 antiselector">
                <EditableText
                  relUrl="/frameworks-template"
                  blockKey="legal-changes-item-4"
                  placeholderContent="International standards and best practices"
                  placeholderTag="span"
                />
              </li>
            </ul>
          </div>
          <div className={styles.twoRight}>
            <EditableImage
              relUrl="/frameworks-template"
              blockKey="framework-image-1"
              placeholderUrl="/f-template-1.jpg"
              placeholderAlt="framework"
            />
          </div>
        </div>
      </section>

      <section className={styles.frameworksThree}>
        <div className="containerr">
          <EditableText
            relUrl="/frameworks-template"
            blockKey="protection-system-title"
            placeholderContent="The Comprehensive [Protection System] We Build for You"
            placeholderTag="h4"
            className="headline_4"
          />

<div className="line"></div>
          <div className={styles.threeRow}>
            <div className={styles.threeLeft}>
              <EditableText
                relUrl="/frameworks-template"
                blockKey="protection-01-number"
                placeholderContent="[01]"
                placeholderTag="div"
                className="title_5 antiselector"
              />
              <EditableText
                relUrl="/frameworks-template"
                blockKey="protection-01-title"
                placeholderContent="Smart Contract Systems That Work in Your Favor"
                placeholderTag="div"
                className="title_5 antiselector"
              />
            </div>
            <div className={styles.threeRight}>
              <EditableText
                relUrl="/frameworks-template"
                blockKey="protection-01-paragraph-1"
                placeholderContent="Instead of starting from scratch with every agreement, you'll have master contracts developed over years of practice that cover every scenario we've encountered. These aren't just templates downloaded from the internet - they're battle-tested agreements that incorporate lessons learned from hundreds of transactions and disputes. They're designed not just to protect you, but to strengthen your negotiating position so significantly that counterparties often seek favorable settlements because your legal position is unassailable."
                placeholderTag="p"
                className="body_text antiselector"
              />
              <EditableText
                relUrl="/frameworks-template"
                blockKey="protection-01-paragraph-2"
                placeholderContent="These master agreements become your competitive advantage. While your competitors are spending time and money negotiating basic terms, you're moving quickly with proven frameworks that protect your interests and accelerate deal closure. Your suppliers, clients, and partners quickly learn that working with you means working with someone who has their legal house in order."
                placeholderTag="p"
                className="body_text antiselector"
              />
            </div>
          </div>

<div className="line"></div>
          <div className={styles.threeRow}>
            <div className={styles.threeLeft}>
              <EditableText
                relUrl="/frameworks-template"
                blockKey="protection-02-number"
                placeholderContent="[02]"
                placeholderTag="div"
                className="title_5 antiselector"
              />
              <EditableText
                relUrl="/frameworks-template"
                blockKey="protection-02-title"
                placeholderContent="Clear Policies That Protect and Empower"
                placeholderTag="div"
                className="title_5 antiselector"
              />
            </div>
            <div className={styles.threeRight}>
              <EditableText
                relUrl="/frameworks-template"
                blockKey="protection-02-paragraph-1"
                placeholderContent="You'll have straightforward guidelines that help you and your team make compliant decisions every day. No more guessing whether you're following the rules - you'll have clear procedures that ensure compliance while enabling efficient operations. These policies serve multiple purposes: they protect your business from legal risks, they educate your team about proper procedures, and they demonstrate to external parties that you operate professionally and responsibly."
                placeholderTag="p"
                className="body_text antiselector"
              />
              <EditableText
                relUrl="/frameworks-template"
                blockKey="protection-02-paragraph-2"
                placeholderContent="These aren't bureaucratic obstacles that slow down your business. They're enablers that allow you to move faster because everyone knows the rules and can operate within them confidently. When your team understands the legal boundaries, they can push right up to those boundaries to maximize opportunities while staying safe."
                placeholderTag="p"
                className="body_text antiselector"
              />
            </div>
          </div>

<div className="line"></div>
          <div className={styles.threeRow}>
            <div className={styles.threeLeft}>
              <EditableText
                relUrl="/frameworks-template"
                blockKey="protection-03-number"
                placeholderContent="[03]"
                placeholderTag="div"
                className="title_5 antiselector"
              />
              <EditableText
                relUrl="/frameworks-template"
                blockKey="protection-03-title"
                placeholderContent="Proactive Risk Management That Keeps You Ahead"
                placeholderTag="div"
                className="title_5 antiselector"
              />
            </div>
            <div className={styles.threeRight}>
              <EditableText
                relUrl="/frameworks-template"
                blockKey="protection-03-paragraph-1"
                placeholderContent="Legal landscapes change constantly. New regulations emerge, court decisions create new precedents, and industry standards evolve. We monitor these changes continuously and update your framework accordingly. You'll stay ahead of new requirements instead of scrambling to catch up after they're implemented."
                placeholderTag="p"
                className="body_text antiselector"
              />
              <EditableText
                relUrl="/frameworks-template"
                blockKey="protection-03-paragraph-2"
                placeholderContent="This proactive approach means you're never caught off guard by legal changes. While your competitors are reacting to new regulations, you're already compliant and positioned to take advantage of opportunities that regulatory changes create. You become known in your industry as a company that's always ahead of the curve on legal matters."
                placeholderTag="p"
                className="body_text antiselector"
              />
            </div>
          </div>

<div className="line"></div>
          <div className={styles.threeRow}>
            <div className={styles.threeLeft}>
              <EditableText
                relUrl="/frameworks-template"
                blockKey="protection-04-number"
                placeholderContent="[04]"
                placeholderTag="div"
                className="title_5 antiselector"
              />
              <EditableText
                relUrl="/frameworks-template"
                blockKey="protection-04-title"
                placeholderContent="Training That Empowers Your Entire Team"
                placeholderTag="div"
                className="title_5 antiselector"
              />
            </div>
            <div className={styles.threeRight}>
              <EditableText
                relUrl="/frameworks-template"
                blockKey="protection-04-paragraph-1"
                placeholderContent="Your staff will understand how to use your legal framework effectively, making smart decisions that protect the business while serving customers and growing revenue. This isn't just about compliance training - it's about empowering your team to operate confidently within legal boundaries while maximizing business opportunities."
                placeholderTag="p"
                className="body_text antiselector"
              />
              <EditableText
                relUrl="/frameworks-template"
                blockKey="protection-04-paragraph-2"
                placeholderContent="When your team understands the legal framework, they become force multipliers for your business. They can handle routine legal matters without escalation, they can spot potential issues before they become problems, and they can communicate with confidence to clients and partners about your company's professional approach to legal matters."
                placeholderTag="p"
                className="body_text antiselector"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.frameworksFour}>
        <div className="containerr">
          <EditableText
            relUrl="/frameworks-template"
            blockKey="industry-intro-1"
            placeholderContent="This framework proves essential across diverse industries. It delivers critical solutions in"
            placeholderTag="h4"
            className="subheadline_2 antiselector"
          />

          <EditableText
            relUrl="/frameworks-template"
            blockKey="industry-intro-2"
            placeholderContent="key situations, ensuring stability and growth"
            placeholderTag="h4"
            className="subheadline_2 antiselector"
          />

          <div className="studies-boxes">
            <div className={styles.studyAbs}>
              <EditableText
                relUrl="/frameworks-template"
                blockKey="industry-essential"
                placeholderContent="ESSENTIAL FOR ANY INDUSTRY"
                placeholderTag="div"
                className="descriptor_1 antiselector"
              />
            </div>
            <div className="studies-boxes-top">
              <div className="study-box antiselector">
                <div>
                  <EditableText
                    relUrl="/frameworks-template"
                    blockKey="industry-box-1-title"
                    placeholderContent="Growing businesses facing complexity"
                    placeholderTag="div"
                    className="title_2 antiselector"
                  />
                  <Image
                    alt="balls"
                    src={"/balls1.svg"}
                    width={25}
                    height={25}
                  />
                </div>
                <EditableText
                  relUrl="/frameworks-template"
                  blockKey="industry-box-1-description"
                  placeholderContent="If your business is expanding rapidly, entering new markets, or dealing with increasingly sophisticated clients and suppliers, you need a legal framework that can scale with your growth. The informal approaches that worked when you were small become dangerous liabilities as you grow."
                  placeholderTag="p"
                  className="subtitle_2 antiselector"
                />
              </div>
              <div className="study-box antiselector">
                <div>
                  <EditableText
                    relUrl="/frameworks-template"
                    blockKey="industry-box-2-title"
                    placeholderContent="Investment and transaction-heavy operations"
                    placeholderTag="div"
                    className="title_2 antiselector"
                  />
                  <Image
                    alt="balls"
                    src={"/balls2.svg"}
                    width={25}
                    height={25}
                  />
                </div>
                <EditableText
                  relUrl="/frameworks-template"
                  blockKey="industry-box-2-description"
                  placeholderContent="Whether you are an active investor, a business that engages in multiple transactions on a daily basis, or an individual with significant ongoing contractual relationships, having a standardized framework saves you from having to invent new remedies for each transaction."
                  placeholderTag="p"
                  className="subtitle_2 antiselector"
                />
              </div>
            </div>

            <div className="studies-boxes-bottom">
              <div className="study-box antiselector">
                <div>
                  <EditableText
                    relUrl="/frameworks-template"
                    blockKey="industry-box-3-title"
                    placeholderContent="Regulated industries and compliance-heavy environments"
                    placeholderTag="div"
                    className="title_2 antiselector"
                  />
                  <Image
                    alt="balls"
                    src={"/balls3.svg"}
                    width={25}
                    height={25}
                  />
                </div>
                <EditableText
                  relUrl="/frameworks-template"
                  blockKey="industry-box-3-description"
                  placeholderContent="If your business operates in an environment with significant regulatory requirements, a framework ensures you stay compliant while maintaining operational efficiency. This is crucial in finance, healthcare, technology, international trade."
                  placeholderTag="p"
                  className="subtitle_2 antiselector"
                />
              </div>
              <div className="study-box antiselector">
                <div>
                  <EditableText
                    relUrl="/frameworks-template"
                    blockKey="industry-box-4-title"
                    placeholderContent="Businesses seeking competitive advantage"
                    placeholderTag="div"
                    className="title_2 antiselector"
                  />
                  <Image
                    alt="balls"
                    src={"/balls4.svg"}
                    width={25}
                    height={25}
                  />
                </div>
                <EditableText
                  relUrl="/frameworks-template"
                  blockKey="industry-box-4-description"
                  placeholderContent="Companies that can move quickly and confidently on legal matters have a significant competitive advantage. While competitors are consulting lawyers for routine decisions, you're executing with confidence based on your established framework."
                  placeholderTag="p"
                  className="subtitle_2 antiselector"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.frameworksFive}>
        <div className="containerr">
          <EditableText
            relUrl="/frameworks-template"
            blockKey="conclusion-intro-1"
            placeholderContent="When you know you're legally protected, you"
            placeholderTag="h4"
            className="subheadline_2 antiselector"
          />
          <EditableText
            relUrl="/frameworks-template"
            blockKey="conclusion-intro-2"
            placeholderContent="can focus on [what you do best]: pursue ambitious goals, enter new markets, and build strategic partnerships with confidence because you know your legal foundation is solid."
            placeholderTag="h4"
            className="subheadline_2 antiselector"
          />

          <div className={styles.fiveRow}>
            <div className={styles.fiveLeft}>
              <EditableImage
                relUrl="/frameworks-template"
                blockKey="framework-image-2"
                placeholderUrl="/f-template-2.jpg"
                placeholderAlt="framework"
              />
            </div>
            <div className={styles.fiveRight}>
              <EditableText
                relUrl="/frameworks-template"
                blockKey="conclusion-paragraph-1"
                placeholderContent="Our clients consistently report that having a comprehensive legal framework transforms their relationship with their business. They sleep better because they're not worried about legal issues. They make decisions faster because they understand the legal landscape. They grow more aggressively because they're confident in their protection."
                placeholderTag="p"
                className="body_text antiselector"
              />

              <EditableText
                relUrl="/frameworks-template"
                blockKey="conclusion-paragraph-2"
                placeholderContent="More importantly, they find that their legal framework becomes a competitive advantage. They can move faster than competitors who are still figuring out legal issues case by case. They can offer more attractive terms to clients because their risk management is superior. They can attract better partners and suppliers because they're known for professional, legally sound operations."
                placeholderTag="p"
                className="body_text antiselector"
              />

              <EditableImage
                relUrl="/frameworks-template"
                blockKey="framework-image-3"
                placeholderUrl="/f-template-2.jpg"
                placeholderAlt="framework"
              />

              <EditableText
                relUrl="/frameworks-template"
                blockKey="conclusion-title"
                placeholderContent="Your Path to Legal Confidence and Business Growth"
                placeholderTag="div"
                className="title_3 antiselector"
              />

              <EditableText
                relUrl="/frameworks-template"
                blockKey="conclusion-paragraph-3"
                placeholderContent="The investment you make in creating a robust legal framework pays dividends every day through the confidence it provides and the problems it prevents. More importantly, it enables the kind of aggressive, confident business growth that creates lasting success."
                placeholderTag="p"
                className="body_text antiselector"
              />

              <EditableText
                relUrl="/frameworks-template"
                blockKey="conclusion-paragraph-4"
                placeholderContent="If you're ready to transform your relationship with legal risk and build your business with complete confidence, we're here to help you create the legal foundation that will support your growth for years to come."
                placeholderTag="p"
                className="body_text antiselector"
              />

              <Link href={"/contact"}>
                <EditableText
                  relUrl="/frameworks-template"
                  blockKey="contact-button"
                  placeholderContent="Contact Us"
                  placeholderTag="span"
                  className="button_link"
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
