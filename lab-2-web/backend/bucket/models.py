from django.db import models


class Array(models.Model):
    """
    Model for storing an array in the database.

    Fields:
    - data: Array of data in JSON format.
    - is_sorted: Flag indicating whether the array is sorted.
    - creation_date: Date and time of record creation.
    - update_date: Date and time of the last record update.
    """

    data = models.JSONField()
    is_sorted = models.BooleanField(default=False)
    creation_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)
