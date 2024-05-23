from rest_framework import pagination, viewsets

from .models import Array
from .serializers import ArraySerializer


class ArrayAdapterViewSet(viewsets.ModelViewSet):
    """
    API viewset for performing CRUD operations on Array objects.

    Attributes:
        queryset (QuerySet): Set of Array objects available for use in the API.
        serializer_class (Serializer): Serializer class used for Array objects.
        pagination_class (Pagination): Pagination class for splitting the resulting dataset.
    """

    queryset = Array.objects.all().order_by("id")
    serializer_class = ArraySerializer
    pagination_class = pagination.PageNumberPagination
