import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import UploadResume from "./components/UploadResume";
import JobInput from "./components/JobInput";
import MatchResult from "./components/MatchResult";
import "./App.css";

function App() {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setPage("app");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setPage("landing");
    setResumeData(null);
    setMatchData(null);
  };

  const currentStep = !resumeData ? 1 : !matchData ? 2 : 3;

  const text = {
    en: { title: "🎯 ResumeAI Pro", subtitle: "Upload your resume & find your job match!" },
    hi: { title: "🎯 रिज्यूमे AI प्रो", subtitle: "अपना रिज्यूमे अपलोड करें और जॉब मैच खोजें!" }
  };

  const t = text[lang];

  // Pages
  if (page === "landing") return <LandingPage onGetStarted={() => setPage(user ? "app" : "login")} />;
  if (page === "login") return <Login onLogin={handleLogin} onGoRegister={() => setPage("register")} />;
  if (page === "register") return <Register onRegister={handleLogin} onGoLogin={() => setPage("login")} />;

  return (
    <div className="app">
      <header className="header">

        {/* Back Button */}
        <button onClick={() => setPage("landing")} style={{
          position: "absolute", left: "20px", top: "20px",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "white", padding: "8px 16px",
          borderRadius: "8px", cursor: "pointer", fontSize: "0.85rem"
        }}>← Home</button>

        {/* User Info + Logout */}
        {user && (
          <div style={{
            position: "absolute", right: "20px", top: "20px",
            display: "flex", alignItems: "center", gap: "10px"
          }}>
            <div style={{
              background: "rgba(167,139,250,0.2)",
              border: "1px solid rgba(167,139,250,0.3)",
              borderRadius: "20px", padding: "6px 14px",
              color: "#a78bfa", fontSize: "0.85rem", fontWeight: 600
            }}>
              👤 {user.name}
            </div>
            <button onClick={handleLogout} style={{
              background: "rgba(248,113,113,0.15)",
              border: "1px solid rgba(248,113,113,0.3)",
              color: "#f87171", padding: "6px 14px",
              borderRadius: "20px", cursor: "pointer",
              fontSize: "0.85rem", fontWeight: 600
            }}>Logout</button>
          </div>
        )}

        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>

        {/* Language Toggle */}
        <div className="lang-toggle">
          <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>🇬🇧 English</button>
          <button className={`lang-btn ${lang === "hi" ? "active" : ""}`} onClick={() => setLang("hi")}>🇮🇳 हिंदी</button>
        </div>

        {/* Progress Steps */}
        <div className="steps">
          <div className={`step ${currentStep >= 1 ? "active" : ""} ${currentStep > 1 ? "done" : ""}`}>
            <div className="step-circle">{currentStep > 1 ? "✓" : "1"}</div>
            <div className="step-line" />
          </div>
          <div className={`step ${currentStep >= 2 ? "active" : ""} ${currentStep > 2 ? "done" : ""}`}>
            <div className="step-circle">{currentStep > 2 ? "✓" : "2"}</div>
            <div className="step-line" />
          </div>
          <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
            <div className="step-circle">3</div>
          </div>
        </div>
      </header>

      <div className="container">
        {!resumeData ? (
          <UploadResume onUploadSuccess={setResumeData} lang={lang} />
        ) : !matchData ? (
          <JobInput resumeData={resumeData} onMatchSuccess={setMatchData} lang={lang} />
        ) : (
          <MatchResult matchData={matchData} onReset={() => {
            setResumeData(null);
            setMatchData(null);
          }} lang={lang} />
        )}
      </div>
    </div>
  );
}

export default App;