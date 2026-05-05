import React, { useState } from "react";

function UploadResume({ onUploadSuccess, lang }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const text = {
    en: {
      title: "📄 Upload Your Resume",
      name: "Your Full Name",
      email: "Your Email Address",
      upload: "Upload Resume ➡️",
      uploading: "Uploading...",
      error: "Please fill all fields!",
      failed: "Upload failed! Make sure backend is running."
    },
    hi: {
      title: "📄 अपना रिज्यूमे अपलोड करें",
      name: "आपका पूरा नाम",
      email: "आपका ईमेल",
      upload: "रिज्यूमे अपलोड करें ➡️",
      uploading: "अपलोड हो रहा है...",
      error: "कृपया सभी फ़ील्ड भरें!",
      failed: "अपलोड विफल! बैकएंड चालू है?"
    }
  };

  const t = text[lang] || text.en;

  const handleUpload = async () => {
    if (!name || !email || !file) {
      setError(t.error);
      return;
    }
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("resume", file);

    try {
      const res = await fetch("http://127.0.0.1:5000/upload-resume", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      onUploadSuccess(data);
    } catch (err) {
      setError(t.failed);
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <h2>{t.title}</h2>

      {/* Name Input */}
      <input
        className="input"
        type="text"
        placeholder={t.name}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Email Input */}
      <input
        className="input"
        type="email"
        placeholder={t.email}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* File Input */}
      <input
        className="input"
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {/* File Selected Info */}
      {file && (
        <p style={{
          color: "#34d399",
          fontSize: "0.85rem",
          marginBottom: "12px"
        }}>
          ✅ {file.name} selected
        </p>
      )}

      {error && <p className="error">{error}</p>}

      <button className="btn" onClick={handleUpload} disabled={loading}>
        {loading ? (
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <span className="spinner" /> {t.uploading}
          </span>
        ) : t.upload}
      </button>
    </div>
  );
}

export default UploadResume;