# Generated by Django 4.0.5 on 2022-06-08 10:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0003_remove_listing_floor_remove_listing_year_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='listing',
            name='floor',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
