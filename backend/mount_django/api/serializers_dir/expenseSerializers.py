from ..models import Expense
from rest_framework import serializers

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields =["id","expense_number","created_at","total_amount","remarks","category"]
        read_only_fields = ["id","created_at","company"]