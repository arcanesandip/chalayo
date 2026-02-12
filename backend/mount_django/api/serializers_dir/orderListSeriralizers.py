from rest_framework import serializers
from ..models import OrderList

class OrderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderList
        fields = ["id","uid","created_by","notes","is_simple_invoice","customer"]
        read_only_fields = ["id","uid","created_by"]