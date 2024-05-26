import { Form } from "react-bootstrap"; // Импортируем компонент Form из библиотеки react-bootstrap.

/**
 * Функциональный компонент, представляющий поле ввода внутри формы.
 *
 * @component
 * @param {Object} props - Дополнительные свойства для конфигурации поля ввода.
 * @param {string} props.controlId - Уникальный идентификатор поля ввода.
 * @param {string} props.label - Метка для поля ввода.
 * @param {string} props.value - Текущее значение поля ввода.
 * @param {Function} props.onChange - Функция, вызываемая при изменении значения поля ввода.
 * @param {string} props.type - Тип поля ввода (например, text, number).
 * @returns {JSX.Element} Рендеринг элемента React для поля ввода.
 */
function ExtractInputField({ // Функция, которая рендерит компонент поля ввода.
    controlId, // Уникальный идентификатор поля ввода.
    label, // Метка для поля ввода.
    value, // Текущее значение поля ввода.
    onChange, // Обработчик изменения значения поля ввода.
    type, // Тип поля ввода (например, text, number).
    ...props // Остальные свойства, которые будут переданы компоненту Form.Control.
}) {
    return ( 
        <Form.Group controlId={controlId} className="mb-3"> 
            <Form.Label> 
                <strong>{label}</strong> 
            </Form.Label>
            <Form.Control type={type} value={value} onChange={onChange} {...props} /> 
        </Form.Group>
    );
}

export default ExtractInputField; 