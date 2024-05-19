import os

from src.input_module import input_keyboard, input_random
from src.file_module import input_file


def display_info():
    """
    Выводит информацию о программе.
    """
    print("Лабораторная работа #2, вариант 8")
    print("И. С. Рябченко, группа 425, СПбГТИ (ТУ)")
    print("Цель работы:")
    print("Разработка программы блочной сортировки (Bucket Sort).")


def display_menu(title, options, prompt="> "):
    """
    Отображает меню с заданными параметрами и позволяет пользователю выбрать опцию.

    Параметры:
        title (str): Заголовок меню.
        options (dict): Словарь опций, где ключи - это символы выбора, а значения - описания опций.
        prompt (str): Приглашение для ввода выбора пользователем.

    Возвращает:
        Выбранную опцию (значение из словаря options).
    """
    while True:
        print(f"\n{title}:")
        for key, value in options.items():
            print(f"{key}. {value}")

        choice = input(prompt)

        if choice in options:
            return options[choice]
        else:
            print("\nВведите существующий пункт меню.")


def fill_array(array):
    """
    Заполняет массив в соответствии с выбором пользователя.

    Параметры:
        array (list): Массив для заполнения.

    Возвращает:
        list: Заполненный массив или None в случае ошибки.
    """
    method_menu_options = {
        "1": "Заполнить случайными значениями",
        "2": "Заполнить с клавиатуры",
        "3": "Заполнить из файла",
    }

    method_choice = display_menu("Выберите действие", method_menu_options)

    if method_choice == "Заполнить случайными значениями":
        num_elements = get_positive_number()
        array = input_random(num_elements)

    elif method_choice == "Заполнить с клавиатуры":
        num_elements = get_positive_number()
        array = input_keyboard(num_elements)

    elif method_choice == "Заполнить из файла":
        file_name = input("\nВведите название файла: ")

        array = input_file(file_name)

        if array is None:
            print("Некорректный файл. Проверьте существование файла и данные в нём.")
            return None

    return array


def get_positive_number(prompt="\nВведите количество элементов: "):
    """
    Получает положительное целое число от пользователя.

    Параметры:
        prompt (str): Приглашение для ввода.

    Возвращает:
        int: Положительное целое число.
    """
    while True:
        try:
            choice = int(input(prompt))

            if choice > 0:
                return choice
            else:
                print("\nЧисло должно быть больше нуля.")
        except ValueError:
            print("\nВведите корректное целое положительное число.")


def is_file_not_exist(file_name):
    """
    Проверяет, существует ли файл с указанным именем.

    Параметры:
        file_name (str): Имя файла.

    Возвращает:
        bool: True, если файл не существует; False, если файл уже существует.
    """
    return not os.path.exists(file_name)


def ensure_directory_exists(dir_path):
    """
    Проверяет существование директории по указанному пути.
    Если директория не существует, создает её.

    Параметры:
        dir_path (str): Путь к директории для проверки и создания.

    Возвращает:
        bool: True, если директория существует или была успешно создана, иначе False.
    """
    if os.path.exists(dir_path):
        return True
    else:
        try:
            os.makedirs(dir_path)
            return True
        except Exception:
            return False
