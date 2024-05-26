import { useArrayContext } from "../../context/ArrayContext"; // Импортируем хук useArrayContext для доступа к контексту массива.
import { sortArray } from "../../../api/api"; // Импортируем функцию sortArray для выполнения сортировки на бэкенде.
import { Form } from "react-bootstrap"; // Импортируем компонент Form из библиотеки react-bootstrap.
import React from "react"; // Импортируем React для работы с компонентами.

/**
 * Асинхронно выполняет блочную сортировку массива с заданным ID, используя предоставленный URL API.
 * Обновляет отсортированный массив и время выполнения в состоянии компонента.
 *
 * @async
 * @function
 * @param {string} apiUrl - URL для выполнения операции блочной сортировки.
 * @param {string} id - ID массива, который нужно отсортировать.
 * @param {Function} setSortedArray - Функция для установки состояния отсортированного массива.
 * @param {Function} setExecutionTime - Функция для установки состояния времени выполнения.
 * @returns {Promise<void>} Promise, который разрешается после завершения операции блочной сортировки.
 */
export async function performBucketSort( // Асинхронная функция для выполнения блочной сортировки.
    apiUrl, // URL API для сортировки.
    id, // ID массива для сортировки.
    setSortedArray, // Функция для установки состояния отсортированного массива.
    setExecutionTime, // Функция для установки состояния времени выполнения.
) {
    const sortedArray = await sortArray({ // Вызываем функцию sortArray для сортировки массива на бэкенде.
        apiUrl, // URL API.
        id: id, // ID массива.
        onSuccess: () => { }, // Функция onSuccess, которая вызывается при успешной сортировке.
    });

    if (sortedArray) { // Если сортировка прошла успешно.
        const sortedData = sortedArray.data; // Извлекаем отсортированные данные из ответа.
        const executionTime = sortedArray.execution_time; // Извлекаем время выполнения из ответа.
        setSortedArray(sortedData); // Обновляем состояние отсортированного массива.
        setExecutionTime(executionTime); // Обновляем состояние времени выполнения.
    }
}

/**
 * Компонент SortedArrayForm отображает отсортированный массив и время выполнения, полученные из контекста.
 *
 * @component
 * @returns {JSX.Element} Рендеринг компонента SortedArrayForm.
 */
function SortedArrayForm() { // Функция, которая рендерит компонент SortedArrayForm.
    const { sortedArray = [], executionTime } = useArrayContext(); // Получаем состояние отсортированного массива и время выполнения из контекста.

    return ( 
        <>
            <h3>Вывод</h3>
            <Form.Group controlId="sorted-array"> 
                <Form.Label> 
                    <strong>Отсортированный массив:</strong>
                </Form.Label>
                <Form.Control
                    as="textarea"  
                    rows={4}
                    value={sortedArray ? sortedArray.join(", ") : ""}    
                    readOnly 
                    disabled 
                />
                {executionTime !== null && ( 
                    <p className="text-secondary">
                        <strong>Время работы:</strong> {executionTime} секунд.
                        <br />
                    </p>
                )}
            </Form.Group>
        </>
    );
}

export default SortedArrayForm; 