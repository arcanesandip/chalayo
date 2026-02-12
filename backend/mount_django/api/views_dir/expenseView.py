from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework import status
from ..serializers_dir.expenseSerializers import ExpenseSerializer
from ..models import Expense
from rest_framework.permissions import IsAuthenticated,DjangoModelPermissions

class ExpenseApiView(APIView):
    permission_classes = [IsAuthenticated,DjangoModelPermissions]
    queryset = Expense.objects.all()

    def __get_company(self):
        return self.request.user.owned_company or self.request.user.active_company
    
    def get(self,request,pk=None):
        company = self.__get_company()
        if not company:
            raise ValidationError({"error":"User has no owned or active company!!"})
        
        if pk:
            try:
                expense = Expense.objects.get(id=pk,company=company)
            except Expense.DoesNotExist:
                return Response({"message":"No such expense found!"})
            serializer = ExpenseSerializer(expense)
            return Response({"success":True,"expenses":serializer.data})
        try:
            expense = Expense.objects.filter(company=company)
            expense_count = expense.count()
        except Expense.DoesNotExist:
            return Response({"message":"No expenses found!"})
        serializer = ExpenseSerializer(expense,many=True)
        
        return Response({"success":True,
                         "expenses":serializer.data,
                         "expense_count":expense_count})
    
    def post(self,request):
        company = self.__get_company()
        if not company:
            raise ValidationError({"error":"User has no owned or active company!!"})
        
        serializer = ExpenseSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save(company=company)
    
            return Response({"success":True,"expenses":serializer.data})
        else:
            return Response({"success":False,"error":serializer.errors},status=400)
        
    def patch(self,request,pk):
        company = self.__get_company()
        if not company:
            raise ValidationError({"error":"User has no owned or active company!!"})
        
        try:
            expense = Expense.objects.get(company=company,id=pk)
        except Expense.DoesNotExist:
            raise ValidationError({"error":"No such expense found!"})
        
        serializer =  ExpenseSerializer(expense,data=request.data,partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response({"success":True,"expenses":serializer.data}, status=200)
        return Response({"success":False,"error":serializer.errors},status=400)
    
    def delete(self,request,pk):
        company = self.__get_company()
        if not company:
            raise ValidationError({"error":"User has no owned or active company!!"})
        
        try:
            expense = Expense.objects.get(company=company,id=pk)
        except Expense.DoesNotExist:
            raise ValidationError({"error":"No such expense found!"})
        expense.delete()
        return Response({"message":"expense deleted successfully!"})
