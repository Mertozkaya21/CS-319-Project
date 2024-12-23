import React, { useState } from "react";
import "../styles/Login.css";
import { TextField, Button, IconButton, InputAdornment, Typography, Box, LinearProgress} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff, Key } from "@mui/icons-material";

const Login = () => {
  const [step, setStep] = useState("login"); // 'login', 'forgot', 'reset'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const PasswordStrengthMeter = ({ password }) => {
    const calculateStrength = (password) => {
      let strength = 0;
      const suggestions = [];
  
      if (password.length >= 8) {
        strength += 1;
      } else {
        suggestions.push("At least 8 chars");
      }
  
      if (/[A-Z]/.test(password)) {
        strength += 1;
      } else {
        suggestions.push("Uppercase letter");
      }
  
      if (/[a-z]/.test(password)) {
        strength += 1;
      } else {
        suggestions.push("Lowercase letter");
      }
  
      if (/[0-9]/.test(password)) {
        strength += 1;
      } else {
        suggestions.push("Number");
      }
  
      if (/[@$!%*?&]/.test(password)) {
        strength += 1;
      } else {
        suggestions.push("Special char");
      }
  
      return { strength, suggestions };
    };
  
    const { strength, suggestions } = calculateStrength(password);
  
    const getStrengthLabel = () => {
      switch (strength) {
        case 0: return { label: "Very Weak", color: "error" };
        case 1: return { label: "Weak", color: "error" };
        case 2: return { label: "Fair", color: "warning" };
        case 3: return { label: "Good", color: "info" };
        case 4: return { label: "Strong", color: "success" };
        case 5: return { label: "Very Strong", color: "success" };
        default: return { label: "Weak", color: "error" };
      }
    };
  
    return (
      <>
        {/* Password Strength Label */}
        <Typography variant="caption" style={{ marginTop: "0.5rem", display: "block", textAlign: "right" }}>
          {getStrengthLabel().label}
        </Typography>
  
        {/* Password Strength Bar */}
        <Box sx={{ width: "100%", mt: 0.5 }}>
          <LinearProgress
            variant="determinate"
            value={(strength / 5) * 100}
            color={getStrengthLabel().color}
            style={{ height: "8px", borderRadius: "4px" }}
          />
        </Box>
  
        {/* Compact Suggestions */}
        {suggestions.length > 0 && (
          <Typography variant="caption" style={{ color: "#666", marginTop: "0.5rem", display: "block", textAlign: "center" }}>
            Suggestions: {suggestions.join(" • ")}
          </Typography>
        )}
      </>
    );
  };

  // Handle Login
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
        const roleRoutes = {
          Coordinator: "/coordinatordashboard",
          Advisor: "/advisordashboard",
          Guide: "/guidedashboard",
          Trainee: "/traineedashboard",
        };
        window.location.href = roleRoutes[data.role] || "/";
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.errorMessage || "An unexpected error occurred.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
    }
  };

  // Handle Forgot Password
const handleForgotPassword = async (e) => {
  e.preventDefault();
  setErrorMessage(""); // Clear any previous error messages

  try {
    const response = await fetch("http://localhost:8080/v1/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      // On success, move to the reset screen
      setStep("reset");
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.errorMessage || "Failed to send reset link.");
    }
  } catch (error) {
    setErrorMessage("Network error. Please try again.");
  }
};
const handleResetPassword = async (e) => {
  e.preventDefault();
  setErrorMessage(""); // Clear any previous error messages

  // Validate Reset Code
  if (!resetCode) {
    setErrorMessage("Please enter the reset code.");
    return;
  }

  // Validate Password Strength
  const { strength } = calculatePasswordStrength(newPassword);
  if (strength < 3) {
    setErrorMessage("Password is not strong enough. Please follow the suggestions.");
    return;
  }

  // Validate Password Match
  if (newPassword !== confirmPassword) {
    setErrorMessage("Passwords do not match!");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/v1/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, resetCode, newPassword }),
    });

    if (response.ok) {
      alert("Password reset successfully!");
      setStep("login");
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.errorMessage || "Failed to reset password.");
    }
  } catch (error) {
    setErrorMessage("Network error. Please try again.");
  }
};

// Utility function for strength calculation
const calculatePasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[@$!%*?&]/.test(password)) strength += 1;
  return { strength };
};

  return (
    <div className="app-container">
  {/* Right Shape Container */}
  <div className="shape-container">
    <div className="shape-inner"></div>
  </div>
  
  {/* Left Shape Container */}
  <div className="shape-container-left">
    <div className="shape-inner-left"></div>
  </div>

  {/* Form Container */}
  <div className="form-container">
    
  {step === "login" && (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {/* Email Input */}
        <div className="input-container">
          <TextField
            placeholder="Enter email"
            variant="outlined"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email style={{ color: '#7b2d26' }} />
                </InputAdornment>
              )
            }}
          />
        </div>

        {/* Password Input */}
        <div className="input-container">
          <TextField
            placeholder="Enter password"
            variant="outlined"
            fullWidth
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock style={{ color: '#7b2d26' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <Visibility style={{ color: '#7b2d26' }} />
                    ) : (
                      <VisibilityOff style={{ color: '#7b2d26' }} />
                    )}
                  </span>
                </InputAdornment>
              )
            }}
          />
        </div>

        {/* Error Message */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Submit Button */}
        <Button
          variant="contained"
          type="submit"
          className="button"
          style={{
            backgroundColor: '#7b2d26',
            color: '#fff',
            marginTop: '1rem'
          }}
        >
          Login
        </Button>
      </form>
      <button className="link-button" onClick={() => setStep("forgot")}>Forgot Password?</button>
    </div>
  )}

        {step === "forgot" && (
          <div className="forgot-password-container">
            <h2>Forgot Your Password?</h2>
            <p className="input-description">Enter your email address to receive a code.</p>
            <form onSubmit={handleForgotPassword}>
              <div className="input-container">
                <TextField
                  placeholder="Enter email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email style={{ color: '#7b2d26' }} />
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <Button
                variant="contained"
                type="submit"
                className="button"
                style={{
                  backgroundColor: '#7b2d26',
                  color: '#fff',
                  marginTop: '1rem'
                }}
              >
                Send
              </Button>
            </form>
            <button className="link-button" onClick={() => setStep("login")}>Back to Login</button>
          </div>
        )}
        
        {step === "reset" && (
          <div className="reset-password-container">
            <h2>Change Password</h2>
            <Typography variant="body2" style={{ marginBottom: "1.5rem", color: "#666" }}>
              Enter the code sent to your email and set your new password.
            </Typography>
            <form onSubmit={handleResetPassword}>
              {/* Reset Code */}
              <div className="input-container">
                <TextField
                  label="Enter Code"
                  placeholder="Enter code"
                  variant="outlined"
                  fullWidth
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Key style={{ color: '#7b2d26' }} />
                      </InputAdornment>
                    )
                  }}
                />
              </div>

              {/* New Password */}
              <div className="input-container">
                <TextField
                  label="New Password"
                  placeholder="Enter new password"
                  variant="outlined"
                  fullWidth
                  type={passwordVisible ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock style={{ color: '#7b2d26' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setPasswordVisible(!passwordVisible)} edge="end">
                          {passwordVisible ? (
                            <Visibility style={{ color: '#7b2d26' }} />
                          ) : (
                            <VisibilityOff style={{ color: '#7b2d26' }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                {/* Password Strength Meter */}
                <PasswordStrengthMeter password={newPassword} />
              </div>

              {/* Confirm Password */}
              <div className="input-container">
                <TextField
                  label="Confirm Password"
                  placeholder="Re-enter new password"
                  variant="outlined"
                  fullWidth
                  type={passwordVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock style={{ color: '#7b2d26' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setPasswordVisible(!passwordVisible)} edge="end">
                          {passwordVisible ? (
                            <Visibility style={{ color: '#7b2d26' }} />
                          ) : (
                            <VisibilityOff style={{ color: '#7b2d26' }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </div>

              {/* Error Message */}
              {errorMessage && <p className="error-message">{errorMessage}</p>}

              {/* Submit Button */}
              <Button
                variant="contained"
                type="submit"
                className="button"
                style={{
                  backgroundColor: '#7b2d26',
                  color: '#fff',
                  marginTop: '1rem'
                }}
              >
                Reset Password
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;