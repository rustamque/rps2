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
function SearchForm({ searchId, onSearchChange }) { // Функция, которая рендерит компонент SearchForm.
    return ( // Возвращает JSX-разметку компонента.
        <Form.Group className="mb-3"> 
            <Form.Control // Используем компонент Form.Control из react-bootstrap для создания поля ввода.
                id="search-form" // Устанавливаем ID поля ввода.
                type="text" // Устанавливаем тип поля ввода (текст).
                placeholder="Поиск по ID массива" // Устанавливаем текст-заполнитель для поля ввода.
                value={searchId || ""} // Устанавливаем значение поля ввода. 
                onChange={(e) => onSearchChange(e.target.value || null)} // Устанавливаем обработчик изменения значения поля ввода.
            />
        </Form.Group>
    );
}

export default SearchForm; // Экспортируем компонент SearchForm по умолчанию.