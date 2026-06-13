from django.db import models

class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('database', 'Database'),
        ('tools', 'Tools & Others'),
    ]
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    proficiency = models.IntegerField(help_text="Proficiency percentage (0-100)")
    icon_class = models.CharField(max_length=50, blank=True, help_text="FontAwesome icon class (e.g., 'fab fa-html5')")

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image_url = models.URLField(max_length=500, blank=True, null=True, help_text="Paste an image URL")
    technologies = models.CharField(max_length=250, help_text="Comma-separated technologies (e.g., Django, MySQL, CSS)")
    project_url = models.URLField(max_length=500, blank=True, verbose_name="Live Demo URL")
    github_url = models.URLField(max_length=500, blank=True, verbose_name="GitHub Repository URL")
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def tech_list(self):
        return [tech.strip() for tech in self.technologies.split(',') if tech.strip()]

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} - {self.subject}"

