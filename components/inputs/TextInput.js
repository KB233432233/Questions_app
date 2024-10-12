import React from 'react';
import TextField from '@material-ui/core/TextField';
import {useIntl} from 'react-intl';
import { FormControl, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2)
    }
}))

export default function TextInput({ name, label, onChange, variant = 'filled', ...props }) {
    const classes = useStyles()
    const { formatMessage } = useIntl()
    return (
        <FormControl fullWidth className={classes.root}>
            <TextField
                variant={variant}
                fullWidth
                name={name}
                label={formatMessage({
                    id: label,
                    defaultMessage: label
                })}
                onChange={e => onChange(e.target.value)}
                {...props}
            />
        </FormControl>
    );
}
