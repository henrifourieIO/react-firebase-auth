import React, { useRef, useState } from "react";
import { Card, Form, Button, Modal, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
} from "firebase/auth";

const UpdateProfile = () => {
  const emailRef = useRef();
  const credEmailRef = useRef();
  const credPasswordRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [show, setShow] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();

  const handleSubmit = async () => {
    setLoading(true);
    setSuccess("Email Changed!");
    setShow(!show);
    setEmail(emailRef.current.value);
  };

  const handleCredSubmit = async () => {
    let auth = getAuth();
    let user = auth.currentUser;

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        credPasswordRef.current.value
      );
      await reauthenticateWithCredential(user, credential).then((res) => {
        updateEmail(res.user, email).then((res) => {
          console.log("updateEmail");
          console.log(res);
        }).catch((error) => {
          console.log("updateEmailError");
          console.log(error.message);
        })
      });
    } catch (error) {
      console.log(error.message);
    }
    setShow(false);
    setLoading(false);
  };

  return (
    <>
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
              <Form.Label>New Email</Form.Label>
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

      {/* Re-Login Modal */}
      <Modal show={show} centered onHide={() => setShow(!show)}>
        <Modal.Header closeButton>
          <h2 className={"text-center"}>Re-Authenticate</h2>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleCredSubmit();
            }}
          >
            <Form.Group id="credEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={credEmailRef} required />
            </Form.Group>
            <Form.Group id="credPassword">
              <Form.Label>Email</Form.Label>
              <Form.Control type="password" ref={credPasswordRef} required />
            </Form.Group>
            <Button className="w-100 mt-4" type="submit">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateProfile;
