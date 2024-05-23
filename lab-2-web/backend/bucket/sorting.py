def bucket_sort(array, n):
    """
    Sorts an array using the Bucket Sort algorithm.

    Parameters:
    - array (list): The input array to be sorted.
    - n (int): The number of buckets used for sorting.

    Returns:
    list: The sorted array.
    """
    if not array:
        return array

    min_value, max_value = get_min_max(array)

    if min_value == max_value:
        return array

    buckets = [[] for _ in range(n)]

    for item in array:
        buckets[(n * (item - min_value)) // (max_value - min_value + 1)].append(item)

    for bucket in buckets:
        if len(bucket) <= 32:
            insertion_sort(bucket)
        else:
            bucket_sort(bucket, n)

    array[:] = [item for bucket in buckets for item in bucket]

    return array


def insertion_sort(array):
    """
    Sorts an array using the Insertion Sort algorithm.

    Parameters:
    - array (list): The input array to be sorted.

    Returns:
    list: The sorted array.
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
    Finds the minimum and maximum values in an array.

    Parameters:
    - array (list): The input array.

    Returns:
    tuple: A tuple containing the minimum and maximum values
        in the array, or (None, None) if the array is empty.
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
