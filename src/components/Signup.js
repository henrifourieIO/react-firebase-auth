import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const auth = getAuth();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords don't match");
    } else {
      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((res) => {
          console.log(res);
          sessionStorage.setItem("Auth Token", res._tokenResponse.refreshToken);
          navigate("/");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setError("Email already in use");
          }
          else {
            setError('Failed to create account')
          }
        });
    }
    setLoading(false);
  }

  return (
    <>
      <Card className="p-4">
        <h2 className="text-center mb-4">Sign Up</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required />
          </Form.Group>
          <Form.Group id="password" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required />
          </Form.Group>
          <Form.Group id="password-confirm" className="mt-3">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type="password" ref={passwordConfirmRef} required />
          </Form.Group>
          <Button disabled={loading} className="w-100 mt-4" type="submit">
            Sign Up
          </Button>
        </Form>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
};
