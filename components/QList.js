import React from 'react'
import {
    makeStyles,
    Box,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Typography,
    Chip
} from '@material-ui/core'
import { lightGreen,  } from '@material-ui/core/colors'
import Link from 'next/link'
import moment from 'utils/moment'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    tags: {
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    answers: {
        color: theme.palette.getContrastText(lightGreen[300]),
        backgroundColor: lightGreen[300],
    },
    link: {
        cursor: 'pointer'
    }
}))

function QItem({item}) {
    const classes = useStyles()
    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar variant="rounded" className={classes.answers}>
                    {item.question?.answersCount || 0}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Link href={`/question/${item.id}`} passHref>
                        <Typography className={classes.link}>{ item.question.title }</Typography>
                    </Link>
                }
                secondary={
                    <Box display="flex">
                        <Box paddingY={1} flexGrow={1} className={classes.tags}>
                            <Tags tags={item.tags} />
                        </Box>
                        <Box marginY={'auto'}>
                            { moment(item.createdAt).fromNow()}
                        </Box>
                    </Box>
                }
            />
        </ListItem>
    )
}

function Tags({ tags = [] }) {
    return tags.map(e => 
        <Link href={`/tag/${e.slug}`} passHref key={e.id}>
            <Chip label={e.name} color="secondary" variant="default" size="small"/>
        </Link>
    )
}

export default function QList({ items = []}) {
    return (
        <List>
            {
                items.map((e, index) =>
                    <div key={index}>
                        <QItem item={e}/>
                        <Divider variant="inset" component="li"/>
                    </div>
                )
            }
        </List>
    )
}