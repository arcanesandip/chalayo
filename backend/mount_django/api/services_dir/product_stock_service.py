from ..models import Product,ItemActivity
from django.db import transaction
from django.utils import timezone
from decimal import Decimal

class StockService:
    @staticmethod
    @transaction.atomic
    def create_opening_stock(product, initial_quantity, remarks="Opening stock"):
        """Create a new product with initial stock"""
        
        item_activity = ItemActivity.objects.create(
            product=product,
            type='ADD_STOCK',
            change=f"+{initial_quantity}",
            quantity=initial_quantity,
            remarks=remarks
        )
        return item_activity
    
    
    @staticmethod
    @transaction.atomic
    def update_activity(activity, change):
        
        if activity.type == "ADD_STOCK":
            
            prev_quantity = activity.quantity - abs(int(activity.change))
            activity.change = f"+{change}"
            activity.quantity = prev_quantity + change
        
        elif activity.type == "REDUCE_STOCK":

            prev_quantity = activity.quantity + abs(int(activity.change))
            activity.change = f"-{change}"
            activity.quantity = prev_quantity - change
        

        activity.save()
        prev_quantity = activity.quantity
        # Recalculate all subsequent activities
        try:  
            subsequent_activities = (
                ItemActivity.objects
                .filter(product=activity.product, created_at__gt=activity.created_at)
                .order_by('created_at')
            )
            for subsequent_activity in subsequent_activities:

                if subsequent_activity.type == "ADD_STOCK":
                    subsequent_activity.quantity = prev_quantity + abs(int(subsequent_activity.change))
                   
                elif subsequent_activity.type == "REDUCE_STOCK":
                    subsequent_activity.quantity = prev_quantity - abs(int(subsequent_activity.change))
                subsequent_activity.save()
                prev_quantity = subsequent_activity.quantity
            
            # Update the product's current quantity
            if subsequent_activities.exists():
                activity.product.product_quantity = subsequent_activities.last().quantity
            else:
                activity.product.product_quantity = activity.quantity
            activity.product.save()

            return activity
        except Exception as e:
            print(str(e))
          