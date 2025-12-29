from django.db import models
from users.models import User
from projects.models import Project

class Contract(models.Model):
    project = models.OneToOneField(Project, on_delete=models.CASCADE)
    client = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='contracts_as_client'
    )
    freelancer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='contracts_as_freelancer'
    )
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Contract: {self.project.title}"
