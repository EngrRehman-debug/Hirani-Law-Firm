"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/ui/Icons";
import { useContent } from "@/content/client";
import styles from "./Footer.module.css";

export default function NewsletterForm() {
  const { footer } = useContent().site;
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  };
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.field}>
        <span className="visually-hidden">{footer.emailLabel}</span>
        <input
          type="email"
          name="Email Address"
          placeholder={sent ? footer.emailThanks : footer.emailPlaceholder}
          required
          className={styles.input}
        />
      </label>
      <button type="submit" className={styles.submit} aria-label={footer.subscribe}>
        <ArrowRight width={20} height={20} />
      </button>
    </form>
  );
}
