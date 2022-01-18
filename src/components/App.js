import { Container } from "react-bootstrap";
import { useEffect } from 'react';
import { Signup } from "./Signup";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { Login } from "./Login";
import ResetPassword from "./ResetPassword";
import { app } from '../auth/firebase';
import UpdateProfile from "./UpdateProfile";

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      navigate('/')
    }
    if (!authToken) {
      navigate('/login')
    }
  }, [])

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
        </Routes>
      </div>
    </Container>
  );
}

export default App;
