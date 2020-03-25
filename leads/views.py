from django.shortcuts import render
from .models import Leads
from .serializers import LeadSerializer
from rest_framework import viewsets, permissions

class LeadViewSet(viewsets.ModelViewSet):    
    permission_class = [permissions.IsAuthenticated,]    
    serializer_class = LeadSerializer

    def get_queryset(self):
        return self.request.user.leads.all()
    
    def perform_create(self,serializer):
        serializer.save(owner=self.request.user)

    