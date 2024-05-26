import SortedArrayForm from "../components/form/output/SortedArrayForm";
import { ArrayProvider } from "../components/context/ArrayContext";
import CreateArrayForm from "../components/form/CreateArrayForm";
import MainNavbar from "../components/common/MainNavbar";
import MainFooter from "../components/common/MainFooter";
import { Container } from "react-bootstrap";
import React from "react";

/**
 * Компонент HomePage представляет главную страницу приложения. Он включает основную навигационную панель,
 * контейнер с информацией о блочной сортировке, и формы для создания и сортировки массивов.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {string} props.apiUrl - URL API для взаимодействия с массивами.
 * @returns {JSX.Element} Отрисованный компонент HomePage.
 */

function HomePage({ apiUrl }) {
    return (
        <>
            <MainNavbar />
            <Container className="pt-3 mt-3 pb-3 mb-3">
                <h2>Блочная сортировка</h2>
                <p className="pb-2">
                    <b>Блочная сортировка</b> (англ. <i>Bucket Sort</i>) - алгоритм,
                    который разделяет элементы на группы и сортирует их внутри каждой
                    группы.
                </p>
                <ArrayProvider>
                    <CreateArrayForm apiUrl={apiUrl} />
                    <SortedArrayForm apiUrl={apiUrl} />
                </ArrayProvider>
            </Container>
            <MainFooter />
        </>
    );
}

export default HomePage;
