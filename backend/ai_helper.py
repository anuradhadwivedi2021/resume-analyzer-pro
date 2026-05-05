import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def get_ai_suggestions(matched_skills, missing_skills, custom_prompt=None):
    if custom_prompt:
        prompt = custom_prompt
    else:
        prompt = f"""
        Skills: {', '.join(matched_skills)}
        Missing: {', '.join(missing_skills)}
        Give 5 short practical suggestions to improve resume.
        """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=800
    )
    return response.choices[0].message.content