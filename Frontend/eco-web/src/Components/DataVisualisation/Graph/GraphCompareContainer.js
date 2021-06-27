import { makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import Graph from './Graph';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
    Container: {
        width: '100%'
    },
}));

function GraphCompareContainer(props) {
    const classes = useStyles();
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const traces = [];

    return (
        <div className={ classes.Container }>
            <Graph data={ traces } title={ t("combinedData") } axisLabels={ { x: t('date'), y: t('value') } } />
        </div>
    )
}

export default GraphCompareContainer
