import { SortNumericDown, CloudUpload } from "react-bootstrap-icons";
import ExtractButtonGroup from "../../extract/ExtractButtonGroup";
import ExtractTextArea from "../../extract/ExtractTextArea";
import { Form, Button } from "react-bootstrap";
import React from "react";

/**
 * KeyboardArrayForm component allows users to input array elements manually using a keyboard.
 * It supports both individual element input and inputting the entire array at once.
 * Provides options for saving to the database and sorting the array.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.array - The array state, which can be an object with individual elements or an array.
 * @param {Function} props.setArray - A function to set the array state.
 * @param {boolean} props.isWholeArrayInput - A boolean indicating whether the entire array is input at once.
 * @param {Function} props.setIsWholeArrayInput - A function to set the input method state.
 * @param {string} props.currentElement - The current element being input individually.
 * @param {Function} props.setCurrentElement - A function to set the current element state.
 * @param {string} props.error - Error message to display.
 * @param {string} props.info - Information message to display.
 * @param {Function} props.setIsSaving - A function to set the saving state.
 * @returns {JSX.Element} The rendered KeyboardArrayForm component.
 */
function KeyboardArrayForm({
    array,
    setArray,
    isWholeArrayInput,
    setIsWholeArrayInput,
    currentElement,
    setCurrentElement,
    error,
    info,
    setIsSaving,
}) {
    /**
     * Toggles between input methods (whole array or individual elements) and resets the array.
     *
     * @function
     * @returns {void}
     */
    const handleWholeArrayInputChange = () => {
        setIsWholeArrayInput(!isWholeArrayInput);
        setArray([]);
    };

    /**
     * Handles input change events, parsing and updating the array based on the input method.
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

        setArray({ ...array, [name]: numericValues });
    };

    /**
     * Handles the onBlur event for the current element input, adds it to the array, and resets the current element.
     *
     * @function
     * @returns {void}
     */
    const handleInputBlur = () => {
        if (currentElement !== "") {
            setArray((prevArray) => [...prevArray, currentElement]);
            setCurrentElement("");
        }
    };

    return (
        <>
            <p>
                Вы можете ввести элементы массива вручную с клавиатуры.
                <br />
                Введите число в поле для добавления элемента в массив.
            </p>
            <Form.Group controlId="array-input-method" className="mb-3">
                <Form.Check
                    type="checkbox"
                    label="Ввод через пробел"
                    checked={isWholeArrayInput}
                    onChange={handleWholeArrayInputChange}
                />
            </Form.Group>

            {isWholeArrayInput ? (
                <>
                    <p className="text-secondary">
                        Пишите элементы поочередно, разделяя их пробелом. Это удобнее при
                        создании больших массивов.
                        <br />
                        Разрешен ввод только целых чисел, лишние пробелы будут заменены
                        нулём.
                    </p>
                    <ExtractTextArea
                        controlId="whole-array"
                        name="data"
                        label="Введите массив:"
                        value={Array.isArray(array.data) ? array.data.join(" ") : ""}
                        rows={4}
                        onChange={handleInputChange}
                    />
                </>
            ) : (
                <>
                    {array.map((element, index) => (
                        <Form.Group controlId={`element-${index}`} key={index}>
                            <Form.Label>Элемент {index + 1}</Form.Label>
                            <Form.Control type="text" value={element} disabled />
                        </Form.Group>
                    ))}
                    <Form.Label>
                        <strong>Новый элемент:</strong>
                    </Form.Label>
                    <Form.Group controlId="current-element" className="mb-3 d-flex">
                        {array.length >= 0 && (
                            <Form.Control
                                type="number"
                                value={currentElement}
                                onChange={(e) => setCurrentElement(e.target.value)}
                                onBlur={handleInputBlur}
                            />
                        )}
                    </Form.Group>
                </>
            )}
            {error && <p className="text-danger text-end">{error}</p>}
            {info && <p className="text-primary text-end">{info}</p>}
            <ExtractButtonGroup>
                <Button
                    variant="info"
                    className="d-flex align-items-center gap-1"
                    type="submit"
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

export default KeyboardArrayForm;
