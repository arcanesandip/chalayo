import uuid
from decimal import Decimal

from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone
from django.conf import settings
from django.contrib.auth.models import Group,Permission

class User(AbstractUser):
    phone = models.CharField(max_length=15, blank=True)
    email = models.EmailField(blank=True)
    has_paid_for_company = models.BooleanField(default=False)
    created_at = models.DateField(null=True, blank=True)

    owned_company = models.OneToOneField(
        "Company",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="company_owner",
    )

    active_company = models.ForeignKey(
        "Company",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="active_users",
    )

    def __str__(self):
        return self.username
    
    def has_perm(self, perm, obj=None):
        # If user is a company owner, always return True for any permission check
        if self.owned_company:
            return True
        return super().has_perm(perm, obj)
    

class Company(models.Model):
    owner = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="own_company",
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15, blank=True)
    tax_id = models.CharField(max_length=15, blank=True)

    managers = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name="managed_companies",
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name



    
class CompanyRole(models.Model):
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="roles"
    )
    name = models.CharField(max_length=150)
    permissions = models.ManyToManyField(Permission, blank=True)

    class Meta:
        unique_together = ("company", "name")

    def __str__(self):
        return f"{self.company.name} - {self.name}"

           
class Customer(models.Model):  # sabina
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name="customers"
    )
    CUSTOMER_TYPE_CHOICES = [('CUSTOMER','Customer'),
                             ('SUPPLIER','Supplier')]
    uid = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15, blank=True)
    email = models.EmailField(blank=True)
    pan_id = models.CharField(max_length=15, blank=True)
    address = models.CharField(max_length=15, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    customer_type = models.CharField(max_length=10,choices=CUSTOMER_TYPE_CHOICES,default="CUSTOMER")
    def __str__(self):
        return f"{self.name} ({self.company})"
    
    class Meta:
        constraints =[
            models.UniqueConstraint(fields=['company','name'],name="unique_customer_per_company")
                    ]



class ProductCategory(models.Model):
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name="product_categories"
    )
    name = models.CharField(max_length=100)

    class Meta:
        unique_together = ["company", "name"]

    def __str__(self):
        return f"{self.name} ({self.company})"


class Product(models.Model):
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name="products"
    )

    uid = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    cost_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    selling_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    product_quantity = models.IntegerField(default=0)
    category = models.ForeignKey(
        ProductCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="products",
    )
    low_stock = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ["company", "name"]

    def __str__(self):
        return f"{self.name} ({self.company})"

    
    # if no category saved during product's saving
    def save(self,*args, **kwargs):
        if self.category_id is None:
            self.category,_ = ProductCategory.objects.get_or_create(company=self.company,name="General")
        super().save(*args, **kwargs)



class OrderList(models.Model):
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name="orders"
    )
    uid = models.UUIDField(default=uuid.uuid4, editable=False)

    created_at = models.DateTimeField(default=timezone.now)
    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name="orders",
    )
    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="created_orders"
    )
    notes = models.TextField(blank=True, null=True)
    is_simple_invoice = models.BooleanField(default=False)
    invoice_description = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.created_by:
            is_owner = self.created_by.owned_company == self.company
            is_manager = self.company.managers.filter(id=self.created_by.id).exists()

            if not (is_owner or is_manager):
                raise ValidationError("User doesn't have company access")

        super().save(*args, **kwargs)

    def __str__(self):
        type_str = "Simple" if self.is_simple_invoice else "Detailed"
        return f"{type_str} Order {self.id} - {self.customer.name}"
    
class OrderSummary(models.Model):
    order = models.OneToOneField(
        OrderList, on_delete=models.CASCADE,null=True,blank=True, related_name="summary"
    )
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    tax = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    final_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    received_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    due_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    calculated_on = models.DateTimeField(auto_now=True)
    # payment status
    PAYMENT_STATUS_CHOICES = [
        ("UNPAID", "Unpaid"),
        ("PARTIAL", "Partial"),
        ("PAID", "Paid"),
    ]

    payment_status = models.CharField(
        max_length=50, choices=PAYMENT_STATUS_CHOICES, default="UNPAID"
    )

    def clean(self):
        """
        Custom validation for amount fields.

        With max_digits=10 and decimal_places=2, the DB already limits:
        - 8 integer digits + 2 decimal digits

        Here we enforce that same rule with a clear message BEFORE hitting DB.

        """
        super().clean()

        # Max allowed value: 99,999,999.99 (8 digits before decimal, 2 after)
        max_amount = Decimal("99999999.99")

        errors = {}

        # Check all relevant monetary field

        if self.total_amount is not None and self.total_amount > max_amount:
            print("ma error ho")
            errors["total_amount"] = [
                "Value cannot have more than 8 digits before the decimal "
                "(maximum allowed is 99,999,999.99)."
            ]

        if errors:
            # Raise one ValidationError containing field-specific messages
            raise ValidationError(errors)

    def __str__(self):
        return f"total amount:{self.total_amount}"

class RemainingAmount(models.Model):
    customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name="customerRemainingAmount"
    )
    orders = models.OneToOneField(
        OrderList, on_delete=models.CASCADE, related_name="remaining",null=True,blank=True
    )
    remaining_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)

    def __str__(self):
        return f"{self.id}"
    
class Purchase(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE,related_name="purchases")
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE,related_name="purchase")

    summary = models.OneToOneField(OrderSummary,on_delete=models.SET_NULL,null=True,related_name="purchaseordersumarry")

    remaining = models.OneToOneField(RemainingAmount,on_delete=models.SET_NULL,null=True,related_name="remainingafterpurchase")

    uid = models.UUIDField(default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Purchase #{self.id}"

class Bill(models.Model):
    order = models.ForeignKey(OrderList, on_delete=models.CASCADE,null=True, related_name="bills")
    purchase = models.ForeignKey(Purchase, on_delete=models.CASCADE,null=True, related_name="bill")
    # CHANGED: Product can be null for simple invoices
    product = models.ForeignKey(
        Product,
        on_delete=models.SET_NULL,  # Changed from CASCADE
        null=True,  # Allow null
        blank=True,  # Allow blank
        related_name="bills",
    )

    product_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)
    discount = models.DecimalField(max_digits=10, decimal_places=2)
    # NEW: Description for simple invoice items
    description = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(default=timezone.now)

    @property
    def line_total(self):
        """Calculate line total: quantity × price"""
        return Decimal(str(self.quantity)) * Decimal(str(self.product_price))

    def clean(self):
        """Validate data integrity"""
        # For detailed invoices (has product), check company match
        if self.product and self.product.company != self.order.company:
            raise ValidationError("Product doesn't belong to order's company")

        # For simple invoices (no product), require description
        if not self.product and not self.description:
            raise ValidationError("Description required for simple invoice items")

    def __str__(self):
        return f"Bill {self.id}"

class AdditionalCharges(models.Model):
    additional_charges = models.ForeignKey(
        OrderList, on_delete=models.SET_NULL,null=True, related_name="charges"
    )

    purchase_additional_charges = models.ForeignKey(Purchase,
     on_delete=models.SET_NULL,null=True, related_name="purchase_charges"
    )
    charge_name = models.CharField(max_length=200)
    additional_amount = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)

    def __str__(self):
        return f"Additional amount: {self.additional_amount}"

class ItemActivity(models.Model):
    order = models.ForeignKey(
        OrderList, on_delete=models.CASCADE, null=True, related_name="orderactivities"
    )
    purchase = models.ForeignKey(Purchase,on_delete=models.CASCADE,null=True,related_name="purchaseactivities")
    product = models.ForeignKey(
        Product, on_delete=models.PROTECT, related_name="activities"
    )

    ACTIVITY_CHOICES = [
        ("ADD_STOCK","Add Stock"),
        ("REDUCE_STOCK","Reduce Stock"),
        ("SALE","sale"),
        ("PURCHASE","purchase")
    ]
    type = models.CharField(choices=ACTIVITY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    change = models.CharField(max_length=20)
    quantity = models.IntegerField(default=0)
    remarks = models.TextField(blank=True ,null=True)

    def __str__(self):
        return str(self.change)

class PaymentIn(models.Model):
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name="paymentInorder"
    )
    customer = models.ForeignKey(Customer,on_delete=models.PROTECT,related_name="paymentIn")
    remainings = models.OneToOneField(RemainingAmount,on_delete=models.CASCADE,related_name="paymentInRemaining")
    
    created_at = models.DateTimeField(auto_now_add=True)
    payment_in = models.DecimalField(max_digits=10,decimal_places=2,default=0.0)
    remarks = models.CharField(max_length=200,blank=True)
    
    def __str__(self):
        return f"payment in amount: {self.payment_in}"
    
class PaymentOut(models.Model):
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name="paymentOutorder"
    )
    customer = models.ForeignKey(Customer,on_delete=models.PROTECT,related_name="paymentOut")
    remainings = models.OneToOneField(RemainingAmount,on_delete=models.CASCADE,related_name="paymentOutRemaining")
    
    created_at = models.DateTimeField(auto_now_add=True)
    payment_out = models.DecimalField(max_digits=10,decimal_places=2,default=0.0)
    remarks = models.CharField(max_length=200,blank=True)
    
    def __str__(self):
        return f"payment out amount: {self.payment_out}"
    
class BalanceAdjustment(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT,related_name = "customerBalanceAdjustment")
    remainings = models.OneToOneField(RemainingAmount,on_delete=models.CASCADE,related_name="balanceAdustRemaining")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    remarks = models.TextField(max_length=255,blank=True)


class ExpenseCategory(models.Model):
    name = models.CharField(max_length=100)
    
    company = models.ForeignKey(Company, on_delete=models.CASCADE,blank=True,null=True, related_name='expense_categories'
    )
    is_global = models.BooleanField(default= False)
    
    class Meta:
        constraints = [
            # a company cannot have duplicate category 
            models.UniqueConstraint(fields=['company','name'],name='unique_expenseCategory_per_company'),

            # global category list cannot have duplicate category
            models.UniqueConstraint(fields=['name'],condition=models.Q(is_global=True),name='unique-global-category')
        ]
    
    def clean(self):

        # global category must not have a company
        if self.is_global and self.company is not None:
            raise ValidationError("Global Categories cannot belong to a company.")
        
        # company category must not create category same as global
        if not self.is_global:
            if ExpenseCategory.objects.filter(is_global = True,name__iexact = self.name).exists():
                raise ValidationError( f"'{self.name}' already exists as a global category." )

    def save(self,*args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.name
        


class Expense(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE,related_name="expenses")
    category = models.ForeignKey(ExpenseCategory,on_delete=models.PROTECT,related_name="category")

    expense_number = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10,decimal_places=2)
    remarks = models.CharField(max_length=255,blank=True)
    def __str__(self):
        return str(self.total_amount)



