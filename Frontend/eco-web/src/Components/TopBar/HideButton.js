import { createMuiTheme, IconButton, makeStyles, Tooltip, Zoom } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import MenuSharpIcon from '@material-ui/icons/MenuSharp';
import React, { useContext } from 'react';
import { topBarThemeDark, topBarThemeLight } from '../../Themes';
import { DarkContext } from '../DarkContext';
import { SideBarVisibilityContext } from '../SideBar/SideBarVisibilityContext';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
    MenuButtonStyle: {
        width: 30,
        height: 30,
        [topBarThemeLight.breakpoints.up('sm')]: {
            width: 45,
            height: 45,
        }
    },
    TooltipStyle: {
        fontSize: '15px',
    }
}));

function HideButton() {
    const [isSideBarVisible, setSideBarVisible] = useContext(SideBarVisibilityContext);
    const [isDark] = useContext(DarkContext);
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <>
            <ThemeProvider theme={ createMuiTheme(isDark ? topBarThemeDark : topBarThemeLight) }>
                <Tooltip TransitionComponent={ Zoom } title={ t("hideSidePanel") } classes={ { tooltip: classes.TooltipStyle } }>
                    <IconButton edge='start' color='inherit' aria-label='menu' className={ classes.MenuButtonStyle } onClick={ () => { setSideBarVisible(!isSideBarVisible) } }>
                        <MenuSharpIcon />
                    </IconButton>
                </Tooltip>
            </ThemeProvider>
        </>
    )
}

export default HideButton
