from django.urls import path

from .views import CustomerApiView,ProductApiView,ExpenseApiView,ProductCatApiView,ExpenseCatApiView,PaymentInApiView,PaymentOutApiView,OrderListApiView,BalanceAdjustApiView,PermissionApiview,RoleApiView,CustomerFilterApiView,ProductFilterApiView,ItemActivityApiView

urlpatterns = [

    # for user management permission
    path("permissions/<int:group_id>/",PermissionApiview.as_view()),
    path("roles/",RoleApiView.as_view()),

    # api for client
    path("client/",CustomerApiView.as_view(),name="customer_list"),
    path("client/<int:pk>/",CustomerApiView.as_view(),name="customer_detail"),
    path('filterClient/',CustomerFilterApiView.as_view()),

    # api for product
    path("product/",ProductApiView.as_view()),
    path("product/<int:pk>/",ProductApiView.as_view()),
    path("filterProduct/",ProductFilterApiView.as_view()),
    path("add-stock/<int:pk>/<str:action>/" ,ProductApiView.as_view()),
    path("reduce-stock/<int:pk>/<str:action>/",ProductApiView.as_view()),

    # api for productCategory
    path("productCat/",ProductCatApiView.as_view()),
    path("productCat/<int:pk>/",ProductCatApiView.as_view()),

    # api for expense
    path("expense/",ExpenseApiView.as_view()),
    path("expense/<int:pk>/",ExpenseApiView.as_view()),

    # api for expenseCategory
    path("expenseCat/",ExpenseCatApiView.as_view()),
    path("expenseCat/<int:pk>/",ExpenseCatApiView.as_view()),

    # for paymentIn
    path("paymentIn/",PaymentInApiView.as_view()),
    path("paymentIn/<int:pk>/",PaymentInApiView.as_view()),

    # for paymentOut
    path("paymentOut/",PaymentOutApiView.as_view()),
    path("paymentOut/<int:pk>/",PaymentOutApiView.as_view()),

    # for orderlist
    path('bill/',OrderListApiView.as_view()),
    path('bill/<int:pk>/',OrderListApiView.as_view()),

    # for balanceadjustment
    path('balanceAdjust/',BalanceAdjustApiView.as_view()),
    path('balanceAdjust/<int:pk>/',BalanceAdjustApiView.as_view()),

    # for product activity in table 
    path('item-activity/',ItemActivityApiView.as_view()),
    path('item-activity/<int:pk>/',ItemActivityApiView.as_view()),

]
