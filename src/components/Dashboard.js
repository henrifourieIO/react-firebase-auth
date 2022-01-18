import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { auth, user } from "../auth/firebase";
import { Link, useNavigate } from "react-router-dom";
import { logout } from '../auth/logout';
import ResetPassword from "./ResetPassword";


const Dashboard = () => {
  const [error, setError] = useState("");
    const navigate = useNavigate()

  async function handleLogout() {
    setError('')
    try {
        await logout()
        navigate('/login')
    }
    catch {
        setError('Failed to logout')
    }

    console.log('logged out')
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <p>
            <strong>Email: </strong>
            {user ? user.email : null}
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
      <ResetPassword />
    </>
  );
};

export default Dashboard;
