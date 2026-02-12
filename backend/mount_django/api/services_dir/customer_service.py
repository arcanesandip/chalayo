from ..models import Customer, RemainingAmount
from django.db import transaction
from decimal import Decimal

class CustomerService:
    @staticmethod
    @transaction.atomic
    def create_customer(validated_data, company):
        # extract & sanitize
        opening_balance = Decimal(str(validated_data.pop("opening_balance", 0)))
        opening_type = validated_data.pop("customer_opening_type", "TORECEIVE").upper()

        if opening_type not in {"TORECEIVE", "TOGIVE"}:
            raise ValueError("Invalid opening type")

        # sanitize amount
        opening_balance = abs(opening_balance)

        # create customer
        customer = Customer.objects.create(**validated_data, company=company)

        # determine final amount
        amount = opening_balance if opening_type == "TORECEIVE" else -opening_balance

        # create remaining amount (always link to customer & company from backend)
        RemainingAmount.objects.create(
            customer=customer,
            remaining_amount=amount
        )

        return customer
