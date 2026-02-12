from django.shortcuts import render

# Create your views here.
from .views_dir.customerView import CustomerApiView,CustomerFilterApiView
from .views_dir.productView import ProductApiView,ProductFilterApiView
from .views_dir.expenseView import ExpenseApiView
from .views_dir.productCatView import ProductCatApiView
from .views_dir.expenseCatView import ExpenseCatApiView
from .views_dir.paymentInView import PaymentInApiView
from .views_dir.paymentOutView import PaymentOutApiView
from .views_dir.balanceAdjustView import BalanceAdjustApiView
from .views_dir.permissionView import PermissionApiView,RoleApiView
from .views_dir.itemActivityView import ItemActivityApiView

CustomerApiView = CustomerApiView
CustomerFilterApiView = CustomerFilterApiView

ProductApiView = ProductApiView
ProductCatApiView = ProductCatApiView
ProductFilterApiView = ProductFilterApiView

ExpenseApiView = ExpenseApiView
ExpenseCatApiView = ExpenseCatApiView

PaymentInApiView = PaymentInApiView
PaymentOutApiView = PaymentOutApiView

BalanceAdjustApiView = BalanceAdjustApiView

PermissionApiview = PermissionApiView
RoleApiView = RoleApiView

ItemActivityApiView = ItemActivityApiView
    
        
