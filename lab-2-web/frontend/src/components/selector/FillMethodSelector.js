import { Form } from "react-bootstrap"; // Импортируем компонент Form из библиотеки react-bootstrap.
import React from "react"; // Импортируем React для работы с компонентами.

/**
 * Компонент FillMethodSelector предоставляет выпадающий список для выбора метода ввода данных массива.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {string} props.fillMethod - Выбранный метод заполнения массива.
 * @param {Function} props.handleFillMethodChange - Функция для обработки изменений в выбранном методе заполнения.
 * @returns {JSX.Element} Рендеринг компонента FillMethodSelector.
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

export default FillMethodSelector; // Экспортируем компонент FillMethodSelector по умолчанию.