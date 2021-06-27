import React from 'react';
import { Grid, IconButton, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import { useTranslation } from 'react-i18next';
import 'fontsource-roboto';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
    AddButtonContainer: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    SelectStyle: {
        minWidth: '150px'
    }
}));

function SourceSelector(props) {
    const { t } = useTranslation();
    const classes = useStyles();

    const isAlreadySelectedRegion = (id) => {
        if (props.selectedLevel === 'station') return false;
        return props.rows.filter((element) => { return element.region === id }).length > 0;
    }

    const isAlreadySelectedStation = (id) => {
        return props.rows.filter((element) => { return element.station === id }).length > 0;
    }

    return (
        <div>
            <Grid container direction='column' spacing={ 2 }>
                { props.rows.map((row, key) => {
                    return (
                        <Grid item container direction='row' alignItems='center' spacing={ 3 } key={ key }>
                            <Grid item>
                                <Typography color='primary' variant='h5'>
                                    { key + 1  }
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Select
                                    displayEmpty
                                    value={ row.region }
                                    onChange={ (event) => { props.changeRegion(key, event) } }
                                    className={ classes.SelectStyle }
                                    error={ row.region === '' }
                                >
                                    <MenuItem value='' disabled>
                                        { t('selectRegion') }
                                    </MenuItem>
                                    { props.selectOptions.regions.map((region) => {
                                        return (
                                            <MenuItem key={ region.id } value={ region.id } disabled={ isAlreadySelectedRegion(region.id) }>
                                                { region.name }
                                            </MenuItem>
                                        )
                                    }) }
                                </Select>
                            </Grid>
                            { props.selectedLevel === 'station'
                                ? (
                                    <Grid item>
                                        <Select
                                            displayEmpty
                                            value={ row.station }
                                            onChange={ (event) => { props.changeStation(key, event) } }
                                            className={ classes.SelectStyle }
                                            error={ row.station === '' }
                                        >
                                            <MenuItem value='' disabled>
                                                { t('selectStation') }
                                            </MenuItem>
                                            { props.selectOptions.regions.map((region) => {
                                                if (region.id === row.region) {
                                                    return region.stationsByHydroMeteoTypes.map((hydroMeteoType) => {
                                                        if (hydroMeteoType.hydroMeteoTypeName === props.selectedType) {
                                                            return hydroMeteoType.stations.map((station) => {
                                                                return (
                                                                    <MenuItem key={ station.id } value={ station.id } disabled={ isAlreadySelectedStation(station.id) }>
                                                                        { station.locationName }
                                                                    </MenuItem>
                                                                );
                                                            });
                                                        };
                                                        return null;
                                                    });
                                                };
                                                return null;
                                            }) }
                                        </Select>
                                    </Grid>
                                )
                                : null
                            }
                            <Grid item>
                                <IconButton onClick={ () => { props.removeRow(key) } } color='primary'>
                                    <DeleteForeverSharpIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    )
                }) }
                <Grid item className={ classes.AddButtonContainer }>
                    <IconButton onClick={ props.addRow }>
                        <AddCircleSharpIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    )
}

SourceSelector.propTypes = {
    selectOptions: PropTypes.object.isRequired,
    selectedType: PropTypes.string.isRequired,
    selectedLevel: PropTypes.string.isRequired,
    rows: PropTypes.array.isRequired,
    addRow: PropTypes.func.isRequired,
    removeRow: PropTypes.func.isRequired,
    changeRegion: PropTypes.func.isRequired,
    changeStation: PropTypes.func.isRequired,
};

export default SourceSelector
