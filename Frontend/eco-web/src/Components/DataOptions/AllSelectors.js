import { Button, createMuiTheme, makeStyles, Paper, ThemeProvider, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import SourceSelector from './Selectors/SourceSelector';
import LevelSelector from './Selectors/LevelSelector';
import { DarkContext } from '../DarkContext';
import { appThemeLight, appThemeDark } from '../../Themes';
import { useTranslation } from 'react-i18next';
import DateRangeSelector from './Selectors/DateRangeSelector';
import { NavLink } from 'react-router-dom';
import GraphSelector from './Selectors/GraphSelector';
import 'fontsource-roboto';
import SelectorContainer from './Containers/SelectorContainer';
import { DataOptionsContext } from './SelectedOptions';
import { REGIONS_WITH_STATIONS_FOR_EACH_HYDROMETEO_TYPE_QUERY } from '../../Queries/Region';
import { useQuery } from '@apollo/client';
import LoadingComponent from '../LoadingComponent';
import { hydroMeteoTypes } from './Selectors/GraphsForHydroMeteoTypes.json'
import SelectorDialog from './Containers/SelectorDialog';

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

function AllSelectors(props) {
    const classes = useStyles();
    const [isDark] = useContext(DarkContext);
    const { t } = useTranslation();
    const { data, error, loading } = useQuery(REGIONS_WITH_STATIONS_FOR_EACH_HYDROMETEO_TYPE_QUERY);
    const [selectedOptions, setSelectedOptions] = useContext(DataOptionsContext);
    const [level, setLevel] = useState('station');
    const [scale, setScale] = useState('daily');
    const [from, setFrom] = useState(new Date('1961-01-01'));
    const [to, setTo] = useState(new Date('2019-12-31'));
    const [dataType] = useState(props.selectedDataType);
    const [stationSource, setStationSource] = useState([{ region: '', station: ''}]);
    const [regionSource, setRegionSource] = useState([{ region: '', station: ''}]);
    const options = hydroMeteoTypes.filter((element) => { return element.name === dataType })[0];
    const [graphs, setGraphs] = useState([options.graphs[options.graphs.length - 1].name]);
    const [openDateRangeError, setOpenDateRangeError] = useState(false);

    const handleClickDialogOpen = () => {
        setOpenDateRangeError(true);
    }

    const handleDialogClose = () => {
        setOpenDateRangeError(false);
    }

    const initToggle = () => {
        const values = [];
        for (let i = 0; i < options.graphs.length - 1; i++) {
            values.push(false);
        }
        values.push(true);
        return values;
    }

    const [toggle, setToggle] = useState(initToggle());

    const selectHeadlineText = (selected) => {
        if (selected === 'region') return t('regions');
        if (selected === 'station') return t('stations');
    }

    const changeLevel = (event) => {
        setLevel(event.target.value);
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

    const changeToggle = (event, index) => {
        if (graphs.length === 1 && !event.target.checked) return;
        if (event.target.checked) {
            const newGraphs = [...graphs, event.target.name];
            setGraphs(newGraphs);
        } else {
            const newGraphs = [...graphs];
            const indexToRemove = newGraphs.indexOf(event.target.name);
            newGraphs.splice(indexToRemove, 1);
            setGraphs(newGraphs);
        }
        const values = [...toggle];
        values[index] = event.target.checked;
        setToggle(values);
    }

    const validRange = () => {
        const yearDifference = to.getFullYear() - from.getFullYear();
        if (yearDifference < 0) return false;
        if (scale === 'daily' && yearDifference > 5) return false;
        if (scale === 'monthly' && yearDifference > 25) return false;
        return true;
    }

    const validateInput = () => {
        if (!isDateValid(from)) return false;
        if (!isDateValid(to)) return false;
        if (!validRange()) {
            handleClickDialogOpen();
            return false;
        }
        if (graphs.length === 0) return false;
        const emptyRegionRegions = regionSource.filter((element) => { return element.region === '' });
        const emptyStationRegions = stationSource.filter((element) => { return element.region === '' });
        if ((level === 'region' && emptyRegionRegions.length > 0) || (level === 'station' && emptyStationRegions.length > 0)) return false;
        const emptyStations = stationSource.filter((element) => { return element.station === '' });
        if (level === 'station' && emptyStations.length > 0) return false;
        return true;
    }

    const clickHandler = (event) => {
        if (!validateInput()) return event.preventDefault();
        setSelectedOptions({
            dataType: dataType,
            source: level === 'station' ? stationSource : regionSource,
            dateRange: {
                scale: scale,
                from: from,
                to: to
            },
            graphs: graphs,
            level: level
        });
    }

    if (error) console.log(error);

    return (
        <>
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
                                                <SourceSelector
                                                    selectOptions={ data }
                                                    selectedType={ dataType }
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
                                            <GraphSelector
                                                options={ options }
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
                                        <NavLink className={ classes.NavlinkStyle } onClick={ clickHandler } to='/graph' exact>
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
        </>
    )
}

export default AllSelectors
