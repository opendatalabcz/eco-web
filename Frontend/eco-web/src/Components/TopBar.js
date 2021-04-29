import React, { useContext } from 'react'
import { AppBar, Toolbar, IconButton, ThemeProvider, Button, createMuiTheme } from '@material-ui/core';
import MenuSharpIcon from '@material-ui/icons/MenuSharp';
import DateRangeSharpIcon from '@material-ui/icons/DateRangeSharp';
import BarChartSharpIcon from '@material-ui/icons/BarChartSharp';
import ListAltSharpIcon from '@material-ui/icons/ListAltSharp';
import ZoomOutMapSharpIcon from '@material-ui/icons/ZoomOutMapSharp';
import CompareArrowsSharpIcon from '@material-ui/icons/CompareArrowsSharp';
import { makeStyles } from '@material-ui/styles';
import { DarkContext } from './DarkContext';
import { useTranslation } from 'react-i18next';
import { topBarThemeLight, topBarThemeDark } from '../Themes.js';
import 'fontsource-roboto';

const useStyles = makeStyles(() => ({
    MenuButtonStyle: {
        width: 30,
        height: 30,
        [topBarThemeLight.breakpoints.up('sm')]: {
            width: 45,
            height: 45,
        },
    },
    IconButtonStyle: {
        margin: 3,
        width: 30,
        height: 30,
        [topBarThemeLight.breakpoints.up('sm')]: {
            margin: 5,
            width: 45,
            height: 45,
        },
    },
    ToolbarButtons: {
        marginLeft: 'auto',
    },
    ShowButton: {
        fontWeight: 'bold',
        marginLeft: 3,
        [topBarThemeLight.breakpoints.up('sm')]: {
            marginLeft: 5,
        }
    }
}));

function TopBar() {
    const [isDark] = useContext(DarkContext);
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div>
            <ThemeProvider theme={ createMuiTheme(isDark ? topBarThemeDark : topBarThemeLight) }>
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton edge='start' color='inherit' aria-label='menu' className={ classes.MenuButtonStyle }>
                            <MenuSharpIcon />
                        </IconButton>
                        <div className={classes.ToolbarButtons}>
                            <IconButton color='inherit' aria-label='menu' className={ classes.IconButtonStyle }>
                                <ZoomOutMapSharpIcon />
                            </IconButton>
                            <IconButton color='inherit' aria-label='menu' className={ classes.IconButtonStyle }>
                                <ListAltSharpIcon />
                            </IconButton>
                            <IconButton color='inherit' aria-label='menu' className={ classes.IconButtonStyle }>
                                <DateRangeSharpIcon />
                            </IconButton>
                            <IconButton color='inherit' aria-label='menu' className={ classes.IconButtonStyle }>
                                <BarChartSharpIcon />
                            </IconButton>
                            <IconButton color='inherit' aria-label='menu' className={ classes.IconButtonStyle }>
                                <CompareArrowsSharpIcon />
                            </IconButton>
                            <Button variant='contained' size='small' color='secondary' className={ classes.ShowButton }>
                                { t("showButton") }
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </div>
    )
}

export default TopBar
