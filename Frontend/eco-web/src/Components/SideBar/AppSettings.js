import React, { useContext, useState } from 'react';
import { Typography, Switch, Select, MenuItem } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import { DarkContext } from '../DarkContext';
import { useTranslation } from 'react-i18next';
import TranslateSharpIcon from '@material-ui/icons/TranslateSharp';
import grey from '@material-ui/core/colors/grey';
import 'fontsource-roboto';

const useStyles = makeStyles(() => ({
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

const languages = [{ name: 'Čeština', value: 'cz' }, { name: 'English', value: 'en' }]

function AppSettings() {
    const { t, i18n } = useTranslation();
    const [isDark, setDark] = useContext(DarkContext);
    const [language, setLanguage] = useState(i18n.language);
    const classes = useStyles();

    const changeLanguage = (event) => {
        setLanguage(event.target.value);
        i18n.changeLanguage(event.target.value);
    };

    const changeTheme = () => {
        setDark(!isDark); 
        localStorage.setItem('darkMode', JSON.stringify( { darkMode: !isDark } ))
    };

    return (
        <>
            <table className={ classes.TableStyle }>
                <thead></thead>
                <tbody>
                    <tr>
                        <td className={ classes.LeftColumn }>
                            <TranslateSharpIcon className={ classes.IconStyle } />
                        </td>
                        <td className={ classes.RightColumn }>
                            <StyledSelect id='LanguageSelector' value={ language } onChange={ changeLanguage }>
                                { languages.map(({ name, value }) => {
                                    return (
                                        <MenuItem value={ value } key={value}>
                                            { name }
                                        </MenuItem>
                                    );
                                }) }
                            </StyledSelect>
                        </td>
                    </tr>
                    <tr>
                        <td className={ classes.LeftColumn }>
                            <StyledSwitch checked={ isDark } onChange={ changeTheme } id="darkModeSwitch" />
                        </td>
                        <td className={ classes.RightColumn }>
                            <Typography className={ classes.SwitchLabelStyle }>
                                { t('darkMode') }
                            </Typography>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default AppSettings
