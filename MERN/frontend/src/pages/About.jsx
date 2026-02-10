import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import "../styles/about.css";

const About = () => {
  return (
    <section className="about-page">
      <div className="container">
        {/* Header */}
        <div className="about-header text-center">
          <h1>About EpicAura</h1>
          <p>Where imagination meets flawless execution</p>
        </div>

        {/* Main Content */}
        <div className="row mt-5 g-4">
          {/* Left */}
          <div className="col-lg-6">
            <div className="about-card ">
              <h3>Who We Are</h3>
              <p>
                EpicAura is a full-service event management company specializing
                in weddings, corporate events, private celebrations, and
                large-scale productions.
              </p>
              <p>
                From concept to execution, we curate experiences that reflect
                your vision, style, and purpose — delivering events that are
                seamless, elegant, and unforgettable.
              </p>
              <p>
                At EpicAura, we believe every event tells a story. Our approach
                is rooted in creativity, precision, and personalization.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="col-lg-6">
            <div className="about-card  ">
              <h3>Why Choose EpicAura?</h3>
              <div className="about-benefits">
                <p>
                  <FaCheckCircle /> Tailor-made event planning solutions
                </p>
                <p>
                  <FaCheckCircle /> Experienced & creative professionals
                </p>
                <p>
                  <FaCheckCircle /> Premium decor, styling & production
                </p>
                <p>
                  <FaCheckCircle /> Transparent pricing & clear communication
                </p>
                <p>
                  <FaCheckCircle /> Timely execution with flawless coordination
                </p>
                <p>
                  <FaCheckCircle /> Dedicated on-site support to ensure a stress-free event experience
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="about-card highlight ">
              <h3>Our Vision</h3>
              <p>
                To become a trusted and admired event brand by creating
                innovative, elegant, and meaningful experiences that exceed
                expectations and leave lasting impressions.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="row mt-5 ">
          <div className="col-12 text-center mb-4">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              Passionate professionals behind every successful event
            </p>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="team-card">
              <img src="/Images/founder.jpg" alt="Planner" />
              <h5>Nayan Bhavsar</h5>
              <span>Senior Event Planner</span>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="team-card">
              <img src="/Images/founder.jpg" alt="Founder" />
              <h5>Abhishek Khatri</h5>
              <span>Founder & Creative Director</span>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="team-card">
              <img src="/Images/founder.jpg" alt="Manager" />
              <h5>Kartik Panara</h5>
              <span>Operations Manager</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
