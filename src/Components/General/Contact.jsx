import { useState } from "react";
import "./contact.css";

function Contact() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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
    <section className="contacto">
      <div className="contacto-top">
        <p className="small-title white-text">
          Nuestra ambición no tiene freno.
        </p>
      </div>
      <div className="contacto-main">
        <div className="contacto-left">
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
        <div className="contacto-right">
          <form
            className="contacto-form"
            onSubmit={(e) => {
              e.preventDefault();
              sendEmail();
            }}
          >
            <div className="contacto-form-row">
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
            <div className="contacto-form-actions">
              {success && <p className="text contact-success">{success}</p>}
              {error && <p className="contact-error">{error}</p>}
              <button type="submit">Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default Contact;
