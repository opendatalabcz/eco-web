import React, { useState } from 'react';
import { Grid, makeStyles, Slider, Typography } from '@material-ui/core';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import GeoRegions from '../../../GeoData/Regions.json';
import GeoCountry from '../../../GeoData/Country.json';
import { useTranslation } from 'react-i18next';
import './Map.css'
import 'fontsource-roboto';

const useStyles = makeStyles(() => ({
    Container: {
        width: '100%',
        height: '100%',
        padding: '5px'
    },
    ItemStyle: {
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center'
    },
    SliderContainer: {
        width: '50%',
    },
    SliderStyle: {
        width: '95%',
        marginLeft: '20px',
        marginRight: '20px'
    },
    GeoJSONStyle: {
        fillColor: 'white',
        fillOpacity: '0',
        opacity: '0.6'
    },
    RowItems: {
        marginLeft: '10px'
    },
    MapStyle: {
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        display: 'flex'
    },
}));

function GeoMap(props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const [value, setValue] = useState(0);
    const coordinatesCZ = { lat: 49.817493, long: 15.472962 };

    const onEachRegion = (region, layer) => {
        layer.setStyle({
            color: '#ea4436',
            weight: '1'
        })
        const name = region.properties.NAZEV_NUTS;
        layer.bindPopup(`${ name }`);
    };

    const onCountry = (country, layer) => {
        layer.setStyle({
            color: '#ea4436',
            weight: '1'
        })
        const name = country.properties.NAZEV_NUTS;
        layer.bindPopup(`${ name }`);
    };

    const graphOptions = props.graphTypes.hydroMeteoTypes.filter((element) => { return element.name === props.selectedType })[0].graphs;
    const units = props.hydrometeoTypes.filter((element) => { return element.name === props.selectedType })[0].unit;

    return (
        <div className={ classes.Container }>
            <Grid container direction='column' alignItems='center' alignContent='center' className={ classes.Container }>
                <Grid item container direction='row' className={ classes.ItemStyle }>
                    <Grid item className={ classes.RowItems }>
                        <Typography>
                            { props.data[0][0].date }
                        </Typography>
                    </Grid>
                    <Grid item className={ classes.SliderContainer }>
                        <Slider
                            className={ classes.SliderStyle }
                            marks
                            min={ 0 }
                            max={ props.data[0].length - 1 }
                            step={ 1 }
                            value={ value }
                            onChange={ (event, newValue) => { setValue(newValue) } }
                            track={ false }
                        />
                    </Grid>
                    <Grid item className={ classes.RowItems }>
                        <Typography>
                            { props.data[0][props.data[0].length - 1].date }
                        </Typography>
                    </Grid>
                    <Grid item className={ classes.RowItems }>
                        <Typography>
                            { t('currentDate') + ': ' + props.data[0][value].date }
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item alignContent='center' className={ classes.MapStyle }>
                    <MapContainer 
                        center={ [coordinatesCZ.lat, coordinatesCZ.long] }
                        zoom={ 7 }
                        scrollWheelZoom={ true }
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        { props.level === 'region'
                            ? <GeoJSON onEachFeature={ onEachRegion } className={ classes.GeoJSONStyle } data={ GeoRegions } />
                            : <GeoJSON onEachFeature={ onCountry } className={ classes.GeoJSONStyle } data={ GeoCountry } />
                        }
                        { props.level === 'station'
                            ? props.data.map((source, index) => {
                                return (
                                    <Marker key={ index } position={ [source[value].station.lat, source[value].station.long] }>
                                        <Popup>
                                            <Typography variant='h6'>
                                                { source[value].station.locationName }
                                            </Typography>
                                            <Typography>
                                                { t('date') + ': ' + source[value].date }
                                            </Typography>
                                            { graphOptions.map((element) => {
                                                if (element.name === 'map') return null;
                                                return (
                                                    <Typography>
                                                        { element.name === 'totalPrecipitation'
                                                            ? t(element.name) + ': ' + source[value][element.value] + ` ${ units[1] }`
                                                            : t(element.name) + ': ' + source[value][element.value] + ` ${ units[0] }`
                                                        }
                                                    </Typography>
                                                )
                                            }) }
                                        </Popup>
                                    </Marker>
                                );
                            })
                            : (props.level === 'region'
                                ? props.data.map((source, index) => {
                                    return (
                                        <Marker key={ index } position={ [source[value].region.lat, source[value].region.long] }>
                                            <Popup>
                                                <Typography variant='h6'>
                                                    { source[value].region.name }
                                                </Typography>
                                                <Typography>
                                                    { t('date') + ': ' + source[value].date }
                                                </Typography>
                                                { graphOptions.map((element) => {
                                                    if (element.name === 'map') return null;
                                                    return (
                                                        <Typography>
                                                            { element.name === 'totalPrecipitation'
                                                                ? t(element.name) + ': ' + source[value][element.value] + ` ${ units[1] }`
                                                                : t(element.name) + ': ' + source[value][element.value] + ` ${ units[0] }`
                                                            }
                                                        </Typography>
                                                    )
                                                }) }
                                            </Popup>
                                        </Marker>
                                    );
                                })
                                : props.data.map((source, index) => {
                                    return (
                                        <Marker key={ index } position={ [coordinatesCZ.lat, coordinatesCZ.long] }>
                                            <Popup>
                                                <Typography variant='h6'>
                                                    { t('czechRepublic') }
                                                </Typography>
                                                <Typography>
                                                    { t('date') + ': ' + source[value].date }
                                                </Typography>
                                                { graphOptions.map((element) => {
                                                    if (element.name === 'map') return null;
                                                    return (
                                                        <Typography>
                                                            { element.name === 'totalPrecipitation'
                                                                ? t(element.name) + ': ' + source[value][element.value] + ` ${ units[1] }`
                                                                : t(element.name) + ': ' + source[value][element.value] + ` ${ units[0] }`
                                                            }
                                                        </Typography>
                                                    )
                                                }) }
                                            </Popup>
                                        </Marker>
                                    );
                                })
                            )
                        }
                    </MapContainer>
                </Grid>
            </Grid>
        </div>
    )
}

export default GeoMap
