from rest_framework import serializers
from .models import Proposal


class ProposalSerializer(serializers.ModelSerializer):
    freelancer = serializers.StringRelatedField(read_only=True)
    project = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Proposal
        fields = (
            'id',
            'project',
            'freelancer',
            'cover_letter',
            'proposed_price',
            'submitted_at',
        )
