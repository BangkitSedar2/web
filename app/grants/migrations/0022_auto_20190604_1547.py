# Generated by Django 2.1.2 on 2019-02-21 20:48

import logging
from django.db import migrations
from grants.models import Grant

logger = logging.getLogger(__name__)

def forwards(apps, schema_editor):
    pass

def backwards(apps, schema_editor):
    pass

class Migration(migrations.Migration):

    dependencies = [
        ('grants', '0021_clrmatch'),
    ]

    operations = [
            migrations.RunPython(forwards, backwards),
    ]

