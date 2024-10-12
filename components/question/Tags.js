import React from 'react'
import Link from 'next/link'
import { makeStyles, Box, Chip } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}))

export default function Tags({ items = [] }) {
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            {
                items.map(e =>
                    (
                        <Link href={`/tag/${e.slug}`} passHref key={e.id}>
                           <Chip label={e.name} color="primary" variant="outlined" />
                        </Link>
                    )
                )
            }
        </Box>
    )
}
