import { Form } from "react-bootstrap"; // Импортируем компонент Form из библиотеки react-bootstrap.

/**
 * Функциональный компонент, представляющий группу кнопок внутри формы.
 *
 * @component
 * @param {Object} props - Дополнительные свойства для конфигурации группы кнопок.
 * @param {ReactNode} children - Дочерние элементы, которые будут включены в группу кнопок.
 * @returns {JSX.Element} Рендеринг элемента React для группы кнопок.
 */
function ExtractButtonGroup({ children, ...props }) { 
    return ( 
        <Form.Group
            controlId="button-group"
            className="mb-2 d-flex gap-2 justify-content-end align-items-center flex-wrap" 
            {...props} 
        >
            {children} 
        </Form.Group>
    );
}

export default ExtractButtonGroup; 