# Определяем функцию bucket_sort, которая принимает два аргумента: массив (array) и количество корзин (n).
def bucket_sort(array, n):
    """
    # Документация функции bucket_sort.
    Sorts an array using the Bucket Sort algorithm.

    # Описание параметров функции.
    Parameters:
    - array (list): The input array to be sorted.
    - n (int): The number of buckets used for sorting.

    # Описание возвращаемого значения.
    Returns:
    list: The sorted array.
    """
    # Если массив пустой, возвращаем его без изменений.
    if not array:
        return array

    # Находим минимальное и максимальное значение в массиве с помощью функции get_min_max.
    min_value, max_value = get_min_max(array)

    # Если минимальное значение равно максимальному, то массив уже отсортирован, возвращаем его.
    if min_value == max_value:
        return array

    # Создаем список корзин (buckets) размером n, каждая корзина представляет собой пустой список.
    buckets = [[] for _ in range(n)]

    # Распределяем элементы массива по корзинам.
    # Для каждого элемента вычисляем индекс корзины на основе его значения, минимального и максимального значения, 
    # и добавляем элемент в соответствующую корзину.
    for item in array:
        buckets[(n * (item - min_value)) // (max_value - min_value + 1)].append(item)

    # Сортируем элементы в каждой корзине.
    # Если в корзине меньше или равно 32 элементов, используем сортировку вставками (insertion_sort), 
    # иначе рекурсивно вызываем bucket_sort для сортировки корзины.
    for bucket in buckets:
        if len(bucket) <= 32:
            insertion_sort(bucket)
        else:
            bucket_sort(bucket, n)

    # Объединяем отсортированные корзины в исходный массив.
    array[:] = [item for bucket in buckets for item in bucket]

    # Возвращаем отсортированный массив.
    return array


# Определяем функцию insertion_sort, которая принимает один аргумент: массив (array).
def insertion_sort(array):
    """
    # Документация функции insertion_sort.
    Sorts an array using the Insertion Sort algorithm.

    # Описание параметров функции.
    Parameters:
    - array (list): The input array to be sorted.

    # Описание возвращаемого значения.
    Returns:
    list: The sorted array.
    """
    # Проходим по массиву, начиная со второго элемента (индекс 1).
    for i in range(1, len(array)):
        # Сохраняем текущий элемент в переменную element.
        element = array[i]
        # Инициализируем переменную pos, которая будет указывать на индекс предыдущего элемента.
        pos = i - 1

        # Сравниваем текущий элемент с предыдущими элементами и сдвигаем элементы вправо, 
        # пока не найдем подходящее место для текущего элемента.
        while pos >= 0 and array[pos] > element:
            array[pos + 1] = array[pos]
            pos -= 1

        # Вставляем текущий элемент на найденное место.
        array[pos + 1] = element
    # Возвращаем отсортированный массив.
    return array


# Определяем функцию get_min_max, которая принимает один аргумент: массив (array).
def get_min_max(array):
    """
    # Документация функции get_min_max.
    Finds the minimum and maximum values in an array.

    # Описание параметров функции.
    Parameters:
    - array (list): The input array.

    # Описание возвращаемого значения.
    Returns:
    tuple: A tuple containing the minimum and maximum values
        in the array, or (None, None) if the array is empty.
    """
    # Если массив пустой, возвращаем (None, None).
    if not array:
        return None, None

    # Инициализируем минимальное и максимальное значение первым элементом массива.
    min_value = max_value = array[0]

    # Проходим по массиву и обновляем минимальное и максимальное значение при необходимости.
    for item in array:
        if item < min_value:
            min_value = item
        elif item > max_value:
            max_value = item

    # Возвращаем минимальное и максимальное значение в виде кортежа.
    return min_value, max_value