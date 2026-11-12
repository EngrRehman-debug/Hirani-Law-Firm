"use client";

import { useState, type FormEvent } from "react";
import { useContent } from "@/content/client";
import { ChevronDown } from "./Icons";
import Button from "./Button";
import styles from "./ContactForm.module.css";

/** "Request a free consultation" form card. */
type Props = {
  /** "bordered": 1px #e9e9e6 outline and body-colored labels (contact page) */
  variant?: "default" | "bordered";
  /** false hides the card title (used inside the consultation popup, which has its own heading) */
  showTitle?: boolean;
};

export default function ContactForm({ variant = "default", showTitle = true }: Props) {
  const t = useContent().forms.consultation;
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <div className={`${styles.card} ${variant === "bordered" ? styles.bordered : ""}`}>
      {showTitle && <h6 className={`h6 ${styles.title}`}>{t.title}</h6>}
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.row}>
          <label className={styles.field}>
            <span className={`p14 ${styles.label}`}>{t.fullName.label}</span>
            <span className={styles.inputWrap}>
              <input className={styles.input} type="text" name="Name" placeholder={t.fullName.placeholder} required />
            </span>
          </label>
          <label className={styles.field}>
            <span className={`p14 ${styles.label}`}>{t.email.label}</span>
            <span className={styles.inputWrap}>
              <input className={styles.input} type="email" name="Email" placeholder={t.email.placeholder} required />
            </span>
          </label>
        </div>
        <div className={styles.row}>
          <label className={styles.field}>
            <span className={`p14 ${styles.label}`}>{t.company.label}</span>
            <span className={styles.inputWrap}>
              <input className={styles.input} type="text" name="Company" placeholder={t.company.placeholder} />
            </span>
          </label>
          <label className={styles.field}>
            <span className={`p14 ${styles.label}`}>{t.phone.label}</span>
            <span className={styles.inputWrap}>
              <input className={styles.input} type="tel" name="Phone Number" placeholder={t.phone.placeholder} required />
            </span>
          </label>
        </div>
        <label className={styles.selectField}>
          <span className="visually-hidden">{t.caseType.label}</span>
          <select className={styles.select} name="Practice Areas" defaultValue="" required>
            <option value="" disabled>
              {t.caseType.label}
            </option>
            {t.caseType.options.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <ChevronDown className={styles.chevron} width={34} height={34} />
        </label>
        <label className={styles.messageField}>
          <span className={`p14 ${styles.label}`}>{t.message.label}</span>
          <span className={styles.textareaWrap}>
            <textarea className={styles.textarea} name="Business Description" placeholder={t.message.placeholder} required />
          </span>
        </label>
        <div className={styles.bottom}>
          <label className={styles.checkbox}>
            <input type="checkbox" name="Newsletter" className={styles.check} required />
            <span className={`p14 ${styles.checkText}`}>{t.terms}</span>
          </label>
          <Button type="submit" variant="fillDark" fullWidth arrow className={styles.submit}>
            {sent ? t.sent : t.submit}
          </Button>
        </div>
      </form>
    </div>
  );
}
