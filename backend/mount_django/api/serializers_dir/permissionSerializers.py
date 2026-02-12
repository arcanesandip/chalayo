from rest_framework import serializers
from django.contrib.auth.models import Permission
from ..models import CompanyRole

class CompanyRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyRole
        fields = ["id","name"]

class PermissionSerializer(serializers.ModelSerializer):
    checked = serializers.SerializerMethodField()
    class Meta:
        model = Permission
        fields = ["id","codename","name","checked"]
        read_only_fields = ["codename","name"]


    def get_checked(self,obj):
        assigned_ids = self.context.get('assigned_permission_id',[])
        return obj.id in assigned_ids
