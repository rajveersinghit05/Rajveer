from django.urls import path
from .views import (
    ProposalCreateView,
    MyProposalsView,
    ProjectProposalsView,
    ProposalDecisionView,
)

urlpatterns = [
    path('create/', ProposalCreateView.as_view()),
    path('my/', MyProposalsView.as_view()),
    path('project/<int:project_id>/', ProjectProposalsView.as_view()),
    path('decision/<int:proposal_id>/', ProposalDecisionView.as_view()),
]
