import { Container } from "react-bootstrap";
import { Signup } from "./Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './Dashboard';
import { Login } from './Login';
import ResetPassword from './ResetPassword';
import RequireAuth from "./RequireAuth";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <Routes>
            <Route exact path="/" element={
              <RequireAuth redirectTo={'/signup'}>
                <Dashboard />
              </RequireAuth>
            } />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </Router>
      </div>
    </Container>
  );
}

export default App;
