import os
import google.generativeai as genai
from openai import OpenAI
from django.conf import settings

# Load API keys (will be mocked if not present)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

openai_client = OpenAI(api_key=OPENAI_API_KEY) if OPENAI_API_KEY else None

def transcribe_audio(file_path):
    if not openai_client:
        return "This is a mock transcript because OPENAI_API_KEY is not set. The talk covered React best practices, managing state, and avoiding unnecessary re-renders. It was very informative."
    
    with open(file_path, "rb") as audio_file:
        transcript = openai_client.audio.transcriptions.create(
            model="whisper-1",
            file=audio_file
        )
    return transcript.text

def generate_learning_modes(transcript):
    if not GEMINI_API_KEY:
        return {
            "beginner": "React is a library for building UI. (Simple analogy: it's like Lego blocks). Basic Task: Create a Hello World component.",
            "intermediate": "Best practice: Use Context API for global state but avoid it for high-frequency updates. Common mistake: Prop drilling. Code pattern: Custom hooks.",
            "advanced": "Trade-off: Context vs Redux. Scaling concern: Context causes full re-renders. System design: Implement a custom reconciler."
        }
    
    model = genai.GenerativeModel('gemini-1.5-flash')
    prompt = f"""
    Based on the following talk transcript, generate 3 personalized learning summaries strictly adhering to these constraints:
    1. Beginner: Simple explanation, Real-life analogies, Basic tasks.
    2. Intermediate: Best practices, Code patterns, Common mistakes.
    3. Advanced: Trade-offs, Scaling concerns, System design.
    
    Return ONLY a valid JSON object with keys 'beginner', 'intermediate', and 'advanced' containing the strings formatted properly.
    Transcript: {transcript}
    """
    response = model.generate_content(prompt)
    try:
        import json
        text = response.text.replace('```json', '').replace('```', '').strip()
        return json.loads(text)
    except:
        return {"error": "Failed to parse JSON response"}

def generate_projects(transcript):
    if not GEMINI_API_KEY:
        return ["Build a mini React performance dashboard", "Implement caching system using this concept"]
        
    model = genai.GenerativeModel('gemini-1.5-flash')
    prompt = f"""
    Based on the following transcript, generate 2-3 practical project ideas.
    Instead of summarizing what they learned, focus on "Here's what you can BUILD now".
    For example: "Build a mini React performance dashboard" or "Implement a caching system".
    Return ONLY a valid JSON array of strings.
    Transcript: {transcript}
    """
    response = model.generate_content(prompt)
    try:
        import json
        text = response.text.replace('```json', '').replace('```', '').strip()
        return json.loads(text)
    except:
        return ["Failed to parse projects"]

def generate_prereqs_and_interview(transcript):
    if not GEMINI_API_KEY:
        return {
            "prerequisites": ["Basic JavaScript", "React Fundamentals"],
            "interview_questions": ["How does React handle state updates?", "Explain the Virtual DOM."]
        }
        
    model = genai.GenerativeModel('gemini-1.5-flash')
    prompt = f"""
    Based on the following transcript, generate:
    1. A short list of prerequisites an attendee should know to understand this talk.
    2. 2-3 interview questions that test the knowledge presented in the talk.
    
    Return ONLY a valid JSON object with keys 'prerequisites' (array of strings) and 'interview_questions' (array of strings).
    Transcript: {transcript}
    """
    response = model.generate_content(prompt)
    try:
        import json
        text = response.text.replace('```json', '').replace('```', '').strip()
        return json.loads(text)
    except:
        return {"error": "Failed to parse JSON response"}

def analyze_talk_effectiveness(transcript):
    if not GEMINI_API_KEY:
        return {
            "effectiveness": {
                "clarity_score": 85,
                "depth_score": 75,
                "actionability_score": 90,
                "overall_score": 83,
                "insight_string": "Talk was beginner-friendly but lacked practical depth"
            },
            "speaker_insights": {
                "top_topics": ["React Context", "State Management"],
                "audience_suitability": "Beginner/Intermediate",
                "strength": "Theoretical Clarity"
            },
            "auto_feedback": [
                "Users found the analogies very helpful.",
                "More practical examples would have been beneficial.",
                "Strong conceptual clarity but slightly low engagement."
            ]
        }
        
    model = genai.GenerativeModel('gemini-1.5-flash')
    prompt = f"""
    Analyze the following talk transcript and provide analytics for the organizer to help them understand the event's true impact.
    Provide a JSON object with the following exact structure:
    {{
      "effectiveness": {{
        "clarity_score": (0-100),
        "depth_score": (0-100),
        "actionability_score": (0-100),
        "overall_score": (0-100),
        "insight_string": "A concise 1-sentence insight (e.g., 'Talk was beginner-friendly but lacked practical depth')"
      }},
      "speaker_insights": {{
        "top_topics": ["Topic 1", "Topic 2"],
        "audience_suitability": "Beginner / Intermediate / Advanced",
        "strength": "Theory vs Practical"
      }},
      "auto_feedback": [
        "A generated feedback string as if written by a user",
        "Another feedback string highlighting areas of improvement"
      ]
    }}
    
    Return ONLY a valid JSON object.
    Transcript: {transcript}
    """
    response = model.generate_content(prompt)
    try:
        import json
        text = response.text.replace('```json', '').replace('```', '').strip()
        return json.loads(text)
    except:
        return {"error": "Failed to parse JSON response"}

def generate_event_report(talks_data):
    if not GEMINI_API_KEY:
        return {
            "summary": "This event was a great success with a focus on modern web development.",
            "key_themes": ["React Architecture", "State Management", "Performance Optimization"],
            "top_speakers": ["Jane Doe (Highest Clarity)", "John Smith (Most Practical)"],
            "improvement_suggestions": "Future events should include more advanced, hands-on workshops."
        }
        
    model = genai.GenerativeModel('gemini-1.5-flash')
    prompt = f"""
    You are an expert event analyst. Based on the following data from all talks at a developer event, generate a comprehensive post-event report.
    
    Talk Data:
    {talks_data}
    
    Provide a JSON object with:
    - summary: A cohesive paragraph summarizing the event.
    - key_themes: An array of 3-5 strings representing the main themes.
    - top_speakers: An array of strings highlighting speaker successes.
    - improvement_suggestions: A paragraph with constructive feedback for organizers.
    
    Return ONLY a valid JSON object.
    """
    response = model.generate_content(prompt)
    try:
        import json
        text = response.text.replace('```json', '').replace('```', '').strip()
        return json.loads(text)
    except:
        return {"error": "Failed to parse JSON response"}
