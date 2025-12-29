from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    client = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Project
        fields = (
            'id',
            'client',
            'title',
            'description',
            'budget',
            'created_at',
        )
