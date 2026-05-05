import React, { useState, useEffect } from "react";

function JobAlerts({ skills }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  // Job Database based on skills
  const generateJobs = (skills) => {
    const allJobs = [
      // Python Jobs
      { id: 1, title: "Python Developer", company: "TCS", location: "Pune", type: "Full Time", experience: "Fresher", salary: "4-6 LPA", skills: ["python", "flask", "sql"], match: 0, applyLink: "https://www.naukri.com/python-developer-jobs", logo: "🏢", tag: "🔥 Hot" },
      { id: 2, title: "Python Intern", company: "Infosys", location: "Bangalore", type: "Internship", experience: "Fresher", salary: "15-25k/month", skills: ["python", "machine learning"], match: 0, applyLink: "https://www.internshala.com/internships/python", logo: "💼", tag: "🆕 New" },
      { id: 3, title: "ML Engineer", company: "Wipro", location: "Hyderabad", type: "Full Time", experience: "0-2 years", salary: "6-10 LPA", skills: ["python", "machine learning", "scikit-learn"], match: 0, applyLink: "https://www.naukri.com/machine-learning-jobs", logo: "🤖", tag: "💰 High Pay" },

      // Web Dev Jobs
      { id: 4, title: "React Developer", company: "Accenture", location: "Mumbai", type: "Full Time", experience: "Fresher", salary: "4-7 LPA", skills: ["react", "javascript", "html", "css"], match: 0, applyLink: "https://www.naukri.com/react-developer-jobs", logo: "⚛️", tag: "🔥 Hot" },
      { id: 5, title: "Full Stack Developer", company: "Cognizant", location: "Chennai", type: "Full Time", experience: "0-1 year", salary: "5-8 LPA", skills: ["react", "flask", "python", "sql"], match: 0, applyLink: "https://www.linkedin.com/jobs/full-stack-developer-jobs", logo: "🌐", tag: "⭐ Popular" },
      { id: 6, title: "Frontend Intern", company: "Startup India", location: "Remote", type: "Internship", experience: "Fresher", salary: "10-20k/month", skills: ["html", "css", "javascript", "react"], match: 0, applyLink: "https://www.internshala.com/internships/web-development", logo: "🎨", tag: "🏠 Remote" },

      // Data Jobs
      { id: 7, title: "Data Analyst", company: "HCL", location: "Noida", type: "Full Time", experience: "Fresher", salary: "3-5 LPA", skills: ["python", "sql", "mysql"], match: 0, applyLink: "https://www.naukri.com/data-analyst-jobs", logo: "📊", tag: "🆕 New" },
      { id: 8, title: "Data Science Intern", company: "Analytics Vidhya", location: "Remote", type: "Internship", experience: "Fresher", salary: "8-15k/month", skills: ["python", "machine learning", "pandas"], match: 0, applyLink: "https://www.internshala.com/internships/data-science", logo: "🔬", tag: "🏠 Remote" },

      // Java Jobs
      { id: 9, title: "Java Developer", company: "Tech Mahindra", location: "Pune", type: "Full Time", experience: "Fresher", salary: "3-6 LPA", skills: ["java", "sql"], match: 0, applyLink: "https://www.naukri.com/java-developer-jobs", logo: "☕", tag: "🔥 Hot" },
      { id: 10, title: "Backend Developer", company: "Capgemini", location: "Bangalore", type: "Full Time", experience: "0-2 years", salary: "5-8 LPA", skills: ["java", "python", "sql", "rest api"], match: 0, applyLink: "https://www.linkedin.com/jobs/backend-developer-jobs", logo: "⚙️", tag: "💰 High Pay" },

      // DevOps/Cloud
      { id: 11, title: "Cloud Intern", company: "AWS India", location: "Hyderabad", type: "Internship", experience: "Fresher", salary: "20-30k/month", skills: ["python", "git", "github"], match: 0, applyLink: "https://www.amazon.jobs/en/teams/internships-for-students", logo: "☁️", tag: "⭐ Top Company" },
      { id: 12, title: "DevOps Engineer", company: "IBM", location: "Bangalore", type: "Full Time", experience: "0-2 years", salary: "6-10 LPA", skills: ["python", "git", "github"], match: 0, applyLink: "https://www.naukri.com/devops-jobs", logo: "🔧", tag: "💰 High Pay" },

      // AI/ML
      { id: 13, title: "AI Engineer Intern", company: "Google India", location: "Hyderabad", type: "Internship", experience: "Fresher", salary: "50-80k/month", skills: ["python", "machine learning", "scikit-learn"], match: 0, applyLink: "https://careers.google.com/students/", logo: "🤖", tag: "⭐ Dream Job" },
      { id: 14, title: "NLP Engineer", company: "Microsoft India", location: "Hyderabad", type: "Full Time", experience: "0-2 years", salary: "10-15 LPA", skills: ["python", "machine learning"], match: 0, applyLink: "https://careers.microsoft.com/students/us/en", logo: "🪟", tag: "⭐ Dream Job" },

      // General
      { id: 15, title: "Software Engineer", company: "Zoho", location: "Chennai", type: "Full Time", experience: "Fresher", salary: "4-7 LPA", skills: ["python", "java", "javascript", "sql"], match: 0, applyLink: "https://careers.zohocorp.com/", logo: "💻", tag: "🔥 Hot" },
    ];

    // Calculate match percentage
    const userSkills = skills.map(s => s.toLowerCase());
    return allJobs.map(job => {
      const matched = job.skills.filter(s => userSkills.includes(s)).length;
      const matchPercent = Math.round((matched / job.skills.length) * 100);
      return { ...job, match: matchPercent };
    }).sort((a, b) => b.match - a.match);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const generatedJobs = generateJobs(skills || []);
      setJobs(generatedJobs);
      setLoading(false);
    }, 1500);
  }, [skills]);

  const filteredJobs = jobs.filter(job => {
    if (filter === "all") return true;
    if (filter === "internship") return job.type === "Internship";
    if (filter === "fulltime") return job.type === "Full Time";
    if (filter === "remote") return job.location === "Remote";
    if (filter === "high") return job.match >= 70;
    return true;
  });

  const getMatchColor = (match) => {
    if (match >= 70) return "#34d399";
    if (match >= 40) return "#f59e0b";
    return "#f87171";
  };

  return (
    <div style={{ marginTop: "24px" }}>
      <h3 style={{ color: "white", marginBottom: "8px" }}>
        🔔 Job Alerts — Based on Your Skills
      </h3>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginBottom: "16px" }}>
        {skills?.length} skills detected → {jobs.length} matching jobs found
      </p>

      {/* Filters */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
        {[
          { key: "all", label: "🌐 All Jobs" },
          { key: "high", label: "⭐ Best Match" },
          { key: "internship", label: "🎓 Internship" },
          { key: "fulltime", label: "💼 Full Time" },
          { key: "remote", label: "🏠 Remote" },
        ].map(f => (
          <button key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              padding: "6px 14px",
              borderRadius: "20px",
              border: filter === f.key ? "none" : "1px solid rgba(255,255,255,0.15)",
              background: filter === f.key ? "linear-gradient(135deg, #a78bfa, #60a5fa)" : "rgba(255,255,255,0.05)",
              color: "white",
              cursor: "pointer",
              fontSize: "0.82rem",
              fontWeight: filter === f.key ? "600" : "400"
            }}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: "center", padding: "40px", color: "rgba(255,255,255,0.5)" }}>
          <div className="spinner" style={{ margin: "0 auto 12px" }} />
          🔍 Finding best jobs for your skills...
        </div>
      )}

      {/* Job Cards */}
      {!loading && filteredJobs.map((job, i) => (
        <div key={job.id} style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${job.match >= 70 ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "12px",
          animation: `fadeInUp ${0.2 + i * 0.05}s ease`,
          transition: "all 0.3s"
        }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(167,139,250,0.08)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            e.currentTarget.style.transform = "translateY(0)";
          }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>

            {/* Left Side */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <span style={{ fontSize: "1.5rem" }}>{job.logo}</span>
                <div>
                  <h4 style={{ color: "white", fontWeight: 600, fontSize: "1rem" }}>{job.title}</h4>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
                    {job.company} • {job.location} • {job.experience}
                  </p>
                </div>
                <span style={{
                  background: "rgba(167,139,250,0.2)",
                  color: "#a78bfa",
                  padding: "2px 10px",
                  borderRadius: "10px",
                  fontSize: "0.75rem",
                  fontWeight: 600
                }}>{job.tag}</span>
              </div>

              {/* Skills Tags */}
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "8px" }}>
                {job.skills.map((s, i) => (
                  <span key={i} style={{
                    padding: "3px 10px",
                    borderRadius: "10px",
                    fontSize: "0.75rem",
                    background: skills?.map(sk => sk.toLowerCase()).includes(s)
                      ? "rgba(52,211,153,0.15)"
                      : "rgba(255,255,255,0.06)",
                    color: skills?.map(sk => sk.toLowerCase()).includes(s)
                      ? "#34d399"
                      : "rgba(255,255,255,0.4)",
                    border: `1px solid ${skills?.map(sk => sk.toLowerCase()).includes(s)
                      ? "rgba(52,211,153,0.3)"
                      : "rgba(255,255,255,0.1)"}`
                  }}>{s}</span>
                ))}
              </div>
            </div>

            {/* Right Side */}
            <div style={{ textAlign: "right" }}>
              {/* Match % */}
              <div style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: getMatchColor(job.match),
                marginBottom: "4px"
              }}>{job.match}%</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginBottom: "8px" }}>Match</div>

              {/* Salary */}
              <div style={{
                color: "#fbbf24",
                fontSize: "0.85rem",
                fontWeight: 600,
                marginBottom: "12px"
              }}>💰 {job.salary}</div>

              {/* Apply Button */}
              <a href={job.applyLink} target="_blank" rel="noreferrer"
                style={{
                  display: "inline-block",
                  padding: "8px 20px",
                  background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                  color: "white",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  transition: "all 0.3s"
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                Apply Now →
              </a>
            </div>
          </div>
        </div>
      ))}

      {!loading && filteredJobs.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px", color: "rgba(255,255,255,0.4)" }}>
          No jobs found for this filter 😔
        </div>
      )}
    </div>
  );
}

export default JobAlerts;