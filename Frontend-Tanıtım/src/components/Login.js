import React, { useState } from "react";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userId", data.userId);
        if (data.role === "Coordinator") {
          window.location.href = "/coordinatordashboard";
        }
        else if (data.role === "Advisor") {
          window.location.href = "/advisordashboard";
        }
        else if (data.role === "Guide") {
          window.location.href = "/guidedashboard";
        }
        else {
          window.location.href = "/traineedashboard";
        }
      } else if (response.status === 401) {
        const errorData = await response.json();
        setErrorMessage(errorData.errorMessage);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
    }
  };
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/v1/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotPasswordEmail }),
      });

      if (response.ok) {
        alert("Password reset link sent to your email.");
        setIsForgotPassword(false); // Optionally, reset to login view
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.errorMessage);
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
    }
  };
  return (
    <div className="app-container">
      {/* Sağdaki şekiller */}
      <div className="shape-container">
        <div className="shape-inner"></div>
      </div>

      <div className="form-container">
        <div className="tab-container">
          <span className="tab active">Login</span>
          <span className="tab">Sign up</span>
        </div>
        {isForgotPassword ? (
          <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <p className="message">
              Enter the email address associated with your account and we’ll
              send you a link to reset your password.
            </p>
            <form onSubmit={handleForgotPassword}>
              <div className="input-container">
                <i className="icon email-icon">&#9993;</i> {}
                <input
                  type="email"
                  placeholder="Enter email"
                  className="input"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                />
              </div>
              
              <button type="submit" className="button send-button">
              Send
              </button>
            </form>
            <button
              className="link-button"
              onClick={() => setIsForgotPassword(false)}
            >
              Back to Login
            </button>
          </div>
        ) : (
          <div className="login-container">
            <form onSubmit={handleLogin}>
              <div className="input-container">
                <i className="icon email-icon">&#9993;</i>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-container">
                <i className="icon password-icon">&#128274;</i>
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i
                  className={`icon eye-icon ${
                    passwordVisible ? "eye-open" : "eye-closed"
                  }`}
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? "👁" : "🙈"} {}
                </i>
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button type="submit" className="button">
                Login
              </button>
            </form>
            <button
              className="link-button"
              onClick={() => setIsForgotPassword(true)}
            >
              Forgot Password?
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;