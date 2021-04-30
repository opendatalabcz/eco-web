import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    const [isExpanded, setExpanded] = useState(false)

    return (
        <div className={ classes.Container }>
            <Link to={ item.path } className={ classes.LinkStyle } onClick={ item.subNav && (() => {setExpanded(!isExpanded)}) }>
                <div className={ classes.TypographyContainerStyle }>
                    <Typography>
                        { t(item.title) }
                    </Typography>
                </div>
                <div className={ classes.IconContainerStyle }>
                    { item.subNav  && isExpanded ? item.expandIcon : (item.subNav ? item.colapseIcon : null) }
                </div>
            </Link>
            { isExpanded && item.subNav.map((item, index) => {
                return (
                    <Link to={ item.path } key={ index } className={ classes.LinkStyle }>
                        <div className={ classes.TypographySubNavContainerStyle }>
                            <Typography>
                                { t(item.title) }
                            </Typography>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default SubNav
