import React, { useState, createContext } from 'react'

export const SideBarVisibilityContext = createContext();

export const SideBarVisibilityProvider = props => {
    const [isVisible, setVisible] = useState(true);

    return (
        <SideBarVisibilityContext.Provider value={ [isVisible, setVisible] }>
            { props.children }
        </SideBarVisibilityContext.Provider>
    );
};
