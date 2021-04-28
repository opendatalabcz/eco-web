import React, { useContext } from 'react'
import { ThemeProvider, Drawer, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { DarkContext } from './DarkContext';
import { useTranslation } from 'react-i18next';
import { sideBarTheme } from '../Themes.js';
import 'fontsource-roboto';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
    },
    drawer: {
        width: '300px',
        flexShrink: 0,
    },
    background: {
        background: "#005005"
    },
    item: {
        textColor: '#ffffff'
    }
}));

function SideBar() {
    const [isDark, setDark] = useContext(DarkContext);
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div className={ classes.container }>
            <ThemeProvider theme={ sideBarTheme }>
                <Drawer variant="permanent" open classes={{ paper: classes.background }} width='300px'>
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text} className={ classes.item }>
                            <ListItemText disableTypography primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>{text}</Typography>}/>
                        </ListItem>
                        ))}
                    </List>
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemText disableTypography primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>{text}</Typography>}/>
                        </ListItem>
                        ))}
                    </List>
                </Drawer>
            </ThemeProvider>
        </div>
    )
}

export default SideBar
