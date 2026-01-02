from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    client_username = serializers.CharField(
        source='client.username',
        read_only=True
    )

    class Meta:
        model = Project
        fields = [
            'id',
            'client',
            'client_username',
            'title',
            'description',
            'budget',
            'duration',
            'required_skills',
            'created_at',
        ]
        read_only_fields = ['client', 'created_at']
