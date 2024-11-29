import React from "react";

const ForgotPassword = ({ onBackToLogin }) => {
  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <p>Enter your email to reset your password</p>
      <form>
        <div className="input-container">
          <i className="icon email-icon">&#9993;</i>
          <input type="email" placeholder="Enter email" className="input" />
        </div>
        <button type="submit" className="button">Send</button>
      </form>
      <button className="link-button" onClick={onBackToLogin}>Back to Login</button>
    </div>
  );
};

export default ForgotPassword;
