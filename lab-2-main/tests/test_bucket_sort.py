import random
import unittest

from src.sorting_module import bucket_sort
from src.file_module import input_file
from src.input_module import input_random
from src.utils_module import ensure_directory_exists


class TestBucketSort(unittest.TestCase):
    """
    Набор юнит-тестов для проверки функциональности сортировки методом блочной сортировки.
    """

    def setUp(self):
        """
        Устанавливает предусловия для тестов, создавая директорию 'tests', если её нет.
        """
        ensure_directory_exists("tests")

    def _run_test_with_params(self, input_data, expected_sorted_data):
        """
        Запускает тест сортировки с заданными параметрами.

        Параметры:
            input_data (list): Входной массив данных.
            expected_sorted_data (list): Ожидаемый отсортированный массив.

        Возвращает:
            None
        """
        array = input_data
        sorted_array = bucket_sort(array, 5)
        self.assertEqual(
            first=sorted_array,
            second=expected_sorted_data,
            msg=f"Сортировка данных неверна. Входные данные: {input_data}",
        )

    def test_sorting_random(self):
        """
        Тест сортировки массива случайных значений.
        """
        test_arrays = [
            input_random(10),
            input_random(100),
            input_random(1000),
        ]

        test_cases = [
            (test_arrays[0], sorted(test_arrays[0])),
            (test_arrays[1], sorted(test_arrays[1])),
            (test_arrays[2], sorted(test_arrays[2])),
        ]

        for i, (input_data, expected_sorted_data) in enumerate(test_cases, start=1):
            with self.subTest(test_number=i):
                self._run_test_with_params(input_data, expected_sorted_data)

    def test_sorting_file_input(self):
        """
        Тест сортировки массива из файла.
        """
        test_cases = [
            ([random.randint(1, 100) for _ in range(10)],),
            ([random.randint(1000, 10000) for _ in range(100)],),
            ([random.randint(10000, 1000000) for _ in range(1000)],),
        ]

        for i, (input_data,) in enumerate(test_cases, start=1):
            with self.subTest(test_number=i):
                file_name = f"tests/test_input_{i}.txt"
                with open(file_name, "w") as file:
                    file.write("\n".join(map(str, input_data)))

                array = input_file(file_name, show_errors=False)
                expected_sorted_data = sorted(input_data)
                self._run_test_with_params(array, expected_sorted_data)

    def test_sorting_file_wrong_input(self):
        """
        Тест обработки некорректных данных из файла.
        """
        wrong_input_data = [
            "This",
            "is",
            "a",
            "test",
            "for",
            "incorrect",
            "input",
            "%)",
        ]

        file_name = "tests/test_wrong_input.txt"

        with open(file_name, "w") as file:
            file.write("\n".join(wrong_input_data))

        array = input_file(file_name, show_errors=False)
        sorted_array = bucket_sort(array, 5)

        self.assertEqual(sorted_array, [])

    def test_empty_array(self):
        """
        Тест сортировки пустого массива.
        """
        empty_array = []
        sorted_array = bucket_sort(empty_array, 5)
        self.assertEqual(
            first=sorted_array, second=[], msg="Пустой массив не должен измениться."
        )


if __name__ == "__main__":
    unittest.main()
