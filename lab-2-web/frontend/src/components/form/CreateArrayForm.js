import FillMethodSelector from "../selector/FillMethodSelector"; // Импорт компонента выбора метода заполнения массива.
import { performBucketSort } from "./output/SortedArrayForm"; // Импорт функции для выполнения блочной сортировки.
import KeyboardArrayForm from "./input/KeyboardArrayForm"; // Импорт компонента для ввода массива с клавиатуры.
import DatabaseArrayForm from "./input/DatabaseArrayForm"; // Импорт компонента для выбора массива из базы данных.
import { useArrayContext } from "../context/ArrayContext"; // Импорт хука для доступа к контексту массива.
import RandomArrayForm from "./input/RandomArrayForm"; // Импорт компонента для генерации случайного массива.
import FileArrayForm from "./input/FileArrayForm"; // Импорт компонента для загрузки массива из файла.
import { createArray } from "../../api/api"; // Импорт функции для создания массива в API.
import React, { useState } from "react"; // Импорт React для работы с компонентами.
import { Form } from "react-bootstrap"; // Импорт компонента "Форма" из библиотеки react-bootstrap.

/**
 * Компонент CreateArrayForm предоставляет форму для ввода, генерации или загрузки массивов
 * с помощью различных методов ввода, таких как клавиатура, случайная генерация, загрузка файлов и выбор из базы данных.
 * Пользователи могут выбрать метод заполнения и отправить форму, чтобы либо сохранить массив в базе данных, либо сохранить
 * и отсортировать массив с помощью алгоритма блочной сортировки.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {string} props.apiUrl - URL для API-запросов.
 * @returns {JSX.Element} Рендеринг компонента CreateArrayForm.
 */
function CreateArrayForm({ apiUrl }) { // Функция, которая рендерит компонент CreateArrayForm.
    const [isWholeArrayInput, setIsWholeArrayInput] = useState(false); // Состояние, указывающее, вводится ли весь массив сразу.
    const [currentElement, setCurrentElement] = useState(""); // Состояние для текущего элемента, вводимого по отдельности.
    const [fillMethod, setFillMethod] = useState("keyboard"); // Состояние, которое хранит выбранный метод заполнения массива.
    const [selectedArray, setSelectedArray] = useState(null); // Состояние для выбранного массива из базы данных.
    const [isFileValid, setIsFileValid] = useState(false); // Флаг, указывающий,  является ли загруженный файл допустимым.
    const [numElements, setNumElements] = useState("10"); // Состояние для количества элементов.
    const [maxValue, setMaxValue] = useState("100"); // Состояние для максимального значения.
    const [minValue, setMinValue] = useState("1"); // Состояние для минимального значения.
    const [error, setError] = useState(null); // Состояние для сообщения об ошибке.
    const [array, setArray] = useState([]); // Состояние для массива.
    const [info, setInfo] = useState(null); // Состояние для информационного сообщения.
    const [isSaving, setIsSaving] = useState(false); // Состояние, указывающее,  происходит ли сохранение.

    const { setSortedArray, setExecutionTime } = useArrayContext(); // Получаем функции для обновления состояния отсортированного массива и времени выполнения из контекста.

    /**
     * Обрабатывает отправку формы, либо сохраняя массив в базу данных, либо сохраняя и сортируя массив.
     *
     * @async
     * @function
     * @param {Object} event - Событие отправки формы.
     * @returns {Promise<void>} Promise, который разрешается после обработки отправки формы.
     */
    const handleSubmit = async (event) => { // Обработчик события отправки формы.
        event.preventDefault(); // Предотвращаем стандартную обработку отправки формы.
        setError(null); // Сбрасываем сообщение об ошибке.
        setInfo(null); // Сбрасываем информационное сообщение.

        let numArray = 0; //  Переменная,  которая  будет  хранить  числовой  массив.

        if (isWholeArrayInput) { // Если ввод массива через пробел.
            numArray = array.data.map(Number); // Преобразуем массив в числовой массив.
        } else { // Если ввод отдельных элементов.
            numArray = array.map(Number); // Преобразуем массив в числовой массив.
        }

        if (isSaving) { // Если происходит сохранение.
            const createdArray = await createArray({ // Вызываем функцию  createArray  для  сохранения  массива  в  API. 
                apiUrl, // URL  API.
                data: numArray, // Данные для нового массива.
                onSuccess: () => { }, // Обработчик успешного создания массива.
                onError: setError, // Обработчик ошибки создания массива.
            });

            if (createdArray) { // Если массив был успешно создан.
                setInfo("Массив добавлен в базу."); // Устанавливаем информационное сообщение.
            }

            setIsSaving(false); // Сбрасываем состояние "Сохранение".
        } else { // Если происходит сортировка.
            await handleSort(numArray); // Вызываем функцию handleSort для сортировки массива.
        }
    };

    /**
     * Обрабатывает сортировку массива, сохраняя его в базу данных и обновляя состояние компонента.
     *
     * @async
     * @function
     * @param {number[]} array - Массив, который нужно отсортировать и сохранить.
     * @returns {Promise<void>} Promise, который разрешается после завершения сортировки и сохранения.
     */
    const handleSort = async (array) => { // Функция, которая обрабатывает сортировку массива.
        const createdArray = await createArray({ // Создаем массив в API.
            apiUrl,
            data: array,
            onSuccess: () => { },
            onError: setError,
        });

        if (createdArray) { // Если массив был успешно создан.
            await performBucketSort( // Выполняем блочную сортировку на бэкенде.
                apiUrl,
                createdArray.id,
                setSortedArray, // Функция для обновления состояния отсортированного массива.
                setExecutionTime, // Функция для обновления состояния времени выполнения.
            );

            setInfo("Массив добавлен в базу и отсортирован."); // Устанавливаем информационное сообщение.
        }
    };

    /**
     * Обрабатывает изменение метода заполнения, сбрасывая массив и обновляя состояние компонента.
     *
     * @function
     * @param {Object} event - Событие изменения метода заполнения.
     * @returns {void}
     */
    const handleFillMethodChange = (event) => { // Функция, которая обрабатывает изменение метода заполнения.
        const newFillMethod = event.target.value; // Извлекаем новое значение метода заполнения.

        setFillMethod(newFillMethod); // Обновляем состояние выбранного метода.
        setArray([]); // Сбрасываем состояние массива.
        setInfo(null); // Сбрасываем информационное сообщение.
        setError(null); // Сбрасываем сообщение об ошибке.
        setIsFileValid(true); // Устанавливаем состояние валидности файла в true.
        setIsWholeArrayInput(false); // Сбрасываем состояние ввода массива через пробел.
    };

    const methodComponents = { // Объект,  который  содержит  компоненты  для  разных  методов  заполнения. 
        keyboard: (
            <KeyboardArrayForm
                array={array}
                setArray={setArray}
                isWholeArrayInput={isWholeArrayInput}
                setIsWholeArrayInput={setIsWholeArrayInput}
                currentElement={currentElement}
                setCurrentElement={setCurrentElement}
                error={error}
                info={info}
                setIsSaving={setIsSaving}
            />
        ),
        random: (
            <RandomArrayForm
                array={array}
                setArray={setArray}
                numElements={numElements}
                setNumElements={setNumElements}
                minValue={minValue}
                setMinValue={setMinValue}
                maxValue={maxValue}
                setMaxValue={setMaxValue}
                error={error}
                setError={setError}
                info={info}
                setIsSaving={setIsSaving}
            />
        ),
        file: (
            <FileArrayForm
                array={array}
                setArray={setArray}
                isFileValid={isFileValid}
                setIsFileValid={setIsFileValid}
                error={error}
                setError={setError}
                info={info}
                setIsSaving={setIsSaving}
            />
        ),
        database: (
            <DatabaseArrayForm
                apiUrl={apiUrl}
                array={array}
                setArray={setArray}
                selectedArray={selectedArray}
                setSelectedArray={setSelectedArray}
                error={error}
                setError={setError}
                info={info}
                setIsSaving={setIsSaving}
            />
        ),
    };

    return (
        <>
            <h3>Ввод</h3>
            <Form
                id="array-form"
                className="border p-4 rounded mb-4"
                onSubmit={handleSubmit} 
            >
                <FillMethodSelector
                    fillMethod={fillMethod} 
                    handleFillMethodChange={handleFillMethodChange} 
                />
                {methodComponents[fillMethod]}  
            </Form>
        </>
    );
}

export default CreateArrayForm; // Экспортируем компонент CreateArrayForm по умолчанию.