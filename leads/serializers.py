from rest_framework import serializers
from .models import Leads

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leads
        fields = ('id', 'first_name','last_name', 'email',
         'contacted','notes', 'created_at','updated_at')