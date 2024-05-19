from src.file_module import save_to_file
from src.sorting_module import bucket_sort
from src.utils_module import display_info, display_menu, fill_array, is_file_not_exist


def main():
    display_info()

    while True:
        main_menu_options = {"1": "Начать", "2": "Выход"}

        main_choice = display_menu("Меню", main_menu_options)

        if main_choice == "Начать":
            array = []

            array = fill_array(array)

            if array is None:
                continue

            print("\nМассив до сортировки:")
            print(*array)

            array = bucket_sort(array, 5)

            print("\nМассив после сортировки:")
            print(*array)

            save_menu_options = {"1": "Сохранить результат в файл", "2": "Продолжить"}

            save_choice = display_menu("Выберите действие", save_menu_options)

            if save_choice == "Сохранить результат в файл":
                file_name = input("\nВведите название файла: ")

                if not file_name.endswith(".txt"):
                    file_name += ".txt"

                if not is_file_not_exist(file_name):
                    overwrite_choice = input(
                        f"Файл '{file_name}' уже существует. Хотите перезаписать его? (y/n): "
                    ).lower()
                    if overwrite_choice != "y":
                        print("Сохранение отменено.")
                        continue

                save_to_file(array, file_name)

            elif save_choice == "Продолжить":
                continue

        elif main_choice == "Выход":
            print("Завершение программы.")
            exit(0)


if __name__ == "__main__":
    main()
