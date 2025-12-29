from rest_framework import generics, permissions
from .models import Project
from .serializers import ProjectSerializer
from users.permissions import IsClient


# ================================
# LIST ALL PROJECTS (Client + Freelancer)
# CREATE PROJECT (Client only)
# ================================
class ProjectListCreateAPIView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_permissions(self):
        """
        - GET  : Any authenticated user (Client or Freelancer)
        - POST : Only Client
        """
        if self.request.method == "POST":
            return [permissions.IsAuthenticated(), IsClient()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(client=self.request.user)


# ================================
# RETRIEVE / UPDATE / DELETE PROJECT
# Client can manage ONLY their own projects
# ================================
class ProjectDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated, IsClient]

    def get_queryset(self):
        # Client can only access their own projects
        return Project.objects.filter(client=self.request.user)
