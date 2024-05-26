import ExtractButtonGroup from "../extract/ExtractButtonGroup";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Trash, SortNumericDown, CloudUpload } from "react-bootstrap-icons";
/**
 * Компонент EditArrayModal отображает модальное окно для редактирования данных массива, включая добавление, сортировку и удаление.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {boolean} props.show - Флаг, указывающий, должно ли быть видно модальное окно.
 * @param {Function} props.handleClose - Функция для обработки закрытия модального окна.
 * @param {Object} props.array - Данные массива для редактирования.
 * @param {Function} props.handleSave - Функция для обработки сохранения изменений в массиве.
 * @param {Function} props.handleSort - Функция для обработки сортировки массива.
 * @param {Function} props.handleDelete - Функция для обработки удаления массива.
 * @returns {JSX.Element} Рендеринг компонента EditArrayModal.
 */
function EditArrayModal({ // Функция, которая рендерит компонент EditArrayModal.
    show, // Флаг видимости модального окна.
    handleClose, // Функция для закрытия модального окна.
    array, // Данные массива для редактирования.
    handleSave, // Функция для обработки сохранения изменений в массиве.
    handleSort, // Функция для обработки сортировки массива.
    handleDelete, // Функция для обработки удаления массива.
}) {
    const [editedArray, setEditedArray] = useState({ ...array }); // Состояние, которое хранит редактируемый массив.

    /**
     * Хук useEffect, который обновляет состояние editedArray всякий раз, когда изменяется свойство array.
     * Это гарантирует, что модальное окно отображает правильные данные массива для редактирования.
     *
     * @function
     * @name useEffect
     * @param {Function} effect - Функция эффекта.
     * @param {Array} dependencies - Массив зависимостей, которые запускают эффект при изменении.
     * @returns {void}
     */
    useEffect(() => { // Хук useEffect для обновления состояния editedArray при изменении array.
        setEditedArray({ ...array }); // Обновляем состояние editedArray, создавая копию array.
    }, [array]); // Зависимости useEffect: хук перерендерится, только если array изменится.

    /**
     * Обрабатывает изменения в полях ввода и обновляет состояние editedArray соответствующим образом.
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

        setEditedArray({ ...editedArray, [name]: numericValues }); // Обновляем состояние editedArray, добавляя новые данные.
    };

    /**
     * Сохраняет изменения, внесенные в отредактированный массив, и вызывает функцию handleSave.
     *
     * @function
     * @returns {void}
     */
    const saveChangesEdit = () => { // Функция, которая сохраняет изменения в массиве.
        handleSave({ ...editedArray }); // Вызываем функцию handleSave,  передавая  копию  редактируемого  массива.
        handleClose(); // Закрываем модальное окно.
    };

    /**
     * Сохраняет изменения в отредактированном массиве и вызывает функцию handleDelete для удаления исходного массива.
     *
     * @function
     * @returns {void}
     */
    const saveChangesDelete = () => { // Функция, которая сохраняет изменения в массиве и удаляет исходный массив.
        handleDelete(array); // Вызываем функцию handleDelete, передавая исходный массив.
        handleClose(); // Закрываем модальное окно.
    };

    /**
     * Сохраняет изменения в отредактированном массиве и вызывает функцию handleSort для сортировки массива.
     *
     * @function
     * @returns {void}
     */
    const saveChangesSort = () => { // Функция, которая сохраняет изменения в массиве и сортирует массив.
        handleSort({ ...editedArray }); // Вызываем функцию handleSort, передавая копию редактируемого массива.
        handleClose(); // Закрываем модальное окно.
    };

    return ( 
        <Modal show={show} onHide={handleClose} size="lg"> 
            <Modal.Header closeButton>
                <Modal.Title>Редактировать массив</Modal.Title> 
            </Modal.Header>
            <Modal.Body> 
                <Form>  
                    <p>
                        Пишите элементы поочередно, разделяя их пробелом.
                        <br />
                        <span className="text-secondary">
                            Разрешен ввод только целых чисел, лишние пробелы будут заменены
                            нулём.
                        </span>
                    </p>
                    <Form.Group controlId="arrayData"> 
                        <Form.Label>
                            <strong>Элементы массива:</strong>
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            name="data" 
                            rows={4}
                            value={editedArray.data.join(" ")} 
                            onChange={handleInputChange} 
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer> 
                <ExtractButtonGroup> 
                    <Button
                        variant="secondary" 
                        className="d-flex align-items-center gap-1"
                        onClick={saveChangesSort}  
                    >
                        <SortNumericDown /> Отсортировать 
                    </Button>
                    <Button
                        variant="primary" 
                        className="d-flex align-items-center gap-1"
                        onClick={saveChangesEdit} 
                    >
                        <CloudUpload /> Сохранить 
                    </Button>
                    <Button
                        variant="danger" 
                        className="d-flex align-items-center gap-1"
                        onClick={saveChangesDelete} 
                    >
                        <Trash /> {""} Удалить 
                    </Button>
                </ExtractButtonGroup>
            </Modal.Footer>
        </Modal>
    );
}

export default EditArrayModal; // Экспортируем компонент EditArrayModal по умолчанию.