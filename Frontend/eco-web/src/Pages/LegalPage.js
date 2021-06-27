import { createMuiTheme, Grid, Link, makeStyles, Paper, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React, { useContext, useEffect } from 'react';
import { DarkContext } from '../Components/DarkContext';
import { ButtonsVisibilityContext } from '../Components/TopBar/ButtonsVisibilityContext';
import { Trans, useTranslation } from 'react-i18next';
import 'fontsource-roboto';
import { appThemeDark, appThemeLight } from '../Themes';

const useStyles = makeStyles(() => ({
    GridStyle: {
        width: '100%',
        height: '100vh',
        padding: '30px'
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
    TypographyStyle: {
        marginTop: '20%'
    },
}));

function LegalPage() {
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
                            <Typography className={ classes.TypographyStyle } variant='h5' align='center' color='primary'>
                                <Trans
                                    t={ t }
                                    i18nKey='disclaimer'
                                    components={ { ref: <Link color='secondary' href='http://portal.chmi.cz/files/portal/docs/meteo/ok/denni_data/Podminky_uziti_udaju.pdf' target='_blank' rel='noopener' /> } }
                                />
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </ThemeProvider>
        </div>
    )
}

export default LegalPage
