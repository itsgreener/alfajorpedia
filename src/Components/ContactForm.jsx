import "./ContactForm.css";

function ContactForm() {
  return (
    <section className="contact-form">
      <h2>¿Falta tu alfajor?<br />Avísanos.</h2>

      <div className="contact-form-body">
        <p>
          No vamos a parar hasta encontrar{" "}
          <strong>hasta el último alfajor del planeta.</strong>
        </p>

        <div className="contact-form-fields">
          <div className="contact-form-col">
            <input type="text" placeholder="nombre" />
            <input type="email" placeholder="email" />
          </div>
          <textarea placeholder="texto" />
          <button>Enviar</button>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;