import { CloudUpload, SortNumericDown } from "react-bootstrap-icons"; // Импортируем иконки из библиотеки react-bootstrap-icons.
import ExtractButtonGroup from "../../extract/ExtractButtonGroup"; // Импорт компонента группы кнопок.
import React, { useCallback, useState, useEffect } from "react"; // Импорт необходимых хуков из React.
import ArrayPagination from "../../pagination/ArrayPagination"; // Импорт компонента пагинации для массивов.
import ExtractTextArea from "../../extract/ExtractInputField"; // Импорт компонента поля ввода.
import ArrayTable from "../../table/ArrayTable"; // Импорт компонента таблицы для массивов.
import { Button } from "react-bootstrap"; // Импорт компонента Button из библиотеки react-bootstrap.
import { fetchData } from "../../../api/api"; // Импорт функции для извлечения данных из API.

/**
 * Компонент DatabaseArrayForm позволяет пользователям взаимодействовать с массивами из базы данных.
 * Он включает в себя такие функции, как выбор массивов, редактирование, сохранение в базу данных и сортировка.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {string} props.apiUrl - URL для извлечения данных из API.
 * @param {Array|Object} props.array - Массив или объект, представляющий данные.
 * @param {Function} props.setArray - Функция для установки состояния массива.
 * @param {string} props.error - Сообщение об ошибке для отображения.
 * @param {Function} props.setError - Функция для установки состояния ошибки.
 * @param {string} props.info - Информационное сообщение для отображения.
 * @param {Function} props.setIsSaving - Функция для установки состояния сохранения.
 * @returns {JSX.Element} Рендеринг компонента DatabaseArrayForm.
 */
function DatabaseArrayForm({ // Функция, которая рендерит компонент DatabaseArrayForm.
    apiUrl, // URL API.
    array, // Массив или объект, представляющий данные.
    setArray, // Функция для установки состояния массива.
    error, // Сообщение об ошибке.
    setError, // Функция для установки состояния ошибки.
    info, // Информационное сообщение.
    setIsSaving, // Функция для установки состояния сохранения.
}) {
    const [page, setPage] = useState(1); // Состояние для текущей страницы пагинации.
    const [numArrays, setNumArrays] = useState(0); // Состояние для количества массивов.
    const [availableArrays, setAvailableArrays] = useState([]); // Состояние для списка доступных массивов.

    /**
     * Извлекает данные из API на основе предоставленных параметров и обновляет состояние компонента.
     *
     * @function
     * @param {string} apiUrl - URL для извлечения данных из API.
     * @param {number} page - Текущая страница для пагинации.
     * @param {Function} setAvailableArrays - Функция для установки состояния доступных массивов.
     * @param {Function} setNumArrays - Функция для установки состояния количества массивов.
     * @param {Function} setError - Функция для установки состояния ошибки.
     * @returns {void}
     */
    const fetchDataCallback = useCallback(() => { // Замыкание для извлечения данных из API, которое запоминает значения параметров.
        fetchData({ // Вызываем функцию fetchData для получения данных.
            apiUrl, // URL API.
            searchId: null, // ID для поиска не используется.
            page, // Текущая страница для пагинации.
            setArrays: setAvailableArrays, // Функция для установки состояния доступных массивов.
            setNumArrays, // Функция для установки состояния количества массивов.
            setError, // Функция для установки состояния ошибки.
        });
    }, [apiUrl, page, setAvailableArrays, setNumArrays, setError]); // Зависимости useCallback: хук перерендерится, только если эти значения изменятся.

    /**
     * Хук useEffect, который извлекает данные из API при монтировании компонента или изменении состояния "page".
     * Обновляет доступные массивы и количество массивов в состоянии и обрабатывает потенциальные ошибки.
     *
     * @effect
     * @param {Function} fetchDataCallback - Функция обратного вызова для извлечения данных из API.
     * @returns {void}
     */
    useEffect(() => { // Хук useEffect для извлечения данных при монтировании и изменении состояния страницы.
        fetchDataCallback(); // Вызываем функцию fetchDataCallback для получения данных.
    }, [fetchDataCallback]); // Зависимости useEffect: хук перерендерится, только если fetchDataCallback изменится.

    /**
     * Обрабатывает выбор массива из базы данных и обновляет состояние компонента.
     *
     * @function
     * @param {Object} array - Выбранный объект массива.
     * @returns {void}
     */
    const handleArraySelect = (array) => { // Функция, которая обрабатывает выбор массива из базы данных.
        setArray(array.data); // Устанавливаем состояние массива, используя данные выбранного массива.
    };

    /**
     * Обрабатывает событие изменения ввода и обновляет состояние компонента числовыми значениями.
     *
     * @function
     * @param {Object} event - Событие изменения ввода.
     * @returns {void}
     */
    const handleInputChange = (event) => { // Функция, которая обрабатывает изменение ввода в текстовом поле.
        const { name, value } = event.target; // Извлекаем имя и значение поля ввода.

        const numericValues = value.split(" ").map((val) => { // Разделяем строку ввода на отдельные значения.
            if (val === "" || val === "-") return val; // Проверяем, является ли значение пустым или минусом, и оставляем его без изменений.
            if (/^-?\d+$/.test(val)) return parseInt(val, 10); // Проверяем, является ли значение числом, и преобразуем его в целое число.
            return 0; // Если значение не пустое и не минус, но не является числом,  возвращаем 0.
        });

        if (Array.isArray(array)) { // Проверяем, является ли массив массивом (для редактирования существующего).
            setArray(numericValues); // Обновляем состояние массива.
        } else { // Иначе,  это объект (для добавления нового).
            setArray({ ...array, [name]: numericValues }); // Обновляем состояние объекта, добавляя новые данные.
        }
    };

    return (
        <>
            <p>
                Выберите массив из базы данных для работы, кликнув по строке из таблицы.
                <br />
                Обратите внимание, что при сохранении в базу и сортировке создается
                новый массив. Для редактирования базы используйте{" "}
                <a href="/arrays" style={{ textDecoration: "none" }}>
                    эту страницу
                </a>
                .
            </p>

            {availableArrays.length > 0 && ( 
                <>
                    <ArrayTable
                        arrays={availableArrays} 
                        onEdit={handleArraySelect} 
                        size="sm" 
                    />
                    <ArrayPagination
                        page={page} 
                        setPage={setPage} 
                        numArrays={numArrays} 
                        arraysLength={availableArrays.length} 
                    />
                </>
            )}

            <ExtractTextArea
                controlId="database-array"
                name="data"
                label="Выбранный массив:"
                value={array.join(" ")} 
                rows={4} 
                onChange={handleInputChange} 
                disabled={array.length === 0} 
            />
            {error && <p className="text-danger text-end">{error}</p>} 
            {info && <p className="text-primary text-end">{info}</p>} 
            <ExtractButtonGroup> 
                <Button
                    variant="info" 
                    type="submit" 
                    className="d-flex align-items-center gap-1" 
                    onClick={() => setIsSaving(true)}
                    disabled={array.length <= 1} 
                >
                    <CloudUpload /> Сохранить в базу 
                </Button>
                <Button
                    variant="primary" 
                    type="submit" 
                    className="d-flex align-items-center gap-1" 
                    disabled={array.length <= 1} 
                >
                    <SortNumericDown /> Отсортировать 
                </Button>
            </ExtractButtonGroup>
        </>
    );
}

export default DatabaseArrayForm; 