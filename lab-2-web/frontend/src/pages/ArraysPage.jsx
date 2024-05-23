import { fetchData, editArray, deleteArray, sortArray } from "../api/api";
import ArrayPagination from "../components/pagination/ArrayPagination";
import EditArrayModal from "../components/modal/EditArrayModal";
import React, { useEffect, useState, useCallback } from "react";
import ArraysTable from "../components/table/ArrayTable";
import MainNavbar from "../components/common/MainNavbar";
import MainFooter from "../components/common/MainFooter";
import SearchForm from "../components/form/SearchForm";
import { Container } from "react-bootstrap";

import "../index.css";

/**
 * ArraysPage component represents the page for viewing and editing arrays. It includes a table of arrays, search functionality, and pagination.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.apiUrl - The API URL for fetching and interacting with arrays.
 * @returns {JSX.Element} The rendered ArraysPage component.
 */
function ArraysPage({ apiUrl }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingArray, setEditingArray] = useState(null);
    const [searchId, setSearchId] = useState(null);
    const [numArrays, setNumArrays] = useState();
    const [error, setError] = useState(null);
    const [arrays, setArrays] = useState([]);
    const [page, setPage] = useState(1);

    const fetchDataCallback = useCallback(() => {
        fetchData({
            apiUrl,
            searchId,
            page,
            setArrays,
            setNumArrays,
            setError,
        });
    }, [apiUrl, page, searchId, setArrays, setNumArrays, setError]);

    /**
     * useEffect Hook to fetch data from the API when the component mounts or when dependencies change.
     * @function
     * @name useEffect
     * @param {Function} fetchDataCallback - Callback function for fetching data from the API.
     * @param {Array} dependencies - An array of dependencies that trigger the effect when changed.
     * @returns {void}
     */
    useEffect(() => {
        fetchDataCallback();
    }, [fetchDataCallback]);

    /**
     * Handles the save action for editing an array.
     * @async
     * @function
     * @name handleSave
     * @param {Object} editedArray - The edited array object containing data and ID.
     * @returns {Promise<void>}
     */
    const handleSave = async (editedArray) => {
        const numEditedArray = editedArray.data.map(Number);

        await editArray({
            apiUrl,
            id: editedArray.id,
            data: numEditedArray,
            is_sorted: false,
            onSuccess: fetchDataCallback,
        });
    };

    /**
    * Handles the sort action for editing and sorting an array.
    * @async
    * @function
    * @name handleSort
    * @param {Object} editedArray - The edited array object containing data and ID.
    * @returns {Promise<void>}
    */
    const handleSort = async (editedArray) => {
        const numEditedArray = editedArray.data.map(Number);

        await editArray({
            apiUrl,
            id: editedArray.id,
            data: numEditedArray,
            is_sorted: false,
            onSuccess: async () => {
                await sortArray({
                    apiUrl,
                    id: editedArray.id,
                    onSuccess: fetchDataCallback,
                });
            },
        });
    };

    /**
     * Handles the delete action for deleting an array.
     * @async
     * @function
     * @name handleDelete
     * @param {Object} editedArray - The array object to be deleted.
     * @returns {Promise<void>}
     */
    const handleDelete = async (editedArray) => {
        await deleteArray({
            apiUrl,
            id: editedArray.id,
            onSuccess: fetchDataCallback,
        });
    };

    /**
     * Handles the edit action, setting the editingArray state and showing the edit modal.
     * @function
     * @name handleEdit
     * @param {Object} array - The array object to be edited.
     * @returns {void}
     */
    const handleEdit = (array) => {
        setEditingArray(array);
        setShowEditModal(true);
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

                {error ? (
                    <h4 className="text-danger">{error}</h4>
                ) : arrays.length > 0 ? (
                    <ArraysTable arrays={arrays} onEdit={handleEdit} />
                ) : (
                    <h4>Массив с данным ID не найден.</h4>
                )}

                <ArrayPagination
                    page={page}
                    setPage={setPage}
                    numArrays={numArrays}
                    arraysLength={arrays.length}
                />
            </Container>

            {editingArray && (
                <EditArrayModal
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    array={editingArray}
                    handleSave={handleSave}
                    handleSort={handleSort}
                    handleDelete={handleDelete}
                />
            )}
            <MainFooter />
        </>
    );
}

export default ArraysPage;
