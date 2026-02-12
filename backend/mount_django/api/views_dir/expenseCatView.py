from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework import status
from ..serializers_dir.expenseCatSerializers import ExpenseCatSerializer
from ..models import ExpenseCategory,Company
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q

class ExpenseCatApiView(APIView):
    permission_classes = [IsAuthenticated]

    def __get__company(self):
        return self.request.user.owned_company or self.request.user.active_company
    
    def get(self,request,pk=None):
        company = self.__get__company()
        if not company:
            raise ValidationError({"error":"User has no owned/active company!!"})
        if pk:
            try:
                expenseCategory = ExpenseCategory.objects.get(id = pk)
            except ExpenseCategory.DoesNotExist:
                raise ValidationError({"message":"No expenseCategory found!"})
            serializer = ExpenseCatSerializer(expenseCategory) 
            return Response({"success":True,"category":serializer.data})  
        try:
            expenseCategory = ExpenseCategory.objects.filter(Q(is_global = True) | Q(company= company))
            
        except ExpenseCategory.DoesNotExist:
            raise ValidationError({"message":"No expenseCategory found!"})
        serializer = ExpenseCatSerializer(expenseCategory,many = True)
        return Response({"success":True,"category":serializer.data})

    def post(self,request):
        company = self.__get__company()
        if not company:
            raise ValidationError({"error":"User has no owned/active company!!"})
        
        serializer = ExpenseCatSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save(company = company)
            return Response({"success":True,"category":serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"success":False,"error":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    