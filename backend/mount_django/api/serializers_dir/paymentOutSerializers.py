from rest_framework import serializers
from ..models import PaymentOut

class PaymentOutSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentOut
        fields = ["id","created_at","payment_out","remarks"]
        read_only_fields = ["id","created_at","company","remainings"]
