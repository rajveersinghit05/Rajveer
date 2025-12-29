from django.urls import path
from .views import UserProfileCreateView, UserProfileDetailView

urlpatterns = [
    path('create/', UserProfileCreateView.as_view(), name='create-profile'),
    path('me/', UserProfileDetailView.as_view(), name='my-profile'),
]
