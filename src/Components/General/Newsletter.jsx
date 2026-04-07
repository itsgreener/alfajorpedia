import { useState } from "react";
import { useBreakpoint } from "../../Hooks/useBreakpoint";
import styles from "./Newsletter.module.css";

function Newsletter() {
  const { isMobile } = useBreakpoint();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function handleNewsletterSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("https://app.alfajorpedia.com/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("ok");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <div className={styles.footerNewsletter}>
      <p
        className={`${isMobile ? styles.newsletterTitleMobile : `${styles.newsletterTitle} white-text`}`}
      >
        <strong>
          {isMobile ? "RECIBE NUESTRA NEWSLETTER" : "Recibe nuestra newsletter"}
        </strong>
      </p>

      <form
        className={
          isMobile
            ? styles.footerNewsletterInputMobile
            : styles.footerNewsletterInput
        }
        onSubmit={handleNewsletterSubmit}
      >
        <input
          type="email"
          placeholder="Introduce tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {isMobile && <div className={styles.newsletterDivider} />}
        <button type="submit">
          {isMobile ? (
            <svg
              width="26"
              height="32"
              viewBox="0 0 26 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.1057 19.2652C9.1057 19.0518 9.27116 18.7674 9.41298 18.6489L18.4184 11.7037C18.7493 11.4429 18.7966 10.9926 18.5602 10.6607C18.3002 10.3289 17.8512 10.2815 17.5202 10.5185C17.5202 10.5185 7.8057 18.0326 7.71116 18.08C7.45116 18.2933 7.07298 18.2696 6.83661 18.0326L3.6457 14.8326C3.10207 14.2874 2.88934 13.4815 3.0548 12.7467C3.24389 11.9881 3.78752 11.3955 4.52025 11.1585L20.1675 6.10961C20.9475 5.84887 21.8221 6.06221 22.413 6.6548C23.0039 7.24739 23.2166 8.10072 22.9566 8.90665L17.9221 24.5985C17.6857 25.3333 17.0948 25.9022 16.3384 26.0681C15.5821 26.2578 14.8021 26.0207 14.2584 25.4755L10.5712 21.7778V22.9629C10.5712 23.3659 10.2402 23.6978 9.83843 23.6978C9.43661 23.6978 9.1057 23.3659 9.1057 22.9629V19.2652Z"
                fill="var(--black)"
              />
            </svg>
          ) : (
            ">"
          )}
        </button>
      </form>
      {status === "ok" && (
        <p
          className={`${!isMobile && "white-text"} ${styles.newsletterMessage}`}
        >
          Revisa tu email para confirmar la suscripción.
        </p>
      )}
      {status === "error" && (
        <p
          className={` ${styles.newsletterMessage} ${!isMobile && "white-text"}`}
        >
          No se pudo completar la suscripción.
        </p>
      )}
    </div>
  );
}

export default Newsletter;
