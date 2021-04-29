import React, { useContext, useState } from 'react';
import { ThemeProvider, Typography, Switch, Select, MenuItem } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import { DarkContext } from './DarkContext';
import { useTranslation } from 'react-i18next';
import { sideBarTheme } from '../Themes.js';
import LanguageSharpIcon from '@material-ui/icons/LanguageSharp';
import grey from '@material-ui/core/colors/grey';
import logoPicture from '../logo.svg';
import 'fontsource-roboto';

const useStyles = makeStyles(() => ({
    Container: {
        display: 'flex',
    },
    Background: {
        background: '#005005',
        justifyContent: 'center',
        height: '100%',
        width: '300px'
    },
    LogoContainer: {
        height: '200px',
        display: 'flex',
        justifyContent: 'center'
    },
    Item: {
        textColor: '#ffffff'
    },
    SettingsContainer: {
        height: '100px',
        justifyContent: 'center',
        display: 'flex'
    },
    SwitchLabelStyle: {
        color: 'white',
    },
    IconStyle: {
        color: 'white'
    },
    TableStyle: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    LeftColumn: {
        textAlign: 'center',
        width: '30px'
    },
    RightColumn: {
        textAlign: 'center',
        verticalAlign: 'middle',
        width: '125px'
    }
}));

const StyledSwitch = withStyles({
    switchBase: {
        color: grey[50],
        '&$checked': {
            color: grey[50],
        },
        '&$checked + $track': {
            backgroundColor: '#005005',
        },
    },
    checked: {},
    track: {
        border: '1px solid white',
        backgroundColor: '#005005'
    },
})(Switch);

  const StyledSelect = withStyles({
    root: {
        color: 'white',
        backgroundColor: '#005005',
        width: '100px'
    },
    icon: {
        fill: 'white'
    }
})(Select);

const languages = [{name: 'Čeština', value: 'cz'}, {name: 'English', value: 'en'}]

function SideBar() {
    const [isDark, setDark] = useContext(DarkContext);
    const [language, setLanguage] = useState(languages[0].value);
    const classes = useStyles();
    const { t, i18n } = useTranslation();

    const changeLanguage = (event) => {
        setLanguage(event.target.value);
        i18n.changeLanguage(event.target.value)
    }

    return (
        <div className={ classes.Container }>
            <ThemeProvider theme={ sideBarTheme }>
                <div className={ classes.Background }>
                    <div className={ classes.LogoContainer }>
                        <img src={ logoPicture } alt='Logo'/>
                    </div>
                    <div></div>
                    <div className={ classes.SettingsContainer }>
                        <table className={ classes.TableStyle }>
                            <tr>
                                <td className={ classes.LeftColumn }>
                                    <LanguageSharpIcon className={ classes.IconStyle }/>
                                </td>
                                <td className={ classes.RightColumn }>
                                    <StyledSelect id='LanguageSelector' value={ language } onChange={ changeLanguage }>
                                        {languages.map(({name, value}) => {
                                            return (
                                                <MenuItem value={ value } key={value}>{ name }</MenuItem>
                                            );
                                        })}
                                    </StyledSelect>
                                </td>
                            </tr>
                            <tr>
                                <td className={ classes.LeftColumn }>
                                    <StyledSwitch checked={ isDark } onChange={ () => setDark(!isDark) } id="darkModeSwitch"/>
                                </td>
                                <td className={ classes.RightColumn }>
                                    <Typography className={ classes.SwitchLabelStyle }>{ t("darkMode") }</Typography>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </ThemeProvider>
        </div>
    )
}

export default SideBar
