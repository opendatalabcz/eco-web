import React from 'react';
import { FormControl, FormControlLabel, RadioGroup, Radio, makeStyles, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import 'date-fns';
import 'fontsource-roboto';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
    RadioStyle: {
        marginLeft: '30px',
        marginRight: '30px'
    },
    DatePickerStyle: {
        width: '150px',
        marginLeft: '30px',
        marginRight: '30px',
        marginTop: '10px'
    }
}));

function DateRangeSelector(props) {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <div>
            <Grid container direction={ 'column' }>
                <Grid item container direction={ 'row' } justify='center'>
                    <Grid item>
                        <FormControl>
                            <RadioGroup
                                value={ props.scale }
                                onChange={ (event) => { props.changeScale(event) } }
                                row
                            >
                                <FormControlLabel className={ classes.RadioStyle } value='annual' control={ <Radio /> } label={ t('annual') }/>
                                <FormControlLabel className={ classes.RadioStyle } value='monthly' control={ <Radio /> } label={ t('monthly') }/>
                                <FormControlLabel className={ classes.RadioStyle } value='daily' control={ <Radio /> } label={ t('daily') }/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item container direction={ 'row' } justify='center'>
                    <Grid item>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant='inline'
                                format='dd-MM-yyyy'
                                value={ props.from }
                                onChange={ (date) => { props.changeFrom(date) } }
                                label={ t('from') }
                                className={ classes.DatePickerStyle }
                                error={ !props.validate(props.from) }
                                helperText={ props.validate(props.from) ? null : t('dateError') }
                            />
                            <KeyboardDatePicker
                                disableToolbar
                                variant='inline'
                                format='dd-MM-yyyy'
                                value={ props.to }
                                onChange={ (date) => { props.changeTo(date) } }
                                label={ t('to') }
                                className={ classes.DatePickerStyle }
                                error={ !props.validate(props.to) }
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

DateRangeSelector.propTypes = {
    scale: PropTypes.string.isRequired,
    from: PropTypes.object.isRequired,
    to: PropTypes.object.isRequired,
    changeScale: PropTypes.func.isRequired,
    changeFrom: PropTypes.func.isRequired,
    changeTo: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
};

export default DateRangeSelector
