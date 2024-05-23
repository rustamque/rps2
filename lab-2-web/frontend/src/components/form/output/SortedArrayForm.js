import { useArrayContext } from "../../context/ArrayContext";
import { sortArray } from "../../../api/api";
import { Form } from "react-bootstrap";
import React from "react";

/**
 * Asynchronously performs bucket sort on the array with the given ID using the provided API URL.
 * Updates the sorted array and execution time in the component state.
 *
 * @async
 * @function
 * @param {string} apiUrl - The URL for performing the bucket sort operation.
 * @param {string} id - The ID of the array to be sorted.
 * @param {Function} setSortedArray - A function to set the sorted array state.
 * @param {Function} setExecutionTime - A function to set the execution time state.
 * @returns {Promise<void>} A Promise that resolves once the bucket sort operation is complete.
 */
export async function performBucketSort(
    apiUrl,
    id,
    setSortedArray,
    setExecutionTime,
) {
    const sortedArray = await sortArray({
        apiUrl,
        id: id,
        onSuccess: () => { },
    });

    if (sortedArray) {
        const sortedData = sortedArray.data;
        const executionTime = sortedArray.execution_time;
        setSortedArray(sortedData);
        setExecutionTime(executionTime);
    }
}

/**
 * SortedArrayForm component displays the sorted array and execution time obtained from the context.
 *
 * @component
 * @returns {JSX.Element} The rendered SortedArrayForm component.
 */
function SortedArrayForm() {
    const { sortedArray = [], executionTime } = useArrayContext();

    return (
        <>
            <h3>Вывод</h3>
            <Form.Group controlId="sorted-array">
                <Form.Label>
                    <strong>Отсортированный массив:</strong>
                </Form.Label>
                <Form.Control
                    as="textarea"
                    rows={4}
                    value={sortedArray ? sortedArray.join(", ") : ""}
                    readOnly
                    disabled
                />
                {executionTime !== null && (
                    <p className="text-secondary">
                        <strong>Время работы:</strong> {executionTime} секунд.
                        <br />
                    </p>
                )}
            </Form.Group>
        </>
    );
}

export default SortedArrayForm;
