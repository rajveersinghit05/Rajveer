from django.db import models
from users.models import User


class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile'
    )

    bio = models.TextField(blank=True)
    skills = models.CharField(
        max_length=255,
        help_text="Comma separated skills (e.g. Django, React, SQL)"
    )

    hourly_rate = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        null=True,
        blank=True
    )

    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"Profile of {self.user.username}"
