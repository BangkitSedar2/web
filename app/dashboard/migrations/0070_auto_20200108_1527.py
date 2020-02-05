# Generated by Django 2.2.4 on 2020-01-08 15:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0069_profile_hide_wallet_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='bounty',
            name='chat_channel_id',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='chat_id',
            field=models.CharField(blank=True, db_index=True, max_length=255),
        ),
    ]
