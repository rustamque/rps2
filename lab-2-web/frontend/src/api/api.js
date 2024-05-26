import axios from "axios"; // Импортируем библиотеку axios для выполнения HTTP-запросов.

/**
 * Обрабатывает ошибки выборки, устанавливая сообщение об ошибке и регистрируя подробности ошибки.
 *
 * @function
 * @name handleFetchError
 * @param {Error} error - Объект ошибки.
 * @param {Function} setError - Функция для установки состояния ошибки.
 * @param {string} customErrorMessage - Пользовательское сообщение об ошибке (необязательно).
 * @returns {void}
 */
const handleFetchError = (error, setError, customErrorMessage) => {
    setError(customErrorMessage || "Произошла ошибка при загрузке данных."); // Устанавливаем состояние ошибки, используя переданное сообщение или сообщение по умолчанию.
    console.error( // Выводим сообщение об ошибке и объект ошибки в консоль для отладки.
        customErrorMessage || "Произошла ошибка при загрузке данных.",
        error,
    );
};

/**
 * Извлекает массивы из API на основе критериев поиска или номера страницы.
 *
 * @async
 * @function
 * @name fetchData
 * @param {Object} options - Опции для извлечения данных.
 * @param {string} options.apiUrl - URL API для извлечения массивов.
 * @param {string|null} options.searchId - ID для поиска определенного массива.
 * @param {number} options.page - Номер страницы для извлечения массивов.
 * @param {Function} options.setArrays - Функция для установки состояния массивов.
 * @param {Function} options.setNumArrays - Функция для установки состояния количества массивов.
 * @param {Function} options.setError - Функция для установки состояния ошибки.
 * @returns {Promise<void>}
 */
export const fetchData = async ({ // Асинхронная функция для извлечения данных из API.
    apiUrl, // URL API.
    searchId, // ID для поиска конкретного массива (необязательно).
    page, // Номер страницы для извлечения (необязательно).
    setArrays, // Функция для установки состояния массивов.
    setNumArrays, // Функция для установки состояния количества массивов.
    setError, // Функция для установки состояния ошибки.
}) => {
    try { // Начало блока try...catch для обработки ошибок.
        setError(null); // Сбрасываем состояние ошибки.
        const url = searchId // Формируем URL запроса в зависимости от наличия searchId.
            ? `${apiUrl}/arrays/${searchId}/` // URL для получения конкретного массива по ID.
            : `${apiUrl}/arrays/?page=${page}`; // URL для получения списка массивов с пагинацией.
        const response = await axios.get(url); // Выполняем GET-запрос к API и ждем ответа.
        const { data, status } = response; // Извлекаем данные и статус ответа.

        if (status === 200) { // Если статус ответа 200 (OK), обрабатываем данные.
            if (searchId) { // Если searchId указан, устанавливаем состояние массивов с одним найденным массивом.
                const array = data;
                setArrays([array]);
            } else { // Если searchId не указан, устанавливаем состояние массивов со списком массивов и общее количество массивов.
                const updatedArrays = data.results.map((array) => ({ ...array })); // Создаем копию каждого массива.
                setArrays(updatedArrays); 
                setNumArrays(data.count);
            }
        }
    } catch (error) { // Если произошла ошибка, обрабатываем ее.
        if (axios.isAxiosError(error) && error.response) { // Проверяем, является ли ошибка ошибкой axios и есть ли у нее ответ.
            const { status } = error.response; // Извлекаем статус ответа ошибки.

            if (status === 404) { // Если статус 404 (Not Found), очищаем состояние массивов и выходим из функции.
                setArrays([]);
                return;
            }
        }

        handleFetchError(error, setError); // Вызываем handleFetchError для обработки ошибки и установки состояния ошибки.
    }
};

/**
 * Создает новый массив, используя предоставленные данные.
 *
 * @async
 * @function
 * @name createArray
 * @param {Object} options - Опции для создания массива.
 * @param {string} options.apiUrl - URL API для создания массивов.
 * @param {Array} options.data - Данные для нового массива.
 * @param {Function} options.onSuccess - Функция, вызываемая при успешном создании массива.
 * @param {Function} options.onError - Функция, вызываемая при ошибке создания массива.
 * @returns {Promise<Object>} Созданный массив.
 */
export const createArray = async ({ apiUrl, data, onSuccess, onError }) => {  // Асинхронная функция для создания нового массива.
    try { // Начало блока try...catch для обработки ошибок.
        const response = await axios.post(`${apiUrl}/arrays/`, { // Выполняем POST-запрос к API для создания массива.
            data: data, // Данные для нового массива.
            is_sorted: false, // Флаг, указывающий, что массив не отсортирован.
        });
        if (response.status === 201) { // Если статус ответа 201 (Created), обрабатываем данные.
            const createdArray = response.data; // Извлекаем данные созданного массива.
            onSuccess(createdArray); // Вызываем функцию onSuccess, передавая созданный массив.
            return createdArray; // Возвращаем созданный массив.
        }
    } catch (error) { // Если произошла ошибка, обрабатываем ее.
        handleFetchError(error, onError); // Вызываем handleFetchError для обработки ошибки.
    }
};

/**
 * Редактирует существующий массив с предоставленными данными.
 *
 * @async
 * @function
 * @name editArray
 * @param {Object} options - Опции для редактирования массива.
 * @param {string} options.apiUrl - URL API для редактирования массивов.
 * @param {string} options.id - ID массива, который нужно отредактировать.
 * @param {Array} options.data - Новые данные для массива.
 * @param {boolean} options.is_sorted - Флаг, указывающий, отсортирован ли массив.
 * @param {Function} options.onSuccess - Функция, вызываемая при успешном редактировании массива.
 * @param {Function} options.onError - Функция, вызываемая при ошибке редактирования массива.
 * @returns {Promise<void>}
 */
export const editArray = async ({ // Асинхронная функция для редактирования существующего массива.
    apiUrl, // URL API.
    id, // ID массива.
    data, // Новые данные массива.
    is_sorted, // Флаг, указывающий, отсортирован ли массив.
    onSuccess, // Функция, вызываемая при успешном редактировании.
    onError, // Функция, вызываемая при ошибке.
}) => {
    try { // Начало блока try...catch для обработки ошибок.
        const response = await axios.put(`${apiUrl}/arrays/${id}/`, { // Выполняем PUT-запрос к API для редактирования массива.
            data: data, // Новые данные для массива.
            is_sorted: is_sorted, // Флаг, указывающий, отсортирован ли массив.
        });

        if (response.status === 200) { // Если статус ответа 200 (OK), вызываем функцию onSuccess.
            onSuccess();
        }
    } catch (error) { // Если произошла ошибка, обрабатываем ее.
        handleFetchError(error, onError); // Вызываем handleFetchError для обработки ошибки.
    }
};

/**
 * Удаляет существующий массив.
 *
 * @async
 * @function
 * @name deleteArray
 * @param {Object} options - Опции для удаления массива.
 * @param {string} options.apiUrl - URL API для удаления массивов.
 * @param {string} options.id - ID массива, который нужно удалить.
 * @param {Function} options.onSuccess - Функция, вызываемая при успешном удалении массива.
 * @param {Function} options.onError - Функция, вызываемая при ошибке удаления массива.
 * @returns {Promise<void>}
 */

export const deleteArray = async ({ apiUrl, id, onSuccess, onError }) => { // Асинхронная функция для удаления массива.
    try { // Начало блока try...catch для обработки ошибок.
        const response = await axios.delete(`${apiUrl}/arrays/${id}/`); // Выполняем DELETE-запрос к API для удаления массива.

        if (response.status === 204) { // Если статус ответа 204 (No Content), вызываем функцию onSuccess.
            onSuccess();
        }
    } catch (error) { // Если произошла ошибка, обрабатываем ее.
        handleFetchError(error, onError); // Вызываем handleFetchError для обработки ошибки.
    }
};

/**
 * Сортирует существующий массив, используя алгоритм блочной сортировки (Bucket Sort).
 *
 * @async
 * @function
 * @name sortArray
 * @param {Object} options - Опции для сортировки массива.
 * @param {string} options.apiUrl - URL API для сортировки массивов.
 * @param {string} options.id - ID массива, который нужно отсортировать.
 * @param {Function} options.onSuccess - Функция, вызываемая при успешной сортировке массива.
 * @param {Function} options.onError - Функция, вызываемая при ошибке сортировки массива.
 * @returns {Promise<Object>} Отсортированный массив.
 */
export const sortArray = async ({ apiUrl, id, onSuccess, onError }) => { // Асинхронная функция для сортировки массива.
    try { // Начало блока try...catch для обработки ошибок.
        const sortResponse = await axios.post(`${apiUrl}/sort/`, { id: id }); // Выполняем POST-запрос к API для сортировки массива.

        if (sortResponse.status === 200) { // Если статус ответа 200 (OK), обрабатываем данные.
            const sortedArray = sortResponse.data; // Извлекаем отсортированный массив из ответа.
            onSuccess(); // Вызываем функцию onSuccess.
            return sortedArray; // Возвращаем отсортированный массив.
        }
    } catch (error) { // Если произошла ошибка, обрабатываем ее.
        handleFetchError(error, onError); // Вызываем handleFetchError для обработки ошибки.
    }
};