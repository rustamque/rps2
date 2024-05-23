import { Form } from "react-bootstrap";

/**
 * Functional component representing a button group within a form.
 *
 * @component
 * @param {Object} props - Additional properties for configuring the button group.
 * @param {ReactNode} children - The child elements to be included in the button group.
 * @returns {JSX.Element} The rendered React element for the button group.
 */
function ExtractButtonGroup({ children, ...props }) {
    return (
        <Form.Group
            controlId="button-group"
            className="mb-2 d-flex gap-2 justify-content-end align-items-center flex-wrap"
            {...props}
        >
            {children}
        </Form.Group>
    );
}

export default ExtractButtonGroup;
