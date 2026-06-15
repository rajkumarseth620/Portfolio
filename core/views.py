from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import Skill, Project, ContactMessage

@ensure_csrf_cookie
def index(request):
    skills = Skill.objects.all()
    
    # Group skills by category for rendering in different sections
    skills_by_category = {
        'frontend': skills.filter(category='frontend').order_by('-proficiency'),
        'backend': skills.filter(category='backend').order_by('-proficiency'),
        'database': skills.filter(category='database').order_by('-proficiency'),
        'tools': skills.filter(category='tools').order_by('-proficiency'),
    }
    
    projects = Project.objects.all().order_by('-created_at')
    
    context = {
        'skills_by_category': skills_by_category,
        'projects': projects,
    }
    return render(request, 'index.html', context)

@require_POST
def contact_submit(request):
    name = request.POST.get('name', '').strip()
    email = request.POST.get('email', '').strip()
    subject = request.POST.get('subject', '').strip()
    message = request.POST.get('message', '').strip()
    
    # Simple server-side validation
    if not name or not email or not subject or not message:
        return JsonResponse({
            'success': False, 
            'error': 'All fields are required. Please fill in all fields.'
        }, status=400)
    
    try:
        # Create and save message
        msg = ContactMessage(name=name, email=email, subject=subject, message=message)
        msg.save()
        return JsonResponse({
            'success': True,
            'message': 'Thank you! Your message has been sent successfully.'
        })
    except Exception :
        return JsonResponse({
            'success': False,
            'error': 'Something went wrong while saving your message. Please try again.'
        }, status=500)

