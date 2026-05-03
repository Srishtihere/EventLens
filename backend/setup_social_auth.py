import os
import django
from dotenv import load_dotenv

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'devsupport.settings')
django.setup()

from django.contrib.sites.models import Site
from allauth.socialaccount.models import SocialApp

def setup_social_auth():
    load_dotenv()
    
    # Ensure Site is set correctly
    site, created = Site.objects.get_or_create(id=1, defaults={'domain': 'localhost:8081', 'name': 'EventLens'})
    if not created:
        site.domain = 'localhost:8081'
        site.name = 'EventLens'
        site.save()
    
    # Google
    google_id = os.getenv('GOOGLE_CLIENT_ID')
    google_secret = os.getenv('GOOGLE_SECRET')
    if google_id and google_secret:
        app, created = SocialApp.objects.get_or_create(
            provider='google',
            defaults={'name': 'Google', 'client_id': google_id, 'secret': google_secret}
        )
        if not created:
            app.client_id = google_id
            app.secret = google_secret
            app.save()
        app.sites.add(site)
        print("✅ Google Social Auth Configured")
    else:
        print("⏭️ Skipping Google (No keys in .env)")

    # GitHub
    github_id = os.getenv('GITHUB_CLIENT_ID')
    github_secret = os.getenv('GITHUB_SECRET')
    if github_id and github_secret:
        app, created = SocialApp.objects.get_or_create(
            provider='github',
            defaults={'name': 'GitHub', 'client_id': github_id, 'secret': github_secret}
        )
        if not created:
            app.client_id = github_id
            app.secret = github_secret
            app.save()
        app.sites.add(site)
        print("✅ GitHub Social Auth Configured")
    else:
        print("⏭️ Skipping GitHub (No keys in .env)")

if __name__ == "__main__":
    setup_social_auth()
