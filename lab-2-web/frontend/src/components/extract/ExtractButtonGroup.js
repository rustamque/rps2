import { Form } from "react-bootstrap"; // Импортируем компонент Form из библиотеки react-bootstrap.

/**
 * Функциональный компонент, представляющий группу кнопок внутри формы.
 *
 * @component
 * @param {Object} props - Дополнительные свойства для конфигурации группы кнопок.
 * @param {ReactNode} children - Дочерние элементы, которые будут включены в группу кнопок.
 * @returns {JSX.Element} Рендеринг элемента React для группы кнопок.
 */
function ExtractButtonGroup({ children, ...props }) { // Функция, которая рендерит компонент группы кнопок.
    return ( // Возвращает JSX-разметку компонента.
        <Form.Group
            controlId="button-group" // ID группы кнопок.
            className="mb-2 d-flex gap-2 justify-content-end align-items-center flex-wrap" // Классы для стилизации (отступы, выравнивание, обтекание).
            {...props} // Передаем все остальные свойства в компонент Form.Group.
        >
            {children} // Отображаем дочерние элементы (кнопки) внутри группы.
        </Form.Group>
    );
}

export default ExtractButtonGroup; // Экспортируем компонент ExtractButtonGroup по умолчанию.