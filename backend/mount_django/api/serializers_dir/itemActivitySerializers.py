from ..models import ItemActivity
from rest_framework import serializers

class ItemActivitySerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name',read_only = True)
    remarks = serializers.CharField(max_length = 500, allow_blank= True,required = False,default = "")
    class Meta:
        model = ItemActivity
        fields = ["id","product","product_name","type","change","quantity","remarks"]
        read_only_fields = ["id"]
