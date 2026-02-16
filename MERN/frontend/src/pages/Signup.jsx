import React, { use } from "react";
import { Container, Form, Button, Nav } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import "../styles/login.css";
import Api from "../layout/Api";

const Signup = () => {
  const { register, handleSubmit, reset } = useForm();
const navigate = useNavigate()
  const onSubmit = async (data) => {
    try {
      const res = await Api.post("/api/user/signup", data);

      if (res.data.success) {
        alert(res.data.message);
        reset();
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <section className="login-page">
      <Container>
        <div className="login-card">

          {/* LEFT PANEL */}
          <div className="login-image">
            <div className="image-overlay">
              <h2>EpicAura Event Management</h2>
              <p>Start planning premium events with us</p>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="login-form-wrapper">
            <div className="login-panel">
              <h3>Create Account</h3>
              <p>Join us to manage your events</p>

              <Form onSubmit={handleSubmit(onSubmit)}>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    {...register("name", { required: true })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    {...register("email", { required: true })}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                </Form.Group>

                <Button className="btn book-btn w-100" type="submit">
                  Register
                </Button>
              </Form>

              <span className="switch-text mt-3">
                Already have an account? <a href="/login" className="text-decoration-none text-primary">Login</a>
              </span>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default Signup;
