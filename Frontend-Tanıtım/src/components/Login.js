import React, { useState } from "react";
import "../styles/Login.css";

const Login = () => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

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
            <form>
              <div className="input-container">
                <i className="icon email-icon">&#9993;</i> {}
                <input
                  type="email"
                  placeholder="Enter email"
                  className="input"
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
            <form>
              <div className="input-container">
                <i className="icon email-icon">&#9993;</i>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="input"
                />
              </div>
              <div className="input-container">
                <i className="icon password-icon">&#128274;</i>
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter password"
                  className="input"
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