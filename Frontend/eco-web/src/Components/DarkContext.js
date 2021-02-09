import React, { useState, createContext } from 'react'

export const DarkContext = createContext();

export const DarkProvider = props => {
    const [isDark, setDark] = useState(false);

    return (
        <DarkContext.Provider value={ [isDark, setDark] }>
            { props.children }
        </DarkContext.Provider>
    );
};
