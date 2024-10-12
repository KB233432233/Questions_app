import { AuthLayout } from 'layouts'
import { Typography, Avatar, makeStyles, Button, Box, Link as MuiLink } from '@material-ui/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LockOutlined } from '@material-ui/icons'
import { FormattedMessage } from 'react-intl'
import { TextInput } from 'components/inputs'
import { useState } from 'react'
import { register } from 'hooks/useAuth'
import { Alert } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        marginTop: theme.spacing(3)
    }
}))

export default function Register() {
    const classes = useStyles()
    const router = useRouter()

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const [hasError, setHasError] = useState(false)

    const onSubmit = async (event) => {
        event.preventDefault()
        if (loading) return
        setLoading(true)
        try {
            await register({name, email, password})
            router.push('/')
        } catch (e) {
            setHasError(true)
            setLoading(false)
        }
    }

    return (
        <AuthLayout>
            <Avatar className={classes.avatar}>
                <LockOutlined/>
            </Avatar>
            <Typography component="h1" variant="h5">
                <FormattedMessage id={'title.register'}/>
            </Typography>
            {
                hasError &&
                <Box marginTop={2}>
                    <Alert severity='error'>
                        <FormattedMessage id={'error.register'}/>
                    </Alert>
                </Box>
            }
            <form className={classes.form} onSubmit={onSubmit}>
                <TextInput
                    required
                    label="input.name"
                    autoComplete="name"
                    onChange={setName}
                />
                <TextInput
                    required
                    label="input.email"
                    type="email"
                    autoComplete="email"
                    onChange={setEmail}
                />

                <TextInput
                    required
                    label="input.password"
                    type="password"
                    autoComplete="password"
                    onChange={setPassword}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth disabled={loading}>
                    <FormattedMessage id={'btn.send'}/>
                </Button>
                <Box marginTop={2}>
                    <HaveAccount/>
                </Box>
            </form>
        </AuthLayout>
    )
}

function HaveAccount() {
    return (
        <Typography align="center">
            <Link href="/login" passHref>
                <MuiLink variant="body2">
                    <FormattedMessage id={'haveAccount'}/>
                </MuiLink>
            </Link>
        </Typography>
    )
}