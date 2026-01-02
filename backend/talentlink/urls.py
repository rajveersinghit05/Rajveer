from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/profiles/', include('profiles.urls')),
    path('api/projects/', include('projects.urls')),
    path('api/proposals/', include('proposals.urls')),
    path('api/contracts/', include('contracts.urls')),
    path('api/chat/', include('chat.urls')),
]
