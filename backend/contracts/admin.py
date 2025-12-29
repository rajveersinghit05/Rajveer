from django.contrib import admin
from .models import Contract

@admin.register(Contract)
class ContractAdmin(admin.ModelAdmin):
    list_display = ('project', 'client', 'freelancer', 'start_date', 'is_active')
    list_filter = ('is_active', 'start_date')
    search_fields = ('project__title', 'client__username', 'freelancer__username')
