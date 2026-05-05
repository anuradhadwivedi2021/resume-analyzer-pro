
import React, { useState } from "react";
import JobAlerts from "./JobAlerts";

function MatchResult({ matchData, onReset, lang }) {
  const { match_percentage, matched_skills, missing_skills, ai_suggestions } = matchData;
  const [activeTab, setActiveTab] = useState("result");
  const [coverLetter, setCoverLetter] = useState("");
  const [questions, setQuestions] = useState("");
  const [roadmap, setRoadmap] = useState("");
  const [salary, setSalary] = useState("");
  const [loading, setLoading] = useState("");

  const getColor = (p) => p >= 70 ? "#34d399" : p >= 40 ? "#f59e0b" : "#f87171";
  const getMessage = (p) => p >= 70 ? "🎉 Great Match! Apply Now!" : p >= 40 ? "💪 Good Match! Keep Improving!" : "📚 Keep Learning!";

  const callAI = async (type) => {
    setLoading(type);
    try {
      const res = await fetch("http://127.0.0.1:5000/ai-feature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          matched_skills,
          missing_skills,
          match_percentage,
          lang
        }),
      });
      const data = await res.json();
      if (type === "cover_letter") setCoverLetter(data.result);
      if (type === "interview") setQuestions(data.result);
      if (type === "roadmap") setRoadmap(data.result);
      if (type === "salary") setSalary(data.result);
    } catch (err) {
      console.error(err);
    }
    setLoading("");
  };

  return (
    <div className="card">

      {/* SVG Illustration */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <svg viewBox="0 0 300 160" style={{ width: "100%", maxWidth: "300px" }}>
          <circle cx="150" cy="80" r="70" fill="rgba(167,139,250,0.08)" />
          <circle cx="150" cy="80" r="50" fill="rgba(96,165,250,0.08)" />
          <circle cx="150" cy="50" r="20" fill="#a78bfa" />
          <ellipse cx="150" cy="95" rx="30" ry="24" fill="#7c3aed" />
          <rect x="182" y="45" width="52" height="65" rx="6" fill="white" opacity="0.9" />
          <rect x="189" y="55" width="32" height="3" rx="2" fill="#a78bfa" />
          <rect x="189" y="63" width="25" height="2" rx="1" fill="#cbd5e1" />
          <rect x="189" y="69" width="28" height="2" rx="1" fill="#cbd5e1" />
          <rect x="189" y="75" width="22" height="2" rx="1" fill="#cbd5e1" />
          <rect x="189" y="85" width="32" height="8" rx="4" fill="#34d399" opacity="0.8" />
          {match_percentage >= 70 && (
            <>
              <circle cx="215" cy="38" r="12" fill="#34d399" />
              <polyline points="209,38 213,43 222,33" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </>
          )}
          <text x="75" y="35" fontSize="14" opacity="0.6">⭐</text>
          <text x="235" y="130" fontSize="12" opacity="0.5">✨</text>
          <text x="65" y="120" fontSize="11" opacity="0.4">🌟</text>
        </svg>
      </div>

      <h2 style={{ textAlign: "center" }}>📊 Your Match Result</h2>

      {/* Score */}
      <div className="score-container">
        <div className="score" style={{ color: getColor(match_percentage) }}>
          {match_percentage}% Match
        </div>
        <p className="score-label">{getMessage(match_percentage)}</p>
        <div className="score-bar">
          <div className="score-bar-fill" style={{ width: `${match_percentage}%` }} />
        </div>
      </div>

      <div className="divider" />

      {/* Feature Tabs */}
      <div className="tabs">
        <button className={`tab ${activeTab === "result" ? "active" : ""}`} onClick={() => setActiveTab("result")}>📊 Result</button>
        <button className={`tab ${activeTab === "cover" ? "active" : ""}`} onClick={() => { setActiveTab("cover"); if (!coverLetter) callAI("cover_letter"); }}>📝 Cover Letter</button>
        <button className={`tab ${activeTab === "interview" ? "active" : ""}`} onClick={() => { setActiveTab("interview"); if (!questions) callAI("interview"); }}>🎯 Interview</button>
        <button className={`tab ${activeTab === "roadmap" ? "active" : ""}`} onClick={() => { setActiveTab("roadmap"); if (!roadmap) callAI("roadmap"); }}>📈 Roadmap</button>
        <button className={`tab ${activeTab === "salary" ? "active" : ""}`} onClick={() => { setActiveTab("salary"); if (!salary) callAI("salary"); }}>💰 Salary</button>
      </div>

      {/* Result Tab */}
      {activeTab === "result" && (
        <>
          <div className="skills-section">
            <h3>✅ Matched Skills ({matched_skills.length})</h3>
            <div className="skills-box">
              {matched_skills.length > 0
                ? matched_skills.map((s, i) => <span key={i} className="skill-tag matched">{s}</span>)
                : <p style={{ color: "rgba(255,255,255,0.4)" }}>No matched skills</p>}
            </div>
          </div>
          <div className="skills-section">
            <h3>❌ Missing Skills ({missing_skills.length})</h3>
            <div className="skills-box">
              {missing_skills.length > 0
                ? missing_skills.map((s, i) => <span key={i} className="skill-tag missing">{s}</span>)
                : <p style={{ color: "#34d399" }}>No missing skills! 🎉</p>}
            </div>
          </div>
          <div className="suggestions">
            <h3>🤖 AI Suggestions</h3>
            <p>{ai_suggestions}</p>
          </div>
        </>
      )}

      {/* Cover Letter Tab */}
      {activeTab === "cover" && (
        <div className="suggestions">
          <h3>📝 Cover Letter</h3>
          {loading === "cover_letter" ? (
            <div className="loading"><span className="spinner" /> Generating cover letter...</div>
          ) : (
            <p>{coverLetter}</p>
          )}
        </div>
      )}

      {/* Interview Tab */}
      {activeTab === "interview" && (
        <div className="suggestions">
          <h3>🎯 Interview Questions</h3>
          {loading === "interview" ? (
            <div className="loading"><span className="spinner" /> Generating questions...</div>
          ) : (
            <p>{questions}</p>
          )}
        </div>
      )}

      {/* Roadmap Tab */}
      {activeTab === "roadmap" && (
        <div className="suggestions">
          <h3>📈 Career Roadmap</h3>
          {loading === "roadmap" ? (
            <div className="loading"><span className="spinner" /> Building your roadmap...</div>
          ) : (
            <p>{roadmap}</p>
          )}
        </div>
      )}

      {/* Salary Tab */}
      {activeTab === "salary" && (
        <div className="suggestions">
          <h3>💰 Salary Estimate</h3>
          {loading === "salary" ? (
            <div className="loading"><span className="spinner" /> Calculating salary...</div>
          ) : (
            <p>{salary}</p>
          )}
        </div>
      )}


      {/* Job Alerts Tab */}
{activeTab === "jobs" && (
  <JobAlerts skills={matched_skills} />
)}

      <div className="divider" />
      <button className="btn" onClick={onReset}>🔄 Analyze Another Resume</button>


      <button className={`tab ${activeTab === "jobs" ? "active" : ""}`}
  onClick={() => setActiveTab("jobs")}>
  🔔 Job Alerts
</button>

    </div>
  );
}

export default MatchResult;