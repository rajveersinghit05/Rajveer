from rest_framework import serializers
from .models import Contract


class ContractSerializer(serializers.ModelSerializer):
    project = serializers.StringRelatedField(read_only=True)
    client = serializers.StringRelatedField(read_only=True)
    freelancer = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Contract
        fields = (
            'id',
            'project',
            'client',
            'freelancer',
            'start_date',
            'end_date',
            'is_active',
        )
