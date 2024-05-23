import { Container, Navbar, Nav } from "react-bootstrap";
import { Sun, MoonStars } from "react-bootstrap-icons";
import { useEffect, useState } from "react";

import logo from "../../img/logo.png";

/**
 * Main navigation bar of the application.
 *
 * @component
 * @returns {JSX.Element} The rendered React element for the main navigation bar.
 */
function MainNavbar() {
    const storedTheme = localStorage.getItem("theme");
    const [theme, setTheme] = useState(storedTheme || "light");

    /**
     * Toggle between light and dark themes and update the state and local storage accordingly.
     *
     * @function
     * @returns {void}
     */
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    // Effect hook to update the local storage and document theme attribute when the theme changes
    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-bs-theme", theme);
    }, [theme]);

    return (
        <>
            <Navbar
                sticky="top"
                collapseOnSelect
                expand="lg"
                className="bg-body-tertiary"
            >
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{" "}
                        Bucket Sort
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Сортировка</Nav.Link>
                            <Nav.Link href="arrays">Просмотр и редактирование</Nav.Link>
                        </Nav>
                        <Nav className="justify-content-end">
                            <Nav.Link onClick={toggleTheme}>
                                {theme === "light" ? (
                                    <Sun size={25} />
                                ) : (
                                    <MoonStars size={25} />
                                )}
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default MainNavbar;
