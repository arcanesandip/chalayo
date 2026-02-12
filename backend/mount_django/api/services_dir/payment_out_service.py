from decimal import Decimal
from django.db import transaction
from ..models import PaymentOut, RemainingAmount

class PaymentOutService:
    
    @staticmethod
    @transaction.atomic
    def create_payment_out(validated_data, company):
        customer = validated_data["customer"]
        payment_out = Decimal(validated_data["payment_out"])

        latest_remaining = (RemainingAmount.objects.filter(customer=customer).order_by("-id").first())
        latest_remaining_amount = latest_remaining.remaining_amount if latest_remaining else Decimal("0.0")

        new_remaining_amount = latest_remaining_amount + payment_out
        new_remaining = RemainingAmount.objects.create(
            customer=customer, remaining_amount=new_remaining_amount
        )

        payment_out_instance = PaymentOut.objects.create(
            remainings=new_remaining, company=company, **validated_data
        )
        return payment_out_instance

    @staticmethod
    @transaction.atomic
    def update_payment_out(instance, validated_data):
        payment_out = Decimal(validated_data["payment_out"])
        remarks = validated_data.get("remarks", "")

        current_remaining_amount = instance.remainings.remaining_amount
        current_paymentOut = instance.payment_out

        amount_to_calculate_on = current_remaining_amount - current_paymentOut
        latest_remaining_amount = amount_to_calculate_on + payment_out

        instance.remainings.remaining_amount = latest_remaining_amount
        instance.remainings.save()

        instance.payment_out = payment_out
        instance.remarks = remarks
        instance.save()
        return instance