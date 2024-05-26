# Импортируем модули pagination и viewsets из библиотеки rest_framework.
# - pagination: Предоставляет классы для пагинации (разбиения на страницы) результатов запросов.
# - viewsets: Предоставляет классы для создания наборов представлений (viewsets), которые объединяют логику обработки родственных API-запросов.
from rest_framework import pagination, viewsets

# Импортируем модель Array из models.py текущего приложения.
from .models import Array

# Импортируем сериализатор ArraySerializer из serializers.py текущего приложения.
from .serializers import ArraySerializer


# Определяем класс ArrayAdapterViewSet, который наследуется от viewsets.ModelViewSet.
# - viewsets.ModelViewSet - это класс, который предоставляет набор готовых представлений для выполнения CRUD (Create, Read, Update, Delete) операций над моделями Django.
class ArrayAdapterViewSet(viewsets.ModelViewSet):
    """
    # Документация для класса ArrayAdapterViewSet.
    API viewset for performing CRUD operations on Array objects.

    # Описание атрибутов класса.
    Attributes:
        queryset (QuerySet): Set of Array objects available for use in the API.
        serializer_class (Serializer): Serializer class used for Array objects.
        pagination_class (Pagination): Pagination class for splitting the resulting dataset.
    """

    # Определяем набор объектов модели Array, которые будут доступны для API.
    # Array.objects.all() выбирает все объекты из модели Array, 
    # .order_by("id") упорядочивает их по возрастанию первичного ключа (id).
    queryset = Array.objects.all().order_by("id")

    # Указываем класс сериализатора, который будет использоваться для преобразования объектов Array в JSON и обратно.
    serializer_class = ArraySerializer

    # Указываем класс пагинации, который будет использоваться для разбиения результатов запросов на страницы.
    # pagination.PageNumberPagination - это класс пагинации, который разбивает результаты на страницы с определенным количеством объектов на каждой странице.
    pagination_class = pagination.PageNumberPagination