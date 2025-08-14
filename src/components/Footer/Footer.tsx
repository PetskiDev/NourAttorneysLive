import styles from "./Footer.module.css";
import Link from "next/link";
import { getFooterLinksCached } from "~/server/cachedReads";

function groupLinks() {
  return getFooterLinksCached().then((all) => {
    const navigation = all.filter((l) => l.category === "NAVIGATION");
    const social = all.filter((l) => l.category === "SOCIAL");
    return { navigation, social };
  });
}

export default async function Footer() {
  const { navigation, social } = await groupLinks();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.loc}>
          <h3 className={styles.sectionTitle}>Location</h3>
          <ul className={styles.list}>
            <li>Office 402, Crystal Tower,</li>
            <li>Business Bay, Dubai, UAE</li>
          </ul>
          <div className={styles.subTitle}>Working hours</div>
          <div>Mon–Fri: 9am — 6pm</div>
        </div>
        <div className={styles.nav}>
          <h3 className={styles.sectionTitle}>Navigation</h3>
          <ul className={styles.list}>
            {navigation.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className={styles.linkPlain}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.social}>
          <h3 className={styles.sectionTitle}>Social media</h3>
          <ul className={styles.socialList}>
            {social.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className={styles.linkPlain}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.contacts}>
            <h3 className={styles.sectionTitle}>Contacts</h3>
            <ul className={styles.list}>
              <li>
                <span>Telephone: </span>
                <a className={styles.linkUnderline} href="tel:+971585552999">+971 58 555 2999</a>
              </li>
              <li>
                <span>WhatsApp: </span>
                <a className={styles.linkUnderline} href="https://wa.me/971585552999" target="_blank" rel="noreferrer">+971 58 555 2999</a>
              </li>
              <li>
                <Link className={styles.linkUnderline} href="#">Chatbot</Link>
              </li>
            </ul>
        </div>

        <div className={styles.emailWrap}>
          <a className={styles.email} href="mailto:info@nourattorneys.com">INFO@NOURATTORNEYS.COM</a>
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


