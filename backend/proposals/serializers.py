from rest_framework import serializers
from .models import Proposal


class ProposalSerializer(serializers.ModelSerializer):
    project_title = serializers.CharField(
        source='project.title',
        read_only=True
    )
    freelancer_username = serializers.CharField(
        source='freelancer.username',
        read_only=True
    )

    class Meta:
        model = Proposal
        fields = [
            'id',
            'project',
            'project_title',
            'freelancer',
            'freelancer_username',
            'cover_letter',
            'bid_amount',
            'status',
            'created_at',
        ]
        read_only_fields = [
            'freelancer',
            'status',
            'created_at',
        ]
