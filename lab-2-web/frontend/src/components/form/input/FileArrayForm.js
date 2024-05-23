import { SortNumericDown, CloudUpload } from "react-bootstrap-icons";
import ExtractButtonGroup from "../../extract/ExtractButtonGroup";
import ExtractInputField from "../../extract/ExtractInputField";
import ExtractTextArea from "../../extract/ExtractTextArea";
import { Button } from "react-bootstrap";
import React from "react";

/**
 * FileArrayForm component allows users to upload an array of integers from a text file (.txt).
 * It provides functionality for reading and parsing the file, displaying the loaded array,
 * and performing actions like saving to the database and sorting.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.array - The array representing the loaded data from the file.
 * @param {Function} props.setArray - A function to set the array state.
 * @param {boolean} props.isFileValid - A boolean indicating whether the loaded file is valid.
 * @param {Function} props.setIsFileValid - A function to set the file validity state.
 * @param {string} props.error - Error message to display.
 * @param {Function} props.setError - A function to set the error state.
 * @param {string} props.info - Information message to display.
 * @param {Function} props.setIsSaving - A function to set the saving state.
 * @returns {JSX.Element} The rendered FileArrayForm component.
 */
function FileArrayForm({
    array,
    setArray,
    isFileValid,
    setIsFileValid,
    error,
    setError,
    info,
    setIsSaving,
}) {
    /**
     * Reads and parses the content of the uploaded file.
     *
     * @function
     * @param {File} file - The uploaded file.
     * @returns {void}
     */
    const readAndParseFile = (file) => {
        const reader = new FileReader();
        reader.onload = handleFileLoad;
        reader.onerror = handleFileError;
        reader.readAsText(file);
    };

    /**
     * Handles the file load event, parses the file content, and updates the component state.
     *
     * @function
     * @param {Event} event - The file load event.
     * @returns {void}
     */
    const handleFileLoad = (event) => {
        const fileContent = event.target.result;
        const parsedArray = parseFileContent(fileContent);

        if (parsedArray.length > 0) {
            setArray(parsedArray);
            setIsFileValid(true);
        } else {
            setError("Файл не содержит допустимых данных.");
            setIsFileValid(false);
        }
    };

    /**
     * Parses the content of the file, extracting valid integers and filtering out invalid ones.
     *
     * @function
     * @param {string} content - The content of the file.
     * @returns {Array} An array of valid integers.
     */
    const parseFileContent = (content) => {
        return content
            .split("\n")
            .map((line) => {
                const num = parseInt(line.trim());
                return !isNaN(num) ? num : null;
            })
            .filter((num) => num !== null);
    };

    /**
     * Handles file read error by setting an error message and updating the file validity state.
     *
     * @function
     * @returns {void}
     */
    const handleFileError = () => {
        setError("Произошла ошибка при чтении файла.");
        setIsFileValid(false);
    };

    /**
     * Handles the change event when a new file is selected for upload.
     *
     * @function
     * @param {Event} e - The file change event.
     * @returns {void}
     */
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setError(null);

        if (selectedFile) {
            if (selectedFile.name.endsWith(".txt")) {
                readAndParseFile(selectedFile);
            } else {
                setError(
                    "Недопустимый формат файла. Ожидается файл с расширением .txt.",
                );
                setIsFileValid(false);
            }
        }
    };

    return (
        <>
            <p>
                Загрузите массив из целых чисел, используя файл с расширением{" "}
                <strong>.txt</strong>.
                <br />
                Каждая строка в файле должна содержать одно число. Недопустимые строки
                будут проигнорированы.
            </p>
            <ExtractInputField
                controlId="file-upload"
                label="Выберите файл:"
                type="file"
                accept=".txt"
                onChange={handleFileChange}
            />
            <ExtractTextArea
                controlId="file-array"
                label="Загруженный массив:"
                value={array.join(", ")}
                rows={4}
                disabled
            />
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
                    disabled={!isFileValid || array.length === 0}
                >
                    <SortNumericDown /> Отсортировать
                </Button>
            </ExtractButtonGroup>
        </>
    );
}

export default FileArrayForm;
