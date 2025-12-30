from rest_framework import generics, permissions
from .models import Project
from .serializers import ProjectSerializer


class IsClient(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == "client"


class ProjectListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Project.objects.all()

    def perform_create(self, serializer):
        serializer.save(client=self.request.user)


class ProjectDetailAPIView(generics.RetrieveDestroyAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated, IsClient]

    def get_queryset(self):
        return Project.objects.filter(client=self.request.user)
