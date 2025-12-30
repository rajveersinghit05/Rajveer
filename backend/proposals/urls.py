from django.urls import path
from .views import ProposalCreateAPIView, MyProposalsAPIView

urlpatterns = [
    path("submit/", ProposalCreateAPIView.as_view(), name="submit-proposal"),
    path("my/", MyProposalsAPIView.as_view(), name="my-proposals"),
]
