import FillMethodSelector from "../selector/FillMethodSelector";
import { performBucketSort } from "./output/SortedArrayForm";
import KeyboardArrayForm from "./input/KeyboardArrayForm";
import DatabaseArrayForm from "./input/DatabaseArrayForm";
import { useArrayContext } from "../context/ArrayContext";
import RandomArrayForm from "./input/RandomArrayForm";
import FileArrayForm from "./input/FileArrayForm";
import { createArray } from "../../api/api";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

/**
 * CreateArrayForm component provides a form for users to input, generate, or load arrays
 * with various input methods such as keyboard, random generation, file upload, and database selection.
 * Users can choose the fill method and submit the form to either save the array to the database or save
 * and sort the array using the bucket sort algorithm.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.apiUrl - The URL for API requests.
 * @returns {JSX.Element} The rendered CreateArrayForm component.
 */
function CreateArrayForm({ apiUrl }) {
    const [isWholeArrayInput, setIsWholeArrayInput] = useState(false);
    const [currentElement, setCurrentElement] = useState("");
    const [fillMethod, setFillMethod] = useState("keyboard");
    const [selectedArray, setSelectedArray] = useState(null);
    const [isFileValid, setIsFileValid] = useState(false);
    const [numElements, setNumElements] = useState("10");
    const [maxValue, setMaxValue] = useState("100");
    const [minValue, setMinValue] = useState("1");
    const [error, setError] = useState(null);
    const [array, setArray] = useState([]);
    const [info, setInfo] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    const { setSortedArray, setExecutionTime } = useArrayContext();

    /**
     * Handles the form submission, either saving the array to the database or saving and sorting the array.
     *
     * @async
     * @function
     * @param {Object} event - The form submission event.
     * @returns {Promise<void>} A Promise that resolves once the form submission is processed.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setInfo(null);

        let numArray = 0;

        if (isWholeArrayInput) {
            numArray = array.data.map(Number);
        } else {
            numArray = array.map(Number);
        }

        if (isSaving) {
            const createdArray = await createArray({
                apiUrl,
                data: numArray,
                onSuccess: () => { },
                onError: setError,
            });

            if (createdArray) {
                setInfo("Массив добавлен в базу.");
            }

            setIsSaving(false);
        } else {
            await handleSort(numArray);
        }
    };

    /**
     * Handles the sorting of the array, saving it to the database, and updating the component state.
     *
     * @async
     * @function
     * @param {number[]} array - The array to be sorted and saved.
     * @returns {Promise<void>} A Promise that resolves once the sorting and saving are complete.
     */
    const handleSort = async (array) => {
        const createdArray = await createArray({
            apiUrl,
            data: array,
            onSuccess: () => { },
            onError: setError,
        });
        
        if (createdArray) {
            await performBucketSort(
                apiUrl,
                createdArray.id,
                setSortedArray,
                setExecutionTime,
            );

            setInfo("Массив добавлен в базу и отсортирован.");
        }
    };

    /**
     * Handles the change of the fill method, resetting the array and updating the component state.
     *
     * @function
     * @param {Object} event - The fill method change event.
     * @returns {void}
     */
    const handleFillMethodChange = (event) => {
        const newFillMethod = event.target.value;

        setFillMethod(newFillMethod);
        setArray([]);
        setInfo(null);
        setError(null);
        setIsFileValid(true);
        setIsWholeArrayInput(false);
    };

    const methodComponents = {
        keyboard: (
            <KeyboardArrayForm
                array={array}
                setArray={setArray}
                isWholeArrayInput={isWholeArrayInput}
                setIsWholeArrayInput={setIsWholeArrayInput}
                currentElement={currentElement}
                setCurrentElement={setCurrentElement}
                error={error}
                info={info}
                setIsSaving={setIsSaving}
            />
        ),
        random: (
            <RandomArrayForm
                array={array}
                setArray={setArray}
                numElements={numElements}
                setNumElements={setNumElements}
                minValue={minValue}
                setMinValue={setMinValue}
                maxValue={maxValue}
                setMaxValue={setMaxValue}
                error={error}
                setError={setError}
                info={info}
                setIsSaving={setIsSaving}
            />
        ),
        file: (
            <FileArrayForm
                array={array}
                setArray={setArray}
                isFileValid={isFileValid}
                setIsFileValid={setIsFileValid}
                error={error}
                setError={setError}
                info={info}
                setIsSaving={setIsSaving}
            />
        ),
        database: (
            <DatabaseArrayForm
                apiUrl={apiUrl}
                array={array}
                setArray={setArray}
                selectedArray={selectedArray}
                setSelectedArray={setSelectedArray}
                error={error}
                setError={setError}
                info={info}
                setIsSaving={setIsSaving}
            />
        ),
    };

    return (
        <>
            <h3>Ввод</h3>
            <Form
                id="array-form"
                className="border p-4 rounded mb-4"
                onSubmit={handleSubmit}
            >
                <FillMethodSelector
                    fillMethod={fillMethod}
                    handleFillMethodChange={handleFillMethodChange}
                />
                {methodComponents[fillMethod]}
            </Form>
        </>
    );
}

export default CreateArrayForm;
