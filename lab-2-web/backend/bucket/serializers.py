from rest_framework import serializers
from .models import Array


class ArraySerializer(serializers.ModelSerializer):
    """
    Serializer for the Array model.

    Uses rest_framework.ModelSerializer for automatic
    serializer generation based on the Array model.

    Attributes:
    - model (class): The model on which the serializer will be based.
    - fields (list, optional): A list of fields to be serialized.
        If not specified, all fields of the model will be serialized.
    """

    class Meta:
        model = Array
        fields = "__all__"
