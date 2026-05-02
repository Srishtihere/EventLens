from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from bson import ObjectId
import os
import uuid

from .db import get_db
from .ai_services import (
    transcribe_audio, 
    generate_learning_modes, 
    generate_projects, 
    analyze_talk_effectiveness,
    generate_event_report
)

db = get_db()

@api_view(['POST'])
def parse_event_link(request):
    """AI-assisted form fill for event link (mocked for MVP)"""
    url = request.data.get('url')
    if not url:
        return Response({"error": "URL is required"}, status=400)
    
    # Mock AI link parsing to pre-fill event form
    return Response({
        "title": "Extracted Event Title from Link",
        "description": "This is an extracted description of the event. Please review and edit.",
        "date": "2026-05-15",
        "location": "San Francisco, CA"
    })

@api_view(['GET', 'POST'])
def events_list(request):
    if request.method == 'GET':
        events = list(db.events.find())
        for e in events:
            e['_id'] = str(e['_id'])
        return Response(events)
    
    elif request.method == 'POST':
        data = request.data
        new_event = {
            "title": data.get("title", "Untitled Event"),
            "description": data.get("description", ""),
            "date": data.get("date", ""),
            "location": data.get("location", "")
        }
        result = db.events.insert_one(new_event)
        new_event['_id'] = str(result.inserted_id)
        return Response(new_event, status=201)

@api_view(['GET'])
def event_talks(request, event_id):
    talks = list(db.talks.find({"event_id": event_id}))
    for t in talks:
        t['_id'] = str(t['_id'])
    return Response(talks)

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def upload_talk(request):
    event_id = request.data.get('event_id')
    title = request.data.get('title')
    speaker = request.data.get('speaker')
    audio_file = request.FILES.get('audio')
    
    if not audio_file or not event_id:
        return Response({"error": "event_id and audio file are required"}, status=400)
    
    # Save audio temporarily
    file_name = f"{uuid.uuid4()}_{audio_file.name}"
    file_path = default_storage.save(f"uploads/{file_name}", ContentFile(audio_file.read()))
    full_path = os.path.join(default_storage.location, file_path)
    
    # Step 1: Transcribe
    transcript = transcribe_audio(full_path)
    
    # Step 2: AI Generations
    learning_modes = generate_learning_modes(transcript)
    projects = generate_projects(transcript)
    analytics = analyze_talk_effectiveness(transcript)
    
    from .ai_services import generate_prereqs_and_interview
    prereq_data = generate_prereqs_and_interview(transcript)
    
    # Optional: cleanup file if we don't want to keep it long term
    # os.remove(full_path)
    
    new_talk = {
        "event_id": event_id,
        "title": title,
        "speaker": speaker,
        "audio_path": file_path,
        "transcript": transcript,
        "learning_modes": learning_modes,
        "projects": projects,
        "analytics": analytics,
        "prerequisites": prereq_data.get("prerequisites", []),
        "interview_questions": prereq_data.get("interview_questions", [])
    }
    
    result = db.talks.insert_one(new_talk)
    new_talk['_id'] = str(result.inserted_id)
    return Response(new_talk, status=201)

@api_view(['GET'])
def get_talk(request, talk_id):
    try:
        talk = db.talks.find_one({"_id": ObjectId(talk_id)})
        if talk:
            talk['_id'] = str(talk['_id'])
            return Response(talk)
        return Response({"error": "Talk not found"}, status=404)
    except:
        return Response({"error": "Invalid talk ID"}, status=400)

@api_view(['POST'])
def record_talk_view(request, talk_id):
    try:
        db.talks.update_one({"_id": ObjectId(talk_id)}, {"$inc": {"views": 1}})
        return Response({"status": "View recorded"})
    except:
        return Response({"error": "Invalid talk ID"}, status=400)

@api_view(['GET'])
def event_report(request, event_id):
    talks = list(db.talks.find({"event_id": event_id}))
    if not talks:
        return Response({"error": "No talks found for this event to generate a report"}, status=404)
    
    # Extract concise data for LLM processing to avoid huge token usage
    talks_data = []
    for t in talks:
        analytics = t.get('analytics', {})
        talks_data.append({
            "title": t.get("title"),
            "speaker": t.get("speaker"),
            "effectiveness": analytics.get("effectiveness", {}),
            "speaker_insights": analytics.get("speaker_insights", {}),
            "auto_feedback": analytics.get("auto_feedback", [])
        })
        
    import json
    report_ai = generate_event_report(json.dumps(talks_data))
    
    report = {
        "event_id": event_id,
        "report_data": report_ai
    }
    return Response(report)
