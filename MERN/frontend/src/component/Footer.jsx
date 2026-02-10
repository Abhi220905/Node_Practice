  import React from "react";
  import { FaInstagram, FaFacebookF, FaLinkedinIn, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

  const Footer = () => {
    return (
      <footer className="epic-footer">
        <div className="container">
          <div className="row gy-4">

            {/* Brand */}
            <div className="col-lg-4 col-md-6">
              <h3 className="footer-brand">EpicAura</h3>
              <p className="footer-text">
                Turning moments into unforgettable experiences.  
                Premium event planning for weddings, parties & corporate events.
              </p>
            </div>

            {/* Links */}
            <div className="col-lg-2 col-md-6">
              <h5 className="footer-title">Quick Links</h5>
              <ul className="footer-links">
                <li>Home</li>
                <li>Events</li>
                <li>Gallery</li>
                <li>About Us</li>
                <li>Contact</li>
              </ul>
            </div>

            {/* Services */}
            <div className="col-lg-3 col-md-6">
              <h5 className="footer-title">Our Services</h5>
              <ul className="footer-links">
                <li>Wedding Planning</li>
                <li>Corporate Events</li>
                <li>Birthday Parties</li>
                <li>Concerts & Shows</li>
                <li>Decor & Styling</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="col-lg-3 col-md-6">
              <h5 className="footer-title">Contact</h5>
              <p className="footer-contact">
                <FaPhoneAlt /> +91 12345 67890
              </p>
              <p className="footer-contact">
                <FaEnvelope /> epicauraeventmanagement@gmail.com
              </p>

              <div className="footer-social">
                <FaInstagram />
                <FaFacebookF />
                <FaLinkedinIn />
              </div>
            </div>

          </div>

          {/* Bottom */}
          <div className="footer-bottom">
            <p> &copy; {new Date().getFullYear()} EpicAura Event Management. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    );
  };

  export default Footer;
