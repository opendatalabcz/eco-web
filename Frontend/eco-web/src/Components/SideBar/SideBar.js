import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { sideBarTheme } from '../../Themes';
import logoPicture from '../../logo.svg';
import NavBar from './NavBar';
import 'fontsource-roboto';
import AppSettings from './AppSettings';

const useStyles = makeStyles(() => ({
    Container: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    Background: {
        background: '#005005',
        justifyContent: 'center',
        display: 'center',
        height: '100%',
        width: '100%',
        overflowY: 'auto',
        overflowX: 'hidden'
    },
    LogoContainer: {
        margin: '15px 25px 15px 25px',
        height: '200px',
        minHeight: '50px',
        display: 'flex',
        justifyContent: 'center'
    },
    Item: {
        textColor: '#ffffff'
    },
    SettingsContainer: {
        height: '11%',
        justifyContent: 'start',
        display: 'flex'
    },
    NavBarContainer: {
        height: '63%',
        minHeight: '400px'
    }
}));

function SideBar() {
    const classes = useStyles();

    return (
        <div className={ classes.Container }>
            <ThemeProvider theme={ sideBarTheme }>
                <div className={ classes.Background }>
                    <div className={ classes.LogoContainer }>
                        <img src={ logoPicture } alt='Logo' />
                    </div>
                    <div className={ classes.NavBarContainer }>
                        <NavBar />
                    </div>
                    <div className={ classes.SettingsContainer }>
                        <AppSettings />
                    </div>
                </div>
            </ThemeProvider>
        </div>
    )
}

export default SideBar
