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
function ArrayPagination({ page, setPage, numArrays, arraysLength }) { 
    return ( 
        <Pagination className="pagination-center"> 
            {numArrays > 50 && ( 
                <>
                    <Pagination.First onClick={() => setPage(1)} disabled={page <= 1} /> 
                    <Pagination.Prev
                        onClick={() => setPage(page - 1)} 
                        disabled={page <= 1}
                    />
                    <Pagination.Item>{page}</Pagination.Item> 
                    <Pagination.Next
                        onClick={() => setPage(page + 1)} 
                        disabled={arraysLength < 50}
                    />
                    <Pagination.Last
                        onClick={() => setPage(Math.ceil(numArrays / 50))}
                        disabled={arraysLength < 50}
                    />
                </>
            )}
        </Pagination>
    );
};

export default ArrayPagination; // Экспортируем компонент ArrayPagination по умолчанию.