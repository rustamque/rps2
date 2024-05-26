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
function ArrayTable({ arrays, onEdit, size }) { // Функция, которая рендерит компонент ArrayTable.
    return ( // Возвращает JSX-разметку компонента.
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
            <tbody> // Тело таблицы. 
                {arrays.map((array) => ( // Итерируем по массиву массивов. 
                    <React.Fragment key={array.id}> 
                        <tr
                            onClick={() => { // Устанавливаем обработчик события клика по строке.
                                onEdit(array); // Вызываем функцию onEdit,  передавая  данные  массива.
                            }}
                            style={{ cursor: "pointer" }} //  Устанавливаем  курсор  в  виде  указателя  для  строки.
                        >
                            <td>{array.id}</td> 
                            <td>
                                {array.data.length > 30
                                    ? array.data.slice(0, 30).join(", ") + "..." // Отображаем первые 30 элементов массива,  если  массив  длиннее,  и  добавляем  "..."
                                    : array.data.join(", ")} 
                            </td>
                            <td>
                                {formatDistanceToNow(new Date(array.update_date), { // Форматируем дату последнего обновления с помощью  formatDistanceToNow  из  date-fns.
                                    addSuffix: true, // Добавляем  суффикс  (например,  "назад",  "вчера").
                                    locale: ruLocale, //  Используем  русский  локальный  файл.
                                })}
                            </td>
                            <td>
                                {new Date(array.creation_date).toLocaleString("ru-RU", { //  Форматируем  дату  создания  с  помощью  toLocaleString  в  русском  формате.
                                    hour12: false, //  Используем  24-часовой  формат  времени. 
                                })}
                            </td>
                            <td className="text-center"> 
                                {array.is_sorted ? (
                                    <Check2 color="green" size={20} /> //  Отображаем  зеленую  галочку,  если  массив  отсортирован. 
                                ) : (
                                    <X color="red" size={20} /> //  Отображаем  красный  крестик,  если  массив  не  отсортирован. 
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