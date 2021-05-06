import React, { useContext } from 'react';
import { createMuiTheme, Grid, makeStyles, ThemeProvider, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import logoPicture from '../logo.svg';
import { ButtonsVisibilityContext } from '../Components/TopBar/ButtonsVisibilityContext';
import { DarkContext } from '../Components/DarkContext';
import { homePageThemeLight, homePageThemeDark } from '../Themes';
import 'fontsource-roboto';

const useStyles = makeStyles(() => ({
    GridLightStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: homePageThemeLight.palette.background
    },
    GridDarkStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: homePageThemeDark.palette.background
    },
    ItemStyle: {
        height: '100%'
    },
    Container: {
        width: '100%',
        height: '100%'
    },
    LogoContainer: {
        height: '200px',
        width: '200px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    TextContainer: {
        height: '100px',
        width: '100%',
        minHeight: '50px',
        justifyContent: 'center'
    },
}));

function HomePage() {
    const classes = useStyles();
    const [isDark] = useContext(DarkContext);
    const [isVisible, setVisible] = useContext(ButtonsVisibilityContext);
    const { t } = useTranslation();

    return (
        <div className={ classes.Container }>
            { setVisible(true) }
            <ThemeProvider theme={ createMuiTheme(isDark ? homePageThemeDark : homePageThemeLight) } >
                <Grid container className={ isDark ? classes.GridDarkStyle : classes.GridLightStyle }>
                    <Grid item className={ classes.ItenStyle }>
                        <div className={ classes.LogoContainer }>
                            <img src={ logoPicture } alt='Logo' />
                        </div>
                        <div className={ classes.TextContainer }>
                            <Typography variant='h3' color='primary'>
                                { t("welcome") }
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    )
}

export default HomePage
