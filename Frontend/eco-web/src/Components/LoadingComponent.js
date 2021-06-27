import { CircularProgress, createMuiTheme, Grid, makeStyles, ThemeProvider, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { appThemeDark, appThemeLight } from '../Themes';
import { DarkContext } from './DarkContext';
import 'fontsource-roboto';

const useStyles = makeStyles(() => ({
    Container: {
        width: '100%',
        height: '100%',
        paddingTop: '20%'
    }
}));

function LoadingComponent() {
    const classes = useStyles();
    const { t } = useTranslation();
    const [isDark] = useContext(DarkContext);

    return (
        <ThemeProvider theme={ createMuiTheme(isDark ? appThemeDark : appThemeLight) }>
            <Grid container direction='column' alignContent='center' alignItems='center' className={ classes.Container }>
                <Grid item>
                    <CircularProgress color='secondary' size='100px' />
                </Grid>
                <Grid item>
                    <Typography variant='h4' color='secondary'>
                        { t('loadingData') }
                    </Typography>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default LoadingComponent
