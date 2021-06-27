import React, { useContext, useEffect } from 'react';
import { createMuiTheme, Grid, makeStyles, Paper, ThemeProvider, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import logoPicture from '../logo.svg';
import { ButtonsVisibilityContext } from '../Components/TopBar/ButtonsVisibilityContext';
import { DarkContext } from '../Components/DarkContext';
import { appThemeLight, appThemeDark } from '../Themes';
import 'fontsource-roboto';

const useStyles = makeStyles(() => ({
    GridStyle: {
        width: '100%',
        height: '100vh',
        padding: '20px'
    },
    ItemStyle: {
        height: '100%',
        width: '100%'
    },
    Container: {
        width: '100%',
        height: '100%',
        overflow: 'clip'
    },
    LogoContainer: {
        height: '200px',
        width: '200px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '15%'
    },
    TextContainer: {
        height: '100px',
        width: '100%',
        minHeight: '50px',
        justifyContent: 'center'
    },
    LogoPicture: {
        width: '120%'
    }
}));

function HomePage() {
    const classes = useStyles();
    const [isDark] = useContext(DarkContext);
    const [isVisible, setVisible] = useContext(ButtonsVisibilityContext);
    const { t } = useTranslation();

    useEffect(() => {
        if (isVisible) setVisible(false);
    });

    return (
        <div className={ classes.Container }>
            <ThemeProvider theme={ createMuiTheme(isDark ? appThemeDark : appThemeLight) } >
                <Paper square>
                    <Grid container direction='column' justify='center' className={ classes.GridStyle }>
                        <Grid item className={ classes.ItemStyle }>
                            <div className={ classes.LogoContainer }>
                                <img src={ logoPicture } className={ classes.LogoPicture }  alt='Logo' />
                            </div>
                            <div className={ classes.TextContainer }>
                                <Typography variant='h3' color='primary' align='center'>
                                    { t("welcome") }
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </ThemeProvider>
        </div>
    )
}

export default HomePage
