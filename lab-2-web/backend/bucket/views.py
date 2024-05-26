# Импортируем модуль json для работы с данными в формате JSON.
import json

# Импортируем функцию get_object_or_404 из django.shortcuts.
# Эта функция используется для получения объекта из базы данных по его первичному ключу (pk) или возврата ошибки 404, если объект не найден.
from django.shortcuts import get_object_or_404

# Импортируем модуль time для измерения времени выполнения сортировки.
import time

# Импортируем timezone из django.utils для работы с датой и временем.
from django.utils import timezone

# Импортируем класс JsonResponse из django.http для формирования ответов в формате JSON.
from django.http import JsonResponse

# Импортируем декоратор api_view из rest_framework.decorators.
# Этот декоратор используется для определения функций-представлений, которые будут обрабатывать API-запросы.
from rest_framework.decorators import api_view

# Импортируем модель Array из models.py текущего приложения.
from .models import Array

# Импортируем функцию bucket_sort из sorting.py текущего приложения.
from .sorting import bucket_sort

# Задаем константу BUCKET_SIZE, которая определяет количество корзин, используемых для блочной сортировки.
BUCKET_SIZE = 5


# Декорируем функцию sort_view декоратором api_view(['POST']).
# Это означает, что функция будет обрабатывать только POST-запросы к URL-адресу, связанному с этой функцией.
@api_view(["POST"])
def sort_view(request):
    """
    # Документация для функции sort_view.
    Sorts an array provided in the body of a POST request.

    # Описание параметров функции.
    Parameters:
    - request (HttpRequest): Django request object.

    # Описание возвращаемого значения.
    Returns:
    - JsonResponse: JSON response with the sorted array
        and execution time.

    # Описание возможных исключений.
    Raises:
    - JsonResponse: JSON response with an error message.
    """
    # Блок try-except для обработки возможных ошибок при чтении JSON-данных из тела запроса.
    try:
        # Пытаемся декодировать JSON-данные из тела запроса (request.body).
        data = json.loads(request.body)
        # Извлекаем значение ключа 'id' из декодированных данных. 
        # Если ключ 'id' отсутствует, то array_id будет равен None.
        array_id = data.get("id", None)
    except json.JSONDecodeError:
        # Если произошла ошибка декодирования JSON, возвращаем JsonResponse с сообщением об ошибке и статусом 400 (Bad Request).
        return JsonResponse(
            {"error": "Неверный формат JSON в теле запроса."}, status=400
        )

    # Пытаемся получить объект Array из базы данных по его первичному ключу (array_id). 
    # Если объект не найден, то get_object_or_404 вернет ошибку 404 (Not Found).
    array = get_object_or_404(Array, pk=array_id)

    # Получаем данные массива из поля 'data' объекта Array.
    array_data = array.data

    # Записываем текущее время в переменную start_time.
    start_time = timezone.now()

    # Сортируем массив array_data с помощью функции bucket_sort, используя константу BUCKET_SIZE для определения количества корзин.
    sorted_array = bucket_sort(array_data, BUCKET_SIZE)

    # Записываем текущее время в переменную end_time.
    end_time = timezone.now()

    # Обновляем данные массива в объекте Array.
    array.data = sorted_array

    # Устанавливаем флаг 'is_sorted' в True, указывая, что массив отсортирован.
    array.is_sorted = True

    # Сохраняем изменения в объекте Array в базе данных.
    array.save()

    # Вычисляем время выполнения сортировки в миллисекундах и округляем до 4 знаков после запятой.
    execution_time = round((end_time - start_time).total_seconds() * 1000, 4)

    # Возвращаем JsonResponse с отсортированным массивом и временем выполнения сортировки.
    return JsonResponse({"data": array.data, "execution_time": execution_time})