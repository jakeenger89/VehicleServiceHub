from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse
from sales_rest.models import Sale, Salesperson, AutomobileVO, Customer


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
    ]


class SalespersonListEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]


class SalespersonDetailEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]


class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id",
    ]


class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number"
    ]


class SalesListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "automobile",
        "salesperson",
        "customer",
        "id",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonDetailEncoder(),
        "customer": CustomerDetailEncoder(),

    }


class SalesDetailEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "automobile",
        "salesperson",
        "customer",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonDetailEncoder(),
        "customer": CustomerDetailEncoder(),

    }


@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salesperson},
            encoder=SalespersonListEncoder,
        )

    else:
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespersonDetailEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "not a valid salesperson"},
                status=400
            )


@require_http_methods(["DELETE", "GET"])
def api_show_salesperson(request, employee_id):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(employee_id=employee_id)
            return JsonResponse(
                salesperson,
                encoder=SalespersonDetailEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "salesperson does not excist"},
                status=400,
            )
    elif request.method == "DELETE":
        try:
            count, _ = Salesperson.objects.filter(employee_id=employee_id).delete()
            return JsonResponse({"deleted": count > 0})
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "does not exist"})


@require_http_methods({"GET", "POST"})
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerListEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerDetailEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer"},
                status=400,
            )


@require_http_methods(["DELETE", "GET"])
def api_show_customer(request, pk):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=CustomerDetailEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer"},
                status=400,
            )
    elif request.method == "DELETE":
        try:
            count, _ = Customer.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except Customer.DoesNotExist:
            return JsonResponse({"message": "does not exist"})


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesListEncoder,
            safe=False,
        )
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            vin = content["automobile"]
            salesperson_id = content["salesperson"]
            customer_id = content["customer"]

            # Check if the automobile exists
            try:
                automobile = AutomobileVO.objects.get(vin=vin)
            except AutomobileVO.DoesNotExist:
                return JsonResponse(
                    {"message": "Automobile does not exist"},
                    status=404,
                )

            # Check if the salesperson exists
            try:
                salesperson = Salesperson.objects.get(id=salesperson_id)
            except Salesperson.DoesNotExist:
                return JsonResponse(
                    {"message": "Invalid salesperson"},
                    status=404,
                )

            # Check if the customer exists
            try:
                customer = Customer.objects.get(id=customer_id)
            except Customer.DoesNotExist:
                return JsonResponse(
                    {"message": "Invalid customer"},
                    status=404,
                )

            # Create the Sale
            sale = Sale.objects.create(
                price=content["price"],
                automobile=automobile,
                salesperson=salesperson,
                customer=customer,
            )

            return JsonResponse(
                sale,
                encoder=SalesListEncoder,
                safe=False,
            )

        except json.JSONDecodeError as e:
            return JsonResponse(
                {"message": "Invalid JSON data", "error": str(e)},
                status=400,
            )
    else:
        return JsonResponse(
            {"message": "Method Not Allowed"},
            status=405,
            )


@require_http_methods(["DELETE", "GET"])
def api_show_sale(request, pk):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=pk)
            return JsonResponse(
                sale,
                encoder=SalesDetailEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Sale does not exist"},
                status=404,
            )

    elif request.method == "DELETE":
        try:
            count, _ = Sale.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except Sale.DoesNotExist:
            return JsonResponse({"message": "Does not exist"}, status=404)
