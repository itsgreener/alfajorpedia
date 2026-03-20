import { useState } from "react";
import "./contact.css";

function Contact() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");

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

      const data = await response.json();
      console.log(data);

      alert("Message sent successfully");
      setUserName("");
      setUserEmail("");
      setUserMessage("");
    } catch (e) {
      console.log("Error Log: ", e);
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
                placeholder="nombre"
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="email"
                placeholder="email"
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <textarea
              placeholder="texto"
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <div className="contacto-form-actions">
              <button type="submit">Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default Contact;
