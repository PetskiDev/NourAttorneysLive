import styles from "./Footer.module.css";
import Link from "next/link";
import { getFooterLinksCached, getFooterTextCached } from "~/server/cachedReads";
import { EditableText } from "~/components/EditableText";

function groupLinks() {
  return getFooterLinksCached().then((all) => {
    const navigation = all.filter((l) => l.category === "NAVIGATION");
    const social = all.filter((l) => l.category === "SOCIAL");
    return { navigation, social };
  });
}

export default async function Footer() {
  const { navigation, social } = await groupLinks();
  const texts = await getFooterTextCached();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.loc}>
          <h3 className="title_4 antiselector">Location</h3>
          {texts.LOCATION ? (
            <div className="subtitle_3" style={{ whiteSpace: "pre-line" }}>{texts.LOCATION}</div>
          ) : (
            <ul className={styles.list}>
              <li className="subtitle_3">Office 402, Crystal Tower,</li>
              <li className="subtitle_3">Business Bay, Dubai, UAE</li>
            </ul>
          )}
          <div className="title_4 antiselector">Working hours</div>
          <div className="subtitle_3">{texts.WORKING_HOURS ?? "Mon–Fri: 9am — 6pm"}</div>
        </div>
        <div className={styles.nav}>
          <h3 className="title_4 antiselector">Navigation</h3>
          <ul className={styles.list}>
            {navigation.map((item) => (
              <li className="subtitle_3" key={item.id}>
                <Link href={item.href} className={styles.linkPlain}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.social}>
          <h3 className="title_4 antiselector">Social media</h3>
          <ul className={styles.socialList}>
            {social.map((item) => (
              <li className="subtitle_3" key={item.id}>
                <Link href={item.href} className={styles.linkPlain}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.contacts}>
            <h3 className="title_4 antiselector">Contacts</h3>
            <ul className={styles.list}>
              <li className="subtitle_3">
                <span>Telephone: </span>
                <a className={styles.linkUnderline} href="tel:+971585552999">
                  <EditableText
                    relUrl="/footer"
                    blockKey="telephone-value"
                    placeholderTag="span"
                    placeholderContent="+971 58 555 2999"
                  />
                </a>
              </li>
              <li className="subtitle_3">
                <span>WhatsApp: </span>
                <a className={styles.linkUnderline} href="https://wa.me/971585552999" target="_blank" rel="noreferrer">
                  <EditableText
                    relUrl="/footer"
                    blockKey="whatsapp-value"
                    placeholderTag="span"
                    placeholderContent="+971 58 555 2999"
                  />
                </a>
              </li>
              <li className="subtitle_3">
                <Link className={styles.linkUnderline} href="#">Chatbot</Link>
              </li>
            </ul>
        </div>

        <div className={styles.emailWrap}>
          <a className={`${styles.email} headline_4`} href="mailto:info@nourattorneys.com">
            <EditableText
              relUrl="/footer"
              blockKey="email-value"
              placeholderTag="span"
              placeholderContent="INFO@NOURATTORNEYS.COM"
            />
          </a>
        </div>
        <div className={styles.bottom}>
          <div className={styles.copyright}>Copyright © 2025 Nour Attorneys. All Rights Reserved</div>
          <div className={styles.legal}>
            <Link className={styles.linkUnderline} href="#">Privacy Policy</Link>
            <Link className={styles.linkUnderline} href="#">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


