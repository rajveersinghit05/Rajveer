from django.db import models
from users.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    hourly_rate = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    availability = models.BooleanField(default=True)

    def __str__(self):
        return f"Profile: {self.user.username}"
