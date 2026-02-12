from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError, NotFound
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db import DatabaseError
from decimal import InvalidOperation

from ..serializers_dir.balanceAdjustSerializers import BalanceAdjustSerializer
from ..models import BalanceAdjustment
from ..services_dir.balanceAdjust_service import BalanceAdjustService


class BalanceAdjustApiView(APIView):
    permission_classes = [IsAuthenticated]

    def __get__company(self):
        user = getattr(self.request, "user", None)
        return getattr(user, "owned_company", None) or getattr(user, "active_company", None)

    def get(self, request,pk = None):
        company = self.__get__company()
        if not company:
            raise ValidationError({"error": "User has no owned or active company!"})
        if pk:
            try:
                balanceadjust = BalanceAdjustment.objects.get(id=pk)
            except BalanceAdjustment.DoesNotExist:
                raise NotFound({"error": "BalanceAdjustment record not found."})
            return Response({
                "success":True,
                "amount": balanceadjust.amount,
                "remarks": balanceadjust.remarks,
                "date": balanceadjust.created_at,
            })
        try:
            balanceadjust = (
                BalanceAdjustment.objects
                .select_related("remainings")
                .filter(customer__company=company)
            )
            serializer = BalanceAdjustSerializer(balanceadjust, many=True)
            return Response({"success":True,"balance_adjust": serializer.data}, status=status.HTTP_200_OK)

        except (DatabaseError, Exception) as exc:
            return Response({
                "success": False,
                "error": f"Unable to fetch balance adjustments: {str(exc)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        company = self.__get__company()
        if not company:
            raise ValidationError({"error": "User has no owned or active company!"})

        serializer = BalanceAdjustSerializer(data=request.data)

        if not serializer.is_valid():
            return Response({
                "success": False,
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            balance_adjustment = BalanceAdjustService.create_balance_adjustment(
                serializer.validated_data,
                company=company
            )
            response_data = BalanceAdjustSerializer(balance_adjustment).data
            return Response({
                "success": True,
                "balance_adjust": response_data,
                "message": "Balance adjustment completed successfully."
            }, status=status.HTTP_201_CREATED)

        except (DatabaseError, InvalidOperation) as db_err:
            return Response({
                "success": False,
                "error": f"Database error: {str(db_err)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as exc:
            return Response({
                "success": False,
                "error": f"Unexpected error: {str(exc)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request, pk):
        company = self.__get__company()
        if not company:
            raise ValidationError({"error": "User has no owned or active company!"})

        try:
            balance_adjust = BalanceAdjustment.objects.get(id=pk)
        except BalanceAdjustment.DoesNotExist:
            raise NotFound({"error": "BalanceAdjustment record not found."})
        except DatabaseError as db_err:
            return Response({
                "success": False,
                "error": f"Database error while retrieving record: {str(db_err)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        serializer = BalanceAdjustSerializer(balance_adjust, data=request.data, partial=True)

        if not serializer.is_valid():
            return Response({
                "success": False,
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            updated_balance_adjust = BalanceAdjustService.update_balance_adjustment(
                balance_adjust,
                serializer.validated_data
            )
            response_serializer = BalanceAdjustSerializer(updated_balance_adjust)
            return Response({
                "success": True,
                "balance_adjust": response_serializer.data,
                "message": "Balance adjustment updated successfully."
            }, status=status.HTTP_200_OK)

        except (DatabaseError, InvalidOperation) as db_err:
            return Response({
                "success": False,
                "error": f"Database error: {str(db_err)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as exc:
            return Response({
                "success": False,
                "error": f"Unexpected error: {str(exc)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)