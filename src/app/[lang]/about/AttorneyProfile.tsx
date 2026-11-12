import Link from "next/link";
import { notFound } from "next/navigation";
import CheckList from "@/components/ui/CheckList";
import ContactChip from "@/components/ui/ContactChip";
import ContactForm from "@/components/ui/ContactForm";
import { SOCIAL_ICONS } from "@/components/ui/Icons";
import LineDraw from "@/components/ui/LineDraw";
import Reveal from "@/components/ui/Reveal";
import ZoomImage from "@/components/ui/ZoomImage";
import { getContent } from "@/content";
import { getAttorneys } from "@/data/attorneys";
import { getSocialLinks } from "@/data/site";
import { slideSpring } from "@/lib/motion";
import awardStyles from "@/components/sections/shared/Awards.module.css";
import styles from "./profile.module.css";
import RouteSeo from "@/components/layout/RouteSeo";

/** Awards list entrance (Framer: spring, bounce 0, delay .5, duration .7). */
const awardsSpring = { type: "spring" as const, bounce: 0, delay: 0.5, duration: 0.7 };


/** Attorney / team member profile (used by /about/sehar-hirani and /about/our-team/[slug]). Call setRequestLocale first. */
export default function AttorneyProfile({ slug }: { slug: string }) {
  const labels = getContent().pages.attorneyProfile;
  const attorneys = getAttorneys();
  const index = attorneys.findIndex((a) => a.slug === slug);
  const attorney = attorneys[index];
  if (!attorney) notFound();
  const profile = attorney.profile;

  const prev = attorneys[index - 1];
  const next = attorneys[index + 1];
  const hasEducation = profile.education.length > 0 || profile.educationItems.length > 0;

  return (
    <main className="page">
      <RouteSeo route={attorney.href} />
      <section className={styles.hero}>
        <div className={styles.heroWrapper}>
          <div className={styles.heading}>
            <p className={`p18 ${styles.role}`}>{attorney.role}</p>
            <h1 className={`h1 ${styles.name}`}>{attorney.name}</h1>
          </div>
        </div>
      </section>

      <section className={styles.profile}>
        <div className={styles.wrapper}>
          <div className={styles.image}>
            <ZoomImage
              src={attorney.image}
              alt={profile.imageAlt}
              ratio={0.751107}
              sizes="(max-width: 809px) 100vw, 480px"
              priority
            />
          </div>
          <div className={styles.spacer} />
          <div className={styles.content}>
            <div className={styles.details}>
              <h2 className={`h6 ${styles.intro}`}>{profile.intro}</h2>
              {profile.bio.map((t) => (
                <p key={t} className={`p18 ${styles.text}`}>
                  {t}
                </p>
              ))}
            </div>

            <LineDraw />

            <div className={styles.contacts}>
              <div className={styles.contactList}>
                <ContactChip type="mail" variant="plainDark" value={profile.email} href={`mailto:${profile.email}`} />
                <ContactChip type="phone" variant="plainDark" value={profile.phone} href={`tel:${profile.phone}`} />
              </div>
              <ul className={styles.socials}>
                {getSocialLinks().map(({ href, label, icon }) => {
                  const Icon = SOCIAL_ICONS[icon];
                  return (
                    <li key={label}>
                      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={styles.social}>
                        <Icon width={24} height={24} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {hasEducation && (
              <>
                <LineDraw />
                <div className={styles.block}>
                  <h3 className={`h6 ${styles.blockTitle}`}>{labels.education}</h3>
                  <div>
                    {profile.education.map((t) => (
                      <p key={t} className={`p18 ${styles.text}`}>
                        {t}
                      </p>
                    ))}
                  </div>
                  {profile.educationItems.length > 0 && <CheckList items={profile.educationItems} reveal={false} />}
                </div>
              </>
            )}

            {profile.awards.length > 0 && (
              <>
                <LineDraw />
                <div className={styles.block}>
                  <h3 className={`h6 ${styles.blockTitle}`}>{labels.awards}</h3>
                  {/* same numbered rows + hover as the Memberships list on /about/our-team */}
                  <Reveal y={30} transition={awardsSpring} once={false} className={awardStyles.list}>
                    {profile.awards.map((a, i) => (
                      <div key={a.title} className={awardStyles.row}>
                        <div className={awardStyles.content}>
                          <div className={awardStyles.number}>
                            <p className={`p16 ${awardStyles.index}`}>{String(i + 1).padStart(2, "0")}</p>
                          </div>
                          <div className={awardStyles.text}>
                            <p className={`p18 ${awardStyles.title}`}>{a.title}</p>
                            <p className={`p16 ${awardStyles.year}`}>{a.year}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Reveal>
                </div>
              </>
            )}

            <LineDraw />

            <Reveal x={50} y={0} transition={slideSpring} amount={0.5} once={false} className={styles.form}>
              <ContactForm />
            </Reveal>

            <LineDraw />

            <div className={styles.pager}>
              {prev && (
                <p className={styles.pagerItem}>
                  <Link href={prev.href} className={styles.pagerLink}>
                    &lt; {prev.name}
                  </Link>
                </p>
              )}
              <div className={styles.pagerSpacer} />
              {next && (
                <p className={styles.pagerItem}>
                  <Link href={next.href} className={styles.pagerLink}>
                    {next.name} &gt;
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
