from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Proposal
from .serializers import ProposalSerializer
from .permissions import IsFreelancer
from projects.models import Project
from contracts.models import Contract


# -------------------------------------------------
# Freelancer submits a proposal
# -------------------------------------------------
class ProposalCreateView(generics.CreateAPIView):
    serializer_class = ProposalSerializer
    permission_classes = [IsAuthenticated, IsFreelancer]

    def perform_create(self, serializer):
        serializer.save(freelancer=self.request.user)


# -------------------------------------------------
# Freelancer views ONLY their own proposals
# -------------------------------------------------
class MyProposalsView(generics.ListAPIView):
    serializer_class = ProposalSerializer
    permission_classes = [IsAuthenticated, IsFreelancer]

    def get_queryset(self):
        return Proposal.objects.filter(
            freelancer=self.request.user
        ).order_by("-created_at")


# -------------------------------------------------
# Client views proposals for THEIR OWN project
# -------------------------------------------------
class ProjectProposalsView(generics.ListAPIView):
    serializer_class = ProposalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        project_id = self.kwargs.get("project_id")

        # Ensure project exists
        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            raise PermissionDenied("Project not found.")

        # Only project owner can view proposals
        if project.client != self.request.user:
            raise PermissionDenied(
                "You do not have permission to view proposals for this project."
            )

        return Proposal.objects.filter(
            project=project
        ).order_by("-created_at")


# -------------------------------------------------
# Client ACCEPT / REJECT proposal
# -------------------------------------------------
class ProposalDecisionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, proposal_id):
        # Ensure proposal exists
        try:
            proposal = Proposal.objects.select_related(
                "project", "freelancer"
            ).get(id=proposal_id)
        except Proposal.DoesNotExist:
            return Response(
                {"detail": "Proposal not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        project = proposal.project

        # Only project owner can decide
        if project.client != request.user:
            return Response(
                {"detail": "You are not allowed to perform this action"},
                status=status.HTTP_403_FORBIDDEN
            )

        # Prevent double processing
        if proposal.status != "pending":
            return Response(
                {"detail": "This proposal is already processed"},
                status=status.HTTP_400_BAD_REQUEST
            )

        action = request.data.get("action")

        # ---------------- ACCEPT ----------------
        if action == "accept":
            proposal.status = "accepted"
            proposal.save()

            # Reject all other proposals
            Proposal.objects.filter(
                project=project
            ).exclude(id=proposal.id).update(status="rejected")

            # Create contract (single source of truth)
            Contract.objects.create(
                project=project,
                proposal=proposal,
                client=project.client,
                freelancer=proposal.freelancer
            )

            return Response(
                {
                    "detail": "Proposal accepted and contract created",
                    "contract_created": True
                },
                status=status.HTTP_200_OK
            )

        # ---------------- REJECT ----------------
        if action == "reject":
            proposal.status = "rejected"
            proposal.save()

            return Response(
                {"detail": "Proposal rejected"},
                status=status.HTTP_200_OK
            )

        # ---------------- INVALID ----------------
        return Response(
            {"detail": "Invalid action. Use 'accept' or 'reject'"},
            status=status.HTTP_400_BAD_REQUEST
        )
