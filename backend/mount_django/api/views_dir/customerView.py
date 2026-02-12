from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework import status
from ..serializers_dir.customerSerializers import CustomerSerializer,CustomerFilterSerializer
from ..models import Customer,RemainingAmount
from rest_framework.permissions import IsAuthenticated,DjangoModelPermissions
from ..services_dir.customer_service import CustomerService
from decimal import Decimal
from django.db.models import OuterRef, Subquery

# CRUD for customer
class CustomerApiView(APIView):
    permission_classes = [IsAuthenticated,DjangoModelPermissions]
    queryset = Customer.objects.all()
    
    def __get_company(self):
        return self.request.user.owned_company or self.request.user.active_company
    
    def get(self,request,pk=None):
        company = self.__get_company()

        if not company:
            raise ValidationError({"company":"User has no active/owned company!!"})
        
        if pk:
            try:
                customer = Customer.objects.get(id=pk,company=company)
            except Customer.DoesNotExist:
                raise ValidationError({"error":"No such client found!"})
            serializer = CustomerSerializer(customer)
            return Response({"success":True,"clients":serializer.data})
        try:
            customers = Customer.objects.filter(company=company)
        except Customer.DoesNotExist:
            raise ValidationError({"message":"No Clients found!"})
        serializer = CustomerSerializer(customers,many = True)

        return Response({"success":True,"clients":serializer.data})
    
    def post(self, request):
        company = self.__get_company()

        if not company:
            raise ValidationError({"company":"User has no active/owned company!!"})
        
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            try:
                customer = CustomerService.create_customer(
                    serializer.validated_data,
                    company=company 
                )
                customer_data = CustomerSerializer(customer).data
                return Response({"success": True,"client":customer_data,"message": "Customer created successfully."
                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({"error": str(e)}, status=500)
        else:
            return Response({"success": False,"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    
    def patch(self,request,pk):
        company = self.__get_company()
        if not company:
            raise ValidationError({"company":"User has no active/owned company!!"})
        
        try:
            customer = Customer.objects.get(id=pk,company=company)
        except Customer.DoesNotExist:
            return Response({"message": "No such client found"}, status=404)
        serializer = CustomerSerializer(customer,data = request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"success":True,
                             "client":serializer.data,
                             "message":"Client updated Successfully!"}, status=200)
        
        return Response({"success": False,"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,pk):
        company = self.__get_company()
        company = self.__get_company()
        if not company:
            raise ValidationError({"company":"User has no active/owned company!!"})

        try:
            customer = Customer.objects.get(id=pk,company=company)
        except Customer.DoesNotExist:
            return Response({"message": "No such client found"})
        
        customer.delete()
        return Response({"success":True,"message": "Client deleted successfully"})

# filtering customer 
class CustomerFilterApiView(APIView):
    permission_classes = [IsAuthenticated]
    
    def __get_company(self):
        return self.request.user.owned_company or self.request.user.active_company
    
    def get(self, request):
        
        company = self.__get_company()
        if not company:
            raise ValidationError({"company": "User has no owned_company or active_company!"})

        
        serializer = CustomerFilterSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True) 

        customer_type = serializer.validated_data.get('customer_type')
        payment_status = serializer.validated_data.get('payment_status')

        try:
            customers = Customer.objects.filter(company=company)

            if customer_type:
                customers = customers.filter(customer_type=customer_type)
                if not customers.exists():
                    raise ValidationError({"error": "No such client found!"})
        except Exception as e:
            return Response({"error": f"Error fetching customers: {str(e)}"}, status=500)

        try:
            latest_remaining = RemainingAmount.objects.filter(customer=OuterRef('pk')).order_by('-id')
            customers = customers.annotate(
                latest_remaining_amount=Subquery(latest_remaining.values('remaining_amount')[:1])
            )
        except Exception as e:
            return Response({"error": f"Error annotating remaining amounts: {str(e)}"}, status=500)

        try:
            if payment_status:
                if payment_status == "To Receive":
                    customers = customers.filter(latest_remaining_amount__gt=0)
                elif payment_status == "To Give":
                    customers = customers.filter(latest_remaining_amount__lt=0)
                elif payment_status == "Settled":
                    customers = customers.filter(
                        latest_remaining_amount__gte=Decimal('-0.01'),
                        latest_remaining_amount__lte=Decimal('0.01')
                    )
                elif payment_status == "All Payment":
                    pass  
                else:
                    raise ValidationError({"payment_status": "Invalid payment_status value"})
        except Exception as e:
            return Response({"error": f"Error applying payment status filter: {str(e)}"}, status=500)

        try:
            response_serializer = CustomerFilterSerializer(customers, many=True)
            return Response({"success":True,"clients": response_serializer.data})
        except Exception as e:
            return Response({"error": f"Error serializing customers: {str(e)}"}, status=500)  