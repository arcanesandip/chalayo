from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework import status
from ..serializers_dir.paymentOutSerializers import PaymentOutSerializer
from ..models import PaymentOut
from rest_framework.permissions import IsAuthenticated
from ..services_dir.payment_out_service import PaymentOutService

class PaymentOutApiView(APIView):
    permission_classes = [IsAuthenticated]

    def __get_company(self):
        return self.request.user.owned_company or self.request.user.active_company

    def get(self, request, pk=None):
        company = self.__get_company()
        if not company:
            raise ValidationError({"error": "User has no active or owned company!"})
        
        if pk:
            try:
                paymentOut = PaymentOut.objects.get(id=pk)
                customer_name = paymentOut.customer.name
            except PaymentOut.DoesNotExist:
                raise ValidationError({"error": "No paymentOut transaction found!"})
            serializer = PaymentOutSerializer(paymentOut)
            return Response({"paymentOut": serializer.data,
                             "customer_name":customer_name})
        
        paymentOut = PaymentOut.objects.filter(company=company)
        serializer = PaymentOutSerializer(paymentOut, many=True)
        return Response({"paymentOut": serializer.data})

    def post(self, request):
        company = self.__get_company()
        if not company:
            raise ValidationError({"error": "User has no active or owned company!"})
        
        serializer = PaymentOutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        payment_out = PaymentOutService.create_payment_out(
            serializer.validated_data, company
        )
        response_serializer = PaymentOutSerializer(payment_out)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)

    def patch(self, request, pk):
        company = self.__get_company()
        if not company:
            raise ValidationError({"error": "User has no active or owned company!"})
        
        try:
            paymentOut = PaymentOut.objects.get(id=pk)
        except PaymentOut.DoesNotExist:
            raise ValidationError({"error": "No such paymentOut transaction exists!"})
        
        serializer = PaymentOutSerializer(paymentOut, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        updated_payment_out = PaymentOutService.update_payment_out(
            paymentOut, serializer.validated_data
        )
        response_serializer = PaymentOutSerializer(updated_payment_out)
        return Response(response_serializer.data)
    
    def delete(self, request, pk):
        company = self.__get_company()
        if not company:
            raise ValidationError({"error": "User has no active or owned company!"})
        
        try:
            paymentOut = PaymentOut.objects.get(id=pk)
        except PaymentOut.DoesNotExist:
            raise ValidationError({"error": "No such paymentOut transaction exists!"})

        paymentOut.delete()
        return Response({"message": "PaymentOut deleted successfully!"})