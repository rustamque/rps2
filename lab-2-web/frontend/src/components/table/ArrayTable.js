import { Check2, X } from "react-bootstrap-icons";
import { formatDistanceToNow } from "date-fns";
import ruLocale from "date-fns/locale/ru";
import { Table } from "react-bootstrap";
import React from "react";

/**
 * ArrayTable component displays an interactive table of arrays, allowing users to click on a row to trigger an edit action.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.arrays - The array of objects containing array data.
 * @param {Function} props.onEdit - A function to handle the edit action when a row is clicked.
 * @param {string} [props.size] - The size variant for the Table component (e.g., 'sm' for small).
 * @returns {JSX.Element} The rendered ArrayTable component.
 */
function ArrayTable({ arrays, onEdit, size }) {
    return (
        <Table striped bordered hover size={size}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Элементы массива</th>
                    <th>Последнее обновление</th>
                    <th>Создан</th>
                    <th>Отсортирован</th>
                </tr>
            </thead>
            <tbody>
                {arrays.map((array) => (
                    <React.Fragment key={array.id}>
                        <tr
                            onClick={() => {
                                onEdit(array);
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            <td>{array.id}</td>
                            <td>
                                {array.data.length > 30
                                    ? array.data.slice(0, 30).join(", ") + "..."
                                    : array.data.join(", ")}
                            </td>
                            <td>
                                {formatDistanceToNow(new Date(array.update_date), {
                                    addSuffix: true,
                                    locale: ruLocale,
                                })}
                            </td>
                            <td>
                                {new Date(array.creation_date).toLocaleString("ru-RU", {
                                    hour12: false,
                                })}
                            </td>
                            <td className="text-center">
                                {array.is_sorted ? (
                                    <Check2 color="green" size={20} />
                                ) : (
                                    <X color="red" size={20} />
                                )}
                            </td>
                        </tr>
                    </React.Fragment>
                ))}
            </tbody>
        </Table>
    );
};

export default ArrayTable;
