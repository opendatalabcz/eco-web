import React, { useState, createContext } from 'react'

export const DarkContext = createContext();

export const DarkProvider = props => {
    const localPreference = localStorage.getItem('darkMode');
    let init;
    if (!localPreference) {
        init = false;
        localStorage.setItem('darkMode', JSON.stringify({darkMode: init}));
    }
    else {
        init = JSON.parse(localPreference).darkMode;
    }
    const [isDark, setDark] = useState(init);

    return (
        <DarkContext.Provider value={ [isDark, setDark] }>
            { props.children }
        </DarkContext.Provider>
    );
};
