from django.contrib import admin
from .models import Proposal


@admin.register(Proposal)
class ProposalAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'project',
        'freelancer',
        'bid_amount',
        'status',
        'created_at',
    )

    list_filter = ('status', 'created_at')
    search_fields = ('freelancer__email', 'project__title')
    ordering = ('-created_at',)
