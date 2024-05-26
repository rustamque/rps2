import { fetchData, editArray, deleteArray, sortArray } from "../api/api"; // Импортируем функции для взаимодействия с API.
import ArrayPagination from "../components/pagination/ArrayPagination"; // Импорт компонента пагинации.
import EditArrayModal from "../components/modal/EditArrayModal"; // Импорт компонента модального окна для редактирования массива.
import React, { useEffect, useState, useCallback } from "react"; // Импорт хуков React.
import ArraysTable from "../components/table/ArrayTable"; // Импорт компонента таблицы массивов.
import MainNavbar from "../components/common/MainNavbar"; // Импорт компонента главной панели навигации.
import MainFooter from "../components/common/MainFooter"; // Импорт компонента футера.
import SearchForm from "../components/form/SearchForm"; // Импорт компонента формы поиска.
import { Container } from "react-bootstrap"; // Импорт компонента Container из библиотеки react-bootstrap.

import "../index.css"; // Импорт CSS-стилей для приложения.

/**
 * Компонент ArraysPage представляет страницу для просмотра и редактирования массивов. 
 * Включает в себя таблицу массивов, функциональность поиска и пагинацию.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {string} props.apiUrl - URL API для получения и взаимодействия с массивами.
 * @returns {JSX.Element} Рендеринг компонента ArraysPage.
 */
function ArraysPage({ apiUrl }) { // Функция, которая рендерит компонент ArraysPage.
    const [showEditModal, setShowEditModal] = useState(false); // Состояние, которое определяет, открыто ли модальное окно.
    const [editingArray, setEditingArray] = useState(null); // Состояние, которое хранит массив, который редактируется в данный момент. 
    const [searchId, setSearchId] = useState(null); // Состояние для ID поиска.
    const [numArrays, setNumArrays] = useState(); // Состояние для количества массивов.
    const [error, setError] = useState(null); // Состояние для сообщения об ошибке.
    const [arrays, setArrays] = useState([]); // Состояние для массива массивов.
    const [page, setPage] = useState(1); // Состояние для текущей страницы пагинации.

    const fetchDataCallback = useCallback(() => { // Замыкание для извлечения данных из API, которое запоминает значения параметров.
        fetchData({ // Вызываем функцию fetchData для получения данных.
            apiUrl, // URL API.
            searchId, // ID для поиска (необязательно).
            page, // Текущая страница для пагинации.
            setArrays, // Функция для установки состояния массивов.
            setNumArrays, // Функция для установки состояния количества массивов.
            setError, // Функция для установки состояния ошибки.
        });
    }, [apiUrl, page, searchId, setArrays, setNumArrays, setError]); // Зависимости useCallback: хук перерендерится, только если эти значения изменятся.

    /**
     * Хук useEffect для извлечения данных из API при монтировании компонента или изменении зависимостей.
     * @function
     * @name useEffect
     * @param {Function} fetchDataCallback - Callback-функция для получения данных из API.
     * @param {Array} dependencies - Массив зависимостей, при изменении которых вызывается эффект.
     * @returns {void}
     */
    useEffect(() => { // Хук useEffect для извлечения данных при монтировании и изменении зависимостей.
        fetchDataCallback(); // Вызываем функцию fetchDataCallback для получения данных.
    }, [fetchDataCallback]); // Зависимости useEffect: хук перерендерится, только если fetchDataCallback изменится.

    /**
     * Обрабатывает действие сохранения для редактирования массива.
     * @async
     * @function
     * @name handleSave
     * @param {Object} editedArray - Отредактированный объект массива, содержащий данные и ID.
     * @returns {Promise<void>}
     */

    const handleSave = async (editedArray) => { // Функция, которая обрабатывает сохранение массива.
        const numEditedArray = editedArray.data.map(Number); // Преобразуем массив в числовой массив.

        await editArray({ // Вызываем функцию  editArray  для  сохранения  изменений  в  API. 
            apiUrl, // URL  API.
            id: editedArray.id, // ID  редактируемого  массива.
            data: numEditedArray, //  Новые  данные  массива.
            is_sorted: false, // Устанавливаем  флаг,  что  массив  не  отсортирован.
            onSuccess: fetchDataCallback, //  Функция,  которая  вызывается  при  успешном  сохранении.
        });
    };

    /**
     * Обрабатывает действие сортировки для редактирования и сортировки массива.
     * @async
     * @function
     * @name handleSort
     * @param {Object} editedArray - Отредактированный объект массива, содержащий данные и ID.
     * @returns {Promise<void>}
     */

    const handleSort = async (editedArray) => { // Функция, которая обрабатывает сортировку массива.
        const numEditedArray = editedArray.data.map(Number); // Преобразуем массив в числовой массив.

        await editArray({ // Сохраняем  изменения  в  API.
            apiUrl,
            id: editedArray.id,
            data: numEditedArray,
            is_sorted: false,
            onSuccess: async () => { // Вызывается после успешного сохранения. 
                await sortArray({
                    apiUrl,
                    id: editedArray.id,
                    onSuccess: fetchDataCallback,
                });
            },
        });
    };

    /**
     * Обрабатывает действие удаления для удаления массива.
     * @async
     * @function
     * @name handleDelete
     * @param {Object} editedArray - Объект массива, который нужно удалить.
     * @returns {Promise<void>}
     */

    const handleDelete = async (editedArray) => { // Функция,  которая  удаляет  массив  из  API. 
        await deleteArray({
            apiUrl,
            id: editedArray.id,
            onSuccess: fetchDataCallback, // Вызывается после успешного удаления. 
        });
    };

    /**
     * Обрабатывает действие редактирования, устанавливая состояние editingArray и отображая модальное окно редактирования.
     * @function
     * @name handleEdit
     * @param {Object} array - Объект массива, который нужно отредактировать.
     * @returns {void}
     */

    const handleEdit = (array) => { // Функция,  которая  открывает  модальное  окно  для  редактирования. 
        setEditingArray(array); // Устанавливаем  состояние  редактируемого  массива.
        setShowEditModal(true); // Открываем  модальное  окно.
    };

    return (
        <>
            <MainNavbar /> 
            <Container className="pt-3 mt-3 pb-3 mb-3"> 
                <h2>Просмотр и редактирование</h2>
                <p className="pb-2">
                    На этой странице отображается список массивов. Вы можете их
                    просматривать, редактировать и сортировать используя метод блочной
                    сортировки.
                    <br />
                    Обратите внимание, что отображаются только 30 первых элементов
                    массива. Для просмотра всех элементов выберите массив.
                </p>

                {searchId === null && !error && <h4>Всего массивов: {numArrays}</h4>}  

                <SearchForm searchId={searchId} onSearchChange={setSearchId} /> 
                {error ? ( // Отображаем сообщение об ошибке, если оно есть. 
                    <h4 className="text-danger">{error}</h4>
                ) : arrays.length > 0 ? ( // Отображаем таблицу массивов, если есть данные. 
                    <ArraysTable arrays={arrays} onEdit={handleEdit} /> 
                ) : (
                    <h4>Массив с данным ID не найден.</h4> // Отображаем сообщение, если массивов нет. 
                )}

                <ArrayPagination
                    page={page}
                    setPage={setPage}
                    numArrays={numArrays}
                    arraysLength={arrays.length}
                />
            </Container>

            {editingArray && ( // Отображаем модальное окно для редактирования массива, если оно открыто.
                <EditArrayModal
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)} // Закрытие модального окна.
                    array={editingArray}
                    handleSave={handleSave} // Функция для обработки сохранения. 
                    handleSort={handleSort} // Функция для обработки сортировки. 
                    handleDelete={handleDelete} // Функция для обработки удаления. 
                />
            )}
            <MainFooter /> 
        </>
    );
}

export default ArraysPage; // Экспортируем компонент ArraysPage по умолчанию.