# Импортируем функции include и path из модуля django.urls.
# - include: Используется для включения URL-шаблонов из других файлов.
# - path: Используется для определения URL-шаблона и сопоставления его с представлением.
from django.urls import include, path

# Импортируем класс DefaultRouter из rest_framework.routers.
# - DefaultRouter: Используется для автоматической генерации URL-шаблонов для представлений на основе классов (viewsets).
from rest_framework.routers import DefaultRouter

# Импортируем функцию-представление sort_view из файла views.py текущего приложения.
from .views import sort_view

# Импортируем класс-представление ArrayAdapterViewSet из файла viewsets.py текущего приложения.
from .viewsets import ArrayAdapterViewSet

# Создаем экземпляр класса DefaultRouter.
router = DefaultRouter()

# Регистрируем viewset 'ArrayAdapterViewSet' с префиксом 'arrays' и базовым именем 'array'.
# - Это создаст набор URL-адресов для CRUD-операций над моделью "Array".
# - Базовое имя используется для формирования имен URL-шаблонов.
router.register(r"arrays", ArrayAdapterViewSet, basename="array")

# Определяем список URL-шаблонов (urlpatterns) для приложения.
urlpatterns = [
    # Включаем URL-шаблоны, сгенерированные для 'router', с префиксом 'api/'.
    # - Все URL-адреса, связанные с 'ArrayAdapterViewSet', будут доступны по путям, начинающимся с '/api/arrays/'.
    path("api/", include(router.urls)),

    # Определяем URL-шаблон 'api/sort/' и сопоставляем его с функцией-представлением 'sort_view'.
    # - name='sort_view': Задает имя для этого URL-шаблона, которое можно использовать для его обратной маршрутизации (reverse).
    path("api/sort/", sort_view, name="sort_view"),
]