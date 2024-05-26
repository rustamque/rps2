import React, { createContext, useContext, useState } from "react"; // Импортируем необходимые хуки и функции из React: createContext, useContext, useState.

/**
 * ArrayContext - это контекст, созданный с помощью React.createContext. 
 * Он предоставляет способ  обмена  состоянием, связанным с отсортированными массивами и временем выполнения, по всему дереву компонентов.
 *
 * @context
 */
const ArrayContext = createContext(); // Создаем контекст для управления состоянием отсортированных массивов.

/**
 * useArrayContext - это пользовательский хук, который возвращает текущее значение контекста ArrayContext.
 *
 * @function
 * @name useArrayContext
 * @returns {Object} Текущее значение контекста ArrayContext.
 */
export function useArrayContext() { // Функция, которая возвращает текущее значение контекста ArrayContext.
    return useContext(ArrayContext); // Используем хук useContext для получения текущего значения контекста.
}

/**
 * ArrayProvider - это компонент-провайдер контекста, который оборачивает компоненты, 
 * предоставляя контекст для управления отсортированными массивами и временем выполнения, связанным с алгоритмом блочной сортировки.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {React.ReactNode} props.children - Дочерние элементы, которые будут обернуты провайдером контекста.
 * @returns {JSX.Element} Рендеринг компонента ArrayProvider.
 */
export function ArrayProvider({ children }) { // Функция, которая рендерит компонент ArrayProvider.
    const [sortedArray, setSortedArray] = useState([]); // Инициализируем состояние отсортированного массива как пустой массив.
    const [executionTime, setExecutionTime] = useState(null); // Инициализируем состояние времени выполнения как null.

    return ( // Возвращаем JSX-разметку компонента ArrayProvider.
        <ArrayContext.Provider 
            value={{ sortedArray, setSortedArray, executionTime, setExecutionTime }} // Устанавливаем значение контекста. 
        >
            {children} 
        </ArrayContext.Provider>
    );
}