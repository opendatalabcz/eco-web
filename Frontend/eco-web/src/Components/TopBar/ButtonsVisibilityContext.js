import React, { useState, createContext } from 'react'

export const ButtonsVisibilityContext = createContext();

export const ButtonsVisibilityProvider = props => {
    const [isVisible, setVisible] = useState(false);

    return (
        <ButtonsVisibilityContext.Provider value={ [isVisible, setVisible] }>
            { props.children }
        </ButtonsVisibilityContext.Provider>
    );
};
