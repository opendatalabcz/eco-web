import React, { useContext, useEffect } from 'react';
import { ButtonsVisibilityContext } from '../Components/TopBar/ButtonsVisibilityContext'
import { ThemeProvider } from '@material-ui/styles';
import { appThemeLight, appThemeDark } from '../Themes';
import { createMuiTheme, makeStyles, Paper } from '@material-ui/core';
import { DarkContext } from '../Components/DarkContext';
import 'fontsource-roboto';
import Data from '../Components/DataVisualisation/Data';
import { DataOptionsContext } from '../Components/DataOptions/SelectedOptions';

const useStyles = makeStyles(() => ({
    Container: {
        width: '100%',
        minHeight: '100vh',
        justifyContent: 'center',
        alignContent: 'center'
    },
}));

function GraphPage() {
    const [isVisible, setVisible] = useContext(ButtonsVisibilityContext);
    const [isDark] = useContext(DarkContext);
    const classes = useStyles();
    const [selectedOptions] = useContext(DataOptionsContext);

    useEffect(() => {
        if (!isVisible) setVisible(true);
        window.scrollTo(0, 0);
    });

    return (
        <>
            <ThemeProvider theme={ createMuiTheme(isDark ? appThemeDark : appThemeLight) }>
                <Paper square>
                    <div className={ classes.Container }>
                        <Data 
                            selectedOptions={ selectedOptions }
                        />
                    </div>
                </Paper>
            </ThemeProvider>
        </>
    )
}

export default GraphPage
