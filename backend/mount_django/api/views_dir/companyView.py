from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from ..models import Company,User
from ..serializers_dir.companySerializers import CompanySerializer
from django.db import transaction

class CompanyApiView(APIView):

    @transaction.atomic
    def post(self, request, id):
        try:
            if id:
                data = request.data.copy()
                user = User.objects.get(id=id)
                
                data["owner"] = id

                serializer = CompanySerializer(data=data)
                if serializer.is_valid():
                    company = serializer.save()
                    user.owned_company = company
                    user.save()
                    return Response({
                        "success": True,
                        "company": CompanySerializer(company).data
                    }, status=status.HTTP_201_CREATED)
                else:
                    return Response({
                        "success": False,
                        "message": serializer.errors  # better to send actual errors
                    }, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({
                    "success": False,
                    "message": "User ID not provided"
                }, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({
                "success": False,
                "message": "User not found"
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                "success": False,
                "message": str(e) 
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
