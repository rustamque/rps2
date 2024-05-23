import { CloudUpload, SortNumericDown } from "react-bootstrap-icons";
import ExtractButtonGroup from "../../extract/ExtractButtonGroup";
import React, { useCallback, useState, useEffect } from "react";
import ArrayPagination from "../../pagination/ArrayPagination";
import ExtractTextArea from "../../extract/ExtractInputField";
import ArrayTable from "../../table/ArrayTable";
import { Button } from "react-bootstrap";
import { fetchData } from "../../../api/api";

/**
 * DatabaseArrayForm component allows users to interact with arrays from a database.
 * It includes features like selecting arrays, editing, saving to the database, and sorting.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.apiUrl - The URL for fetching data from the API.
 * @param {Array|Object} props.array - The array or object representing the data.
 * @param {Function} props.setArray - A function to set the array state.
 * @param {string} props.error - Error message to display.
 * @param {Function} props.setError - A function to set the error state.
 * @param {string} props.info - Information message to display.
 * @param {Function} props.setIsSaving - A function to set the saving state.
 * @returns {JSX.Element} The rendered DatabaseArrayForm component.
 */
function DatabaseArrayForm({
    apiUrl,
    array,
    setArray,
    error,
    setError,
    info,
    setIsSaving,
}) {
    const [page, setPage] = useState(1);
    const [numArrays, setNumArrays] = useState(0);
    const [availableArrays, setAvailableArrays] = useState([]);

    /**
     * Fetches data from the API based on the provided parameters and updates the component state.
     *
     * @function
     * @param {string} apiUrl - The URL for fetching data from the API.
     * @param {number} page - The current page for pagination.
     * @param {Function} setAvailableArrays - A function to set the available arrays state.
     * @param {Function} setNumArrays - A function to set the number of arrays state.
     * @param {Function} setError - A function to set the error state.
     * @returns {void}
     */
    const fetchDataCallback = useCallback(() => {
        fetchData({
            apiUrl,
            searchId: null,
            page,
            setArrays: setAvailableArrays,
            setNumArrays,
            setError,
        });
    }, [apiUrl, page, setAvailableArrays, setNumArrays, setError]);

    /**
     * useEffect hook that fetches data from the API when the component mounts or when the 'page' state changes.
     * It updates the available arrays and the number of arrays in the state, and handles potential errors.
     *
     * @effect
     * @param {Function} fetchDataCallback - Callback function for fetching data from the API.
     * @returns {void}
     */
    useEffect(() => {
        fetchDataCallback();
    }, [fetchDataCallback]);

    /**
     * Handles the selection of an array from the database and updates the component state.
     *
     * @function
     * @param {Object} array - The selected array object.
     * @returns {void}
     */
    const handleArraySelect = (array) => {
        setArray(array.data);
    };

    /**
     * Handles the input change event and updates the component state with numeric values.
     *
     * @function
     * @param {Object} event - The input change event.
     * @returns {void}
     */
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        const numericValues = value.split(" ").map((val) => {
            if (val === "" || val === "-") return val;
            if (/^-?\d+$/.test(val)) return parseInt(val, 10);
            return 0;
        });

        if (Array.isArray(array)) {
            setArray(numericValues);
        } else {
            setArray({ ...array, [name]: numericValues });
        }
    };

    return (
        <>
            <p>
                Выберите массив из базы данных для работы, кликнув по строке из таблицы.
                <br />
                Обратите внимание, что при сохранении в базу и сортировке создается
                новый массив. Для редактирования базы используйте{" "}
                <a href="/arrays" style={{ textDecoration: "none" }}>
                    эту страницу
                </a>
                .
            </p>

            {availableArrays.length > 0 && (
                <>
                    <ArrayTable
                        arrays={availableArrays}
                        onEdit={handleArraySelect}
                        size="sm"
                    />
                    <ArrayPagination
                        page={page}
                        setPage={setPage}
                        numArrays={numArrays}
                        arraysLength={availableArrays.length}
                    />
                </>
            )}

            <ExtractTextArea
                controlId="database-array"
                name="data"
                label="Выбранный массив:"
                value={array.join(" ")}
                rows={4}
                onChange={handleInputChange}
                disabled={array.length === 0}
            />
            {error && <p className="text-danger text-end">{error}</p>}
            {info && <p className="text-primary text-end">{info}</p>}
            <ExtractButtonGroup>
                <Button
                    variant="info"
                    type="submit"
                    className="d-flex align-items-center gap-1"
                    onClick={() => setIsSaving(true)}
                    disabled={array.length <= 1}
                >
                    <CloudUpload /> Сохранить в базу
                </Button>
                <Button
                    variant="primary"
                    type="submit"
                    className="d-flex align-items-center gap-1"
                    disabled={array.length <= 1}
                >
                    <SortNumericDown /> Отсортировать
                </Button>
            </ExtractButtonGroup>
        </>
    );
}

export default DatabaseArrayForm;
