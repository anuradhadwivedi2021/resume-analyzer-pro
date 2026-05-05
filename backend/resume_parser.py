import fitz  # pymupdf

def extract_text_from_pdf(file_path):
    text = ""
    doc = fitz.open(file_path)
    for page in doc:
        text += page.get_text()
    return text

def extract_skills(text):
    skills_list = [
        "python", "flask", "javascript", "react", "html", "css",
        "sql", "mysql", "mongodb", "node.js", "java", "c++",
        "machine learning", "deep learning", "pandas", "numpy",
        "scikit-learn", "git", "github", "docker", "aws",
        "rest api", "bootstrap", "typescript", "express"
    ]
    text_lower = text.lower()
    found_skills = [skill for skill in skills_list if skill in text_lower]
    return found_skills