import { Form } from "react-bootstrap"; // Импортируем компонент Form из библиотеки react-bootstrap.

/**
 * Функциональный компонент, представляющий текстовое поле (textarea) внутри формы.
 *
 * @component
 * @param {Object} props - Дополнительные свойства для конфигурации текстового поля.
 * @param {string} props.controlId - Уникальный идентификатор текстового поля.
 * @param {string} props.label - Метка для текстового поля.
 * @param {string} props.value - Текущее значение текстового поля.
 * @param {Function} props.onChange - Функция, вызываемая при изменении значения текстового поля.
 * @param {number} props.rows - Количество видимых строк текста в текстовом поле.
 * @returns {JSX.Element} Рендеринг элемента React для текстового поля.
 */
function ExtractTextArea({ // Функция, которая рендерит компонент текстового поля.
    controlId, // Уникальный идентификатор текстового поля.
    label, // Метка для текстового поля.
    value, // Текущее значение текстового поля.
    onChange, // Обработчик изменения значения текстового поля.
    rows, // Количество видимых строк текста.
    ...props // Остальные свойства, которые будут переданы компоненту Form.Control.
}) {
    return ( 
        <Form.Group controlId={controlId} className="mb-3"> 
            <Form.Label> 
                <strong>{label}</strong> 
            </Form.Label>
            <Form.Control 
                as="textarea"  
                value={value} 
                onChange={onChange} 
                rows={rows} 
                {...props} 
            />
        </Form.Group>
    );
}

export default ExtractTextArea; // Экспортируем компонент ExtractTextArea по умолчанию.