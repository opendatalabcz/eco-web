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

    console.log(props.temperatureData);
    console.log(props.waterData)

    const traces = [];

    if (props.temperatureData){
        let data = [];

        if (props.level === 'region') {
            if (props.scale === 'daily') {
                data = props.temperatureData.dailyTemperature;
            }
            else if (props.scale === 'monthly') {
                data = props.temperatureData.monthlyTemperature;
            }
            else {
                data = props.temperatureData.annualTemperature;
            }
        }
        else if (props.level === 'country') {
            if (props.scale === 'daily') {
                data = props.temperatureData.dailyRegionalTemperature;
            }
            else if (props.scale === 'monthly') {
                data = props.temperatureData.monthlyRegionalTemperature;
            }
            else {
                data = props.temperatureData.annualRegionalTemperature;
            }
        }
        else {
            if (props.scale === 'daily') {
                data = props.temperatureData.dailyCountryTemperature;
            }
            else if (props.scale === 'monthly') {
                data = props.temperatureData.monthlyCountryTemperature;
            }
            else {
                data = props.temperatureData.annualCountryTemperature;
            }
        }

        console.log(data);

        /*data.forEach((source) => {
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
        });*/
    }

    return (
        <div className={ classes.Container }>
            <Graph data={ traces } title={ t("combinedData") } axisLabels={ { x: t('date'), y: t('value') } } />
        </div>
    )
}

export default GraphCompareContainer
