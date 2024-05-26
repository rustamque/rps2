# test_database.py

# Импортируем необходимые модули.
# random: для генерации случайных чисел.
# timeit: для измерения времени выполнения кода.
# pytest: для написания тестов.
import random
import timeit
import pytest

# Импортируем функцию bucket_sort из модуля sorting.
from bucket.sorting import bucket_sort

# Импортируем модель Array из модуля models.
from bucket.models import Array


# Определяем класс TestDatabaseOperations для группировки тестов, связанных с операциями с базой данных.
class TestDatabaseOperations:
    @staticmethod
    def create_random_arrays(num_arrays, array_size=10):
        """
        # Документация для метода create_random_arrays.
        Create a list of random Array objects.

        # Описание параметров метода.
        Parameters:
        - num_arrays (int): The number of Array objects to create.
        - array_size (int, optional): The size of each array. Defaults to 10.

        # Описание возвращаемого значения.
        Returns:
        list: List of Array objects with random data.
        """
        # Возвращаем список объектов Array, каждый из которых содержит случайный массив чисел.
        return [
            Array(data=[random.randint(1, 1000) for _ in range(array_size)])
            for _ in range(num_arrays)
        ]

    # Помечаем метод test_add_arrays маркерами pytest:
    # - django_db: указывает, что тест требует доступа к базе данных Django.
    # - parametrize: позволяет запускать тест с разными значениями параметров.
    @pytest.mark.django_db
    @pytest.mark.parametrize("num_arrays", [100, 1000, 10000])
    def test_add_arrays(self, num_arrays):
        """
        # Документация для тестового метода test_add_arrays.
        Test adding random arrays to the database.

        # Описание параметров метода.
        Parameters:
        - num_arrays (int): The number of arrays to add to the database.
        """
        # Создаем список случайных массивов.
        arrays = self.create_random_arrays(num_arrays, 10)

        # Определяем функцию test_function, которая будет выполнять тестовый случай.
        def test_function():
            """
            # Документация для функции test_function.
            Function to execute the test case.
            """
            # Сохраняем каждый массив в базу данных.
            for array in arrays:
                array.save()
            # Проверяем, что количество записей в таблице Array равно ожидаемому.
            assert Array.objects.count() == num_arrays

        # Измеряем время выполнения функции test_function.
        execution_time = timeit.timeit(test_function, number=1)
        # Выводим время выполнения теста.
        print(f"\nTest add {num_arrays} execution time: {execution_time:.5f} seconds")

    @pytest.mark.django_db
    @pytest.mark.parametrize("num_arrays", [100, 1000, 10000])
    def test_sort_arrays(self, num_arrays):
        """
        # Документация для тестового метода test_sort_arrays.
        Test sorting random arrays.

        # Описание параметров метода.
        Parameters:
        - num_arrays (int): The number of arrays to add, sort, and check in the database.
        """
        # Создаем список случайных массивов.
        arrays = self.create_random_arrays(num_arrays, 10)

        def test_function():
            """
            # Документация для функции test_function.
            Function to execute the test case.
            """
            # Сохраняем каждый массив в базу данных.
            for array in arrays:
                array.save()

            # Получаем все объекты Array из базы данных.
            arrays_db = Array.objects.all()

            # Сортируем каждый массив в базе данных с помощью bucket_sort.
            for array in arrays_db:
                bucket_sort(array.data, 5)

            # Проверяем, что каждый массив в базе данных отсортирован.
            for array in arrays_db:
                assert array.data == sorted(array.data)

        # Измеряем время выполнения функции test_function.
        execution_time = timeit.timeit(test_function, number=1)
        # Вычисляем среднее время сортировки одного массива.
        avg_time = execution_time / num_arrays
        # Выводим общее время выполнения теста и среднее время сортировки одного массива.
        print(f"\nTest sort {num_arrays} execution time: {execution_time:.5f} seconds")
        print(f"Avg time for {num_arrays}: {avg_time:.5f} seconds")

    @pytest.mark.django_db
    @pytest.mark.parametrize("num_arrays", [100, 1000, 10000])
    def test_clear_database(self, num_arrays):
        """
        # Документация для тестового метода test_clear_database.
        Test clearing the database.

        # Описание параметров метода.
        Parameters:
        - num_arrays (int): The number of arrays to add and then clear from the database.
        """
        # Создаем список случайных массивов.
        arrays = self.create_random_arrays(num_arrays, 10)

        # Определяем функцию test_function, которая будет выполнять тестовый случай.
        def test_function():
            """
            # Документация для функции test_function.
            Function to execute the test case.
            """
            # Сохраняем каждый массив в базу данных.
            for array in arrays:
                array.save()
            # Удаляем все объекты Array из базы данных.
            Array.objects.all().delete()
            # Проверяем, что в базе данных не осталось объектов Array.
            assert Array.objects.count() == 0

        # Измеряем время выполнения функции test_function.
        execution_time = timeit.timeit(test_function, number=1)
        # Выводим время выполнения теста.
        print(f"\nTest clear {num_arrays} execution time: {execution_time:.5f} seconds")