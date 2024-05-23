import React, { createContext, useContext, useState } from "react";

/**
 * ArrayContext is a context object created by React.createContext. It provides a way
 * to share the state related to sorted arrays and execution time throughout the component tree.
 *
 * @context
 */
const ArrayContext = createContext();

/**
 * useArrayContext is a custom hook that returns the current context value of the ArrayContext.
 *
 * @function
 * @name useArrayContext
 * @returns {Object} The current context value of the ArrayContext.
 */
export function useArrayContext() {
    return useContext(ArrayContext);
}

/**
 * ArrayProvider is a context provider that wraps components, providing a context for managing sorted arrays
 * and execution time related to the Bucket Sort algorithm.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child elements to be wrapped by the context provider.
 * @returns {JSX.Element} The rendered ArrayProvider context provider.
 */
export function ArrayProvider({ children }) {
    const [sortedArray, setSortedArray] = useState([]);
    const [executionTime, setExecutionTime] = useState(null);

    return (
        <ArrayContext.Provider
            value={{ sortedArray, setSortedArray, executionTime, setExecutionTime }}
        >
            {children}
        </ArrayContext.Provider>
    );
}
