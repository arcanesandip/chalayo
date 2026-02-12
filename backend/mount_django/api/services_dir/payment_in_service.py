from django.db import transaction
from decimal import Decimal
from ..models import PaymentIn,RemainingAmount
class PaymentInService:

    @staticmethod
    @transaction.atomic
    def create_payment_in(validated_data,company):
        
        customer = validated_data["customer"]
        payment_in = Decimal(validated_data["payment_in"])
        
        latest_remaining = RemainingAmount.objects.filter(customer=customer).order_by('-id').first()
        latest_amount = latest_remaining.remaining_amount if latest_remaining else Decimal("0.0")

        current_remaining = latest_amount - payment_in

        new_remaining = RemainingAmount.objects.create(customer=customer,remaining_amount = current_remaining)

        payment_in_instance = PaymentIn.objects.create(remainings= new_remaining,company=company,**validated_data)
        return payment_in_instance
    
    @staticmethod
    @transaction.atomic
    def update_payment_in(instance,validated_data):
        
        payment_in = Decimal(validated_data["payment_in"])
        remarks = validated_data.get("remarks","")

        current_remaining = instance.remainings.remaining_amount
        current_amount = instance.payment_in

        amount_to_calculate_on = current_remaining + current_amount

        latest_remaining = amount_to_calculate_on - payment_in
        
        instance.remainings.remaining_amount = latest_remaining
        instance.payment_in = payment_in
        instance.remarks = remarks

        instance.remainings.save()
        instance.save()
        return instance