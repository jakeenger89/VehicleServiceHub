from django.db import models


# Create your models here.
class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.PositiveSmallIntegerField()


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, default=True)
    sold = models.BooleanField(default=False)
    import_href = models.CharField(max_length=200, unique=True)


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=100)
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Technician,
        related_name="appointment",
        on_delete=models.CASCADE,
    )
