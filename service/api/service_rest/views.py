from django.shortcuts import render
from common.json import ModelEncoder
from .models import Technician, AutomobileVO, Appointment
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

# Create your views here.


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["id", "import_href", "vin", "sold"]


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "employee_id",
        "first_name",
        "last_name",
        "id",
    ]


class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "vin",
        "customer",
        "technician",
        "status",
        "id",
    ]

    encoders = {
        "technician": TechnicianDetailEncoder(),
    }


class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = ["date_time", "reason", "status", "vin", "customer", "technician"]

    encoders = {
        "technician": TechnicianDetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder,
        )
    else:  # POST
        content = json.loads(request.body)
        try:
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse({"message": "not a valid technician"}, status=400)


@require_http_methods(["DELETE"])
def api_show_technicians(request, pk):
    if request.method == "DELETE":
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_list_appointments(request, technician_id=None):
    if request.method == "GET":
        if technician_id is not None:
            appointments = Appointment.objects.get(technician=technician_id)
        else:
            appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
        )
    else:  # POST
        content = json.loads(request.body)
        try:
            technician_id = content["technician"]
            technician = Technician.objects.get(id=technician_id)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Invalid technician"}, status=400)
        content["status"] = "created"
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "POST"])
def api_show_appointments(request, pk):
    if request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["PUT"])
def api_cancel_appointment(request, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.status = "canceled"
    appointment.save()
    return JsonResponse(
        appointment,
        encoder=AppointmentDetailEncoder,
        safe=False,
    )


@require_http_methods(["PUT"])
def api_finish_appointment(request, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.status = "finished"
    appointment.save()
    return JsonResponse(
        appointment,
        encoder=AppointmentDetailEncoder,
        safe=False,
    )
