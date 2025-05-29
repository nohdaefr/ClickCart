import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // Ensure you have this file

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const navigate = useNavigate();

  const getUsersFromStorage = () => {
    const stored = localStorage.getItem("users");
    return stored ? JSON.parse(stored) : {};
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (username.trim() === "" || password.trim() === "") {
        setError("Username and password are required.");
        setLoading(false);
        return;
      }

      let usersDB = getUsersFromStorage();

      if (!isSignUp) {
        // ✅ Login Logic
        if (usersDB[username] && usersDB[username] === password) {
          setShowWelcomePopup(true);
          setLoading(false);
          setTimeout(() => {
            navigate("/products");
          }, 2000);
        } else {
          setError("Invalid username or password.");
          setLoading(false);
        }
      } else {
        // ✅ Sign Up Logic
        if (usersDB[username]) {
          setError("Username already taken. Try another.");
        } else {
          usersDB[username] = password;
          localStorage.setItem("users", JSON.stringify(usersDB));
          alert("Account created successfully! Now you can log in.");
          setIsSignUp(false);
        }
        setLoading(false);
      }
    }, 1000);
  };

  const closePopup = () => {
    setShowWelcomePopup(false);
  };

return (
  <div className="auth-container">
    {!showWelcomePopup && (
      <div className="auth-form">
        <h2>{isSignUp ? "Sign Up" : "Welcome to ClickCart"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        <p className="toggle">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    )}

    {showWelcomePopup && (
      <div className="welcome-popup">
        <div className="popup-content">
          <div className="smiley">😊</div>
          <h2>Welcome, {username}!</h2>
          <p>You have successfully logged in. Redirecting to the shop...</p>
          <button onClick={closePopup}>Close</button>
        </div>
      </div>
    )}
  </div>
);

}

export default Auth;
