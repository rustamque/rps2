import { Form } from "react-bootstrap";

/**
 * Functional component representing a textarea within a form.
 *
 * @component
 * @param {Object} props - Additional properties for configuring the textarea.
 * @param {string} props.controlId - The unique identifier for the textarea.
 * @param {string} props.label - The label for the textarea.
 * @param {string} props.value - The current value of the textarea.
 * @param {Function} props.onChange - The function to be called when the textarea value changes.
 * @param {number} props.rows - The number of visible text lines for the textarea.
 * @returns {JSX.Element} The rendered React element for the textarea.
 */
function ExtractTextArea({
    controlId,
    label,
    value,
    onChange,
    rows,
    ...props
}) {
    return (
        <Form.Group controlId={controlId} className="mb-3">
            <Form.Label>
                <strong>{label}</strong>
            </Form.Label>
            <Form.Control
                as="textarea"
                value={value}
                onChange={onChange}
                rows={rows}
                {...props}
            />
        </Form.Group>
    );
}

export default ExtractTextArea;
