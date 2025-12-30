from rest_framework import serializers
from .models import Proposal


class ProposalSerializer(serializers.ModelSerializer):
    freelancer = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Proposal
        fields = [
            'id',
            'project',        # project ID will be sent from frontend
            'freelancer',     # auto-filled from logged-in user
            'cover_letter',
            'bid_amount',
            'status',
            'created_at',
        ]
        read_only_fields = ['freelancer', 'status', 'created_at']
