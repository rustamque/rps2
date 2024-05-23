import json
from django.shortcuts import get_object_or_404
import time

from django.utils import timezone
from django.http import JsonResponse
from rest_framework.decorators import api_view

from .models import Array
from .sorting import bucket_sort


BUCKET_SIZE = 5


@api_view(["POST"])
def sort_view(request):
    """
    Sorts an array provided in the body of a POST request.

    Parameters:
    - request (HttpRequest): Django request object.

    Returns:
    - JsonResponse: JSON response with the sorted array
        and execution time.

    Raises:
    - JsonResponse: JSON response with an error message.
    """
    try:
        data = json.loads(request.body)
        array_id = data.get("id", None)
    except json.JSONDecodeError:
        return JsonResponse(
            {"error": "Неверный формат JSON в теле запроса."}, status=400
        )

    array = get_object_or_404(Array, pk=array_id)
    array_data = array.data

    start_time = timezone.now()
    sorted_array = bucket_sort(array_data, BUCKET_SIZE)
    end_time = timezone.now()

    array.data = sorted_array
    array.is_sorted = True
    array.save()

    execution_time = round((end_time - start_time).total_seconds() * 1000, 4)

    return JsonResponse({"data": array.data, "execution_time": execution_time})
