from rest_framework import serializers
from ..models import BalanceAdjustment

class BalanceAdjustSerializer(serializers.ModelSerializer):
    adjust_btn_type = serializers.ChoiceField(choices=["ADD", "REDUCE"],default = "ADD",write_only = True)

    adjusted_row_type = serializers.ChoiceField(choices= ['add','reduce'],write_only = True,required = False)
    remaining_amount = serializers.SerializerMethodField()
    class Meta:
        model = BalanceAdjustment
        fields = ["id","amount","created_at","remarks","customer","adjust_btn_type","remaining_amount","adjusted_row_type"]
        read_only_fields = ["id","created_at","remainings"]

    def get_remaining_amount(self, obj):
        return obj.remainings.remaining_amount if obj.remainings else 0