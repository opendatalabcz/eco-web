import React, { useContext, useEffect } from 'react';
import { ButtonsVisibilityContext } from '../Components/TopBar/ButtonsVisibilityContext';
import AllSelectors from '../Components/DataOptions/AllSelectors';
import { makeStyles } from '@material-ui/core';
import 'fontsource-roboto';

const useStyles = makeStyles(() => ({
    Container: {
        width: '100%',
        height: '100%'
    },
}));

function WaterSelectionPage() {
    const [isVisible, setVisible] = useContext(ButtonsVisibilityContext);
    const classes = useStyles();

    useEffect(() => {
        if (isVisible) setVisible(false);
    });

    return (
        <div className={ classes.Container }>
            <AllSelectors selectedDataType='Water' />
        </div>
    )
}

export default WaterSelectionPage
