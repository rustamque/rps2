# Импортируем класс AppConfig из модуля django.apps. 
# AppConfig используется для настройки приложения Django.
from django.apps import AppConfig


# Создаем класс BucketConfig, унаследованный от AppConfig. 
# Этот класс используется для настройки приложения "bucket".
class BucketConfig(AppConfig):
    # Устанавливаем значение по умолчанию для поля 'default_auto_field' равным 'django.db.models.BigAutoField'. 
    # Это определяет тип первичного ключа, который будет автоматически создаваться для моделей в этом приложении.
    # BigAutoField - это тип данных для автоинкрементного первичного ключа, который может хранить большие числа.
    default_auto_field = 'django.db.models.BigAutoField'
    
    # Задаем имя приложения как 'bucket'. 
    # Это имя используется Django для идентификации и загрузки приложения.
    name = 'bucket'