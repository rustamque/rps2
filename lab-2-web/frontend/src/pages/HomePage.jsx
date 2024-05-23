import SortedArrayForm from "../components/form/output/SortedArrayForm";
import { ArrayProvider } from "../components/context/ArrayContext";
import CreateArrayForm from "../components/form/CreateArrayForm";
import MainNavbar from "../components/common/MainNavbar";
import MainFooter from "../components/common/MainFooter";
import { Container } from "react-bootstrap";
import React from "react";

/**
 * HomePage component represents the main page of the application. It includes the main navigation bar,
 * a container with information about Bucket Sort, and forms for creating and sorting arrays.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.apiUrl - The API URL for interacting with arrays.
 * @returns {JSX.Element} The rendered HomePage component.
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
