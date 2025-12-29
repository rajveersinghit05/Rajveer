from django.contrib import admin
from .models import Review

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('project', 'reviewer', 'rating')
    list_filter = ('rating',)
    search_fields = ('project__title', 'reviewer__username')
