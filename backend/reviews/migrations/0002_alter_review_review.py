# Generated by Django 4.0.5 on 2022-07-01 15:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='review',
            field=models.TextField(blank=True, max_length=2000, null=True),
        ),
    ]
