import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "../styles/login.css";

const login = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <section className="login-page">
      <Container>
        <div className={`login-card ${isRegister ? "active" : ""}`}>

          {/* IMAGE PANEL */}
          <div className="login-image">
            <div className="image-overlay">
              <h2>EpicAura Event Management</h2>
              <p>Crafting unforgettable event experiences</p>
            </div>
          </div>

          {/* FORM WRAPPER */}
          <div className="login-form-wrapper">

            {/* LOGIN */}
            <div className="login-panel login-panel">
              <h3>Welcome Back</h3>
              <p>Login to manage your events</p>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Control type="email" placeholder="Email Address" />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button className="login-btn">Login</Button>
              </Form>

              <p className="switch-text">
                New user?{" "}
                <span onClick={() => setIsRegister(true)}>Create Account</span>
              </p>
            </div>

            {/* REGISTER */}
            <div className="login-panel register-panel">
              <h3>Create Account</h3>
              <p>Start planning premium events with us</p>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Full Name" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control type="email" placeholder="Email Address" />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button className="login-btn">Register</Button>
              </Form>

              <p className="switch-text">
                Already have an account?{" "}
                <span onClick={() => setIsRegister(false)}>Login</span>
              </p>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
};

export default login;
