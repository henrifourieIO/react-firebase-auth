import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Dashboard = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  var auth = getAuth();

  async function handleLogout() {
    setError("");

    signOut(auth);
    sessionStorage.removeItem("Auth Token");
    navigate("/login");
    console.log("logged out");
  }

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (auth.currentUser === null) {
      navigate("/login");
    }
    if (authToken) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [auth.currentUser, navigate]);

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <p>
            <strong>Email: </strong>
            {auth.currentUser ? auth.currentUser.email : "none"}
          </p>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
