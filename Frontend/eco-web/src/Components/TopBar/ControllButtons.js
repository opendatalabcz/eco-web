import React, { useContext, useState } from 'react'
import { IconButton, ThemeProvider, Button, createMuiTheme, Tooltip, Zoom, Typography } from '@material-ui/core';
import DateRangeSharpIcon from '@material-ui/icons/DateRangeSharp';
import BarChartSharpIcon from '@material-ui/icons/BarChartSharp';
import ListAltSharpIcon from '@material-ui/icons/ListAltSharp';
import ZoomOutMapSharpIcon from '@material-ui/icons/ZoomOutMapSharp';
import CompareArrowsSharpIcon from '@material-ui/icons/CompareArrowsSharp';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import { topBarThemeLight, topBarThemeDark, appThemeDark, appThemeLight } from '../../Themes';
import { NavLink } from 'react-router-dom';
import 'fontsource-roboto';
import { DarkContext } from '../DarkContext';
import { useQuery } from '@apollo/client';
import { REGIONS_WITH_STATIONS_FOR_EACH_HYDROMETEO_TYPE_QUERY } from '../../Queries/Region';
import { DataOptionsContext } from '../DataOptions/SelectedOptions';
import { hydroMeteoTypes } from '../DataOptions/Selectors/GraphsForHydroMeteoTypes.json';
import SelectorDialog from '../DataOptions/Containers/SelectorDialog';
import LevelSelector from '../DataOptions/Selectors/LevelSelector';
import SourceSelector from '../DataOptions/Selectors/SourceSelector';
import DateRangeSelector from '../DataOptions/Selectors/DateRangeSelector';
import GraphSelector from '../DataOptions/Selectors/GraphSelector';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
    IconButtonStyle: {
        margin: 3,
        width: 30,
        height: 30,
        [topBarThemeLight.breakpoints.up('sm')]: {
            margin: 5,
            width: 45,
            height: 45,
        },
    },
    ToolbarButtons: {
        marginLeft: 'auto',
    },
    ShowLightButton: {
        fontWeight: 'bold',
        marginLeft: 3,
        [topBarThemeLight.breakpoints.up('sm')]: {
            marginLeft: 5,
        },
        border: '2px solid',
        borderColor: 'white',
        '&:hover': {
            border: '2px solid',
            borderColor: 'white'
        }
    },
    ShowDarkButton: {
        fontWeight: 'bold',
        marginLeft: 3,
        [topBarThemeLight.breakpoints.up('sm')]: {
            marginLeft: 5,
        },
        border: '2px solid',
        '&:hover': {
            border: '2px solid'
        }
    },
    NavlinkStyle: { 
        textDecoration: 'none' 
    },
    TooltipStyle: {
        fontSize: '15px',
    },
    CompareIconButtonStyle: {
        margin: 3,
        width: 30,
        height: 30,
        color: grey[50],
        [topBarThemeLight.breakpoints.up('sm')]: {
            margin: 5,
            width: 45,
            height: 45,
        },
    },
}));

function ControllButtons() {
    const classes = useStyles();
    const [isDark] = useContext(DarkContext);
    const { t } = useTranslation();

    const { data, error } = useQuery(REGIONS_WITH_STATIONS_FOR_EACH_HYDROMETEO_TYPE_QUERY);
    const [selectedOptions, setSelectedOptions] = useContext(DataOptionsContext);
    const [level, setLevel] = useState(selectedOptions.level);
    const [scale, setScale] = useState(selectedOptions.dateRange.scale);
    const [from, setFrom] = useState(selectedOptions.dateRange.from);
    const [to, setTo] = useState(selectedOptions.dateRange.to);
    const [dataType] = useState(selectedOptions.dataType);
    const [stationSource, setStationSource] = useState(level === 'station' ? selectedOptions.source : [{ region: '', station: ''}]);
    const [regionSource, setRegionSource] = useState(level === 'region' ? selectedOptions.source : [{ region: '', station: ''}]);
    const options = hydroMeteoTypes.filter((element) => { return element.name === dataType })[0];
    const [graphs, setGraphs] = useState(selectedOptions.graphs);

    const [openLevel, setOpenLevel] = useState(false);
    const [openSource, setOpenSource] = useState(false);
    const [openDateRange, setOpenDateRange] = useState(false);
    const [openGraps, setOpenGraphs] = useState(false);
    const [openDateRangeError, setOpenDateRangeError] = useState(false);

    const handleClickDialogOpen = () => {
        setOpenDateRangeError(true);
    }

    const handleDialogClose = () => {
        setOpenDateRangeError(false);
    }

    const handleClickLevelOpen = () => {
        setOpenLevel(true);
    }

    const handleLevelClose = () => {
        setOpenLevel(false);
    }

    const handleClickSourceOpen = () => {
        setOpenSource(true);
    }

    const handleSourceClose = () => {
        setOpenSource(false);
    }

    const handleClickDateRangeOpen = () => {
        setOpenDateRange(true);
    }

    const handleDateRangeClose = () => {
        setOpenDateRange(false);
    }

    const handleClickGraphsOpen = () => {
        setOpenGraphs(true);
    }

    const handleGraphsClose = () => {
        setOpenGraphs(false);
    }

    const initToggle = () => {
        const values = options.graphs.map((element) => {
            return selectedOptions.graphs.includes(element.name);
        });
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
            if (regionSource.length === 14) return;
            if (regionSource.filter(element => element.region === '' && element.station === '').length > 0) return;
            const newSource = [...regionSource, { region: '', station: '' }];
            setRegionSource(newSource);
        } else {
            if (stationSource.length === 5) return;
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
        <div className={classes.ToolbarButtons}>
            <ThemeProvider theme={ createMuiTheme(isDark ? topBarThemeDark : topBarThemeLight) }>
                <Tooltip TransitionComponent={ Zoom } title={ t("changeLevel") } classes={ { tooltip: classes.TooltipStyle } }>
                    <IconButton color='inherit' aria-label='menu' className={ classes.IconButtonStyle } onClick={ handleClickLevelOpen }>
                        <ZoomOutMapSharpIcon />
                    </IconButton>
                </Tooltip>
                <ThemeProvider theme={ createMuiTheme(isDark ? appThemeDark : appThemeLight) }>
                    <SelectorDialog
                        title={ t('levelSelector') }
                        onClose={ handleLevelClose }
                        open={ openLevel }
                    >
                        <LevelSelector
                            value={ level }
                            onChange={ changeLevel }
                        />
                    </SelectorDialog>
                </ThemeProvider>
                <Tooltip TransitionComponent={ Zoom } title={ t("changeSource") } classes={ { tooltip: classes.TooltipStyle } }>
                    <IconButton color='inherit' aria-label='menu' className={ classes.IconButtonStyle } onClick={ handleClickSourceOpen } disabled={ level === 'country'}>
                        <ListAltSharpIcon />
                    </IconButton>
                </Tooltip>
                <ThemeProvider theme={ createMuiTheme(isDark ? appThemeDark : appThemeLight) }>
                    <SelectorDialog
                        title={ selectHeadlineText(level) }
                        onClose={ handleSourceClose }
                        open={ openSource }
                    >
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
                    </SelectorDialog>
                </ThemeProvider>
                <Tooltip TransitionComponent={ Zoom } title={ t("changeDateRange") } classes={ { tooltip: classes.TooltipStyle } }>
                    <IconButton color='inherit' aria-label='menu' className={ classes.IconButtonStyle } onClick={ handleClickDateRangeOpen }>
                        <DateRangeSharpIcon />
                    </IconButton>
                </Tooltip>
                <ThemeProvider theme={ createMuiTheme(isDark ? appThemeDark : appThemeLight) }>
                    <SelectorDialog
                        title={ t('dateSelector') }
                        onClose={ handleDateRangeClose }
                        open={ openDateRange }
                    >
                        <DateRangeSelector
                            scale={ scale }
                            from={ from }
                            to={ to }
                            changeScale={ changeScale }
                            changeFrom={ changeFrom }
                            changeTo={ changeTo }
                            validate={ isDateValid }
                        />
                    </SelectorDialog>
                </ThemeProvider>
                <Tooltip TransitionComponent={ Zoom } title={ t("changeGraphs") } classes={ { tooltip: classes.TooltipStyle } }>
                    <IconButton color='inherit' aria-label='menu' className={ classes.IconButtonStyle } onClick={ handleClickGraphsOpen }>
                        <BarChartSharpIcon />
                    </IconButton>
                </Tooltip>
                <ThemeProvider theme={ createMuiTheme(isDark ? appThemeDark : appThemeLight) }>
                    <SelectorDialog
                        title={ t('graphs') }
                        onClose={ handleGraphsClose }
                        open={ openGraps }
                    >
                        <GraphSelector
                            options={ options }
                            values={ toggle }
                            onChange={ changeToggle }
                        />
                    </SelectorDialog>
                </ThemeProvider>
                <Tooltip TransitionComponent={ Zoom } title={ t("compareMode") } classes={ { tooltip: classes.TooltipStyle } }>
                    <NavLink className={ classes.NavlinkStyle } to='/compare/select' exact>
                        <IconButton aria-label='menu' className={ classes.CompareIconButtonStyle }>
                            <CompareArrowsSharpIcon />
                        </IconButton>
                    </NavLink>
                </Tooltip>
                <ThemeProvider theme={ createMuiTheme(isDark ? appThemeDark : appThemeLight) }>
                    <SelectorDialog title={ t('error') } onClose={ handleDialogClose } open={ openDateRangeError }>
                        <Typography>
                            { t('bigDateDifference') }
                        </Typography>
                    </SelectorDialog>
                </ThemeProvider>
                <NavLink className={ classes.NavlinkStyle } onClick={ clickHandler } to='/graph' exact>
                    <Button variant='contained' size='small' color='secondary' className={ isDark ? classes.ShowDarkButton : classes.ShowLightButton }>
                        { t("showButton") }
                    </Button>
                </NavLink>
            </ThemeProvider>
        </div>
    )
}

export default ControllButtons
