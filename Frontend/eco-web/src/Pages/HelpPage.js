import { createMuiTheme, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React, { useContext, useEffect } from 'react';
import { DarkContext } from '../Components/DarkContext';
import { ButtonsVisibilityContext } from '../Components/TopBar/ButtonsVisibilityContext';
import { Trans, useTranslation } from 'react-i18next';
import 'fontsource-roboto';
import { appThemeDark, appThemeLight } from '../Themes';
import DateRangeSharpIcon from '@material-ui/icons/DateRangeSharp';
import BarChartSharpIcon from '@material-ui/icons/BarChartSharp';
import ListAltSharpIcon from '@material-ui/icons/ListAltSharp';
import ZoomOutMapSharpIcon from '@material-ui/icons/ZoomOutMapSharp';
import CompareArrowsSharpIcon from '@material-ui/icons/CompareArrowsSharp';

const useStyles = makeStyles(() => ({
    GridStyle: {
        width: '100%',
        height: '100vh',
        padding: '30px'
    },
    Container: {
        width: '100%',
        height: '100%',
        overflow: 'clip'
    },
    TypographyStyle: {
        marginTop: '20px'
    },
}));

function HelpPage() {
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
                        <Grid item>
                            <Typography className={ classes.TypographyStyle } variant='h5' align='center' color='primary'>
                                <Trans
                                    t={ t }
                                    i18nKey='scaleHelp'
                                    components={ { icon: <DateRangeSharpIcon color='secondary' /> } }
                                />
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={ classes.TypographyStyle } variant='h5' align='center' color='primary'>
                                <Trans
                                    t={ t }
                                    i18nKey='sourceHelp'
                                    components={ { icon: <BarChartSharpIcon color='secondary' /> } }
                                />
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={ classes.TypographyStyle } variant='h5' align='center' color='primary'>
                                <Trans
                                    t={ t }
                                    i18nKey='dateRangeHelp'
                                    components={ { icon: <ListAltSharpIcon color='secondary' /> } }
                                />
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={ classes.TypographyStyle } variant='h5' align='center' color='primary'>
                                <Trans
                                    t={ t }
                                    i18nKey='graphTypeHelp'
                                    components={ { icon: <ZoomOutMapSharpIcon color='secondary' /> } }
                                />
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={ classes.TypographyStyle } variant='h5' align='center' color='primary'>
                                <Trans
                                    t={ t }
                                    i18nKey='compareHelp'
                                    components={ { icon: <CompareArrowsSharpIcon color='secondary' /> } }
                                />
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={ classes.TypographyStyle } variant='h5' align='center' color='primary'>
                                { t('showButtonHelp') }
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={ classes.TypographyStyle } variant='h5' align='center' color='primary'>
                                { t('comparisonNoteHelp') }
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </ThemeProvider>
        </div>
    )
}

export default HelpPage
