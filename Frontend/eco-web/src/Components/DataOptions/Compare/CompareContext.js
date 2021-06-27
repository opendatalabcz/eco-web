import React, { useState, createContext } from 'react'

export const CompareContext = createContext();

export const CompareProvider = props => {
    const [selectedCompare, setSelectedCompare] = useState({
        source: [],
        dateRange: {
            scale: '',
            from: '',
            to: ''
        },
        graphs: {
            temperature: [],
            shine: [],
            snow: [],
            water: [],
            wind: [],
            precipitation: [],
            pressure: []
        },
        level: ''
    });

    return (
        <CompareContext.Provider value={ [selectedCompare, setSelectedCompare] }>
            { props.children }
        </CompareContext.Provider>
    );
};
