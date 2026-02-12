from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework import status
from ..serializers_dir.paymentInSerializers import PaymentInSerializer
from ..models import PaymentIn
from rest_framework.permissions import IsAuthenticated
from ..services_dir.payment_in_service import PaymentInService

class PaymentInApiView(APIView):
    permission_classes =[IsAuthenticated]

    def __get__company(self):
        return self.request.user.owned_company or self.request.user.active_company
    
    def get(self,request,pk=None):
        company = self.__get__company()
        if not company:
            raise ValidationError({"error":"User has no active or owned company!"})
        
        if pk:
            try:
                paymentIn = PaymentIn.objects.get(id= pk)
                customer_name = paymentIn.customer.name
            except PaymentIn.DoesNotExist:
                raise ValidationError({"error":"No paymentIn transation found!"})
            serializer = PaymentInSerializer(paymentIn)
            return Response({"paymentIn":serializer.data,
                             "customer_name":customer_name})
        try:
            paymentIn = PaymentIn.objects.filter(company= company)
        except PaymentIn.DoesNotExist:
            raise ValidationError({"error":"No paymentIn transation found!"})
        serializer = PaymentInSerializer(paymentIn,many = True)
        return Response({"paymentIn":serializer.data})
    
    def post(self,request):
        company = self.__get__company()
        if not company:
            raise ValidationError({"error":"User has no active or owned company!"})
        
        serializer = PaymentInSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)

        payment_in = PaymentInService.create_payment_in(serializer.validated_data,company)
        response_serializer = PaymentInSerializer(payment_in)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
    
    def patch(self,request,pk):
        company = self.__get__company()
        if not company:
            raise ValidationError({"error":"User has no active or owned company!"})
        
        try:
            paymentIn = PaymentIn.objects.get(id=pk)
        except PaymentIn.DoesNotExist:
            raise ValidationError({"error":"No such paymentIn transaction exists!"})
        
        serializer = PaymentInSerializer(paymentIn,data = request.data,partial = True)
        serializer.is_valid(raise_exception=True)

        updated_payment_out = PaymentInService.update_payment_in(paymentIn,serializer.validated_data)
        response_serializer = PaymentInSerializer(updated_payment_out)
        return Response(response_serializer.data)
    
    def delete(self,request,pk):
        company = self.__get__company()
        if not company:
            raise ValidationError({"error":"User has no active or owned company!"})
        
        try:
            paymentIn = PaymentIn.objects.get(id=pk)
        except PaymentIn.DoesNotExist:
            raise ValidationError({"error":"No such paymentIn transaction exists!"})

        paymentIn.delete()
        return Response({"message":"PaymentIn deleted successfully!"})
