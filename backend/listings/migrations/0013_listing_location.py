# Generated by Django 4.0.5 on 2022-06-23 16:24

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0012_remove_listing_location'),
    ]

    operations = [
        migrations.AddField(
            model_name='listing',
            name='location',
            field=django.contrib.gis.db.models.fields.PointField(blank=True, null=True, srid=4326),
        ),
    ]
