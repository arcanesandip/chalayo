from rest_framework import serializers
from decimal import Decimal
from ..models import PaymentIn,RemainingAmount
from django.db import transaction
class PaymentInSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentIn
        fields = ["id","created_at","payment_in","remarks"]
        read_only_fields = ["id","created_at","company","remainings"]

