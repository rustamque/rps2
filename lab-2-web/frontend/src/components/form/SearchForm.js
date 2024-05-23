import { Form } from "react-bootstrap";
import React from "react";

/**
 * SearchForm component provides a form input for users to search arrays based on their ID.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.searchId - The current search ID value.
 * @param {Function} props.onSearchChange - A function to handle changes in the search ID.
 * @returns {JSX.Element} The rendered SearchForm component.
 */
function SearchForm({ searchId, onSearchChange }) {
    return (
        <Form.Group className="mb-3">
            <Form.Control
                id="search-form"
                type="text"
                placeholder="Поиск по ID массива"
                value={searchId || ""}
                onChange={(e) => onSearchChange(e.target.value || null)}
            />
        </Form.Group>
    );
}

export default SearchForm;
