import React, { useRef, useState } from "react";
import { Card, Form, Button, Modal, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

const UpdateProfile = () => {
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [show, setShow] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    let auth = getAuth();
    setSuccess("Email Changed!");
    setShow(!show);
    setLoading(false);
  };

  return (
    <>
      <Modal show={show} centerd onHide={() => setShow(!show)}>
        <Modal.Header closeButton>
          <h2>Re-Authenticate</h2>
        </Modal.Header>
      </Modal>
      <Card className="p-4">
        <h2 className="text-center mb-3">Update Profile</h2>
        {!success ? (
          <p className="text-center mb-3">
            Please Type in your new email address.
          </p>
        ) : null}
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        {!success ? (
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
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Reset
            </Button>
            <Link to="/login" className="text-center">
              Go Back
            </Link>
          </Form>
        ) : (
          <Link to="/" className="text-center">
            Go Back
          </Link>
        )}
      </Card>
    </>
  );
};

export default UpdateProfile;
