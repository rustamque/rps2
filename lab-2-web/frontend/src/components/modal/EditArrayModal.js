import ExtractButtonGroup from "../extract/ExtractButtonGroup";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Trash, SortNumericDown, CloudUpload } from "react-bootstrap-icons";

/**
 * EditArrayModal component displays a modal for editing array details, including adding, sorting, and deleting.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.show - Flag indicating whether the modal should be visible.
 * @param {Function} props.handleClose - A function to handle the modal closure.
 * @param {Object} props.array - The array data to be edited.
 * @param {Function} props.handleSave - A function to handle saving changes to the array.
 * @param {Function} props.handleSort - A function to handle sorting the array.
 * @param {Function} props.handleDelete - A function to handle deleting the array.
 * @returns {JSX.Element} The rendered EditArrayModal component.
 */
function EditArrayModal({
    show,
    handleClose,
    array,
    handleSave,
    handleSort,
    handleDelete,
}) {
    const [editedArray, setEditedArray] = useState({ ...array });

    /**
     * useEffect hook that updates the editedArray state whenever the array prop changes.
     * This ensures that the modal displays the correct array data for editing.
     *
     * @function
     * @name useEffect
     * @param {Function} effect - The effect function.
     * @param {Array} dependencies - An array of dependencies that triggers the effect when changed.
     * @returns {void}
     */
    useEffect(() => {
        setEditedArray({ ...array });
    }, [array]);

    /**
     * Handles changes in the input fields and updates the editedArray state accordingly.
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

        setEditedArray({ ...editedArray, [name]: numericValues });
    };

    /**
     * Saves changes made to the edited array and triggers the handleSave function.
     *
     * @function
     * @returns {void}
     */
    const saveChangesEdit = () => {
        handleSave({ ...editedArray });
        handleClose();
    };

    /**
     * Saves changes to the edited array and triggers the handleDelete function to delete the original array.
     *
     * @function
     * @returns {void}
     */
    const saveChangesDelete = () => {
        handleDelete(array);
        handleClose();
    };

    /**
     * Saves changes to the edited array and triggers the handleSort function to sort the array.
     *
     * @function
     * @returns {void}
     */
    const saveChangesSort = () => {
        handleSort({ ...editedArray });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Редактировать массив</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <p>
                        Пишите элементы поочередно, разделяя их пробелом.
                        <br />
                        <span className="text-secondary">
                            Разрешен ввод только целых чисел, лишние пробелы будут заменены
                            нулём.
                        </span>
                    </p>
                    <Form.Group controlId="arrayData">
                        <Form.Label>
                            <strong>Элементы массива:</strong>
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            name="data"
                            rows={4}
                            value={editedArray.data.join(" ")}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <ExtractButtonGroup>
                    <Button
                        variant="secondary"
                        className="d-flex align-items-center gap-1"
                        onClick={saveChangesSort}
                    >
                        <SortNumericDown /> Отсортировать
                    </Button>
                    <Button
                        variant="primary"
                        className="d-flex align-items-center gap-1"
                        onClick={saveChangesEdit}
                    >
                        <CloudUpload /> Сохранить
                    </Button>
                    <Button
                        variant="danger"
                        className="d-flex align-items-center gap-1"
                        onClick={saveChangesDelete}
                    >
                        <Trash /> {""} Удалить
                    </Button>
                </ExtractButtonGroup>
            </Modal.Footer>
        </Modal>
    );
}

export default EditArrayModal;
