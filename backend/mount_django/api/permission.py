from rest_framework.permissions import BasePermission

class IsCompanyOwner(BasePermission):
    def has_permission(self, request, view):
        # check user is authenticated and has a real owned company
        return request.user.is_authenticated and getattr(request.user, "owned_company", None) is not None
