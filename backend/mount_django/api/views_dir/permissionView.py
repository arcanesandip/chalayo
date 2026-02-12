from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import Permission

from ..models import CompanyRole
from ..serializers_dir.permissionSerializers import (
    PermissionSerializer,
    CompanyRoleSerializer
)
from ..permission import IsCompanyOwner
class RoleApiView(APIView):
    permission_classes = [IsAuthenticated, IsCompanyOwner]

    def get(self, request):
        company = request.user.owned_company

        roles = CompanyRole.objects.filter(company=company)

        serializer = CompanyRoleSerializer(roles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PermissionApiView(APIView):
    permission_classes = [IsAuthenticated, IsCompanyOwner]

    def get(self, request, group_id):
        company = request.user.owned_company
        role = get_object_or_404(
            CompanyRole,
            id=group_id,
            company=company
        )

        assigned_permission_ids = role.permissions.values_list("id", flat=True)

        all_permissions = Permission.objects.filter(
            content_type__model__in=[
                "customer",
                "expense",
                "product",
                "productcategory",
            ]
        )

        serializer = PermissionSerializer(
            all_permissions,
            many=True,
            context={"assigned_permission_id": assigned_permission_ids}
        )

        return Response(
            {
                "role": role.name,
                "permissions": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    def patch(self, request, group_id):
        company = request.user.owned_company

        role = get_object_or_404(
            CompanyRole,
            id=group_id,
            company=company
        )

        permission_ids = request.data.get("permission_ids", [])

        permissions = Permission.objects.filter(id__in=permission_ids)
        role.permissions.set(permissions)

        all_permissions = Permission.objects.filter(
            content_type__model__in=[
                "customer",
                "expense",
                "product",
                "productcategory",
            ]
        )

        serializer = PermissionSerializer(
            all_permissions,
            many=True,
            context={
                "assigned_permission_id": role.permissions.values_list("id", flat=True)
            }
        )

        return Response(
            {
                "message": "Permissions updated successfully",
                "role": role.name,
                "permissions": serializer.data,
            },
            status=status.HTTP_200_OK,
        )
