import React, { useEffect } from 'react';
import { createMuiTheme, makeStyles, Paper, ThemeProvider } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import LoadingComponent from '../Components/LoadingComponent';
import { format } from 'date-fns'
import 'fontsource-roboto';
import { 
    DAILY_TEMPERATURE_QUERY,
    ANNUAL_COUNTRY_TEMPERATURE_QUERY,
    ANNUAL_REGIONAL_TEMPERATURE_QUERY,
    ANNUAL_TEMPERATURE_QUERY,
    DAILY_COUNTRY_TEMPERATURE_QUERY,
    DAILY_REGIONAL_TEMPERATURE_QUERY,
    MONTHLY_COUNTRY_TEMPERATURE_QUERY,
    MONTHLY_REGIONAL_TEMPERATURE_QUERY,
    MONTHLY_TEMPERATURE_QUERY,
} from '../Queries/Temperature';
import { 
    DAILY_PRECIPITATION_QUERY,
    ANNUAL_COUNTRY_PRECIPITATION_QUERY,
    ANNUAL_REGIONAL_PRECIPITATION_QUERY,
    ANNUAL_PRECIPITATION_QUERY,
    DAILY_COUNTRY_PRECIPITATION_QUERY,
    DAILY_REGIONAL_PRECIPITATION_QUERY,
    MONTHLY_COUNTRY_PRECIPITATION_QUERY,
    MONTHLY_REGIONAL_PRECIPITATION_QUERY,
    MONTHLY_PRECIPITATION_QUERY,
} from '../Queries/Precipitation';
import { 
    DAILY_PRESSURE_QUERY,
    ANNUAL_COUNTRY_PRESSURE_QUERY,
    ANNUAL_REGIONAL_PRESSURE_QUERY,
    ANNUAL_PRESSURE_QUERY,
    DAILY_COUNTRY_PRESSURE_QUERY,
    DAILY_REGIONAL_PRESSURE_QUERY,
    MONTHLY_COUNTRY_PRESSURE_QUERY,
    MONTHLY_REGIONAL_PRESSURE_QUERY,
    MONTHLY_PRESSURE_QUERY,
} from '../Queries/Pressure';
import { 
    DAILY_WATER_QUERY,
    ANNUAL_COUNTRY_WATER_QUERY,
    ANNUAL_REGIONAL_WATER_QUERY,
    ANNUAL_WATER_QUERY,
    DAILY_COUNTRY_WATER_QUERY,
    DAILY_REGIONAL_WATER_QUERY,
    MONTHLY_COUNTRY_WATER_QUERY,
    MONTHLY_REGIONAL_WATER_QUERY,
    MONTHLY_WATER_QUERY,
} from '../Queries/Water';
import { 
    DAILY_WIND_QUERY,
    ANNUAL_COUNTRY_WIND_QUERY,
    ANNUAL_REGIONAL_WIND_QUERY,
    ANNUAL_WIND_QUERY,
    DAILY_COUNTRY_WIND_QUERY,
    DAILY_REGIONAL_WIND_QUERY,
    MONTHLY_COUNTRY_WIND_QUERY,
    MONTHLY_REGIONAL_WIND_QUERY,
    MONTHLY_WIND_QUERY,
} from '../Queries/Wind';
import { 
    DAILY_SHINE_QUERY,
    ANNUAL_COUNTRY_SHINE_QUERY,
    ANNUAL_REGIONAL_SHINE_QUERY,
    ANNUAL_SHINE_QUERY,
    DAILY_COUNTRY_SHINE_QUERY,
    DAILY_REGIONAL_SHINE_QUERY,
    MONTHLY_COUNTRY_SHINE_QUERY,
    MONTHLY_REGIONAL_SHINE_QUERY,
    MONTHLY_SHINE_QUERY,
} from '../Queries/Shine';
import { 
    DAILY_SNOW_QUERY,
    ANNUAL_COUNTRY_SNOW_QUERY,
    ANNUAL_REGIONAL_SNOW_QUERY,
    ANNUAL_SNOW_QUERY,
    DAILY_COUNTRY_SNOW_QUERY,
    DAILY_REGIONAL_SNOW_QUERY,
    MONTHLY_COUNTRY_SNOW_QUERY,
    MONTHLY_REGIONAL_SNOW_QUERY,
    MONTHLY_SNOW_QUERY,
} from '../Queries/Snow';
import { useContext } from 'react';
import { CompareContext } from '../Components/DataOptions/Compare/CompareContext';
import { ButtonsVisibilityContext } from '../Components/TopBar/ButtonsVisibilityContext';
import GraphCompareContainer from '../Components/DataVisualisation/Graph/GraphCompareContainer';
import { DarkContext } from '../Components/DarkContext';
import { appThemeDark, appThemeLight } from '../Themes';
import { hydroMeteoTypes } from '../Components/DataOptions/Compare/GraphsForHydroMeteoTypes.json'

const useStyles = makeStyles(() => ({
    PageContainer: {
        width: '100%',
        minHeight: '100vh',
        justifyContent: 'center',
        alignContent: 'center'
    },
    Container: {
        width: '100%',
        height: '100%'
    },
    LoadingContainer: {
        width: '100%',
        height: '100%'
    }
}));

function CompareGraphPage() {
    const [isDark] = useContext(DarkContext);
    const classes = useStyles();
    const [isVisible, setVisible] = useContext(ButtonsVisibilityContext);
    const [selectedCompare] = useContext(CompareContext);

    useEffect(() => {
        if (isVisible) setVisible(false);
        window.scrollTo(0, 0);
    }, []);

    const selectedQuery = ((level, rangeScale, dataType) => {
        if (level === 'region') {
            if (rangeScale === 'daily') {
                if (dataType === 'Temperature') return DAILY_REGIONAL_TEMPERATURE_QUERY;
                else if (dataType === 'Water') return DAILY_REGIONAL_WATER_QUERY;
                else if (dataType === 'Wind') return DAILY_REGIONAL_WIND_QUERY;
                else if (dataType === 'Shine') return DAILY_REGIONAL_SHINE_QUERY;
                else if (dataType === 'Pressure') return DAILY_REGIONAL_PRESSURE_QUERY;
                else if (dataType === 'Snow') return DAILY_REGIONAL_SNOW_QUERY;
                else return DAILY_REGIONAL_PRECIPITATION_QUERY;
            }
            else if (rangeScale === 'monthly') {
                if (dataType === 'Temperature') return MONTHLY_REGIONAL_TEMPERATURE_QUERY;
                else if (dataType === 'Water') return MONTHLY_REGIONAL_WATER_QUERY;
                else if (dataType === 'Wind') return MONTHLY_REGIONAL_WIND_QUERY;
                else if (dataType === 'Shine') return MONTHLY_REGIONAL_SHINE_QUERY;
                else if (dataType === 'Pressure') return MONTHLY_REGIONAL_PRESSURE_QUERY;
                else if (dataType === 'Snow') return MONTHLY_REGIONAL_SNOW_QUERY;
                else return MONTHLY_REGIONAL_PRECIPITATION_QUERY;
            }
            else {
                if (dataType === 'Temperature') return ANNUAL_REGIONAL_TEMPERATURE_QUERY;
                else if (dataType === 'Water') return ANNUAL_REGIONAL_WATER_QUERY;
                else if (dataType === 'Wind') return ANNUAL_REGIONAL_WIND_QUERY;
                else if (dataType === 'Shine') return ANNUAL_REGIONAL_SHINE_QUERY;
                else if (dataType === 'Pressure') return ANNUAL_REGIONAL_PRESSURE_QUERY;
                else if (dataType === 'Snow') return ANNUAL_REGIONAL_SNOW_QUERY;
                else return ANNUAL_REGIONAL_PRECIPITATION_QUERY;
            }
        }
        else if (level === 'country') {
            if (rangeScale === 'daily') {
                if (dataType === 'Temperature') return DAILY_COUNTRY_TEMPERATURE_QUERY;
                else if (dataType === 'Water') return DAILY_COUNTRY_WATER_QUERY;
                else if (dataType === 'Wind') return DAILY_COUNTRY_WIND_QUERY;
                else if (dataType === 'Shine') return DAILY_COUNTRY_SHINE_QUERY;
                else if (dataType === 'Pressure') return DAILY_COUNTRY_PRESSURE_QUERY;
                else if (dataType === 'Snow') return DAILY_COUNTRY_SNOW_QUERY;
                else return DAILY_COUNTRY_PRECIPITATION_QUERY;
            }
            else if (rangeScale === 'monthly') {
                if (dataType === 'Temperature') return MONTHLY_COUNTRY_TEMPERATURE_QUERY;
                else if (dataType === 'Water') return MONTHLY_COUNTRY_WATER_QUERY;
                else if (dataType === 'Wind') return MONTHLY_COUNTRY_WIND_QUERY;
                else if (dataType === 'Shine') return MONTHLY_COUNTRY_SHINE_QUERY;
                else if (dataType === 'Pressure') return MONTHLY_COUNTRY_PRESSURE_QUERY;
                else if (dataType === 'Snow') return MONTHLY_COUNTRY_SNOW_QUERY;
                else return MONTHLY_COUNTRY_PRECIPITATION_QUERY;
            }
            else {
                if (dataType === 'Temperature') return ANNUAL_COUNTRY_TEMPERATURE_QUERY;
                else if (dataType === 'Water') return ANNUAL_COUNTRY_WATER_QUERY;
                else if (dataType === 'Wind') return ANNUAL_COUNTRY_WIND_QUERY;
                else if (dataType === 'Shine') return ANNUAL_COUNTRY_SHINE_QUERY;
                else if (dataType === 'Pressure') return ANNUAL_COUNTRY_PRESSURE_QUERY;
                else if (dataType === 'Snow') return ANNUAL_COUNTRY_SNOW_QUERY;
                else return ANNUAL_COUNTRY_PRECIPITATION_QUERY;
            }
        }
        else {
            if (rangeScale === 'daily') {
                if (dataType === 'Temperature') return DAILY_TEMPERATURE_QUERY;
                else if (dataType === 'Water') return DAILY_WATER_QUERY;
                else if (dataType === 'Wind') return DAILY_WIND_QUERY;
                else if (dataType === 'Shine') return DAILY_SHINE_QUERY;
                else if (dataType === 'Pressure') return DAILY_PRESSURE_QUERY;
                else if (dataType === 'Snow') return DAILY_SNOW_QUERY;
                else return DAILY_PRECIPITATION_QUERY;
            }
            else if (rangeScale === 'monthly') {
                if (dataType === 'Temperature') return MONTHLY_TEMPERATURE_QUERY;
                else if (dataType === 'Water') return MONTHLY_WATER_QUERY;
                else if (dataType === 'Wind') return MONTHLY_WIND_QUERY;
                else if (dataType === 'Shine') return MONTHLY_SHINE_QUERY;
                else if (dataType === 'Pressure') return MONTHLY_PRESSURE_QUERY;
                else if (dataType === 'Snow') return MONTHLY_SNOW_QUERY;
                else return MONTHLY_PRECIPITATION_QUERY;
            }
            else {
                if (dataType === 'Temperature') return ANNUAL_TEMPERATURE_QUERY;
                else if (dataType === 'Water') return ANNUAL_WATER_QUERY;
                else if (dataType === 'Wind') return ANNUAL_WIND_QUERY;
                else if (dataType === 'Shine') return ANNUAL_SHINE_QUERY;
                else if (dataType === 'Pressure') return ANNUAL_PRESSURE_QUERY;
                else if (dataType === 'Snow') return ANNUAL_SNOW_QUERY;
                else return ANNUAL_PRECIPITATION_QUERY;
            }
        }
    });

    let variables = {}
    if (selectedCompare.level === 'region') {
        variables = {
            regionIDs: selectedCompare.source.map((element) => { return parseInt(element.region) }),
            from: format(selectedCompare.dateRange.from, 'yyyy-MM-dd'),
            to: format(selectedCompare.dateRange.to, 'yyyy-MM-dd')
        };
    } else if (selectedCompare.level === 'country') {
        variables = {
            countryShortcuts: ['CZ'],
            from: format(selectedCompare.dateRange.from, 'yyyy-MM-dd'),
            to: format(selectedCompare.dateRange.to, 'yyyy-MM-dd')
        };
    } else {
        variables = {
            stationIDs: selectedCompare.source.map((element) => { return element.station }),
            from: format(selectedCompare.dateRange.from, 'yyyy-MM-dd'),
            to: format(selectedCompare.dateRange.to, 'yyyy-MM-dd')
        };
    };

    const { data: temperatureData, error: temperatureError, loading: temperatureLoading } = useQuery(
        selectedQuery(
            selectedCompare.level,
            selectedCompare.dateRange.scale,
            'Temperature'
        ),
        { 
            variables: variables,
            skip: selectedCompare.graphs.temperature.length === 0
        }
    );
    if (temperatureError) console.log(temperatureError);
    //if (temperatureData) console.log(temperatureData);

    const { data: shineData, error: shineError, loading: shineLoading } = useQuery(
        selectedQuery(
            selectedCompare.level,
            selectedCompare.dateRange.scale,
            'Shine'
        ),
        { 
            variables: variables,
            skip: selectedCompare.graphs.shine.length === 0
        }
    );
    if (shineError) console.log(shineError);
    //if (shineData) console.log(shineData);

    const { data: snowData, error: snowError, loading: snowLoading } = useQuery(
        selectedQuery(
            selectedCompare.level,
            selectedCompare.dateRange.scale,
            'Snow'
        ),
        { 
            variables: variables,
            skip: selectedCompare.graphs.snow.length === 0
        }
    );
    if (snowError) console.log(snowError);
    //if (snowData) console.log(snowData);

    const { data: pressureData, error: pressureError, loading: pressureLoading } = useQuery(
        selectedQuery(
            selectedCompare.level,
            selectedCompare.dateRange.scale,
            'Pressure'
        ),
        { 
            variables: variables,
            skip: selectedCompare.graphs.pressure.length === 0
        }
    );
    if (pressureError) console.log(pressureError);
    //if (pressureData) console.log(pressureData);

    const { data: precipitationData, error: precipitationError, loading: precipitationLoading } = useQuery(
        selectedQuery(
            selectedCompare.level,
            selectedCompare.dateRange.scale,
            'Precipitation'
        ),
        { 
            variables: variables,
            skip: selectedCompare.graphs.precipitation.length === 0
        }
    );
    if (precipitationError) console.log(precipitationError);
    //if (precipitationData) console.log(precipitationData);

    const { data: waterData, error: waterError, loading: waterLoading } = useQuery(
        selectedQuery(
            selectedCompare.level,
            selectedCompare.dateRange.scale,
            'Water'
        ),
        { 
            variables: variables,
            skip: selectedCompare.graphs.water.length === 0
        }
    );
    if (waterError) console.log(waterError);
    if (waterData) console.log(waterData);

    const { data: windData, error: windError, loading: windLoading } = useQuery(
        selectedQuery(
            selectedCompare.level,
            selectedCompare.dateRange.scale,
            'Wind'
        ),
        { 
            variables: variables,
            skip: selectedCompare.graphs.wind.length === 0
        }
    );
    if (windError) console.log(windError);
    //if (windData) console.log(windData);

    return (
        <>
            <ThemeProvider theme={ createMuiTheme(isDark ? appThemeDark : appThemeLight) }>
                <Paper square>
                    <div className={ classes.PageContainer }>
                        { temperatureLoading || shineLoading || snowLoading || pressureLoading || precipitationLoading || waterLoading || windLoading
                            ? (
                                <div className={ classes.LoadingContainer }>
                                    <LoadingComponent />
                                </div>
                            )
                            : (
                                <div className={ classes.Container }>
                                    <GraphCompareContainer
                                        temperatureData={ temperatureData }
                                        shineData={ shineData }
                                        snowData={ snowData }
                                        pressureData={ pressureData }
                                        precipitationData={ precipitationData }
                                        windData={ windData }
                                        waterData={ waterData }
                                        level={ selectedCompare.level }
                                        scale={ selectedCompare.dateRange.scale }
                                        hydrometeoTypes={ hydroMeteoTypes }
                                    />
                                </div>
                            )
                        }
                    </div>
                </Paper>
            </ThemeProvider>
        </>
    )
}

export default CompareGraphPage
