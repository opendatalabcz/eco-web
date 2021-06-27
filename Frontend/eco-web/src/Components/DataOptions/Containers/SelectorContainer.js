import React from 'react';
import PropTypes from 'prop-types';
import { Divider, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    Container: {
        width: '100%',
        height: '100%'
    },
    SelectorContainer: {
        padding: '15px',
        display: 'flex',
        justifyContent: 'center'
    },
    TypographyStyle: {
        padding: '15px'
    },
}));

function SelectorContainer(props) {
    const classes = useStyles();

    return (
        <>
            <Typography variant='h4' className={ classes.TypographyStyle }>
                { props.title }
            </Typography>
            <div className={ classes.SelectorContainer }>
                { props.selector }
            </div>
            <Divider />
        </>
    )
}

SelectorContainer.propTypes = {
    title: PropTypes.string.isRequired,
    selector: PropTypes.object.isRequired
};

export default SelectorContainer
