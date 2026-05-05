import React from "react";

function LandingPage({ onGetStarted }) {
  const features = [
    { icon: "📄", title: "Resume Parser", desc: "Upload PDF/DOCX and extract skills automatically" },
    { icon: "🎯", title: "ATS Score", desc: "Check how well your resume passes ATS systems" },
    { icon: "💼", title: "Job Matching", desc: "Match your resume with job descriptions instantly" },
    { icon: "🤖", title: "AI Suggestions", desc: "Get AI-powered tips to improve your resume" },
    { icon: "📝", title: "Cover Letter", desc: "Generate professional cover letters with AI" },
    { icon: "🎯", title: "Interview Prep", desc: "Practice with AI-generated interview questions" },
    { icon: "📈", title: "Career Roadmap", desc: "Get personalized career growth plan" },
    { icon: "💰", title: "Salary Estimator", desc: "Know your market value based on skills" },
  ];

  const steps = [
    { num: "01", title: "Upload Resume", desc: "Upload your PDF resume in seconds" },
    { num: "02", title: "Paste Job Description", desc: "Add the job you want to apply for" },
    { num: "03", title: "Get AI Analysis", desc: "Receive detailed insights and suggestions" },
    { num: "04", title: "Apply with Confidence", desc: "Land your dream job!" },
  ];

  const stats = [
    { num: "95%", label: "ATS Pass Rate" },
    { num: "3x", label: "More Interviews" },
    { num: "10K+", label: "Students Helped" },
    { num: "500+", label: "Companies" },
  ];

  return (
    <div style={{ minHeight: "100vh" }}>

      {/* Navbar */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        position: "sticky",
        top: 0,
        backdropFilter: "blur(20px)",
        zIndex: 100,
        background: "rgba(15,12,41,0.8)"
      }}>
        <div style={{
          fontSize: "1.4rem",
          fontWeight: 800,
          background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          🎯 ResumeAI Pro
        </div>
        <button className="btn" style={{ width: "auto", padding: "10px 24px" }}
          onClick={onGetStarted}>
          Get Started Free →
        </button>
      </nav>

      {/* Hero Section */}
      <div style={{
        textAlign: "center",
        padding: "80px 20px 60px",
        maxWidth: "800px",
        margin: "0 auto",
        animation: "fadeInDown 0.8s ease"
      }}>
        <div style={{
          display: "inline-block",
          background: "rgba(167,139,250,0.15)",
          border: "1px solid rgba(167,139,250,0.3)",
          borderRadius: "20px",
          padding: "6px 16px",
          fontSize: "0.85rem",
          color: "#a78bfa",
          marginBottom: "24px"
        }}>
          🚀 AI-Powered Resume Analysis Platform
        </div>

        <h1 style={{
          fontSize: "3.5rem",
          fontWeight: 800,
          lineHeight: 1.2,
          marginBottom: "20px",
          background: "linear-gradient(135deg, #fff, #a78bfa, #60a5fa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Land Your Dream Job with AI-Powered Resume Analysis
        </h1>

        <p style={{
          fontSize: "1.2rem",
          color: "rgba(255,255,255,0.6)",
          marginBottom: "36px",
          lineHeight: 1.7
        }}>
          Get instant feedback on your resume, match with job descriptions,
          generate cover letters, and prepare for interviews — all powered by AI!
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn" style={{ width: "auto", padding: "16px 36px", fontSize: "1.1rem" }}
            onClick={onGetStarted}>
            🚀 Analyze My Resume Free
          </button>
          <button className="btn btn-secondary" style={{ width: "auto", padding: "16px 28px" }}>
            ▶️ Watch Demo
          </button>
        </div>

        {/* Hero Image */}
        <div style={{
          marginTop: "50px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "20px",
          padding: "30px",
          animation: "fadeInUp 1s ease"
        }}>
          <svg viewBox="0 0 600 300" style={{ width: "100%" }}>
            {/* Dashboard mockup */}
            <rect x="20" y="20" width="560" height="260" rx="12" fill="rgba(167,139,250,0.05)" stroke="rgba(167,139,250,0.2)" strokeWidth="1" />

            {/* Sidebar */}
            <rect x="20" y="20" width="120" height="260" rx="12" fill="rgba(167,139,250,0.08)" />
            <circle cx="80" cy="55" r="18" fill="#a78bfa" opacity="0.8" />
            <rect x="45" y="85" width="70" height="6" rx="3" fill="rgba(255,255,255,0.2)" />
            <rect x="45" y="105" width="70" height="6" rx="3" fill="rgba(255,255,255,0.1)" />
            <rect x="45" y="125" width="70" height="6" rx="3" fill="rgba(255,255,255,0.1)" />
            <rect x="45" y="145" width="70" height="6" rx="3" fill="rgba(255,255,255,0.1)" />

            {/* Main Content */}
            {/* Score Circle */}
            <circle cx="220" cy="100" r="50" fill="none" stroke="rgba(167,139,250,0.2)" strokeWidth="8" />
            <circle cx="220" cy="100" r="50" fill="none" stroke="#a78bfa" strokeWidth="8"
              strokeDasharray="220" strokeDashoffset="55" strokeLinecap="round" />
            <text x="220" y="95" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">85%</text>
            <text x="220" y="112" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)">ATS Score</text>

            {/* Skills */}
            <rect x="290" y="40" width="80" height="20" rx="10" fill="rgba(52,211,153,0.2)" />
            <text x="330" y="54" textAnchor="middle" fontSize="9" fill="#34d399">Python ✓</text>
            <rect x="380" y="40" width="80" height="20" rx="10" fill="rgba(52,211,153,0.2)" />
            <text x="420" y="54" textAnchor="middle" fontSize="9" fill="#34d399">React ✓</text>
            <rect x="290" y="68" width="80" height="20" rx="10" fill="rgba(248,113,113,0.2)" />
            <text x="330" y="82" textAnchor="middle" fontSize="9" fill="#f87171">Docker ✗</text>
            <rect x="380" y="68" width="80" height="20" rx="10" fill="rgba(52,211,153,0.2)" />
            <text x="420" y="82" textAnchor="middle" fontSize="9" fill="#34d399">Flask ✓</text>

            {/* AI Suggestion Box */}
            <rect x="290" y="100" width="270" height="60" rx="8" fill="rgba(167,139,250,0.1)" stroke="rgba(167,139,250,0.2)" strokeWidth="1" />
            <text x="305" y="118" fontSize="9" fill="#a78bfa">🤖 AI Suggestion</text>
            <rect x="305" y="125" width="200" height="5" rx="2" fill="rgba(255,255,255,0.15)" />
            <rect x="305" y="135" width="160" height="5" rx="2" fill="rgba(255,255,255,0.1)" />
            <rect x="305" y="145" width="180" height="5" rx="2" fill="rgba(255,255,255,0.1)" />

            {/* Bottom Stats */}
            <rect x="160" y="175" width="100" height="50" rx="8" fill="rgba(96,165,250,0.1)" />
            <text x="210" y="198" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#60a5fa">92%</text>
            <text x="210" y="214" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.4)">Job Match</text>

            <rect x="270" y="175" width="100" height="50" rx="8" fill="rgba(52,211,153,0.1)" />
            <text x="320" y="198" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#34d399">8 LPA</text>
            <text x="320" y="214" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.4)">Est. Salary</text>

            <rect x="380" y="175" width="100" height="50" rx="8" fill="rgba(251,191,36,0.1)" />
            <text x="430" y="198" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fbbf24">15</text>
            <text x="430" y="214" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.4)">Interview Qs</text>
          </svg>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "40px",
        flexWrap: "wrap",
        padding: "40px 20px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "2.2rem",
              fontWeight: 800,
              background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>{s.num}</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ padding: "60px 20px", maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: 700,
          marginBottom: "12px",
          color: "white"
        }}>Everything You Need to Get Hired</h2>
        <p style={{
          textAlign: "center",
          color: "rgba(255,255,255,0.5)",
          marginBottom: "40px"
        }}>Powerful AI tools designed for students and freshers</p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px"
        }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "24px",
              transition: "all 0.3s",
              cursor: "pointer",
              animation: `fadeInUp ${0.3 + i * 0.1}s ease`
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(167,139,250,0.1)";
                e.currentTarget.style.borderColor = "rgba(167,139,250,0.3)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.transform = "translateY(0)";
              }}>
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{f.icon}</div>
              <h3 style={{ fontWeight: 600, marginBottom: "8px", color: "white" }}>{f.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div style={{
        padding: "60px 20px",
        background: "rgba(255,255,255,0.02)",
        borderTop: "1px solid rgba(255,255,255,0.06)"
      }}>
        <h2 style={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: 700,
          marginBottom: "40px",
          color: "white"
        }}>How It Works</h2>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          maxWidth: "800px",
          margin: "0 auto"
        }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              textAlign: "center",
              flex: "1",
              minWidth: "160px",
              padding: "20px"
            }}>
              <div style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                fontSize: "1.2rem",
                fontWeight: 800
              }}>{s.num}</div>
              <h3 style={{ fontWeight: 600, marginBottom: "8px", color: "white" }}>{s.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{
        textAlign: "center",
        padding: "80px 20px",
        background: "linear-gradient(135deg, rgba(167,139,250,0.1), rgba(96,165,250,0.1))",
        borderTop: "1px solid rgba(255,255,255,0.06)"
      }}>
        <h2 style={{
          fontSize: "2.5rem",
          fontWeight: 800,
          color: "white",
          marginBottom: "16px"
        }}>Ready to Land Your Dream Job? 🚀</h2>
        <p style={{
          color: "rgba(255,255,255,0.6)",
          marginBottom: "32px",
          fontSize: "1.1rem"
        }}>Join thousands of students who got hired using ResumeAI Pro</p>
        <button className="btn" style={{
          width: "auto",
          padding: "18px 48px",
          fontSize: "1.1rem"
        }} onClick={onGetStarted}>
          🎯 Start Free Analysis Now
        </button>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center",
        padding: "24px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        color: "rgba(255,255,255,0.3)",
        fontSize: "0.85rem"
      }}>
        © 2026 ResumeAI Pro — Built with ❤️ for Students & Freshers
      </div>

    </div>
  );
}

export default LandingPage;