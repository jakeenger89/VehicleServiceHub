from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
import json
from .models import Salesperson, Sale, Customer, AutomobileVO


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id"
    ]


class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",

    ]


class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]


class SaleListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "salesperson",
        "customer",
    ]
    encoders = {"salesperson": SalespersonEncoder(),
                "customer": CustomerDetailEncoder()}


class SaleDetailEncoder(ModelEncoder):
    model = Sale
    properties = [
        "salesperson",
        "customer",
        "price"
    ]
    encoders = {"salesperson": SalespersonEncoder(),
                "customer": CustomerDetailEncoder()}


@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespersons = Salesperson.objects.all()
        return JsonResponse(
            {"salesperson": salespersons},
            encoder=SalespersonEncoder,
        )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_salesperson_details(request, id):
    if request.method == "GET":
        salesperson = Salesperson.objects.get(id=id)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        count, _ = Salesperson.objects.filter(id=id).delete()
        return JsonResponse(
            {"message": count > 0},
            status=200,
        )


@require_http_methods(["GET", "POST"])
def api_list_customer(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        customers_data = [
            {
                "id": customer.id,
                "first_name": customer.first_name,
                "last_name": customer.last_name,
                "address": customer.address,
                "phone_number": customer.phone_number
            }
            for customer in customers
        ]
        return JsonResponse(
            {"customers": customers_data},
            encoder=CustomerDetailEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            {"id": customer.id, "first_name": customer.first_name, "last_name": customer.last_name},
            encoder=CustomerDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_customer_details(request, id):
    if request.method == "GET":
        customer = Customer.objects.get(id=id)
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerDetailEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse(
            {"message": count > 0},
            status=200,
        )


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        sales_data = [
            {
                "id": sale.id,
                "price": sale.price,
                "automobile": sale.automobile.vin,
                "customer": sale.customer.id,
                "salesperson": sale.salesperson.employee_id,
            }
            for sale in sales
        ]
        return JsonResponse({"sales": sales_data}, encoder=SaleListEncoder)
    elif request.method == "POST":
        content = json.loads(request.body)
        automobile_vin = content["automobile"]
        customer_id = content["customer"]
        salesperson_id = content["salesperson"]

        try:
            # Retrieve the AutomobileVO instance based on the VIN
            automobile = AutomobileVO.objects.get(vin=automobile_vin)
        except AutomobileVO.DoesNotExist:
            return JsonResponse({"message": f"Automobile with VIN {automobile_vin} does not exist"}, status=404)

        try:
            # Retrieve the Customer instance based on the customer_id
            customer = Customer.objects.get(pk=customer_id)
        except Customer.DoesNotExist:
            return JsonResponse({"message": f"Customer with ID {customer_id} does not exist"}, status=404)

        try:
            # Retrieve the Salesperson instance based on the employee ID
            salesperson = Salesperson.objects.get(employee_id=salesperson_id)
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": f"Salesperson with employee ID {salesperson_id} does not exist"}, status=404)

        sale = Sale.objects.create(
            price=content["price"],
            automobile=automobile,
            customer=customer,
            salesperson=salesperson
        )

        return JsonResponse(
            sale,
            encoder=SaleDetailEncoder,
            safe=False
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_sale_details(request, id):
    if request.method == "GET":
        sale = Sale.objects.get(id=id)
        return JsonResponse(
            {"sale": sale},
            encoder=SaleDetailEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        count, _ = Sale.objects.get(id=id).delete()
        return JsonResponse(
            {"message": count > 0},
            status=200,
        )