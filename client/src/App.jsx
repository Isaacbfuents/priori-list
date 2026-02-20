import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/Auth/RegisterPage';
import LoginPage from "./pages/Auth/LoginPage";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import VerifyAccount from "./pages/Auth/VerifyAccount";
import Homepage from "./pages/Homepage/Homepage.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/verify-email" element={<VerifyEmail />} />
        <Route path="/auth/verify-account" element={<VerifyAccount />} />
        <Route path="/home" element={<Homepage />} />
      </Routes>
    </Router>
  )  
}

export default App
