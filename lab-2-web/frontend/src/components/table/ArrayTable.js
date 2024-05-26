import { Check2, X } from "react-bootstrap-icons"; // Импортируем иконки "Галочка" и "Крестик" из библиотеки react-bootstrap-icons.
import { formatDistanceToNow } from "date-fns"; // Импортируем функцию  formatDistanceToNow  из  библиотеки  date-fns  для  форматирования  относительной  даты.
import ruLocale from "date-fns/locale/ru"; // Импортируем  русский  локальный  файл  для  date-fns. 
import { Table } from "react-bootstrap"; // Импортируем компонент Table из библиотеки react-bootstrap.
import React from "react"; // Импорт React для работы с компонентами.

/**
 * Компонент ArrayTable отображает интерактивную таблицу массивов, позволяя пользователям кликнуть по строке для запуска действия редактирования.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Array} props.arrays - Массив объектов, содержащих данные массивов.
 * @param {Function} props.onEdit - Функция для обработки действия редактирования при клике по строке.
 * @param {string} [props.size] - Вариант размера для компонента Table (например, 'sm' для маленького).
 * @returns {JSX.Element} Рендеринг компонента ArrayTable.
 */
function ArrayTable({ arrays, onEdit, size }) { 
    return ( 
        <Table striped bordered hover size={size}> 
            <thead>  
                <tr>
                    <th>ID</th>
                    <th>Элементы массива</th>
                    <th>Последнее обновление</th>
                    <th>Создан</th>
                    <th>Отсортирован</th>
                </tr>
            </thead>
            <tbody>
                {arrays.map((array) => ( 
                    <React.Fragment key={array.id}> 
                        <tr
                            onClick={() => { 
                                onEdit(array); 
                            }}
                            style={{ cursor: "pointer" }} 
                        >
                            <td>{array.id}</td> 
                            <td>
                                {array.data.length > 30
                                    ? array.data.slice(0, 30).join(", ") + "..." 
                                    : array.data.join(", ")} 
                            </td>
                            <td>
                                {formatDistanceToNow(new Date(array.update_date), { 
                                    addSuffix: true, 
                                    locale: ruLocale, 
                                })}
                            </td>
                            <td>
                                {new Date(array.creation_date).toLocaleString("ru-RU", { 
                                    hour12: false, 
                                })}
                            </td>
                            <td className="text-center"> 
                                {array.is_sorted ? (
                                    <Check2 color="green" size={20} /> 
                                ) : (
                                    <X color="red" size={20} />  
                                )}
                            </td>
                        </tr>
                    </React.Fragment>
                ))}
            </tbody>
        </Table>
    );
};

export default ArrayTable; // Экспортируем компонент ArrayTable по умолчанию.