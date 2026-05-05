from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import jwt
import datetime
import os
from database import get_connection
from resume_parser import extract_text_from_pdf, extract_skills
from ai_helper import get_ai_suggestions

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
app.config['SECRET_KEY'] = 'resumeai_secret_2026'

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ✅ Home
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Resume Analyzer API Running!"})

# ✅ Register
@app.route("/register", methods=["POST"])
def register():
    data = request.json
    name = data["name"]
    email = data["email"]
    password = data["password"]
    hashed = bcrypt.generate_password_hash(password).decode("utf-8")
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            (name, email, hashed)
        )
        conn.commit()
        user_id = cursor.execute("SELECT @@IDENTITY").fetchone()[0]
        conn.close()
        token = jwt.encode({
            "user_id": int(user_id),
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=30)
        }, app.config['SECRET_KEY'], algorithm="HS256")
        return jsonify({
            "token": token,
            "user": {"id": int(user_id), "name": name, "email": email}
        })
    except Exception as e:
        return jsonify({"message": "Email already exists!"}), 400

# ✅ Login
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data["email"]
    password = data["password"]
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE email=?", email)
        user = cursor.fetchone()
        conn.close()
        if not user:
            return jsonify({"message": "Email not found!"}), 401
        if not bcrypt.check_password_hash(user[3], password):
            return jsonify({"message": "Wrong password!"}), 401
        token = jwt.encode({
            "user_id": user[0],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=30)
        }, app.config['SECRET_KEY'], algorithm="HS256")
        return jsonify({
            "token": token,
            "user": {"id": user[0], "name": user[1], "email": user[2]}
        })
    except Exception as e:
        return jsonify({"message": str(e)}), 500  
    



# ✅ Google Login
@app.route("/google-login", methods=["POST"])
def google_login():
    data = request.json
    name = data["name"]
    email = data["email"]
    google_id = data["google_id"]
    profile_pic = data["profile_pic"]

    try:
        conn = get_connection()
        cursor = conn.cursor()

        # Check if user exists
        cursor.execute("SELECT * FROM users WHERE email=?", email)
        user = cursor.fetchone()

        if user:
            # User exists — login
            user_id = user[0]
            user_name = user[1]
        else:
            # New user — register
            cursor.execute(
                "INSERT INTO users (name, email, google_id, profile_pic) VALUES (?, ?, ?, ?)",
                (name, email, google_id, profile_pic)
            )
            conn.commit()
            user_id = cursor.execute("SELECT @@IDENTITY").fetchone()[0]
            user_name = name

        conn.close()

        token = jwt.encode({
            "user_id": int(user_id),
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=30)
        }, app.config['SECRET_KEY'], algorithm="HS256")

        return jsonify({
            "token": token,
            "user": {
                "id": int(user_id),
                "name": user_name,
                "email": email,
                "profile_pic": profile_pic
            }
        })

    except Exception as e:
        return jsonify({"message": str(e)}), 500




















# ✅ Upload Resume
@app.route("/upload-resume", methods=["POST"])
def upload_resume():
    file = request.files["resume"]
    name = request.form.get("name")
    email = request.form.get("email")
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)
    resume_text = extract_text_from_pdf(file_path)
    skills = extract_skills(resume_text)
    skills_str = ", ".join(skills)
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO resumes (name, email, resume_text, extracted_skills) VALUES (?, ?, ?, ?)",
        (name, email, resume_text, skills_str)
    )
    conn.commit()
    resume_id = cursor.execute("SELECT @@IDENTITY").fetchone()[0]
    conn.close()
    return jsonify({
        "resume_id": int(resume_id),
        "name": name,
        "email": email,
        "extracted_skills": skills
    })

# ✅ Analyze
@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    resume_id = data["resume_id"]
    job_title = data["job_title"]
    company_name = data["company_name"]
    job_text = data["job_text"]
    job_skills = extract_skills(job_text)
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT extracted_skills FROM resumes WHERE id=?", resume_id)
    row = cursor.fetchone()
    resume_skills = row[0].split(", ") if row else []
    matched = list(set(resume_skills) & set(job_skills))
    missing = list(set(job_skills) - set(resume_skills))
    match_percentage = round((len(matched) / len(job_skills)) * 100, 2) if job_skills else 0
    ai_suggestions = get_ai_suggestions(matched, missing)
    job_skills_str = ", ".join(job_skills)
    cursor.execute(
        "INSERT INTO job_descriptions (job_title, company_name, job_text, required_skills) VALUES (?, ?, ?, ?)",
        (job_title, company_name, job_text, job_skills_str)
    )
    conn.commit()
    job_id = cursor.execute("SELECT @@IDENTITY").fetchone()[0]
    cursor.execute(
        """INSERT INTO match_results 
        (resume_id, job_id, match_percentage, matched_skills, missing_skills, ai_suggestions) 
        VALUES (?, ?, ?, ?, ?, ?)""",
        (resume_id, int(job_id), match_percentage, ", ".join(matched), ", ".join(missing), ai_suggestions)
    )
    conn.commit()
    conn.close()
    return jsonify({
        "match_percentage": match_percentage,
        "matched_skills": matched,
        "missing_skills": missing,
        "ai_suggestions": ai_suggestions
    })

# ✅ AI Features
@app.route("/ai-feature", methods=["POST"])
def ai_feature():
    data = request.json
    feature_type = data["type"]
    matched_skills = data["matched_skills"]
    missing_skills = data["missing_skills"]
    match_percentage = data["match_percentage"]
    lang = data.get("lang", "en")
    lang_note = "Reply in Hindi language." if lang == "hi" else "Reply in English."

    if feature_type == "cover_letter":
        prompt = f"""Write a professional cover letter for a candidate.
        Their matched skills: {', '.join(matched_skills)}
        Match percentage: {match_percentage}%
        Keep it short, 3 paragraphs, professional tone.
        {lang_note}"""
    elif feature_type == "interview":
        prompt = f"""Generate 5 important interview questions for a candidate.
        Their skills: {', '.join(matched_skills)}
        Missing skills: {', '.join(missing_skills)}
        Include both technical and HR questions with short answers.
        {lang_note}"""
    elif feature_type == "roadmap":
        prompt = f"""Create a 3-month career roadmap for a candidate.
        Their current skills: {', '.join(matched_skills)}
        Skills they need to learn: {', '.join(missing_skills)}
        Give week by week plan for 3 months.
        {lang_note}"""
    elif feature_type == "salary":
        prompt = f"""Estimate salary range for a candidate in India.
        Their skills: {', '.join(matched_skills)}
        Match percentage: {match_percentage}%
        Give fresher, mid-level, and senior salary ranges in LPA.
        {lang_note}"""
    else:
        return jsonify({"result": "Invalid feature type"})

    try:
        result = get_ai_suggestions(matched_skills, missing_skills, prompt)
        return jsonify({"result": result})
    except Exception as e:
        return jsonify({"result": f"Error: {str(e)}"})

if __name__ == "__main__":
    app.run(debug=True)