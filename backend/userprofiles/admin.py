from django.contrib import admin
from .models import UserProfile

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'hourly_rate', 'availability')
    list_filter = ('availability',)
    search_fields = ('user__username',)
