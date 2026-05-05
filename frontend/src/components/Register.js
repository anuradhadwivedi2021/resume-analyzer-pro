import React, { useState } from "react";
import { auth, googleProvider, signInWithPopup } from "../firebase";

function Register({ onRegister, onGoLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  // Google Register
  const handleGoogleRegister = async () => {
    setGoogleLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const res = await fetch("http://127.0.0.1:5000/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          google_id: user.uid,
          profile_pic: user.photoURL
        }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        onRegister(data.user);
      }
    } catch (err) {
      setError("Google signup failed! " + err.message);
    }
    setGoogleLoading(false);
  };

  // Email Register
  const handleRegister = async () => {
    if (!name || !email || !password || !confirm) {
      setError("Please fill all fields!");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match!");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        onRegister(data.user);
      } else {
        setError(data.message || "Registration failed!");
      }
    } catch (err) {
      setError("Server error! Make sure backend is running.");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div className="card" style={{ maxWidth: "420px", width: "100%" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "8px" }}>🚀</div>
          <h2 style={{ fontSize: "1.8rem" }}>Create Account</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", marginTop: "6px" }}>
            Join ResumeAI Pro — It's Free!
          </p>
        </div>

        {/* Google Register */}
        <button
          onClick={handleGoogleRegister}
          disabled={googleLoading}
          style={{
            width: "100%",
            padding: "14px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "12px",
            color: "white",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            transition: "all 0.3s"
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
        >
          {googleLoading ? (
            <><span className="spinner" /> Signing up...</>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </>
          )}
        </button>

        {/* Divider */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "20px"
        }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem" }}>or</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
        </div>

        <input className="input" type="text" placeholder="Full Name"
          value={name} onChange={(e) => setName(e.target.value)} />
        <input className="input" type="email" placeholder="Email Address"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Password (min 6 characters)"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <input className="input" type="password" placeholder="Confirm Password"
          value={confirm} onChange={(e) => setConfirm(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleRegister()} />

        {error && <p className="error">{error}</p>}

        <button className="btn" onClick={handleRegister} disabled={loading}>
          {loading ? (
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <span className="spinner" /> Creating Account...
            </span>
          ) : "Create Account 🚀"}
        </button>

        <p style={{
          textAlign: "center", marginTop: "20px",
          color: "rgba(255,255,255,0.5)", fontSize: "0.9rem"
        }}>
          Already have an account?{" "}
          <span onClick={onGoLogin}
            style={{ color: "#a78bfa", cursor: "pointer", fontWeight: 600 }}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;