import { Git, Telegram } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";

import "../../index.css";

/**
 * Functional component representing the main footer of the application.
 * It includes navigation links and icons for GitLab and Telegram, as well as a website link.
 *
 * @component
 * @returns {JSX.Element} The rendered React element for the main footer.
 */
function MainFooter() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" id="main-footer">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link href="https://github.com/rustamque/rps2/tree/RPS3">
                        <Git />
                    </Nav.Link>
                    <Nav.Link href="https://t.me/rstmque">
                        <Telegram className="align-center" />
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default MainFooter;
