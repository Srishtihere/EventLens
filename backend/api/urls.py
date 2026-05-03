from django.urls import path
from . import views
from . import auth_views

urlpatterns = [
    path('events/', views.events_list, name='events_list'),
    path('events/parse-link/', views.parse_event_link, name='parse_event_link'),
    path('events/<str:event_id>/talks/', views.event_talks, name='event_talks'),
    path('events/<str:event_id>/report/', views.event_report, name='event_report'),
    path('talks/', views.upload_talk, name='upload_talk'),
    path('talks/<str:talk_id>/', views.get_talk, name='get_talk'),
    path('talks/<str:talk_id>/view/', views.record_talk_view, name='record_talk_view'),
    path('auth/google/', auth_views.GoogleLogin.as_view(), name='google_login'),
    path('auth/github/', auth_views.GitHubLogin.as_view(), name='github_login'),
    path('user/profile/', views.user_profile, name='user_profile'),
]
