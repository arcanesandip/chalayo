import uuid
from decimal import Decimal

from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone
from django.conf import settings
from django.contrib.auth.models import Group,Permission

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

    class Meta:
        unique_together = ("name",)
        
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

class User(AbstractUser):
    role = models.ForeignKey(
    CompanyRole,
    on_delete=models.CASCADE,
    related_name="users",
    null=True,   # allow superuser without role at first
    blank=True
)
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


class Invoice(models.Model):
    # Define choices
    INVOICE_TYPE_CHOICES = [
        ("SALE", "Sales Invoice"),
        ("PURCHASE", "Purchase Invoice"),
    ]

    PAYMENT_STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("PARTIAL", "Partially Paid"),
        ("PAID", "Fully Paid"),
        ("CANCELLED", "Cancelled"),
    ]

    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name="invoices",
        null=True,
        blank=True,
    )
    uid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    invoice_number = models.CharField(max_length=50, unique=True, blank=True)
    invoice_type = models.CharField(
        max_length=10, choices=INVOICE_TYPE_CHOICES, default="SALE"
    )
    created_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="created_invoices"
    )

    invoice_description = models.TextField(blank=True, null=True)

    # Financial Summary (calculated from bills)
    subtotal = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    tax_amount = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    global_discount = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    paid_amount = models.DecimalField(max_digits=15, decimal_places=2, default=0)

    # Status
    payment_status = models.CharField(
        max_length=10, choices=PAYMENT_STATUS_CHOICES, default="PENDING"
    )

    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["invoice_number"]),
            models.Index(fields=["created_at"]),
            models.Index(fields=["payment_status"]),
        ]

    def __str__(self):
        return f"Invoice {self.invoice_number}"

    @property
    def due_amount(self):
        """Calculate due amount dynamically"""
        return Decimal(str(self.total_amount)) - Decimal(str(self.paid_amount))


class InvoiceItem(models.Model):

    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name="bills")
    product = models.ForeignKey(
        Product, null=True, blank=True, on_delete=models.SET_NULL, related_name="bills"
    )
   
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ["created_at"]
        indexes = [
            models.Index(fields=["invoice"]),
        ]

    def __str__(self):
        if self.product:
            return f"{self.product.name} x {self.quantity}"
        return f"{self.quantity}"

    @property
    def line_total(self):
        try:
            total = Decimal(str(self.quantity)) * Decimal(str(self.unit_price))
            total -= Decimal(str(self.discount_amount))
            return total
        except:
            return Decimal("0")


class Payment(models.Model):
    PAYMENT_METHOD_CHOICES = [
        ("CASH", "Cash"),
        ("CARD", "Card"),
        ("ONLINE", "Online"),
    ]

    invoice = models.ForeignKey(
        Invoice, on_delete=models.CASCADE, related_name="payments"
    )
    customer = models.ForeignKey(Customer,on_delete=models.CASCADE,related_name="customers_payment")

    amount = models.DecimalField(max_digits=15, decimal_places=2)
    payment_method = models.CharField(
        max_length=20, choices=PAYMENT_METHOD_CHOICES, default="CASH"
    )
    
    # FULL UUID (system transaction id)
    transaction_id = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        editable=False,
        db_index=True,
    )

    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    received_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="received_payments"
    )

    def __str__(self):
        return f"Payment {self.amount} - {self.invoice.invoice_number}"  # models.py

class RemainingAmount(models.Model):
    customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name="customerRemainingAmount"
    )
    orders = models.OneToOneField(
        Invoice, on_delete=models.CASCADE, related_name="remaining",null=True,blank=True
    )
    remaining_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)

    def __str__(self):
        return f"{self.id}"
    
class AdditionalCharges(models.Model):
    additional_charges = models.ForeignKey(
        Invoice, on_delete=models.SET_NULL,null=True, related_name="charges"
    )

    charge_name = models.CharField(max_length=200)
    additional_amount = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)

    def __str__(self):
        return f"Additional amount: {self.additional_amount}"

class ItemActivity(models.Model):
    order = models.ForeignKey(
        Invoice, on_delete=models.CASCADE, null=True, related_name="orderactivities"
    )
 
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



