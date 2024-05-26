# Импортируем модуль models из библиотеки django.db.
# Модуль models предоставляет инструменты для определения моделей данных.
from django.db import models


# Определяем класс Array, который наследуется от models.Model.
# Класс Array представляет собой модель данных, которая будет храниться в базе данных.
class Array(models.Model):
    """
    # Документация модели Array.
    Model for storing an array in the database.

    # Описание полей модели.
    Fields:
    - data: Array of data in JSON format.
    - is_sorted: Flag indicating whether the array is sorted.
    - creation_date: Date and time of record creation.
    - update_date: Date and time of the last record update.
    """

    # Определяем поле 'data' типа JSONField.
    # JSONField используется для хранения данных в формате JSON.
    # В данном случае поле 'data' будет хранить массив данных.
    data = models.JSONField()
    
    # Определяем поле 'is_sorted' типа BooleanField со значением по умолчанию False.
    # BooleanField используется для хранения булевых значений (True/False).
    # В данном случае поле 'is_sorted' указывает, отсортирован ли массив данных.
    is_sorted = models.BooleanField(default=False)
    
    # Определяем поле 'creation_date' типа DateTimeField с автоматическим добавлением времени создания записи.
    # DateTimeField используется для хранения даты и времени.
    # auto_now_add=True указывает, что при создании новой записи в это поле будет автоматически записываться текущая дата и время.
    creation_date = models.DateTimeField(auto_now_add=True)
    
    # Определяем поле 'update_date' типа DateTimeField с автоматическим обновлением времени при каждом обновлении записи.
    # auto_now=True указывает, что при каждом обновлении записи в это поле будет автоматически записываться текущая дата и время.
    update_date = models.DateTimeField(auto_now=True)