import { SortNumericDown, CloudUpload } from "react-bootstrap-icons"; // Импорт иконок "Сортировка" и "Облако загрузки" из библиотеки react-bootstrap-icons.
import ExtractButtonGroup from "../../extract/ExtractButtonGroup"; // Импорт компонента "Группа кнопок" (ExtractButtonGroup).
import ExtractInputField from "../../extract/ExtractInputField"; // Импорт компонента "Поле ввода" (ExtractInputField).
import ExtractTextArea from "../../extract/ExtractTextArea"; // Импорт компонента "Текстовое поле" (ExtractTextArea).
import { Button } from "react-bootstrap"; // Импорт компонента "Кнопка" из библиотеки react-bootstrap.
import React from "react"; // Импорт React для работы с компонентами.

/**
 * Компонент FileArrayForm позволяет пользователям загрузить массив целых чисел из текстового файла (.txt).
 * Он предоставляет функциональность для чтения и парсинга файла, отображения загруженного массива,
 * а также выполнения действий, таких как сохранение в базу данных и сортировка.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Array} props.array - Массив, представляющий загруженные данные из файла.
 * @param {Function} props.setArray - Функция для установки состояния массива.
 * @param {boolean} props.isFileValid - Флаг, указывающий, является ли загруженный файл допустимым.
 * @param {Function} props.setIsFileValid - Функция для установки состояния допустимости файла.
 * @param {string} props.error - Сообщение об ошибке для отображения.
 * @param {Function} props.setError - Функция для установки состояния ошибки.
 * @param {string} props.info - Информационное сообщение для отображения.
 * @param {Function} props.setIsSaving - Функция для установки состояния сохранения.
 * @returns {JSX.Element} Рендеринг компонента FileArrayForm.
 */
function FileArrayForm({ // Функция, которая рендерит компонент FileArrayForm.
    array, // Массив, представляющий загруженные данные из файла.
    setArray, // Функция для установки состояния массива.
    isFileValid, // Флаг, указывающий, является ли загруженный файл допустимым.
    setIsFileValid, // Функция для установки состояния допустимости файла.
    error, // Сообщение об ошибке.
    setError, // Функция для установки состояния ошибки.
    info, // Информационное сообщение.
    setIsSaving, // Функция для установки состояния сохранения.
}) {
    /**
     * Читает и парсит содержимое загруженного файла.
     *
     * @function
     * @param {File} file - Загруженный файл.
     * @returns {void}
     */
    const readAndParseFile = (file) => { // Функция, которая читает и парсит файл.
        const reader = new FileReader(); // Создаем объект FileReader для чтения файла.
        reader.onload = handleFileLoad; // Устанавливаем обработчик события загрузки файла.
        reader.onerror = handleFileError; // Устанавливаем обработчик события ошибки чтения файла.
        reader.readAsText(file); // Начинаем чтение файла как текст.
    };

    /**
     * Обрабатывает событие загрузки файла, парсит содержимое файла и обновляет состояние компонента.
     *
     * @function
     * @param {Event} event - Событие загрузки файла.
     * @returns {void}
     */
    const handleFileLoad = (event) => { // Функция, которая обрабатывает событие загрузки файла.
        const fileContent = event.target.result; // Извлекаем содержимое файла.
        const parsedArray = parseFileContent(fileContent); // Парсим содержимое файла.

        if (parsedArray.length > 0) { // Если в массиве есть данные, обновляем состояние.
            setArray(parsedArray);
            setIsFileValid(true);
        } else { // Если массив пуст, устанавливаем сообщение об ошибке.
            setError("Файл не содержит допустимых данных.");
            setIsFileValid(false);
        }
    };

    /**
     * Парсит содержимое файла, извлекая допустимые целые числа и отфильтровывая недопустимые.
     *
     * @function
     * @param {string} content - Содержимое файла.
     * @returns {Array} Массив допустимых целых чисел.
     */
    const parseFileContent = (content) => { // Функция, которая парсит содержимое файла, извлекая допустимые целые числа.
        return content
            .split("\n") // Разделяем содержимое файла по строкам.
            .map((line) => { // Преобразуем каждую строку в число.
                const num = parseInt(line.trim());
                return !isNaN(num) ? num : null; // Проверяем, является ли число допустимым, и возвращаем его или null.
            })
            .filter((num) => num !== null); // Фильтруем массив, удаляя null-значения.
    };

    /**
     * Обрабатывает ошибку чтения файла, устанавливая сообщение об ошибке и обновляя состояние допустимости файла.
     *
     * @function
     * @returns {void}
     */
    const handleFileError = () => { // Функция, которая обрабатывает ошибку чтения файла.
        setError("Произошла ошибка при чтении файла.");
        setIsFileValid(false);
    };

    /**
     * Обрабатывает событие изменения, когда выбран новый файл для загрузки.
     *
     * @function
     * @param {Event} e - Событие изменения файла.
     * @returns {void}
     */
    const handleFileChange = (e) => { // Функция, которая обрабатывает изменение выбора файла.
        const selectedFile = e.target.files[0]; // Извлекаем выбранный файл.
        setError(null); // Сбрасываем сообщение об ошибке.

        if (selectedFile) { // Если выбран файл.
            if (selectedFile.name.endsWith(".txt")) { // Проверяем расширение файла.
                readAndParseFile(selectedFile); // Вызываем функцию для чтения и парсинга файла.
            } else { // Если расширение не .txt, устанавливаем сообщение об ошибке.
                setError(
                    "Недопустимый формат файла. Ожидается файл с расширением .txt.",
                );
                setIsFileValid(false);
            }
        }
    };

    return (
        <>
            <p>
                Загрузите массив из целых чисел, используя файл с расширением{" "}
                <strong>.txt</strong>.
                <br />
                Каждая строка в файле должна содержать одно число. Недопустимые строки
                будут проигнорированы.
            </p>
            <ExtractInputField
                controlId="file-upload"
                label="Выберите файл:"
                type="file"
                accept=".txt" 
                onChange={handleFileChange} 
            />
            <ExtractTextArea
                controlId="file-array"
                label="Загруженный массив:"
                value={array.join(", ")} 
                rows={4}
                disabled 
            />
            {error && <p className="text-danger text-end">{error}</p>} 
            {info && <p className="text-primary text-end">{info}</p>} 
            <ExtractButtonGroup> 
                <Button
                    variant="info" 
                    className="d-flex align-items-center gap-1" 
                    type="submit"
                    onClick={() => setIsSaving(true)} 
                    disabled={array.length === 0} 
                >
                    <CloudUpload /> Сохранить в базу 
                </Button>
                <Button
                    variant="primary" 
                    type="submit"
                    className="d-flex align-items-center gap-1" 
                    disabled={!isFileValid || array.length === 0}  
                >
                    <SortNumericDown /> Отсортировать 
                </Button>
            </ExtractButtonGroup>
        </>
    );
}

export default FileArrayForm; 