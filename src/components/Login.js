import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    let auth = getAuth();
    setLoading(true)
    await signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    ).then((res) => {
      navigate("/");
      sessionStorage.setItem(
        "Auth Token",
        res._tokenResponse.refreshToken
      );
    }).catch((error) => {
      if(error.code === 'auth/wrong-password') {
        setError('Please check the Password');
      } 
      if(error.code === 'auth/user-not-found') {
        setError('Please check the Email');
      }
      if(error.code === 'auth/too-many-requests') {
        setError('To many tries, please try again in a minute');
      }
      console.log(error.code)
    })
    setLoading(false)
  };

  return (
    <>
      <Card className="p-4">
        <h2 className="text-center mb-4">Log In</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required />
          </Form.Group>
          <Form.Group id="password" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required />
            <Link to='/reset-password'>Forgot Password?</Link>
          </Form.Group>
          <Button disabled={loading} className="w-100 mt-4" type="submit">
            Log In
          </Button>
        </Form>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};
