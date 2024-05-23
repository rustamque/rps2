import { Pagination } from "react-bootstrap";
import React from "react";

/**
 * ArrayPagination component provides pagination controls for navigating through a list of arrays.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.page - The current page number.
 * @param {Function} props.setPage - A function to update the current page.
 * @param {number} props.numArrays - The total number of arrays available.
 * @param {number} props.arraysLength - The length of the current array list.
 * @returns {JSX.Element} The rendered ArrayPagination component.
 */
function ArrayPagination({ page, setPage, numArrays, arraysLength }) {
    return (
        <Pagination className="pagination-center">
            {numArrays > 50 && (
                <>
                    <Pagination.First onClick={() => setPage(1)} disabled={page <= 1} />
                    <Pagination.Prev
                        onClick={() => setPage(page - 1)}
                        disabled={page <= 1}
                    />
                    <Pagination.Item>{page}</Pagination.Item>
                    <Pagination.Next
                        onClick={() => setPage(page + 1)}
                        disabled={arraysLength < 50}
                    />
                    <Pagination.Last
                        onClick={() => setPage(Math.ceil(numArrays / 50))}
                        disabled={arraysLength < 50}
                    />
                </>
            )}
        </Pagination>
    );
};

export default ArrayPagination;
