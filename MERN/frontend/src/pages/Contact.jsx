import React, { useRef, useState } from "react";
import "../styles/Contact.css";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaClock,
} from "react-icons/fa";

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    const form = formRef.current;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in all required fields.",
      });
      return;
    }

    setLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAIL_SERVICE,
        import.meta.env.VITE_EMAIL_TEMPLATE,
        formRef.current,
        import.meta.env.VITE_EMAIL_PUBLIC
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Thank You!",
          text: "Your message has been received. Our team will contact you shortly.",
        });
        form.reset();
        setLoading(false);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: "Please try again later.",
        });
        setLoading(false);
      });
  };

  return (
    <section className="contact-page">
      <div className="container">
        {/* Header */}
        <div className="contact-header text-center mb-5">
          <h1>Get In Touch</h1>
          <p>
            Tell us about your event — we'll take care of the planning, design,
            and execution.
          </p>
        </div>

        <div className="row g-4">
          {/* Info */}
          <div className="col-lg-5">
            <div className="contact-card">
              <h3>Contact Details</h3>

              <p>
                <FaMapMarkerAlt /> Ahmedabad, Gujarat, India
              </p>
              <p>
                <FaPhoneAlt /> +91 12345 67890
              </p>
              <p>
                <FaEnvelope /> epicauraeventmanagement@gmail.com
              </p>
              <p>
                <FaClock /> Mon - Sat | 11:00 AM - 7:00 PM
              </p>

              <div className="contact-note">
                We usually respond within <b>24 hours</b>. Let's create
                something truly memorable.
              </div>

              <div className="contact-social">
                <a href="#">
                  <FaInstagram />
                </a>
                <a href="#">
                  <FaLinkedinIn />
                </a>
                <a href="#">
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="col-lg-7">
            <div className="contact-form-card">
              <h3>Send Us a Message</h3>

              <form ref={formRef} onSubmit={sendEmail}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Your Name *"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Your Email *"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    name="event_type"
                    className="form-control"
                    placeholder="Type of Event (Wedding, Corporate, Party)"
                  />
                </div>

                <div className="mb-4">
                  <textarea
                    rows="4"
                    name="message"
                    className="form-control"
                    placeholder="Tell us about your event *"
                  />
                </div>

                {/* NORMAL BUTTON */}
                <button
                  type="submit"
                  className="contact-btn"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Submit Enquiry"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
