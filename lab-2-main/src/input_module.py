import random


def input_random(num_elements, min_value=1, max_value=1000):
    """
    Генерирует массив случайных целых чисел.

    Параметры:
        num_elements (int): Количество элементов в массиве.
        min_value (int): Минимальное значение случайных чисел (по умолчанию 1).
        max_value (int): Максимальное значение случайных чисел (по умолчанию 1000).

    Возвращает:
        Массив случайных целых чисел.
    """
    return [random.randint(min_value, max_value) for _ in range(num_elements)]


def input_keyboard(num_elements):
    """
    Позволяет пользователю ввести массив с клавиатуры.

    Параметры:
        num_elements (int): Количество элементов для ввода.

    Возвращает:
        user_input (list): Массив, введенный пользователем.
    """
    user_input = []
    for _ in range(1, num_elements + 1):
        while True:
            try:
                value = int(input(f"[{len(user_input) + 1}] = "))
                user_input.append(value)
                break
            except ValueError:
                print("Неправильный ввод! Введите целочисленное значение.")
    return user_input
