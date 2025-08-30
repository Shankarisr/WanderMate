import React from "react";
import "./style.css";

const ContactPage = () => {
  return (
    <section className="contact-section">
      <div className="contact-wrapper">
        <div className="contact-details">
          <h1>Contact Us</h1>
          <div className="contact-info">
            <p>
              Email:{" "}
              <a href="mailto:wandermate07@gmail.com">wandermate07@gmail.com</a>
            </p>
            <p>
              Phone: <a href="tel:+9193824xxxxx">+91 93824xxxxx</a>
            </p>
            <p>Address: Chennai, India</p>

            <div className="social-media">
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form>
            <label>
              Name:
              <input type="text" name="name" required />
            </label>
            <label>
              Email:
              <input type="email" name="email" required />
            </label>
            <label>
              Subject:
              <input type="text" name="subject" />
            </label>
            <label>
              Message:
              <textarea name="message" required></textarea>
            </label>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
