from rest_framework import generics, permissions
from .models import Proposal
from .serializers import ProposalSerializer
from users.permissions import IsFreelancer
from projects.models import Project


# SUBMIT PROPOSAL
class ProposalCreateAPIView(generics.CreateAPIView):
    serializer_class = ProposalSerializer
    permission_classes = [permissions.IsAuthenticated, IsFreelancer]

    def perform_create(self, serializer):
        project_id = self.kwargs.get('project_id')
        project = Project.objects.get(id=project_id)
        serializer.save(
            freelancer=self.request.user,
            project=project
        )


# LIST PROPOSALS FOR A PROJECT (CLIENT VIEW)
class ProjectProposalListAPIView(generics.ListAPIView):
    serializer_class = ProposalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        project_id = self.kwargs.get('project_id')
        return Proposal.objects.filter(project_id=project_id)


# LIST MY PROPOSALS (FREELANCER VIEW)
class MyProposalsAPIView(generics.ListAPIView):
    serializer_class = ProposalSerializer
    permission_classes = [permissions.IsAuthenticated, IsFreelancer]

    def get_queryset(self):
        return Proposal.objects.filter(freelancer=self.request.user)
