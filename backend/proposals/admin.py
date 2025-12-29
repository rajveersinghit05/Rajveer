from django.contrib import admin
from .models import Proposal

@admin.register(Proposal)
class ProposalAdmin(admin.ModelAdmin):
    list_display = ('project', 'freelancer', 'proposed_price', 'submitted_at')
    list_filter = ('submitted_at',)
    search_fields = ('project__title', 'freelancer__username')
