import { SortNumericDown, CloudUpload } from "react-bootstrap-icons"; // Импортируем иконки "Сортировка" и "Облако загрузки" из библиотеки react-bootstrap-icons.
import ExtractButtonGroup from "../../extract/ExtractButtonGroup"; // Импорт компонента "Группа кнопок" (ExtractButtonGroup).
import ExtractInputField from "../../extract/ExtractInputField"; // Импорт компонента "Поле ввода" (ExtractInputField).
import ExtractTextArea from "../../extract/ExtractTextArea"; // Импорт компонента "Текстовое поле" (ExtractTextArea).
import { Form, Button } from "react-bootstrap"; // Импорт компонентов "Форма" (Form) и "Кнопка" (Button) из библиотеки react-bootstrap.
import React from "react"; // Импорт React для работы с компонентами.

/**
 * Компонент KeyboardArrayForm позволяет пользователям вводить элементы массива вручную с помощью клавиатуры.
 * Он поддерживает как ввод отдельных элементов, так и ввод всего массива сразу.
 * Предоставляет опции для сохранения в базу данных и сортировки массива.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.array - Состояние массива, которое может быть объектом с отдельными элементами или массивом.
 * @param {Function} props.setArray - Функция для установки состояния массива.
 * @param {boolean} props.isWholeArrayInput - Флаг, указывающий, вводится ли весь массив сразу.
 * @param {Function} props.setIsWholeArrayInput - Функция для установки состояния метода ввода.
 * @param {string} props.currentElement - Текущий элемент, вводимый по отдельности.
 * @param {Function} props.setCurrentElement - Функция для установки состояния текущего элемента.
 * @param {string} props.error - Сообщение об ошибке для отображения.
 * @param {string} props.info - Информационное сообщение для отображения.
 * @param {Function} props.setIsSaving - Функция для установки состояния сохранения.
 * @returns {JSX.Element} Рендеринг компонента KeyboardArrayForm.
 */
function KeyboardArrayForm({ // Функция, которая рендерит компонент KeyboardArrayForm.
    array, // Состояние массива.
    setArray, // Функция для установки состояния массива.
    isWholeArrayInput, // Флаг, указывающий, вводится ли весь массив сразу.
    setIsWholeArrayInput, // Функция для установки состояния метода ввода.
    currentElement, // Текущий элемент, вводимый по отдельности.
    setCurrentElement, // Функция для установки состояния текущего элемента.
    error, // Сообщение об ошибке.
    info, // Информационное сообщение.
    setIsSaving, // Функция для установки состояния сохранения.
}) {
    /**
     * Переключает методы ввода (весь массив или отдельные элементы) и сбрасывает массив.
     *
     * @function
     * @returns {void}
     */
    const handleWholeArrayInputChange = () => { // Функция, которая обрабатывает изменение состояния метода ввода массива.
        setIsWholeArrayInput(!isWholeArrayInput); // Переключаем состояние  `isWholeArrayInput` на противоположное.
        setArray([]); // Сбрасываем массив.
    };

    /**
     * Обрабатывает события изменения ввода, парсинг и обновление массива на основе метода ввода.
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

        setArray({ ...array, [name]: numericValues }); // Обновляем состояние массива или объекта, в зависимости от метода ввода.
    };

    /**
     * Обрабатывает событие onBlur для ввода текущего элемента, добавляет его в массив и сбрасывает текущий элемент.
     *
     * @function
     * @returns {void}
     */
    const handleInputBlur = () => { // Функция, которая обрабатывает событие onBlur для поля ввода текущего элемента.
        if (currentElement !== "") { // Если поле не пустое, добавляем элемент в массив.
            setArray((prevArray) => [...prevArray, currentElement]); // Добавляем элемент в массив, используя spread-оператор.
            setCurrentElement(""); // Сбрасываем состояние текущего элемента.
        }
    };

    return (
        <>
            <p>
                Вы можете ввести элементы массива вручную с помощью клавиатуры.
                <br />
                Введите число в поле для добавления элемента в массив.
            </p>
            <Form.Group controlId="array-input-method" className="mb-3"> 
                <Form.Check 
                    type="checkbox" 
                    label="Ввод через пробел" 
                    checked={isWholeArrayInput}   
                    onChange={handleWholeArrayInputChange} 
                />
            </Form.Group>

            {isWholeArrayInput ? ( 
                <>
                    <p className="text-secondary">
                        Пишите элементы поочередно, разделяя их пробелом. Это удобнее при
                        создании больших массивов.
                        <br />
                        Разрешен ввод только целых чисел, лишние пробелы будут заменены
                        нулём.
                    </p>
                    <ExtractTextArea  
                        controlId="whole-array"
                        name="data"
                        label="Введите массив:"
                        value={Array.isArray(array.data) ? array.data.join(" ") : ""} 
                        rows={4}
                        onChange={handleInputChange} 
                    />
                </>
            ) : ( 
                <>
                    {array.map((element, index) => ( 
                        <Form.Group controlId={`element-${index}`} key={index}> 
                            <Form.Label>Элемент {index + 1}</Form.Label>  
                            <Form.Control type="text" value={element} disabled />  
                        </Form.Group>
                    ))}
                    <Form.Label>
                        <strong>Новый элемент:</strong>
                    </Form.Label>
                    <Form.Group controlId="current-element" className="mb-3 d-flex"> 
                        {array.length >= 0 && ( 
                            <Form.Control
                                type="number" 
                                value={currentElement}  
                                onChange={(e) => setCurrentElement(e.target.value)} 
                                onBlur={handleInputBlur} 
                            />
                        )}
                    </Form.Group>
                </>
            )}
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
                    disabled={array.length === 0}  
                >
                    <SortNumericDown /> Отсортировать 
                </Button>
            </ExtractButtonGroup>
        </>
    );
}

export default KeyboardArrayForm; 