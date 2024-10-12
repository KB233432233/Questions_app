import { makeStyles, Typography, Container, Link as MuiLink } from '@material-ui/core'
import Link from 'next/link'
import { FormattedMessage } from 'react-intl'

const useStyles = makeStyles((theme) => ({
    footer: {
        marginTop: 'auto',
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#FFF',
        padding: '30px',
    },
}))

export default function Footer() {
    const classes = useStyles()
    return (
        <footer className={classes.footer}>
            <Container maxWidth='sm'>
                <Typography variant='body2' color='textSecondary' align='center'>
                    <FormattedMessage id='copyright'/>
                    {' '}
                    <Link href='/' passHref>
                        <MuiLink color='inherit' href='/'>
                            <FormattedMessage id='app.name'/>
                        </MuiLink>
                    </Link>
                </Typography>
            </Container>
        </footer>
    )
}