import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import GeoMap from './Map/GeoMap';
import { useQuery } from '@apollo/client';
import LoadingComponent from '../LoadingComponent';
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
} from '../../Queries/Temperature';
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
} from '../../Queries/Precipitation';
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
} from '../../Queries/Pressure';
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
} from '../../Queries/Water';
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
} from '../../Queries/Wind';
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
} from '../../Queries/Shine';
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
} from '../../Queries/Snow';
import { HYDROMETEO_TYPES_QUERY } from '../../Queries/HydrometeoTypes'
import GraphsContainer from './Graph/GraphsContainer';
import graphTypes from '../DataOptions/Selectors/GraphsForHydroMeteoTypes.json'

const useStyles = makeStyles(() => ({
    Container: {
        width: '100%',
        height: '100%'
    },
    LoadingContainer: {
        width: '100%',
        height: '100%'
    }
}));

function Data(props) {
    const classes = useStyles();
    const selectedGraphsWithoutMap = [...props.selectedOptions.graphs];
    const mapIndex = selectedGraphsWithoutMap.indexOf('map');
    if (mapIndex > -1) selectedGraphsWithoutMap.splice(mapIndex, 1);

    useEffect(() => {
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
    if (props.selectedOptions.level === 'region') {
        variables = {
            regionIDs: props.selectedOptions.source.map((element) => { return parseInt(element.region) }),
            from: format(props.selectedOptions.dateRange.from, 'yyyy-MM-dd'),
            to: format(props.selectedOptions.dateRange.to, 'yyyy-MM-dd')
        };
    } else if (props.selectedOptions.level === 'country') {
        variables = {
            countryShortcuts: ['CZ'],
            from: format(props.selectedOptions.dateRange.from, 'yyyy-MM-dd'),
            to: format(props.selectedOptions.dateRange.to, 'yyyy-MM-dd')
        };
    } else {
        variables = {
            stationIDs: props.selectedOptions.source.map((element) => { return element.station }),
            from: format(props.selectedOptions.dateRange.from, 'yyyy-MM-dd'),
            to: format(props.selectedOptions.dateRange.to, 'yyyy-MM-dd')
        };
    };

    const { data, error, loading } = useQuery(
        selectedQuery(
            props.selectedOptions.level,
            props.selectedOptions.dateRange.scale,
            props.selectedOptions.dataType
        ),
        { variables: variables }
    );
    if (error) console.log(error);

    const { data: hydrometeoTypes, error: hydrometeoTypesError, loading: hydrometeoTypesLoading } = useQuery(HYDROMETEO_TYPES_QUERY);
    if (hydrometeoTypesError) console.log(hydrometeoTypesError);

    let queryName = props.selectedOptions.dateRange.scale;
    if (props.selectedOptions.level === 'region') queryName += 'Regional';
    else if (props.selectedOptions.level === 'country') queryName += 'Country';
    queryName += props.selectedOptions.dataType;

    return (
        <div className={ classes.Container }>
            { loading || hydrometeoTypesLoading
                ? (
                    <div className={ classes.LoadingContainer }>
                        <LoadingComponent />
                    </div>
                )
                : (
                    <div className={ classes.Container }>
                        { selectedGraphsWithoutMap.length > 0 
                        ? (
                            <GraphsContainer
                                data={ data[queryName] }
                                selectedType={ props.selectedOptions.dataType }
                                level={ props.selectedOptions.level }
                                selectedScale={ props.selectedOptions.dateRange.scale }
                                hydrometeoTypes={ hydrometeoTypes.hydrometeoTypes }
                                selectedGraphs={ selectedGraphsWithoutMap }
                                graphTypes={ graphTypes }
                            />
                        )
                        : null
                        }
                        { props.selectedOptions.graphs.includes('map')
                            ? <GeoMap
                                data={ data[queryName] }
                                selectedType={ props.selectedOptions.dataType }
                                level={ props.selectedOptions.level }
                                selectedScale={ props.selectedOptions.dateRange.scale }
                                hydrometeoTypes={ hydrometeoTypes.hydrometeoTypes }
                                graphTypes={ graphTypes }
                            />
                            : null
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Data
