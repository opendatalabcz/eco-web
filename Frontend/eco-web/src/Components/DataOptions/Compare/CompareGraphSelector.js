import React from 'react';
import { Checkbox, FormControlLabel, FormGroup, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import 'fontsource-roboto';
import PropTypes from 'prop-types';

function CompareGraphSelector(props) {
    const { t } = useTranslation();

    return (
        <Grid container direction='column' alignContent='center'>
            <Grid item>
                <FormGroup>
                    { props.options.map((element, index) => {
                        return (
                            <FormControlLabel
                                key={ index }
                                control={ <Checkbox checked={ props.values[index] } name={ element.name } /> }
                                onChange={ (event) => props.onChange(event, index, element.type) }
                                label={ t(element.name) }
                            />
                        );
                    } ) }
                </FormGroup>
            </Grid>
        </Grid>
    )
}

CompareGraphSelector.propTypes = {
    options: PropTypes.object.isRequired,
    values: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CompareGraphSelector
