import { useEffect, useState } from 'react'
// Next.js
import Head from 'next/head'
// Components
import { makeStyles, Button, Grid } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { MainLayout } from 'layouts'
import { TextInput } from 'components/inputs'
import { FormattedMessage } from 'react-intl'
// Hooks
import useAuth from 'hooks/useAuth'
import { updateProfile, updatePassword } from 'hooks/useUser'

const useStyles = makeStyles((theme) => ({
    form: {
        margin: theme.spacing(2),
        paddingTop: theme.spacing(2)
    },
    alert: {
        marginBottom: theme.spacing(2),
    },
}))

export default function Profile() {

    const classes = useStyles()

    const [profileData, setProfileData] = useState()
    const [passwordData, setPasswordData] = useState()
    const [loading, setLoading] = useState({profile: false, password: false})
    const [error, setError] = useState({profile: false, password: false})

    const {user} = useAuth({
        redirectTo: '/login', redirectIfFound: false
    })

    useEffect(() => {
        if (!user) return
        const {name, email} = user
        setProfileData({name, email})
    }, [user])

    const onSubmitProfile = async (event) => {
        event.preventDefault()
        setLoading({...loading, profile: true})
        try {
            await updateProfile(profileData)
            setError({...error, profile: false})
        } catch (e) {
            setError({...error, profile: true})
        }
        setLoading({...loading, profile: false})
    }

    const onSubmitPassword = async (event) => {
        event.preventDefault()
        setLoading({...loading, password: true})
        try {
            await updatePassword(passwordData)
            setError({...error, password: false})
        } catch (e) {
            setError({...error, password: true})
        }
        setLoading({...loading, password: false})
    }

    return (
        <MainLayout title='title.profile'>
            <Head>
                <title>الملف الشخصي</title>
            </Head>

            <Grid container>
                <Grid item md={6} xs={12}>
                    {
                        user &&
                        <form className={classes.form} onSubmit={onSubmitProfile}>
                            <TextInput
                                required
                                label="input.name"
                                value={profileData?.name}
                                variant='outlined'
                                onChange={name => setProfileData({...profileData, name})}
                            />

                            <TextInput
                                required
                                label="input.email"
                                value={profileData?.email}
                                type="email"
                                variant='outlined'
                                onChange={email => setProfileData({...profileData, email})}
                            />
                            {
                                error.profile &&
                                <Alert severity='error' className={classes.alert}>
                                    <FormattedMessage id='error.update_profile'/>
                                </Alert>
                            }
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading.profile}
                            >
                                <FormattedMessage id={'btn.save'}/>
                            </Button>

                        </form>
                    }
                </Grid>
                <Grid item md={6} xs={12}>
                    {
                        user &&
                        <form className={classes.form} onSubmit={onSubmitPassword}>

                            <TextInput
                                required
                                label="input.current_password"
                                type="password"
                                variant='outlined'
                                onChange={password => setPasswordData({...passwordData, password})}
                            />

                            <TextInput
                                required
                                label="input.new_password"
                                type="password"
                                variant='outlined'
                                onChange={newPassword => setPasswordData({...passwordData, newPassword})}
                            />
                            {
                                error.password &&
                                <Alert severity='error' className={classes.alert}>
                                    <FormattedMessage id='error.update_password'/>
                                </Alert>
                            }
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading.password}
                            >
                                <FormattedMessage id={'btn.change_password'}/>
                            </Button>

                        </form>
                    }
                </Grid>
            </Grid>
        </MainLayout>
    )
}