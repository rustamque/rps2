# Импортируем модуль serializers из библиотеки rest_framework.
# Модуль serializers предоставляет инструменты для создания сериализаторов.
from rest_framework import serializers

# Импортируем модель Array из текущего приложения (models.py).
from .models import Array


# Определяем класс ArraySerializer, наследуемый от serializers.ModelSerializer.
# serializers.ModelSerializer - это класс для автоматической генерации сериализаторов на основе моделей Django.
class ArraySerializer(serializers.ModelSerializer):
    """
    # Документация для сериализатора ArraySerializer.
    Serializer for the Array model.

    # Описание, как работает сериализатор.
    Uses rest_framework.ModelSerializer for automatic
    serializer generation based on the Array model.

    # Описание атрибутов класса Meta.
    Attributes:
    - model (class): The model on which the serializer will be based.
    - fields (list, optional): A list of fields to be serialized.
        If not specified, all fields of the model will be serialized.
    """

    # Определяем класс Meta внутри класса ArraySerializer.
    # Класс Meta используется для настройки метаданных сериализатора.
    class Meta:
        # Указываем модель, на основе которой будет создан сериализатор (model = Array).
        model = Array
        # Указываем, что сериализатор должен обрабатывать все поля модели (fields = "__all__").
        fields = "__all__"