import { makeStyles, Container, Paper, Box, Typography, Divider } from '@material-ui/core'
import Footer from './partials/Footer'
import Header from './partials/Header'
import { FormattedMessage } from 'react-intl'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    },
    container: {
        flexGrow: 1,
        display: 'flex',
        padding: 0
    },
    title: {
        padding: theme.spacing(2),
        background: theme.palette.background.title
    },
    content: {
        flexGrow: 1,
        borderBottom: 'none'
    }
}))

export default function Main({children, title}) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Header/>
            <Container maxWidth="lg" component="main" className={classes.container}>
                <Paper square variant="outlined" className={classes.content}>
                    {
                        title &&
                        <>
                            <Box className={classes.title}>
                                <Typography variant="h5">
                                    <FormattedMessage id={title} defaultMessage={title}/>
                                </Typography>
                            </Box>
                            <Divider/>
                        </>
                    }
                    {children}
                </Paper>
            </Container>
            <Footer/>
        </div>
    )
}
