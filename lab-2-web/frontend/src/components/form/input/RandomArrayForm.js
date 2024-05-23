import {
    ArrowRepeat,
    SortNumericDown,
    CloudUpload,
} from "react-bootstrap-icons";
import ExtractButtonGroup from "../../extract/ExtractButtonGroup";
import ExtractInputField from "../../extract/ExtractInputField";
import ExtractTextArea from "../../extract/ExtractTextArea";
import { Button } from "react-bootstrap";
import React from "react";

/**
 * RandomArrayForm component allows users to generate a random array of numbers within a specified range.
 * It provides input fields for the number of elements, minimum, and maximum values,
 * and options to generate, save to the database, and sort the array.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.array - The generated random array of numbers.
 * @param {Function} props.setArray - A function to set the array state.
 * @param {number} props.numElements - The number of elements to generate in the array.
 * @param {Function} props.setNumElements - A function to set the number of elements state.
 * @param {string} props.minValue - The minimum value for generating random numbers.
 * @param {Function} props.setMinValue - A function to set the minimum value state.
 * @param {string} props.maxValue - The maximum value for generating random numbers.
 * @param {Function} props.setMaxValue - A function to set the maximum value state.
 * @param {string} props.error - Error message to display.
 * @param {Function} props.setError - A function to set the error state.
 * @param {string} props.info - Information message to display.
 * @param {Function} props.setIsSaving - A function to set the saving state.
 * @returns {JSX.Element} The rendered RandomArrayForm component.
 */
function RandomArrayForm({
    array,
    setArray,
    numElements,
    setNumElements,
    minValue,
    setMinValue,
    maxValue,
    setMaxValue,
    error,
    setError,
    info,
    setIsSaving,
}) {
    /**
     * Handles the generation of a random array based on user input and updates the component state.
     *
     * @function
     * @returns {void}
     */
    const handleAddRandomArray = () => {
        const minVal = parseInt(minValue);
        const maxVal = parseInt(maxValue);
        const numElem = parseInt(numElements);

        if (isNaN(minVal) || isNaN(numElem)) {
            setError("Минимальное и максимальное значения должны быть числами.");
            return;
        }

        if (numElem <= 0) {
            setError("Количество элементов должно быть больше 0.");
            return;
        }

        if (numElem >= 3000000) {
            setError("Генерация ограничена 3 миллионами элементов.");
            return;
        }

        if (minVal >= maxVal) {
            setError("Максимальное значение должно быть больше минимального.");
            return;
        }

        const randomArray = Array.from({ length: numElem }, () => {
            const randomElement = Math.floor(
                Math.random() * (maxVal - minVal + 1) + minVal,
            );
            return randomElement.toString();
        });

        setArray(randomArray);
        setError(null);
    };

    return (
        <>
            <p>
                Этот метод генерирует случайный массив чисел в заданном диапазоне.
                <br />
                Введите количество элементов, минимальное и максимальное значение для
                генерации случайных чисел.
                <br />
                Нажмите кнопку "Сгенерировать массив", чтобы создать случайный массив.
            </p>
            <ExtractTextArea
                controlId="random-array"
                label="Случайный массив:"
                value={array.join(", ")}
                rows={4}
                disabled
            />
            <ExtractInputField
                controlId="num-elements"
                label="Количество элементов:"
                value={numElements}
                onChange={(e) => setNumElements(e.target.value)}
                type="number"
                step="0"
                min="1"
            />
            <ExtractInputField
                controlId="min-value"
                label="Минимальное значение:"
                value={minValue}
                onChange={(e) => setMinValue(e.target.value)}
                type="number"
                step="0"
            />
            <ExtractInputField
                controlId="max-value"
                label="Максимальное значение:"
                value={maxValue}
                onChange={(e) => setMaxValue(e.target.value)}
                type="number"
                step="0"
            />
            {error && <p className="text-danger text-end">{error}</p>}
            {info && <p className="text-primary text-end">{info}</p>}
            <ExtractButtonGroup>
                <Button
                    variant="secondary"
                    onClick={handleAddRandomArray}
                    className="d-flex align-items-center gap-1"
                >
                    <ArrowRepeat /> Сгенерировать
                </Button>
                <Button
                    variant="info"
                    type="submit"
                    className="d-flex align-items-center gap-1"
                    onClick={() => setIsSaving(true)}
                    disabled={array.length === 0}
                >
                    <CloudUpload /> Сохранить в базу
                </Button>
                <Button
                    variant="primary"
                    type="submit"
                    className="d-flex align-items-center gap-1"
                    disabled={array.length === 0}
                >
                    <SortNumericDown /> Отсортировать
                </Button>
            </ExtractButtonGroup>
        </>
    );
}

export default RandomArrayForm;
