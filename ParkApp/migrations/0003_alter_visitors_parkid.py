# Generated by Django 4.0 on 2021-12-21 17:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ParkApp', '0002_rename_visitorphone_visitors_visitorphone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='visitors',
            name='ParkId',
            field=models.PositiveSmallIntegerField(),
        ),
    ]
