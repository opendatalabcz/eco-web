import { makeStyles } from '@material-ui/core';
import React from 'react';
import { NavBarContent } from './NavBarContent'
import SubNav from './SubNav';

const useStyles = makeStyles(() => ({
    Container: {
        height: '100%',
        justifyContent: 'start',
    }
}));

function NavBar() {
    const classes = useStyles();

    return (
        <div className={ classes.Container }>
            <nav>
                { NavBarContent.map((item, index) => {
                    return <SubNav item={ item } key={ index } />
                })}
            </nav>
        </div>
    )
}

export default NavBar
