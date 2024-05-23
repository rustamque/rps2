import { Form } from "react-bootstrap";
import React from "react";

/**
 * FillMethodSelector component provides a dropdown selector for choosing the method of array data input.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.fillMethod - The selected method for filling the array.
 * @param {Function} props.handleFillMethodChange - A function to handle changes in the selected fill method.
 * @returns {JSX.Element} The rendered FillMethodSelector component.
 */
function FillMethodSelector({ fillMethod, handleFillMethodChange }) {
    return (
        <Form.Group controlId="fill-method" className="mb-3">
            <Form.Label>
                <strong>Выберите метод заполнения</strong>
            </Form.Label>
            <Form.Select
                aria-label="select-method"
                value={fillMethod}
                onChange={handleFillMethodChange}
            >
                <option value="keyboard">Ручной ввод элементов</option>
                <option value="random">Генерация элементов</option>
                <option value="file">Импорт элементов</option>
                <option value="database">Загрузка из базы</option>
            </Form.Select>
        </Form.Group>
    );
}

export default FillMethodSelector;
