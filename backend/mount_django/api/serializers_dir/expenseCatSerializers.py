from ..models import ExpenseCategory
from rest_framework import serializers

class ExpenseCatSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseCategory
        fields = ["id","name"]
        read_only_fields = ["id"]