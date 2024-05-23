import axios from "axios";

/**
 * Handles fetch errors by setting an error message and logging the error details.
 *
 * @function
 * @name handleFetchError
 * @param {Error} error - The error object.
 * @param {Function} setError - The function to set the error state.
 * @param {string} customErrorMessage - Custom error message (optional).
 * @returns {void}
 */
const handleFetchError = (error, setError, customErrorMessage) => {
    setError(customErrorMessage || "Произошла ошибка при загрузке данных.");
    console.error(
        customErrorMessage || "Произошла ошибка при загрузке данных.",
        error,
    );
};

/**
 * Fetches arrays from the API based on search criteria or page number.
 *
 * @async
 * @function
 * @name fetchData
 * @param {Object} options - Options for fetching data.
 * @param {string} options.apiUrl - The API URL for fetching arrays.
 * @param {string|null} options.searchId - The ID for searching a specific array.
 * @param {number} options.page - The page number for fetching arrays.
 * @param {Function} options.setArrays - The function to set the arrays state.
 * @param {Function} options.setNumArrays - The function to set the number of arrays state.
 * @param {Function} options.setError - The function to set the error state.
 * @returns {Promise<void>}
 */
export const fetchData = async ({
    apiUrl,
    searchId,
    page,
    setArrays,
    setNumArrays,
    setError,
}) => {
    try {
        setError(null);
        const url = searchId
            ? `${apiUrl}/arrays/${searchId}/`
            : `${apiUrl}/arrays/?page=${page}`;
        const response = await axios.get(url);
        const { data, status } = response;

        if (status === 200) {
            if (searchId) {
                const array = data;
                setArrays([array]);
            } else {
                const updatedArrays = data.results.map((array) => ({ ...array }));
                setArrays(updatedArrays);
                setNumArrays(data.count);
            }
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { status } = error.response;

            if (status === 404) {
                setArrays([]);
                return;
            }
        }

        handleFetchError(error, setError);
    }
};

/**
 * Creates a new array using the provided data.
 *
 * @async
 * @function
 * @name createArray
 * @param {Object} options - Options for creating an array.
 * @param {string} options.apiUrl - The API URL for creating arrays.
 * @param {Array} options.data - The data for the new array.
 * @param {Function} options.onSuccess - The function to be called on successful array creation.
 * @param {Function} options.onError - The function to be called on array creation error.
 * @returns {Promise<Object>} The created array.
 */
export const createArray = async ({ apiUrl, data, onSuccess, onError }) => {
    try {
        const response = await axios.post(`${apiUrl}/arrays/`, {
            data: data,
            is_sorted: false,
        });
        if (response.status === 201) {
            const createdArray = response.data;
            onSuccess(createdArray);
            return createdArray;
        }
    } catch (error) {
        handleFetchError(error, onError);
    }
};

/**
 * Edits an existing array with the provided data.
 *
 * @async
 * @function
 * @name editArray
 * @param {Object} options - Options for editing an array.
 * @param {string} options.apiUrl - The API URL for editing arrays.
 * @param {string} options.id - The ID of the array to be edited.
 * @param {Array} options.data - The new data for the array.
 * @param {boolean} options.is_sorted - Flag indicating whether the array is sorted.
 * @param {Function} options.onSuccess - The function to be called on successful array edit.
 * @param {Function} options.onError - The function to be called on array edit error.
 * @returns {Promise<void>}
 */
export const editArray = async ({
    apiUrl,
    id,
    data,
    is_sorted,
    onSuccess,
    onError,
}) => {
    try {
        const response = await axios.put(`${apiUrl}/arrays/${id}/`, {
            data: data,
            is_sorted: is_sorted,
        });

        if (response.status === 200) {
            onSuccess();
        }
    } catch (error) {
        handleFetchError(error, onError);
    }
};

/**
 * Deletes an existing array.
 *
 * @async
 * @function
 * @name deleteArray
 * @param {Object} options - Options for deleting an array.
 * @param {string} options.apiUrl - The API URL for deleting arrays.
 * @param {string} options.id - The ID of the array to be deleted.
 * @param {Function} options.onSuccess - The function to be called on successful array deletion.
 * @param {Function} options.onError - The function to be called on array deletion error.
 * @returns {Promise<void>}
 */

export const deleteArray = async ({ apiUrl, id, onSuccess, onError }) => {
    try {
        const response = await axios.delete(`${apiUrl}/arrays/${id}/`);

        if (response.status === 204) {
            onSuccess();
        }
    } catch (error) {
        handleFetchError(error, onError);
    }
};

/**
 * Sorts an existing array using the Bucket Sort algorithm.
 *
 * @async
 * @function
 * @name sortArray
 * @param {Object} options - Options for sorting an array.
 * @param {string} options.apiUrl - The API URL for sorting arrays.
 * @param {string} options.id - The ID of the array to be sorted.
 * @param {Function} options.onSuccess - The function to be called on successful array sorting.
 * @param {Function} options.onError - The function to be called on array sorting error.
 * @returns {Promise<Object>} The sorted array.
 */
export const sortArray = async ({ apiUrl, id, onSuccess, onError }) => {
    try {
        const sortResponse = await axios.post(`${apiUrl}/sort/`, { id: id });

        if (sortResponse.status === 200) {
            const sortedArray = sortResponse.data;
            onSuccess();
            return sortedArray;
        }
    } catch (error) {
        handleFetchError(error, onError);
    }
};
