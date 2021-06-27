import React, { useState, createContext } from 'react'

export const DataOptionsContext = createContext();

export const DataOptionsProvider = props => {
    const [selectedOptions, setSelectedOptions] = useState({
        dataType: '',
        source: [],
        dateRange: {
            scale: '',
            from: '',
            to: ''
        },
        graphs: [],
        level: ''
    });

    return (
        <DataOptionsContext.Provider value={ [selectedOptions, setSelectedOptions] }>
            { props.children }
        </DataOptionsContext.Provider>
    );
};
