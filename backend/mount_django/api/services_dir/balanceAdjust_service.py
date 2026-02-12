from django.db import transaction, DatabaseError
from decimal import Decimal, InvalidOperation
from ..models import BalanceAdjustment, RemainingAmount

class BalanceAdjustService:

    @staticmethod
    @transaction.atomic
    def create_balance_adjustment(validated_data, company):
        try:
            adjust_type = validated_data.pop("adjust_btn_type")
            adjustment_amount = validated_data.pop("amount")
            customer = validated_data["customer"]

            if adjust_type not in {"ADD", "REDUCE"}:
                raise ValueError("Invalid adjustment type")

            if not isinstance(adjustment_amount, (int, float, Decimal)):
                raise TypeError("Amount must be numeric")

            latest_remaining = (
                RemainingAmount.objects
                .filter(customer=customer)
                .order_by('-id')
                .first()
            )
            if latest_remaining is None:
                raise ValueError("No existing RemainingAmount record found for this customer")

            amount = adjustment_amount if adjust_type == 'ADD' else -adjustment_amount
            current_remaining = latest_remaining.remaining_amount + amount

            new_remaining = RemainingAmount.objects.create(
                customer=customer,
                remaining_amount=current_remaining
            )

            balance_adjust_instance = BalanceAdjustment.objects.create(
                remainings=new_remaining,
                amount=amount,
                **validated_data
            )

            return balance_adjust_instance

        except (DatabaseError, InvalidOperation) as db_err:
            # Rolls back automatically due to @transaction.atomic
            raise RuntimeError(f"Database error while creating adjustment: {db_err}")

        except Exception as exc:
            raise RuntimeError(f"Unable to create balance adjustment: {exc}")

    @staticmethod
    @transaction.atomic
    def update_balance_adjustment(instance, validated_data):
        try:
            adjusted_row_type = validated_data.pop("adjusted_row_type")
            latest_amount_raw = validated_data.get("amount")

            try:
                latest_amount = Decimal(str(latest_amount_raw))
            except (InvalidOperation, TypeError):
                raise ValueError("Invalid amount. Must be a valid number.")

            current_remaining_amount = instance.remainings.remaining_amount
            previous_amount = instance.amount

            if adjusted_row_type == 'add':
                new_remaining = (current_remaining_amount - previous_amount) + latest_amount
                instance.amount = latest_amount
            elif adjusted_row_type == 'reduce':
                new_remaining = (current_remaining_amount + abs(previous_amount)) - latest_amount
                instance.amount = -latest_amount
            else:
                raise ValueError("Invalid adjusted_row_type. Must be 'add' or 'reduce'.")

            instance.remainings.remaining_amount = new_remaining
            instance.remainings.save()
            instance.save()

            return instance

        except (DatabaseError, InvalidOperation) as db_err:
            raise RuntimeError(f"Database error while updating adjustment: {db_err}")

        except Exception as exc:
            raise RuntimeError(f"Unable to update balance adjustment: {exc}")