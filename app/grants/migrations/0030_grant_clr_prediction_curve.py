# Generated by Django 2.2.4 on 2019-09-19 11:09

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('grants', '0029_auto_20190830_1613'),
    ]

    operations = [
        migrations.AddField(
            model_name='grant',
            name='clr_prediction_curve',
            field=django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=models.FloatField(), size=2), blank=True, default=list, help_text='5 point curve to predict CLR donations.', size=None),
        ),
    ]
