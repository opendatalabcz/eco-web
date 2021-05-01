import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles, Typography } from '@material-ui/core';
import 'fontsource-roboto';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
    LinkStyle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        listStyle: 'none',
        height: '30px',
        textDecoration: 'none',
        color: 'white',
        '&:hover': {
            backgroundColor: green[800],
            cursor: 'pointer'
        },
    },
    ActiveLinkStyle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        listStyle: 'none',
        height: '30px',
        textDecoration: 'none',
        color: '#60ad5e',
        '&:hover': {
            backgroundColor: green[800]
        }
    },
    TypographyContainerStyle: {
        justifyContent: 'start',
        display: 'flex',
        width: '100%',
        marginLeft: '25%'
    },
    IconContainerStyle: {
        justifyContent: 'start',
        display: 'flex',
        width: '50px'
    },
    TypographySubNavContainerStyle: {
        justifyContent: 'start',
        display: 'flex',
        width: '100%',
        marginLeft: '30%'
    },
    Container: {
        height: '100%'
    }
}));

function SubNav({ item }) {
    const { t } = useTranslation();
    const classes = useStyles();
    const [isExpanded, setExpanded] = useState(false);

    const expandableElement = (item) => {
        return (
            <div className={ classes.LinkStyle } onClick={ (() => {setExpanded(!isExpanded)}) }>
                <div className={ classes.TypographyContainerStyle }>
                    <Typography>
                        { t(item.title) }
                    </Typography>
                </div>
                <div className={ classes.IconContainerStyle }>
                    { item.subNav && isExpanded ? item.expandIcon : (item.subNav ? item.colapseIcon : null) }
                </div>
            </div>
        )
    };

    const linkElement = (item) => {
        return (
            <NavLink exact to={ item.path } className={ classes.LinkStyle } activeClassName={ classes.ActiveLinkStyle } onClick={ item.subNav && (() => {setExpanded(!isExpanded)}) }>
                <div className={ classes.TypographyContainerStyle }>
                    <Typography>
                        { t(item.title) }
                    </Typography>
                </div>
            </NavLink>
        )
    };

    return (
        <div className={ classes.Container }>
            { item.subNav ? expandableElement(item) : linkElement(item) }
            { isExpanded && item.subNav.map((item, index) => {
                return (
                    <NavLink exact to={ item.path } key={ index } className={ classes.LinkStyle } activeClassName={ classes.ActiveLinkStyle }>
                        <div className={ classes.TypographySubNavContainerStyle }>
                            <Typography>
                                { t(item.title) }
                            </Typography>
                        </div>
                    </NavLink>
                )
            })}
        </div>
    )
}

export default SubNav
