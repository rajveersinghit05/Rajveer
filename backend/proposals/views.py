from rest_framework import generics, permissions
from .models import Proposal
from .serializers import ProposalSerializer


class ProposalCreateAPIView(generics.CreateAPIView):
    serializer_class = ProposalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(freelancer=self.request.user)


class MyProposalsAPIView(generics.ListAPIView):
    serializer_class = ProposalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role == "freelancer":
            return Proposal.objects.filter(freelancer=user)

        return Proposal.objects.filter(project__client=user)
