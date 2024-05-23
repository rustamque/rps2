# Generated by Django 5.0 on 2023-12-09 17:35

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bucket', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='array',
            name='creation_date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='array',
            name='is_sorted',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='array',
            name='update_date',
            field=models.DateTimeField(auto_now=True),
        ),
    ]