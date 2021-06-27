import React from 'react';
import { Button, Dialog, DialogTitle, Divider, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import 'fontsource-roboto';

const useStyles = makeStyles({
    Container: {
        justifyContent: 'center',
        padding: '20px'
    }
});

function SelectorDialog(props) {
    const classes = useStyles();
    const { onClose, open } = props;
    const { t } = useTranslation();

    return (
        <Dialog onClose={ onClose } open={ open }>
            <DialogTitle>
                { t(props.title) }
            </DialogTitle>
            <Divider />
                <div className={ classes.Container }>
                    { props.children }
                </div>
            <Divider />
            <Button onClick={ onClose }>
                { t('close') }
            </Button>
        </Dialog>
    )
}

SelectorDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
};

export default SelectorDialog
