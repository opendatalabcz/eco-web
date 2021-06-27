import React, { useContext } from 'react'
import { AppBar, Toolbar, ThemeProvider, createMuiTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { DarkContext } from '../DarkContext';
import { topBarThemeLight, topBarThemeDark } from '../../Themes';
import { ButtonsVisibilityContext } from './ButtonsVisibilityContext';
import 'fontsource-roboto';
import ControllButtons from './ControllButtons';
import HideButton from './HideButton';

const useStyles = makeStyles(() => ({
    Container: {
        height: '100%',
        width: '100%',
        minWidth: '330px'
    }
}));

function TopBar() {
    const [isDark] = useContext(DarkContext);
    const [isVisible] = useContext(ButtonsVisibilityContext);
    const classes = useStyles();  

    return (
        <div className={ classes.Container }>
            <ThemeProvider theme={ createMuiTheme(isDark ? topBarThemeDark : topBarThemeLight) }>
                <AppBar position='static'>
                    <Toolbar>
                        <HideButton />
                        { isVisible ? <ControllButtons /> : null }
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </div>
    )
}

export default TopBar
