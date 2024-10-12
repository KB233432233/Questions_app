import TextField from '@material-ui/core/TextField';
import { makeStyles, FormControl } from '@material-ui/core'

import Autocomplete from '@material-ui/lab/Autocomplete'
import { FormattedMessage } from 'react-intl'

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2)
    }
}))

export default function TagsInput({ name, label, onChange, ...props }) {
    const classes = useStyles()
    return (
        <FormControl fullWidth className={classes.root}>
            <Autocomplete
                {...props}
                multiple
                disableCloseOnSelect
                getOptionLabel={(option) => option.label}
                onChange={(event, selected) => { onChange(selected) }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant='outlined'
                        label={
                            <FormattedMessage id={label} defaultMessage={label} />
                        }
                    />
                )}
            />
        </FormControl>
    )
}
