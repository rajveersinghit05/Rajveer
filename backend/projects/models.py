from django.db import models
from users.models import User


class Project(models.Model):
    client = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='projects'
    )

    title = models.CharField(max_length=200)
    description = models.TextField()

    budget = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    duration = models.CharField(
        max_length=100,
        help_text="e.g. 1 week, 1 month"
    )

    required_skills = models.CharField(
        max_length=255,
        help_text="Comma separated skills"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
