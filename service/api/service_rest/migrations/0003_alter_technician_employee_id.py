# Generated by Django 4.0.3 on 2023-10-24 19:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0002_alter_automobilevo_vin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='technician',
            name='employee_id',
            field=models.PositiveSmallIntegerField(max_length=200),
        ),
    ]