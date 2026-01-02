from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Project
from .serializers import ProjectSerializer
from .permissions import IsClient


class ProjectListCreateView(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        # Only clients can create projects
        if self.request.method == "POST":
            return [IsClient()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(client=self.request.user)

    def get_queryset(self):
        user = self.request.user

        # 🔐 ROLE-BASED BASE QUERYSET
        if user.role == "client":
            queryset = Project.objects.filter(client=user)
        else:
            queryset = Project.objects.all()

        queryset = queryset.order_by("-created_at")

        # 🔍 QUERY PARAM FILTERS
        skill = self.request.query_params.get("skill")
        min_budget = self.request.query_params.get("min_budget")
        max_budget = self.request.query_params.get("max_budget")

        if skill:
            queryset = queryset.filter(required_skills__icontains=skill)

        if min_budget:
            try:
                queryset = queryset.filter(budget__gte=float(min_budget))
            except ValueError:
                pass

        if max_budget:
            try:
                queryset = queryset.filter(budget__lte=float(max_budget))
            except ValueError:
                pass

        return queryset


class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # Client can access only their projects
        if user.role == "client":
            return Project.objects.filter(client=user)

        # Freelancer can view all
        return Project.objects.all()

    def perform_update(self, serializer):
        serializer.save(client=self.request.user)

    def perform_destroy(self, instance):
        instance.delete()
