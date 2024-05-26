import { Git, Telegram } from "react-bootstrap-icons"; // Импорт иконок Git и Telegram из библиотеки react-bootstrap-icons.
import Container from "react-bootstrap/Container"; // Импорт компонента Container из библиотеки react-bootstrap.
import Navbar from "react-bootstrap/Navbar"; // Импорт компонента Navbar из библиотеки react-bootstrap.
import { Nav } from "react-bootstrap"; // Импорт компонента Nav из библиотеки react-bootstrap.

import "../../index.css"; // Импорт стилей для приложения.

/**
 * Функциональный компонент, представляющий главный футер - нижняя часть веб-страницы.
 * Включает в себя ссылки навигации и иконки для GitLab и Telegram, а также ссылку на сайт.
 *
 * @component
 * @returns {JSX.Element} Рендеринг элемента React для главного футера.
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

export default MainFooter; // Экспортируем компонент MainFooter по умолчанию.