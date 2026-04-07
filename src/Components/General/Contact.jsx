import { useState } from "react";
import { useBreakpoint } from "../../Hooks/useBreakpoint";
import styles from "./contact.module.css";

function Contact() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { isMobile } = useBreakpoint();

  const sendEmail = async () => {
    try {
      const response = await fetch("https://app.alfajorpedia.com/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          message: userMessage,
        }),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || "Error enviando el mail");
      }

      setSuccess("¡Muchas gracias por tu mensaje!");
      setUserName("");
      setUserEmail("");
      setUserMessage("");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section className={styles.contact}>
      {!isMobile && (
        <div className={styles.contactTop}>
          <p className="small-title white-text">
            Nuestra ambición no tiene freno.
          </p>
        </div>
      )}
      <div className={isMobile ? styles.contactMainMobile : styles.contactMain}>
        {!isMobile ? (
          <div className={styles.contactLeft}>
            <p className="small-title">
              ¿Falta tu alfajor?
              <br />
              Avísanos.
            </p>
            <p className="text">
              No vamos a parar hasta encontrar
              <br />
              <strong>hasta el último alfajor del planeta.</strong>
            </p>
          </div>
        ) : (
          <>
            <p className="small-title">¿Falta tu alfajor? Avísanos.</p>
            <p className="text">
              No vamos a parar hasta encontrar <br />
              <strong>hasta el último alfajor del planeta.</strong>
            </p>
          </>
        )}

        {isMobile ? (
          <form
            className={styles.contactForm}
            onSubmit={(e) => {
              e.preventDefault();
              sendEmail();
            }}
          >
            <input
              type="text"
              placeholder="Nombre"
              onChange={(e) => {
                setUserName(e.target.value);
                error && setError("");
                success && setSuccess("");
              }}
              value={userName}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setUserEmail(e.target.value);
                error && setError("");
                success && setSuccess("");
              }}
              value={userEmail}
            />
            <textarea
              placeholder="Escribe tu mensaje aquí..."
              onChange={(e) => {
                setUserMessage(e.target.value);
                error && setError("");
                success && setSuccess("");
              }}
              value={userMessage}
            />
            {success && <p className={styles.contactSuccess}>{success}</p>}
            {error && <p className={styles.contactError}>{error}</p>}
            <button className={`${styles.mobileFormSubmit} hover`} type="submit">
              <strong>Enviar</strong>
            </button>
          </form>
        ) : (
          <div className={styles.contactRight}>
            <form
              className={styles.contactForm}
              onSubmit={(e) => {
                e.preventDefault();
                sendEmail();
              }}
            >
              <div className={styles.contactFormRow}>
                <input
                  type="text"
                  placeholder="Nombre"
                  onChange={(e) => {
                    setUserName(e.target.value);
                    error && setError("");
                    success && setSuccess("");
                  }}
                  value={userName}
                />
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setUserEmail(e.target.value);
                    error && setError("");
                    success && setSuccess("");
                  }}
                  value={userEmail}
                />
              </div>
              <textarea
                placeholder="Escribe tu mensaje aquí..."
                onChange={(e) => {
                  setUserMessage(e.target.value);
                  error && setError("");
                  success && setSuccess("");
                }}
                value={userMessage}
              />
              <div className={styles.contactFormActions}>
                {success && <p className={styles.contactSuccess}>{success}</p>}
                {error && <p className={styles.contactError}>{error}</p>}
                <button type="submit">Enviar</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default Contact;
