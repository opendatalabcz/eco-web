import React from 'react';
import { FormControl, FormControlLabel, RadioGroup, Radio, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import 'fontsource-roboto';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
    RadioStyle: {
        marginLeft: '30px',
        marginRight: '30px'
    }
}));

function LevelSelector(props) {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <div>
            <FormControl>
                <RadioGroup
                    value={ props.value }
                    onChange={ props.onChange }
                    row
                >
                    <FormControlLabel className={ classes.RadioStyle } value='station' control={ <Radio /> } label={ t('station') } />
                    <FormControlLabel className={ classes.RadioStyle } value='region' control={ <Radio /> } label={ t('region') } />
                    <FormControlLabel className={ classes.RadioStyle } value='country' control={ <Radio /> } label={ t('country') } />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

LevelSelector.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

export default LevelSelector
