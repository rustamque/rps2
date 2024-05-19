def input_file(file_name, show_errors=True):
    """
    Загружает элементы массива из файла.

    Параметры:
        file_name (str): Имя файла, содержащего элементы массива.
        show_errors (bool): Определяет, выводить ли ошибки в консоль.

    Возвращает:
        list: Массив целых чисел из файла, если загрузка успешна; None в случае ошибки.
    """
    try:
        with open(file_name, "r") as file:
            data = [line.strip() for line in file]
            return [int(item) for item in data]
    except FileNotFoundError:
        if show_errors:
            print(f"Ошибка: Файл '{file_name}' не найден.")
        return None
    except ValueError:
        if show_errors:
            print(
                f"Ошибка: Неверный формат данных в файле '{file_name}'. Ожидались целые числа."
            )
        return None
    except Exception:
        if show_errors:
            print(f"Произошла непредвиденная ошибка при чтении файла '{file_name}'.")
        return None


def save_to_file(array, file_name):
    """
    Сохраняет элементы массива в файл.

    Параметры:
        array (list): Массив целых чисел.
        file_name (str): Имя файла, в который следует сохранить элементы массива.
    """
    try:
        with open(file_name, "w") as file:
            file.writelines([str(element) + "\n" for element in array])
    except PermissionError:
        print(f"Ошибка: Недостаточно прав для записи в файл '{file_name}'.")
    except Exception:
        print(f"Произошла непредвиденная ошибка при записи в файл '{file_name}'.")

    print(f"Данные успешно сохранены в файл '{file_name}'.")
