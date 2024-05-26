import { Container, Navbar, Nav } from "react-bootstrap"; // Импорт компонентов Container, Navbar и Nav из библиотеки react-bootstrap.
import { Sun, MoonStars } from "react-bootstrap-icons"; // Импорт иконок Солнца и Луны из библиотеки react-bootstrap-icons.
import { useEffect, useState } from "react"; // Импорт хуков useEffect и useState из React. Хуки - это специальные функции в React,
// которые позволяют добавлять функциональность компонентам без изменения их структуры.

import logo from "../../img/logo.png"; // Импорт изображения логотипа.

/**
 * Главная панель навигации приложения.
 *
 * @component
 * @returns {JSX.Element} Рендеринг элемента React для главной панели навигации. Процесс преобразования JSX-разметки в HTML,
 *  который отображается в браузере.
 *  JSX - это синтаксический сахар для JavaScript, который позволяет писать HTML-подобный код внутри JavaScript.
 */
function MainNavbar() { // Функция, которая рендерит компонент Navbar.
    const storedTheme = localStorage.getItem("theme"); // Получаем тему из локального хранилища.
    const [theme, setTheme] = useState(storedTheme || "light"); // Инициализируем состояние темы, используя сохраненную тему из локального хранилища или "light" по умолчанию.

    /**
     * Переключение между светлой и темной темами и обновление состояния и локального хранилища соответственно.
     *
     * @function
     * @returns {void}
     */
    const toggleTheme = () => { // Функция для переключения темы.
        const newTheme = theme === "light" ? "dark" : "light"; // Определяем новую тему, противоположную текущей.
        setTheme(newTheme); // Обновляем состояние темы.
    };

    // Хук useEffect для обновления локального хранилища и атрибута темы документа при изменении темы.
    useEffect(() => {
        localStorage.setItem("theme", theme); // Сохраняем текущую тему в локальном хранилище.
        document.documentElement.setAttribute("data-bs-theme", theme); // Устанавливаем атрибут  "data-bs-theme"  для корневого элемента документа, чтобы применить тему.
    }, [theme]); // Зависимости useEffect, чтобы хук выполнялся только при изменении состояния `theme`.

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

export default MainNavbar; // Экспортируем компонент MainNavbar по умолчанию.