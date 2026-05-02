# DevSupport 🎙️🧠

**DevSupport** is an AI-powered post-event intelligence and learning platform. 

Instead of letting valuable tech talks, workshops, and conference sessions gather dust on YouTube, DevSupport transforms event recordings into highly structured, actionable, and personalized learning experiences for attendees. For organizers, it provides deep analytics into audience engagement and speaker effectiveness.

---

## ✨ Features

### For Organizers (Intelligence Dashboard)
- **AI-Assisted Event Creation**: Paste an event link to automatically extract event titles, descriptions, dates, and locations.
- **Smart Audio Processing**: Upload raw talk audio files to automatically transcribe and process them using AI.
- **Talk Effectiveness Analytics**: AI evaluates the talk and generates specific scores for **Clarity**, **Depth**, and **Actionability**, along with concise performance insights.
- **Speaker Insights**: Automatically extracts speaker strengths (e.g., Theory vs. Practical), audience fit, and top topics covered.
- **Audience Tracking**: Global analytics tracking how many attendees watched sessions and what difficulty modes they preferred.
- **Post-Event PDF Reports**: Instantly generate and export a beautifully formatted Executive Summary PDF containing all AI insights for stakeholders.

### For Attendees (Learning Portal)
- **Strict Structured Learning Modes**: Transforms the raw transcript into three tailored learning tracks:
  - 🟢 **Beginner**: Simple explanations, real-life analogies, and basic tasks.
  - 🔵 **Intermediate**: Best practices, code patterns, and common mistakes.
  - 🔴 **Advanced**: Trade-offs, scaling concerns, and system design thinking.
- **"What You Can Build" Project Generator**: Replaces passive summaries with actionable coding exercises inspired directly by the talk.
- **Pre-requisites & Interview Prep**: Automatically extracts the prior knowledge required to understand the talk, and generates mock technical interview questions based on the content.
- **Event Discovery**: A built-in search bar to quickly find relevant events and talks.

---

## 🛠️ Technologies Used

### Frontend (Web & Mobile Ready)
- **Framework**: [Expo](https://expo.dev/) (React Native) with Expo Router for file-based routing.
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS) featuring a strict, modern Grey/Black/White monochrome aesthetic.
- **Utilities**: `expo-print` & `expo-sharing` for generating and sharing PDF reports.

### Backend (REST API)
- **Framework**: [Django](https://www.djangoproject.com/) & Django REST Framework (DRF).
- **Database**: [MongoDB](https://www.mongodb.com/) (connected via `PyMongo` to handle flexible, unstructured AI JSON data).
- **AI Services**:
  - **OpenAI (Whisper)**: For highly accurate audio-to-text transcription.
  - **Google Gemini (1.5 Flash)**: For advanced natural language processing, JSON extraction, and generating the intelligent dashboard data.

---

## 🚀 How to Run the Application Locally

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- MongoDB (running locally on port 27017 or a MongoDB Atlas URI)
- API Keys for Google Gemini and OpenAI

### 1. Backend Setup

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\Activate.ps1
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install the required Python dependencies:
   ```bash
   pip install django djangorestframework pymongo openai google-generativeai python-dotenv django-cors-headers
   ```
4. Create a `.env` file in the `backend/` directory and add your API keys:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   MONGO_URI=mongodb://localhost:27017/
   MONGO_DB_NAME=devsupport
   ```
   *(Note: If you leave the keys blank, the app will safely fallback to using mock data so you can still test the UI!)*
5. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

### 2. Frontend Setup

1. Open a **new** terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install the Node dependencies (use `--legacy-peer-deps` to avoid React 19 / Expo version conflicts):
   ```bash
   npm install --legacy-peer-deps
   ```
3. Start the Expo development server:
   ```bash
   npx expo start --web
   ```
4. The application will open in your default web browser (usually at `http://localhost:8081`).

---

## 🎨 Theme Architecture
The application forces a strict monochrome color palette to convey a premium, analytical feel. The UI avoids primary colors, relying entirely on Tailwind's `zinc`, `black`, and `white` utility classes to differentiate hierarchy and state.
