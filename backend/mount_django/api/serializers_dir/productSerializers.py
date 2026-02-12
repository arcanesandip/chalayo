from ..models import Product
from rest_framework import serializers

class ProductSerializer(serializers.ModelSerializer):
    low_stock = serializers.IntegerField(default=0)
    class Meta:
        model = Product
        fields = ["id","uid","name","cost_price","selling_price","product_quantity","category","low_stock","created_at"]
        read_only_fields = ["id","uid","created_at","company","created_at"]


class ProductFilterSerializer(serializers.ModelSerializer):
    category = serializers.CharField(write_only=True,required=False, allow_blank=True)
    STOCK_STATUS_CHOICES = ['instock','outofstock','allstock','lowstock']

    stock_status = serializers.ChoiceField(choices=STOCK_STATUS_CHOICES,
                    write_only = True,required = False,allow_blank=True)
    class Meta:
        model = Product
        fields = ['name','category','id','stock_status']
        read_only_fields = ['name','id']

