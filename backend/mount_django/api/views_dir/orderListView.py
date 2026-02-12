from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework import status
from ..serializers_dir.orderListSeriralizers import OrderListSerializer
from ..models import OrderList
from rest_framework.permissions import IsAuthenticated

class OrderListApiView(APIView):
    def __get__company(self):
        return self.request.user.owned_company or self.request.user.active_company

    def get(self,request):
        company = self.__get__company()
        if not company:
            raise ValidationError({"company": "User has no owned_company or active_company!"})
        
        try:
            orderLists = OrderList.objects.filter(company=company)
            if not orderLists.exists():
                return Response({"bills": [], "message": "No bills found!"}, status=status.HTTP_200_OK)
            serializer = OrderListSerializer(orderLists, many=True)
            return Response({"bills": serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            # Catch any other unexpected errors
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self,request):
        company = self.__get__company()
        if not company:
            raise ValidationError({"company": "User has no owned_company or active_company!"})
        
        try:
            serializer = OrderListSerializer(data = request.data)
            if serializer.is_valid():
                serializer.save(company=company)
                return Response({"bill":serializer.data}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            # Catch any unexpected errors
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def patch(self,request,pk):
        company = self.__get__company()
        if not company:
            raise ValidationError({"company": "User has no owned_company or active_company!"})
        try:
            orderList = OrderList.objects.get(id = pk,company = company)
            serializer = OrderListSerializer(orderList,data = request.data,partial = True)
            if serializer.is_valid():
                serializer.save()
                return Response({"bill":serializer.data}, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except OrderList.DoesNotExist:
            # Product not found for the given company and pk
            return Response({"message": "No such bill found"}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            # Catch any unexpected errors
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete(self,request,pk):
        company = self.__get__company()
        if not company:
            raise ValidationError({"company": "User has no owned_company or active_company!"})
        try:
            orderList = OrderList.objects.get(id = pk)
            orderList.delete()
            return Response({"message":"Bill deleted successfully!!"})

        except OrderList.DoesNotExist:
            # Product not found for the given company and pk
            return Response({"message": "No such bill found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            # Catch any unexpected errors
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   