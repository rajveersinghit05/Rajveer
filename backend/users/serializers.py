from rest_framework import serializers
from .models import User


# --------------------------------------------------
# USER SERIALIZER (USED FOR LOGIN + /me/)
# --------------------------------------------------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "role")


# --------------------------------------------------
# REGISTER SERIALIZER
# --------------------------------------------------
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=6,
        style={"input_type": "password"},
    )

    class Meta:
        model = User
        fields = ("username", "email", "password", "role")

    def validate_role(self, value):
        if value not in ["client", "freelancer"]:
            raise serializers.ValidationError(
                "Role must be either 'client' or 'freelancer'"
            )
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            role=validated_data["role"],
        )
        return user
