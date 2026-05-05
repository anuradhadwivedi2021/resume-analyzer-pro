import React, { useState } from "react";

function JobInput({ resumeData, onMatchSuccess, lang }) {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobText, setJobText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const text = {
    en: {
      title: "💼 Enter Job Description",
      welcome: "Welcome",
      skills: "Skills Found",
      jobTitle: "Job Title (e.g. Python Developer)",
      company: "Company Name",
      jobDesc: "Paste full job description here...",
      analyze: "Analyze Match 🔍",
      analyzing: "Analyzing with AI...",
      error: "Please fill all fields!",
      failed: "Analysis failed! Make sure backend is running."
    },
    hi: {
      title: "💼 जॉब विवरण दर्ज करें",
      welcome: "स्वागत है",
      skills: "मिली स्किल्स",
      jobTitle: "जॉब टाइटल (जैसे Python Developer)",
      company: "कंपनी का नाम",
      jobDesc: "यहाँ जॉब विवरण पेस्ट करें...",
      analyze: "मैच एनालाइज़ करें 🔍",
      analyzing: "AI से एनालाइज़ हो रहा है...",
      error: "कृपया सभी फ़ील्ड भरें!",
      failed: "एनालिसिस विफल! बैकएंड चालू है?"
    }
  };

  const t = text[lang] || text.en;

  const handleAnalyze = async () => {
    if (!jobTitle || !companyName || !jobText) {
      setError(t.error);
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume_id: resumeData.resume_id,
          job_title: jobTitle,
          company_name: companyName,
          job_text: jobText,
        }),
      });
      const data = await res.json();
      onMatchSuccess(data);
    } catch (err) {
      setError(t.failed);
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <h2>{t.title}</h2>

      {/* Welcome Box */}
      <div className="welcome">
        👋 {t.welcome}, <strong>{resumeData.name}</strong>!
        <br />
        <span style={{ fontSize: "0.85rem", opacity: 0.8 }}>
          {t.skills}: {resumeData.extracted_skills.join(", ")}
        </span>
      </div>

      <input
        className="input"
        type="text"
        placeholder={t.jobTitle}
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder={t.company}
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <textarea
        className="input textarea"
        placeholder={t.jobDesc}
        value={jobText}
        onChange={(e) => setJobText(e.target.value)}
        rows={6}
      />

      {error && <p className="error">{error}</p>}

      <button className="btn" onClick={handleAnalyze} disabled={loading}>
        {loading ? (
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <span className="spinner" /> {t.analyzing}
          </span>
        ) : t.analyze}
      </button>
    </div>
  );
}

export default JobInput;