from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..serializers_dir.userSerializers import UserSerializer
from django.db import transaction


class UserRegisterApiView(APIView):

    @transaction.atomic
    def post(self, request):
        try:
            data = request.data.copy()
            
            serializer = UserSerializer(data=data)
            if serializer.is_valid():
                user = serializer.save()
                return Response({
                    "success": True,
                    "user": UserSerializer(user).data
                }, status=status.HTTP_201_CREATED)
            else:
                return Response({
                    "success": False,
                    "error": serializer.errors
                }, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            
            return Response({
                "success": False,
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)