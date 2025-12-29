from django.urls import path
from .views import (
    ProposalCreateAPIView,
    ProjectProposalListAPIView,
    MyProposalsAPIView
)

urlpatterns = [
    path('submit/<int:project_id>/', ProposalCreateAPIView.as_view(), name='submit-proposal'),
    path('project/<int:project_id>/', ProjectProposalListAPIView.as_view(), name='project-proposals'),
    path('my/', MyProposalsAPIView.as_view(), name='my-proposals'),
]
