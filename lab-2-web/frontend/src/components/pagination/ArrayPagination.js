import { Pagination } from "react-bootstrap"; // Импорт компонента Pagination из библиотеки react-bootstrap.
import React from "react"; // Импорт React для работы с компонентами.

/**
 * Компонент ArrayPagination предоставляет элементы управления пагинацией для навигации по списку массивов.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {number} props.page - Текущий номер страницы.
 * @param {Function} props.setPage - Функция для обновления текущей страницы.
 * @param {number} props.numArrays - Общее количество доступных массивов.
 * @param {number} props.arraysLength - Длина текущего списка массивов.
 * @returns {JSX.Element} Рендеринг компонента ArrayPagination.
 */
function ArrayPagination({ page, setPage, numArrays, arraysLength }) { // Функция, которая рендерит компонент ArrayPagination.
    return ( // Возвращает JSX-разметку компонента.
        <Pagination className="pagination-center"> 
            {numArrays > 50 && ( // Отображаем элементы пагинации, только если общее количество массивов больше 50. 
                <>
                    <Pagination.First onClick={() => setPage(1)} disabled={page <= 1} /> 
                    <Pagination.Prev
                        onClick={() => setPage(page - 1)} // Кнопка "Предыдущая страница", устанавливаем обработчик события onClick, делаем кнопку неактивной, если текущая страница первая. 
                        disabled={page <= 1}
                    />
                    <Pagination.Item>{page}</Pagination.Item> 
                    <Pagination.Next
                        onClick={() => setPage(page + 1)} // Кнопка "Следующая страница", устанавливаем обработчик события onClick, делаем кнопку неактивной, если больше нет страниц.
                        disabled={arraysLength < 50}
                    />
                    <Pagination.Last
                        onClick={() => setPage(Math.ceil(numArrays / 50))} // Кнопка "Последняя страница", устанавливаем обработчик события onClick, делаем кнопку неактивной, если больше нет страниц.
                        disabled={arraysLength < 50}
                    />
                </>
            )}
        </Pagination>
    );
};

export default ArrayPagination; // Экспортируем компонент ArrayPagination по умолчанию.