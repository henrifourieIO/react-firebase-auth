import React, { useRef, useState } from "react";
import { resetPassword } from "../auth/resetPassword";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { changeEmail } from "../auth/changeEmail";

const ResetPassword = () => {
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      setError("");
      await changeEmail(emailRef.current.value)
    } catch {
      setError("Failed to change email");
    }

    setLoading(false);
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group id="email">
          <Form.Label>New Email: </Form.Label>
          <Form.Control type="email" ref={emailRef} required />
        </Form.Group>
        <Button disabled={loading} className="w-100 mt-4" type="submit">
          Change Email
        </Button>
      </Form>

      <Button variant="link" onClick={() => resetPassword()}>
        Reset Password
      </Button>
    </>
  );
};

export default ResetPassword;
