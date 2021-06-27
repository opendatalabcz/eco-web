import { FormControl, FormControlLabel, makeStyles, Radio, RadioGroup, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Graph from './Graph';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
    Container: {
        width: '100%'
    },
    RadioContainer: {
        width: '100%',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center'
    },
    RadioStyle: {
        marginLeft: '30px',
        marginRight: '30px'
    },
    TypographyContainer: {
        width: '100%',
        justifyContent: 'center',
        display: 'flex'
    }
}));

function GraphsContainer(props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const [selected, setSelected] = useState('combined');
    const graphOptions = props.graphTypes.hydroMeteoTypes.filter((element) => { return element.name === props.selectedType })[0].graphs;

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const combinedTraces = [];
    const tracesBySource = [];
    const tracesByType = [];

    props.data.forEach((source) => {
        const lines = [];
        props.selectedGraphs.forEach(() => {
            lines.push({ x: [], y: [], name: '' });
        });
        source.forEach((element) => {
            props.selectedGraphs.forEach((selectedGraph, graphIndex) => {
                const dataSourceName = graphOptions.filter((option) => { return option.name === selectedGraph })[0].value;
                lines[graphIndex].y.push(element[dataSourceName]);
                lines[graphIndex].x.push(element.date);
            });
        });
        const units = props.hydrometeoTypes.filter((element) => { return element.name === props.selectedType })[0].unit;
        props.selectedGraphs.forEach((element, graphIndex) => {
            if (props.level === 'station') {
                if (props.selectedType === 'Precipitation' && element === 'totalPrecipitation') {
                    lines[graphIndex].name = source[0]?.station.locationName + ': ' + t(element) + ` (${ units[1] })`;
                } else {
                    lines[graphIndex].name = source[0]?.station.locationName + ': ' + t(element) + ` (${ units[0] })`;
                }
            }
            else if (props.level === 'region') {
                if (props.selectedType === 'Precipitation' && element === 'totalPrecipitation') {
                    lines[graphIndex].name = source[0]?.region.name + ': ' + t(element) + ` (${ units[1] })`;
                } else {
                    lines[graphIndex].name = source[0]?.region.name + ': ' + t(element) + ` (${ units[0] })`;
                }
            }
            else {
                if (props.selectedType === 'Precipitation' && element === 'totalPrecipitation') {
                    lines[graphIndex].name = t('czechRepublic') + ': ' + t(element) + ` (${ units[1] })`;
                } else {
                    lines[graphIndex].name = t('czechRepublic') + ': ' + t(element) + ` (${ units[0] })`;
                }
            }
        });
        const finalLines = lines.filter((element) => { return element.x.length > 0 });
        finalLines.forEach((element) => {
            combinedTraces.push({
                type: 'scatter',
                mode: 'lines+markers',
                x: element.x,
                y: element.y,
                name: element.name
            });
        });
    });

    props.data.forEach((source) => {
        const lines = [];
        props.selectedGraphs.forEach(() => {
            lines.push({ x: [], y: [], name: '' });
        });
        source.forEach((element) => {
            props.selectedGraphs.forEach((selectedGraph, graphIndex) => {
                const dataSourceName = graphOptions.filter((option) => { return option.name === selectedGraph })[0].value;
                lines[graphIndex].y.push(element[dataSourceName]);
                lines[graphIndex].x.push(element.date);
            });
        });
        const units = props.hydrometeoTypes.filter((element) => { return element.name === props.selectedType })[0].unit;
        props.selectedGraphs.forEach((element, graphIndex) => {
            if (props.level === 'station') {
                if (props.selectedType === 'Precipitation' && element === 'totalPrecipitation') {
                    lines[graphIndex].name = t(element) + ` (${ units[1] })`;
                } else {
                    lines[graphIndex].name = t(element) + ` (${ units[0] })`;
                }
            }
            else if (props.level === 'region') {
                if (props.selectedType === 'Precipitation' && element === 'totalPrecipitation') {
                    lines[graphIndex].name = t(element) + ` (${ units[1] })`;
                } else {
                    lines[graphIndex].name = t(element) + ` (${ units[0] })`;
                }
            }
            else {
                if (props.selectedType === 'Precipitation' && element === 'totalPrecipitation') {
                    lines[graphIndex].name = t(element) + ` (${ units[1] })`;
                } else {
                    lines[graphIndex].name = t(element) + ` (${ units[0] })`;
                }
            }
        });
        const sourceTraces = [];
        const finalLines = lines.filter((element) => { return element.x.length > 0 });
        finalLines.forEach((element) => {
            sourceTraces.push({
                type: 'scatter',
                mode: 'lines+markers',
                x: element.x,
                y: element.y,
                name: element.name
            });
        });
        let title = ''
        if (props.level === 'station') title = source[0]?.station.locationName
        else if (props.level === 'region') title = source[0]?.region.name
        else title = t('czechRepublic')
        if (sourceTraces.length > 0) tracesBySource.push({ data: sourceTraces, title: title });
    });

    props.selectedGraphs.forEach((selectedGraph) => {
        const lines = [];
        props.data.forEach((source) => {
            const line = { x: [], y: [], name: '' };
            source.forEach((element) => {
                const dataSourceName = graphOptions.filter((option) => { return option.name === selectedGraph })[0].value;
                line.y.push(element[dataSourceName]);
                line.x.push(element.date);
            });
            const units = props.hydrometeoTypes.filter((element) => { return element.name === props.selectedType })[0].unit;
            if (props.level === 'station') {
                if (props.selectedType === 'Precipitation' && selectedGraph === 'totalPrecipitation') {
                    line.name = source[0]?.station.locationName + ': ' + t(selectedGraph) + ` (${ units[1] })`;
                } else {
                    line.name = source[0]?.station.locationName + ': ' + t(selectedGraph) + ` (${ units[0] })`;
                }
            }
            else if (props.level === 'region') {
                if (props.selectedType === 'Precipitation' && selectedGraph === 'totalPrecipitation') {
                    line.name = source[0]?.region.name + ': ' + t(selectedGraph) + ` (${ units[1] })`;
                } else {
                    line.name = source[0]?.region.name + ': ' + t(selectedGraph) + ` (${ units[0] })`;
                }
            }
            else {
                if (props.selectedType === 'Precipitation' && selectedGraph === 'totalPrecipitation') {
                    line.name = t('czechRepublic') + ': ' + t(selectedGraph) + ` (${ units[1] })`;
                } else {
                    line.name = t('czechRepublic') + ': ' + t(selectedGraph) + ` (${ units[0] })`;
                }
            }
            lines.push(line);
        });
        const sourceTraces = [];
        const finalLines = lines.filter((element) => { return element.x.length > 0 });
        finalLines.forEach((element) => {
            sourceTraces.push({
                type: 'scatter',
                mode: 'lines+markers',
                x: element.x,
                y: element.y,
                name: element.name
            });
        });
        if (sourceTraces.length > 0) tracesByType.push({ data: sourceTraces, title: t(selectedGraph) });
    });

    const getSourceName = (level) => {
        if (level === 'station') return t('station');
        else if (level === 'region') return t('region');
        else return t('country');
    }

    return (
        <div className={ classes.Container }>
            <div className={ classes.RadioContainer }>
                <Typography variant='h5'>
                    { t('showPer') + ':' }
                </Typography>
                <FormControl>
                    <RadioGroup
                        value={ selected }
                        onChange={ (event) => { setSelected(event.target.value); } }
                        row
                    >
                        <FormControlLabel className={ classes.RadioStyle } value='source' control={ <Radio /> } label={ getSourceName(props.level) } />
                        <FormControlLabel className={ classes.RadioStyle } value='data' control={ <Radio /> } label={ t('data') } />
                        <FormControlLabel className={ classes.RadioStyle } value='combined' control={ <Radio /> } label={ t('combined') } />
                    </RadioGroup>
                </FormControl>
            </div>
            { selected === 'combined'
                ? (
                    combinedTraces.length === 0
                    ? (
                        <div className={ classes.TypographyContainer }>
                            <Typography variant='h5'>
                                { t('nothingToShow') }
                            </Typography>
                        </div>
                    )
                    : <Graph data={ combinedTraces } title={ t(props.selectedType.toLowerCase()) } axisLabels={ { x: t('date'), y: t('value') } } />
                )
                : (selected === 'source'
                    ? (
                        tracesBySource.length === 0
                        ? (
                            <div className={ classes.TypographyContainer }>
                                <Typography variant='h5'>
                                    { t('nothingToShow') }
                                </Typography>
                            </div>
                        )
                        : (tracesBySource.map((source, index) => {
                            return <Graph data={ source.data } title={ source.title } axisLabels={ { x: t('date'), y: t('value') } } key={ index } />
                        }))
                    )
                    : (
                        tracesByType.length === 0
                        ? (
                            <div className={ classes.TypographyContainer }>
                                <Typography variant='h5'>
                                    { t('nothingToShow') }
                                </Typography>
                            </div>
                        )
                        : (tracesByType.map((source, index) => {
                            return <Graph data={ source.data } title={ source.title } axisLabels={ { x: t('date'), y: t('value') } } key={ index } />
                        }))
                    )
                )
            }
        </div>
    )
}

export default GraphsContainer
