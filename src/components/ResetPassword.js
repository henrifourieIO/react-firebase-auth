import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const emailRef = useRef();
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    let auth = getAuth();
    await sendPasswordResetEmail(auth, emailRef.current.value).then(() => {
      setSuccess('Password Reset email sent, check your email')
    }).catch((error) => {
      console.log(error.code)
    })
    setLoading(false)
  }

  return (
    <>
      <Card className="p-4">
        <h2 className="text-center mb-3">Reset Password</h2>
        {!success ? <p className="text-center mb-3">Please Type in your email to reset your password.</p> : null}
        {success && <Alert variant="success">{success}</Alert>}
        {!success ? <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required />
          </Form.Group>
          <Button disabled={loading} className="w-100 mt-4" type="submit">
            Reset
          </Button>
          <Link to="/login" className="text-center">Go Back</Link>
        </Form> : <Link to="/login" className="text-center">Go Back</Link>}
      </Card>
    </>
  );
};

export default ResetPassword;
