import random
import timeit
import pytest

from bucket.sorting import bucket_sort
from bucket.models import Array


class TestDatabaseOperations:
    @staticmethod
    def create_random_arrays(num_arrays, array_size=10):
        """
        Create a list of random Array objects.

        Parameters:
        - num_arrays (int): The number of Array objects to create.
        - array_size (int, optional): The size of each array. Defaults to 10.

        Returns:
        list: List of Array objects with random data.
        """
        return [
            Array(data=[random.randint(1, 1000) for _ in range(array_size)])
            for _ in range(num_arrays)
        ]

    @pytest.mark.django_db
    @pytest.mark.parametrize("num_arrays", [100, 1000, 10000])
    def test_add_arrays(self, num_arrays):
        """
        Test adding random arrays to the database.

        Parameters:
        - num_arrays (int): The number of arrays to add to the database.
        """
        arrays = self.create_random_arrays(num_arrays, 10)

        def test_function():
            """
            Function to execute the test case.
            """
            for array in arrays:
                array.save()
            assert Array.objects.count() == num_arrays

        execution_time = timeit.timeit(test_function, number=1)
        print(f"\nTest add {num_arrays} execution time: {execution_time:.5f} seconds")

    @pytest.mark.django_db
    @pytest.mark.parametrize("num_arrays", [100, 1000, 10000])
    def test_sort_arrays(self, num_arrays):
        """
        Test sorting random arrays.

        Parameters:
        - num_arrays (int): The number of arrays to add, sort, and check in the database.
        """
        arrays = self.create_random_arrays(num_arrays, 10)

        def test_function():
            """
            Function to execute the test case.
            """
            for array in arrays:
                array.save()

            arrays_db = Array.objects.all()

            for array in arrays_db:
                bucket_sort(array.data, 5)

            for array in arrays_db:
                assert array.data == sorted(array.data)

        execution_time = timeit.timeit(test_function, number=1)
        avg_time = execution_time / num_arrays
        print(f"\nTest sort {num_arrays} execution time: {execution_time:.5f} seconds")
        print(f"Avg time for {num_arrays}: {avg_time:.5f} seconds")

    @pytest.mark.django_db
    @pytest.mark.parametrize("num_arrays", [100, 1000, 10000])
    def test_clear_database(self, num_arrays):
        """
        Test clearing the database.

        Parameters:
        - num_arrays (int): The number of arrays to add and then clear from the database.
        """
        arrays = self.create_random_arrays(num_arrays, 10)

        def test_function():
            """
            Function to execute the test case.
            """
            for array in arrays:
                array.save()

            Array.objects.all().delete()

            assert Array.objects.count() == 0

        execution_time = timeit.timeit(test_function, number=1)
        print(f"\nTest clear {num_arrays} execution time: {execution_time:.5f} seconds")
