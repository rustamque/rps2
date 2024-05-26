import { SortNumericDown, CloudUpload, ArrowRepeat } from "react-bootstrap-icons"; // Импортируем иконки "Сортировка", "Облако загрузки" и "Перезагрузка" из библиотеки react-bootstrap-icons.
import ExtractButtonGroup from "../../extract/ExtractButtonGroup"; // Импорт компонента "Группа кнопок" (ExtractButtonGroup).
import ExtractInputField from "../../extract/ExtractInputField"; // Импорт компонента "Поле ввода" (ExtractInputField).
import ExtractTextArea from "../../extract/ExtractTextArea"; // Импорт компонента "Текстовое поле" (ExtractTextArea).
import { Button } from "react-bootstrap"; // Импорт компонента "Кнопка" из библиотеки react-bootstrap.
import React from "react"; // Импорт React для работы с компонентами.

/**
 * Компонент RandomArrayForm позволяет пользователям генерировать случайный массив чисел в заданном диапазоне.
 * Он предоставляет поля ввода для количества элементов, минимального и максимального значений,
 * а также опции для генерации, сохранения в базу данных и сортировки массива.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Array} props.array - Сгенерированный случайный массив чисел.
 * @param {Function} props.setArray - Функция для установки состояния массива.
 * @param {number} props.numElements - Количество элементов для генерации в массиве.
 * @param {Function} props.setNumElements - Функция для установки состояния количества элементов.
 * @param {string} props.minValue - Минимальное значение для генерации случайных чисел.
 * @param {Function} props.setMinValue - Функция для установки состояния минимального значения.
 * @param {string} props.maxValue - Максимальное значение для генерации случайных чисел.
 * @param {Function} props.setMaxValue - Функция для установки состояния максимального значения.
 * @param {string} props.error - Сообщение об ошибке для отображения.
 * @param {Function} props.setError - Функция для установки состояния ошибки.
 * @param {string} props.info - Информационное сообщение для отображения.
 * @param {Function} props.setIsSaving - Функция для установки состояния сохранения.
 * @returns {JSX.Element} Рендеринг компонента RandomArrayForm.
 */
function RandomArrayForm({ // Функция, которая рендерит компонент RandomArrayForm.
    array, // Сгенерированный случайный массив чисел.
    setArray, // Функция для установки состояния массива.
    numElements, // Количество элементов для генерации в массиве.
    setNumElements, // Функция для установки состояния количества элементов.
    minValue, // Минимальное значение для генерации случайных чисел.
    setMinValue, // Функция для установки состояния минимального значения.
    maxValue, // Максимальное значение для генерации случайных чисел.
    setMaxValue, // Функция для установки состояния максимального значения.
    error, // Сообщение об ошибке.
    setError, // Функция для установки состояния ошибки.
    info, // Информационное сообщение.
    setIsSaving, // Функция для установки состояния сохранения.
}) {
    /**
     * Обрабатывает генерацию случайного массива на основе ввода пользователя и обновляет состояние компонента.
     *
     * @function
     * @returns {void}
     */
    const handleAddRandomArray = () => { // Функция, которая обрабатывает генерацию случайного массива.
        const minVal = parseInt(minValue); // Преобразуем минимальное значение в целое число.
        const maxVal = parseInt(maxValue); // Преобразуем максимальное значение в целое число.
        const numElem = parseInt(numElements); // Преобразуем количество элементов в целое число.

        if (isNaN(minVal) || isNaN(numElem)) { // Проверяем, являются ли минимальное и максимальное значения числами.
            setError("Минимальное и максимальное значения должны быть числами.");
            return; // Если не являются числами, устанавливаем сообщение об ошибке и выходим из функции.
        }

        if (numElem <= 0) { // Проверяем, что количество элементов больше 0.
            setError("Количество элементов должно быть больше 0.");
            return; // Если количество элементов меньше или равно 0, устанавливаем сообщение об ошибке и выходим из функции.
        }

        if (numElem >= 3000000) { // Проверяем, что количество элементов не превышает 3 миллиона.
            setError("Генерация ограничена 3 миллионами элементов.");
            return; // Если количество элементов больше или равно 3 миллионам, устанавливаем сообщение об ошибке и выходим из функции.
        }

        if (minVal >= maxVal) { // Проверяем, что максимальное значение больше минимального.
            setError("Максимальное значение должно быть больше минимального.");
            return; // Если максимальное значение меньше или равно минимальному, устанавливаем сообщение об ошибке и выходим из функции.
        }

        const randomArray = Array.from({ length: numElem }, () => { // Генерируем случайный массив.
            const randomElement = Math.floor( // Генерируем случайный элемент в диапазоне от минимального до максимального.
                Math.random() * (maxVal - minVal + 1) + minVal,
            );
            return randomElement.toString(); // Преобразуем случайный элемент в строку.
        });

        setArray(randomArray); // Устанавливаем состояние массива.
        setError(null); // Сбрасываем сообщение об ошибке.
    };

    return (
        <>
            <p>
                Этот метод генерирует случайный массив чисел в заданном диапазоне.
                <br />
                Введите количество элементов, минимальное и максимальное значение для
                генерации случайных чисел.
                <br />
                Нажмите кнопку "Сгенерировать массив", чтобы создать случайный массив.
            </p>
            <ExtractTextArea
                controlId="random-array"
                label="Случайный массив:"
                value={array.join(", ")}
                rows={4}
                disabled 
            />
            <ExtractInputField
                controlId="num-elements"
                label="Количество элементов:"
                value={numElements}
                onChange={(e) => setNumElements(e.target.value)} 
                type="number"
                step="0"
                min="1" 
            />
            <ExtractInputField
                controlId="min-value"
                label="Минимальное значение:"
                value={minValue}
                onChange={(e) => setMinValue(e.target.value)} 
                type="number"
                step="0"
            />
            <ExtractInputField
                controlId="max-value"
                label="Максимальное значение:"
                value={maxValue}
                onChange={(e) => setMaxValue(e.target.value)} 
                type="number"
                step="0"
            />
            {error && <p className="text-danger text-end">{error}</p>} 
            {info && <p className="text-primary text-end">{info}</p>} 
            <ExtractButtonGroup> 
                <Button
                    variant="secondary" 
                    onClick={handleAddRandomArray} 
                    className="d-flex align-items-center gap-1" 
                >
                    <ArrowRepeat /> Сгенерировать 
                </Button>
                <Button
                    variant="info" 
                    type="submit" 
                    className="d-flex align-items-center gap-1"
                    onClick={() => setIsSaving(true)} 
                    disabled={array.length === 0} 
                >
                    <CloudUpload /> Сохранить в базу 
                </Button>
                <Button
                    variant="primary" 
                    type="submit"
                    className="d-flex align-items-center gap-1" 
                    disabled={array.length === 0} 
                >
                    <SortNumericDown /> Отсортировать 
                </Button>
            </ExtractButtonGroup>
        </>
    );
}

export default RandomArrayForm; 