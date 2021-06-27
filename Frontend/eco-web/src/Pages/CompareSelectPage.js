import { Button, createMuiTheme, makeStyles, Paper, ThemeProvider, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import CompareSourceSelector from '../Components/DataOptions/Compare/CompareSourceSelector';
import LevelSelector from '../Components/DataOptions/Selectors/LevelSelector';
import { DarkContext } from '../Components/DarkContext';
import { appThemeLight, appThemeDark } from '../Themes';
import { useTranslation } from 'react-i18next';
import DateRangeSelector from '../Components/DataOptions/Selectors/DateRangeSelector';
import { NavLink } from 'react-router-dom';
import 'fontsource-roboto';
import SelectorContainer from '../Components/DataOptions/Containers/SelectorContainer';
import { DataOptionsContext } from '../Components/DataOptions/SelectedOptions';
import { REGIONS_QUERY } from '../Queries/Region';
import { useQuery } from '@apollo/client';
import LoadingComponent from '../Components/LoadingComponent';
import { hydroMeteoTypes } from '../Components/DataOptions/Compare/GraphsForHydroMeteoTypes.json'
import { ButtonsVisibilityContext } from '../Components/TopBar/ButtonsVisibilityContext';
import { CompareContext } from '../Components/DataOptions/Compare/CompareContext';
import CompareGraphSelector from '../Components/DataOptions/Compare/CompareGraphSelector';
import SelectorDialog from '../Components/DataOptions/Containers/SelectorDialog';

const useStyles = makeStyles(() => ({
    Container: {
        width: '100%',
        minHeight: '100vh'
    },
    LoadingContainer: {
        width: '100%',
        height: '100%'
    },
    SelectorContainer: {
        padding: '15px',
        display: 'flex',
        justifyContent: 'center'
    },
    ButtonContainer: {
        padding: '15px',
        alignContent: 'center',
        justifyContent: 'center',
        display: 'flex'
    },
    ButtonStyle: {
        border: '2px solid',
        '&:hover': {
            border: '2px solid'
        }
    },
    TypographyStyle: {
        padding: '15px'
    },
    NavlinkStyle: { 
        textDecoration: 'none' 
    }
}));

function CompareSelectPage() {
    const [isVisible, setVisible] = useContext(ButtonsVisibilityContext);
    const classes = useStyles();
    const [isDark] = useContext(DarkContext);
    const { t } = useTranslation();
    const { data, error, loading } = useQuery(REGIONS_QUERY);
    const [selectedOptions] = useContext(DataOptionsContext);
    const [selectedCompare, setSelectedCompare] = useContext(CompareContext);
    const [level, setLevel] = useState(selectedCompare.level === '' ? (selectedOptions.level === '' ? 'station' : selectedOptions.level) : selectedCompare.level);
    const [scale, setScale] = useState(selectedCompare.dateRange.scale === '' ? (selectedOptions.dateRange.scale === '' ? 'daily' : selectedOptions.dateRange.scale) : selectedCompare.dateRange.scale);
    const [from, setFrom] = useState(selectedCompare.dateRange.from === '' ? (selectedOptions.dateRange.from === '' ? new Date('1961-01-01') : selectedOptions.dateRange.from) : selectedCompare.dateRange.from);
    const [to, setTo] = useState(selectedCompare.dateRange.to === '' ? (selectedOptions.dateRange.to === '' ? new Date('2019-12-31') : selectedOptions.dateRange.to) : selectedCompare.dateRange.to);
    const [stationSource, setStationSource] = useState(selectedCompare.source.length === 0 ? (selectedOptions.source.length === 0 ? [{ region: '', station: ''}] : selectedOptions.source) : selectedCompare.source);
    const [regionSource, setRegionSource] = useState(selectedCompare.source.length === 0 ? (selectedOptions.source.length === 0 ? [{ region: '', station: ''}] : selectedOptions.source) : selectedCompare.source);
    const [graphsTemperature, setGraphsTemperature] = useState([]);
    const [graphsPressure, setGraphsPressure] = useState([]);
    const [graphsShine, setGraphsShine] = useState([]);
    const [graphsWind, setGraphsWind] = useState([]);
    const [graphsWater, setGraphsWater] = useState([hydroMeteoTypes[hydroMeteoTypes.length - 1].name]);
    const [graphsPrecipitation, setGraphsPrecipitation] = useState([]);
    const [graphsSnow, setGraphsSnow] = useState([]);
    const [openDateRangeError, setOpenDateRangeError] = useState(false);

    useEffect(() => {
        if (isVisible) setVisible(false);
        window.scrollTo(0, 0);
    });

    const handleClickDialogOpen = () => {
        setOpenDateRangeError(true);
    }

    const handleDialogClose = () => {
        setOpenDateRangeError(false);
    }

    const changeLevel = (event) => {
        setLevel(event.target.value);
    }

    const changeScale = (event) => {
        setScale(event.target.value);
    }

    const changeFrom = (date) => {
        setFrom(date);
    }

    const changeTo = (date) => {
        setTo(date)
    }

    const isDateValid = (date) => {
        if (isNaN(date)) return false;
        if (date === null || date === '') return false;
        if (date.getTime() < new Date('1960-12-31').getTime()) return false;
        if (date.getTime() > new Date('2019-12-31').getTime()) return false;
        return true;
    }

    const validRange = () => {
        const yearDifference = to.getFullYear() - from.getFullYear();
        if (yearDifference < 0) return false;
        if (scale === 'daily' && yearDifference > 5) return false;
        if (scale === 'monthly' && yearDifference > 25) return false;
        return true;
    }

    const addRow = () => {
        if (level === 'region') {
            if (regionSource.length === 3) return;
            if (regionSource.filter(element => element.region === '' && element.station === '').length > 0) return;
            const newSource = [...regionSource, { region: '', station: '' }];
            setRegionSource(newSource);
        } else {
            if (stationSource.length === 3) return;
            if (stationSource.filter(element => element.region === '' && element.station === '').length > 0) return;
            const newSource = [...stationSource, { region: '', station: '' }];
            setStationSource(newSource);
        }
    };

    const removeRow = (index) => {
        if (level === 'region') {
            if (regionSource.length === 1) return;
            const newSource = [...regionSource];
            newSource.splice(index, 1);
            setRegionSource(newSource);
        } else {
            if (stationSource.length === 1) return;
            const newSource = [...stationSource];
            newSource.splice(index, 1);
            setStationSource(newSource);
        }
    };

    const changeRegion = (index, event) => {
        if (level === 'region') {
            const newSource = [...regionSource];
            newSource[index].region = event.target.value;
            newSource[index].station = '';
            setRegionSource(newSource);
        } else {
            const newSource = [...stationSource];
            newSource[index].region = event.target.value;
            newSource[index].station = '';
            setStationSource(newSource);
        }
    };

    const changeStation = (index, event) => {
        const newSource = [...stationSource];
        newSource[index].station = event.target.value;
        setStationSource(newSource);
    };

    const initToggle = () => {
        const values = [];
        for (let i = 0; i < hydroMeteoTypes.length - 1; i++) {
            values.push(false);
        }
        values.push(true);
        return values;
    }

    const [toggle, setToggle] = useState(initToggle());

    const changeToggle = (event, index, type) => {
        if (toggle.filter((element) => { return element} ).length === 1 && !event.target.checked) return;
        if (event.target.checked) {
            switch (type) {
                case 'Shine':
                    const newGraphsShine = [...graphsShine, event.target.name];
                    setGraphsShine(newGraphsShine);
                    break;
                case 'Temperature':
                    const newGraphsTemperature = [...graphsTemperature, event.target.name];
                    setGraphsTemperature(newGraphsTemperature);
                    break;
                case 'Precipitation':
                    const newGraphsPrecipitation = [...graphsPrecipitation, event.target.name];
                    setGraphsPrecipitation(newGraphsPrecipitation);
                    break;
                case 'Snow':
                    const newGraphsSnow = [...graphsSnow, event.target.name];
                    setGraphsSnow(newGraphsSnow);
                    break;
                case 'Water':
                    const newGraphsWater = [...graphsWater, event.target.name];
                    setGraphsWater(newGraphsWater);
                    break;
                case 'Wind':
                    const newGraphsWind = [...graphsWind, event.target.name];
                    setGraphsWind(newGraphsWind);
                    break;
                case 'Pressure':
                    const newGraphsPressure = [...graphsPressure, event.target.name];
                    setGraphsPressure(newGraphsPressure);
                    break;
                default:
                    break;
            }
        } else {
            switch (type) {
                case 'Shine':
                    const newGraphsShine = [...graphsShine];
                    const indexToRemoveShine = newGraphsShine.indexOf(event.target.name);
                    newGraphsShine.splice(indexToRemoveShine, 1);
                    setGraphsShine(newGraphsShine);
                    break;
                case 'Temperature':
                    const newGraphsTemperature = [...graphsTemperature];
                    const indexToRemoveTemperature = newGraphsTemperature.indexOf(event.target.name);
                    newGraphsTemperature.splice(indexToRemoveTemperature, 1);
                    setGraphsTemperature(newGraphsTemperature);
                    break;
                case 'Precipitation':
                    const newGraphsPrecipitation = [...graphsPrecipitation];
                    const indexToRemovePrecipitation = newGraphsPrecipitation.indexOf(event.target.name);
                    newGraphsPrecipitation.splice(indexToRemovePrecipitation, 1);
                    setGraphsPrecipitation(newGraphsPrecipitation);
                    break;
                case 'Snow':
                    const newGraphsSnow = [...graphsSnow];
                    const indexToRemoveSnow = newGraphsSnow.indexOf(event.target.name);
                    newGraphsSnow.splice(indexToRemoveSnow, 1);
                    setGraphsSnow(newGraphsSnow);
                    break;
                case 'Water':
                    const newGraphsWater = [...graphsWater];
                    const indexToRemoveWater = newGraphsWater.indexOf(event.target.name);
                    newGraphsWater.splice(indexToRemoveWater, 1);
                    setGraphsWater(newGraphsWater);
                    break;
                case 'Wind':
                    const newGraphsWind = [...graphsWind];
                    const indexToRemoveWind = newGraphsWind.indexOf(event.target.name);
                    newGraphsWind.splice(indexToRemoveWind, 1);
                    setGraphsWind(newGraphsWind);
                    break;
                case 'Pressure':
                    const newGraphsPressure = [...graphsPressure];
                    const indexToRemovePressure = newGraphsPressure.indexOf(event.target.name);
                    newGraphsPressure.splice(indexToRemovePressure, 1);
                    setGraphsPressure(newGraphsPressure);
                    break;
                default:
                    break;
            }
        }
        const values = [...toggle];
        values[index] = event.target.checked;
        setToggle(values);
    };

    const selectHeadlineText = (selected) => {
        if (selected === 'region') return t('regions');
        if (selected === 'station') return t('stations');
    };

    const validateInput = () => {
        if (!isDateValid(from)) return false;
        if (!isDateValid(to)) return false;
        if (!validRange()) {
            handleClickDialogOpen();
            return false;
        }
        if (toggle.filter((element) => { return element} ).length === 0) return false;
        const emptyRegionRegions = regionSource.filter((element) => { return element.region === '' });
        const emptyStationRegions = stationSource.filter((element) => { return element.region === '' });
        if ((level === 'region' && emptyRegionRegions.length > 0) || (level === 'station' && emptyStationRegions.length > 0)) return false;
        const emptyStations = stationSource.filter((element) => { return element.station === '' });
        if (level === 'station' && emptyStations.length > 0) return false;
        return true;
    }

    const clickHandler = (event) => {
        if (!validateInput()) return event.preventDefault();
        setSelectedCompare({
            source: level === 'station' ? stationSource : regionSource,
            dateRange: {
                scale: scale,
                from: from,
                to: to
            },
            graphs: {
                temperature: graphsTemperature,
                shine: graphsShine,
                snow: graphsSnow,
                water: graphsWater,
                wind: graphsWind,
                precipitation: graphsPrecipitation,
                pressure: graphsPressure
            },
            level: level
        });
        console.log(selectedCompare);
    }

    if (error) console.log(error);

    return (
        <div>
            <ThemeProvider theme={ createMuiTheme(isDark ? appThemeDark : appThemeLight) }>
                <Paper square>
                    <div className={ classes.Container }>
                        { loading
                            ? (
                                <div className={ classes.LoadingContainer }>
                                    <LoadingComponent />
                                </div>
                            )
                            : (
                                <>
                                    <SelectorContainer
                                        title={ t('levelSelector') }
                                        selector={
                                            <LevelSelector
                                                value={ level }
                                                onChange={ changeLevel }
                                            />
                                        } 
                                    />
                                    { level === 'country'
                                        ? null
                                        : <SelectorContainer 
                                            title={ selectHeadlineText(level) }
                                            selector={
                                                <CompareSourceSelector
                                                    selectOptions={ data }
                                                    selectedLevel= { level }
                                                    rows={ level === 'region' ? regionSource : stationSource }
                                                    addRow={ addRow }
                                                    removeRow={ removeRow }
                                                    changeRegion={ changeRegion }
                                                    changeStation={ changeStation }
                                                />
                                            }
                                        />
                                    }
                                    <SelectorContainer
                                        title={ t('dateSelector') }
                                        selector={
                                            <DateRangeSelector
                                                scale={ scale }
                                                from={ from }
                                                to={ to }
                                                changeScale={ changeScale }
                                                changeFrom={ changeFrom }
                                                changeTo={ changeTo }
                                                validate={ isDateValid }
                                            />
                                        }
                                    />
                                    <SelectorContainer
                                        title={ t('graphs') }
                                        selector={
                                            <CompareGraphSelector
                                                options={ hydroMeteoTypes }
                                                values={ toggle }
                                                onChange={ changeToggle }
                                            />
                                        }
                                    />
                                    <SelectorDialog title={ t('error') } onClose={ handleDialogClose } open={ openDateRangeError }>
                                        <Typography>
                                            { t('bigDateDifference') }
                                        </Typography>
                                    </SelectorDialog>
                                    <div className={ classes.ButtonContainer }>
                                        <NavLink className={ classes.NavlinkStyle } onClick={ clickHandler } to='/compare/graph' exact>
                                            <Button variant='outlined' size='large' color='primary' className={ classes.ButtonStyle }>
                                                { t('showButton') }
                                            </Button>
                                        </NavLink>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </Paper>
            </ThemeProvider>            
        </div>
    )
}

export default CompareSelectPage
