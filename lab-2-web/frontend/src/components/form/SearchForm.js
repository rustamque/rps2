import { Form } from "react-bootstrap"; // Импортируем компонент Form из библиотеки react-bootstrap.
import React from "react"; // Импортируем React для работы с компонентами.

/**
 * Компонент SearchForm предоставляет поле ввода для поиска массивов по их ID.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {string} props.searchId - Текущее значение ID поиска.
 * @param {Function} props.onSearchChange - Функция для обработки изменений в ID поиска.
 * @returns {JSX.Element} Рендеринг компонента SearchForm.
 */
function SearchForm({ searchId, onSearchChange }) { 
    return ( 
        <Form.Group className="mb-3"> 
            <Form.Control 
                id="search-form" 
                type="text" 
                placeholder="Поиск по ID массива" 
                value={searchId || ""} 
                onChange={(e) => onSearchChange(e.target.value || null)} 
            />
        </Form.Group>
    );
}

export default SearchForm; 