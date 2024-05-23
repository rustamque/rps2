import { Form } from "react-bootstrap";

/**
 * Functional component representing an input field within a form.
 *
 * @component
 * @param {Object} props - Additional properties for configuring the input field.
 * @param {string} props.controlId - The unique identifier for the input field.
 * @param {string} props.label - The label for the input field.
 * @param {string} props.value - The current value of the input field.
 * @param {Function} props.onChange - The function to be called when the input field value changes.
 * @param {string} props.type - The type of the input field (e.g., text, number).
 * @returns {JSX.Element} The rendered React element for the input field.
 */
function ExtractInputField({
    controlId,
    label,
    value,
    onChange,
    type,
    ...props
}) {
    return (
        <Form.Group controlId={controlId} className="mb-3">
            <Form.Label>
                <strong>{label}</strong>
            </Form.Label>
            <Form.Control type={type} value={value} onChange={onChange} {...props} />
        </Form.Group>
    );
}

export default ExtractInputField;
