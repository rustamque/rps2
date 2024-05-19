def bucket_sort(array, num_buckets):
    """
    Сортирует массив целых чисел методом блочной сортировки (Bucket Sort).

    Параметры:
        array (list): Массив целых чисел, подлежащий сортировке.
        num_buckets (int): Количество блоков, применяемых в сортировке.

    Возвращает:
        Отсортированный массив sorted_array.
    """
    if not array:
        return []

    min_value, max_value = get_min_max(array)

    if min_value == max_value:
        return array

    buckets = [[] for _ in range(num_buckets)]

    for item in array:
        bucket_index = (num_buckets * (item - min_value)) // (max_value - min_value + 1)
        buckets[bucket_index].append(item)

    for i in range(num_buckets):
        if len(buckets[i]) <= 32:
            insertion_sort(buckets[i])
        else:
            bucket_sort(buckets[i], num_buckets)

    array[:] = [item for bucket in buckets for item in bucket]

    return array


def insertion_sort(array):
    """
    Сортирует массив целых чисел методом вставки (Insertion Sort).

    Параметры:
        array (list): Массив целых чисел, подлежащий сортировке.

    Возвращает:
        Отсортированный массив array.
    """
    for i in range(1, len(array)):
        element = array[i]
        pos = i - 1

        while pos >= 0 and array[pos] > element:
            array[pos + 1] = array[pos]
            pos -= 1

        array[pos + 1] = element
    return array


def get_min_max(array):
    """
    Находит минимальное и максимальное значение в массиве.

    Параметры:
    - array (list): Массив целых чисел.

    Возвращает:
    tuple: Кортеж содержащий минимальные и максимальные значения
        в массиве, или (None, None) если массив пуст.
    """
    if not array:
        return None, None

    min_value = max_value = array[0]

    for item in array:
        if item < min_value:
            min_value = item
        elif item > max_value:
            max_value = item

    return min_value, max_value
