from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework import status
from ..serializers_dir.productSerializers import ProductSerializer,ProductFilterSerializer
from ..serializers_dir.itemActivitySerializers import ItemActivitySerializer
from ..models import Product,ItemActivity
from rest_framework.permissions import IsAuthenticated,DjangoModelPermissions
from django.db.models import F
from ..services_dir.product_stock_service import StockService
from django.db import transaction

class ProductApiView(APIView):

    permission_classes = [IsAuthenticated,DjangoModelPermissions]
    queryset = Product.objects.all()

    def __get_company(self):
        return self.request.user.owned_company or self.request.user.active_company

    def get(self, request, pk=None):
        company = self.__get_company()
        if not company:
            raise ValidationError({"company": "User has no owned_company or active_company!"})

        try:
            if pk:
                # Fetch single product
                product = Product.objects.get(id=pk, company=company)
                serializer = ProductSerializer(product)

                item_activity = ItemActivity.objects.filter(product__id = pk)
                serialized_item_activity = ItemActivitySerializer(item_activity,many=True)
                return Response({"success":True,
                                 "products": serializer.data,
                                 "item_activity":serialized_item_activity.data}, status=status.HTTP_200_OK)
            else:
                # Fetch all products for the company
                products = Product.objects.filter(company=company)
                if not products.exists():
                    return Response({"products": [], "message": "No products found!"}, status=status.HTTP_200_OK)
                serializer = ProductSerializer(products, many=True)
                return Response({"success":True,"products": serializer.data}, status=status.HTTP_200_OK)

        except Product.DoesNotExist:
            # Only triggered if pk is provided and product is not found
            raise ValidationError({"error": "No such Product found!"})
        except Exception as e:
            # Catch any other unexpected errors
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @transaction.atomic
    def post(self, request,pk=None,action = None):
        company = self.__get_company()
        if not company:
            raise ValidationError({"company": "User has no owned_company or active_company!"})
        
        # update stock
        if pk and action:
            action = self.kwargs.get("action")
            product = Product.objects.get(id=pk)
            data = request.data.copy()
            data["product"] = pk

            if action == "add":  
                data["type"] = "ADD_STOCK"
                data["quantity"] = product.product_quantity + int(data["change"])
                data["change"] = f"+{data['change']}"

            if action == "reduce":
                data["type"] = "REDUCE_STOCK"
                data["quantity"] = product.product_quantity - int(data["change"])
                data["change"] = f"-{data['change']}"

            serializer = ItemActivitySerializer(data = data)
            
            if serializer.is_valid():
                product.product_quantity = serializer.validated_data["quantity"]
                product.save()
                serializer.save()
            item_activity = serializer.data
            return Response({"success":True,
                             "item_activity":item_activity})
        
        try:
            serializer = ProductSerializer(data=request.data)
            if serializer.is_valid():
                quantity = serializer.validated_data.get('product_quantity')
                product = serializer.save(company=company)
                itemactivity = StockService.create_opening_stock(product,quantity)
                itemactivity_serialized = ItemActivitySerializer(itemactivity)

                return Response({"success":True,"products":serializer.data,
                                    "item_activity":itemactivity_serialized.data}, status=status.HTTP_201_CREATED)
            # Return validation errors if serializer is not valid
            return Response({"success":False,"error":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            # Catch any unexpected errors
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def patch(self, request, pk):
        company = self.__get_company()
        if not company:
            raise ValidationError({"company": "User has no owned_company or active_company!"})

        try:
            # Fetch the product
            product = Product.objects.get(id=pk, company=company)

            # Partial update
            serializer = ProductSerializer(product, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"success":True,"products":serializer.data}, status=status.HTTP_200_OK)

            # Return serializer validation errors
            return Response({"success":False,"error":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        except Product.DoesNotExist:
            # Product not found for the given company and pk
            return Response({"message": "No such product found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            # Catch unexpected errors
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def delete(self,request,pk):
        company = self.__get_company()
        if not company:
            raise ValidationError({"company":"User has no owned_company or active_company!!"})
        
        try:
            product = Product.objects.get(id=pk)
        except Product.DoesNotExist:
            return Response({"message": "No such product found"})
        product.delete()
        return Response({"message": "Product deleted successfully"})

class ProductFilterApiView(APIView):
    permission_classes = [IsAuthenticated]
    def __get_company(self):
        return self.request.user.owned_company or self.request.user.active_company
    
    def get(self, request):

        company = self.__get_company()
        if not company:
            raise ValidationError({"company": "User has no owned_company or active_company!"})

        try:
            products = Product.objects.filter(company=company)
        except Exception as e:
            return Response({"error": f"Error fetching products: {str(e)}"}, status=500)

        serializer = ProductFilterSerializer(data=request.query_params)
        if not serializer.is_valid():
            raise ValidationError({"error": "Invalid query parameters", "details": serializer.errors})
        
        try:
            category = serializer.validated_data.get('category')
            stock_status = serializer.validated_data.get('stock_status')

            if category:
                products = products.filter(category=category)

            if stock_status:
                if stock_status == 'instock':
                    products = products.filter(product_quantity__gt=0)
                elif stock_status == 'outofstock':
                    products = products.filter(product_quantity__lte=0)
                elif stock_status == 'lowstock':
                    products = products.filter(product_quantity__lte=F("low_stock"))
                elif stock_status == 'allstock':
                    pass  
                else:
                    raise ValidationError({"stock_status": "Invalid stock_status value"})
        except Exception as e:
            return Response({"error": f"Error applying filters: {str(e)}"}, status=500)

        try:
            response_serializer = ProductFilterSerializer(products, many=True)
            return Response({"success":True,"products":response_serializer.data})
        except Exception as e:
            return Response({"error": f"Error serializing products: {str(e)}"}, status=500)    