from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework import status
from ..serializers_dir.itemActivitySerializers import ItemActivitySerializer
from ..models import ItemActivity,Company
from rest_framework.permissions import IsAuthenticated
from ..services_dir.product_stock_service import StockService
from decimal import Decimal
from django.shortcuts import get_object_or_404


class ItemActivityApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request,pk=None):
       
        if pk:
            item_activity = ItemActivity.objects.filter(id = pk)
            serializer = ItemActivitySerializer(item_activity)
        else:
            item_activity = ItemActivity.objects.all()
            serializer = ItemActivitySerializer(item_activity,many = True)

        return Response({"item_activity":serializer.data})
    
    def patch(self, request, pk):
        item_activity = get_object_or_404(ItemActivity, id=pk)
        serializer = ItemActivitySerializer(
            item_activity,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)

        change = int(serializer.validated_data.get('change'))

        if change is None:
            raise ValidationError({"error": "stock_quantity is required"})
        print(item_activity)

        updated_activity = StockService.update_activity(item_activity, change)

        response_serializer = ItemActivitySerializer(updated_activity)
        return Response(response_serializer.data, status=status.HTTP_200_OK)

