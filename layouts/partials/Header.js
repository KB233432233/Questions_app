import { useState } from 'react'
import { makeStyles, AppBar, Toolbar, Typography, Button, IconButton, Avatar, Menu, MenuItem } from '@material-ui/core'
import Link from 'next/link'
import { FormattedMessage } from 'react-intl'
import { useRouter } from 'next/router'
import useAuth from 'hooks/useAuth'

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        cursor: 'pointer'
    }
}))

export default function Header() {
    const classes = useStyles()
    const {user, logout} = useAuth()
    return (
        <AppBar position="static" variant="outlined">
            <Toolbar>
                <Link href='/' passHref>
                    <Typography variant="h6" className={classes.title}>
                        <FormattedMessage id='app.name'/>
                    </Typography>
                </Link>
                {
                    user ? <UserMenu user={user} logout={logout}/> : <GuestMenu/>
                }
            </Toolbar>
        </AppBar>
    )
}

function GuestMenu() {
    return (
        <Link href='/login' passHref>
            <Button color="inherit" variant="outlined">
                <FormattedMessage id={'header.login'}/>
            </Button>
        </Link>
    )
}

function UserMenu({user, logout}) {
    const router = useRouter()
    const [menu, setMenu] = useState(null)
    const handleMenu = (event) => setMenu(event.currentTarget)
    const handleClose = () => setMenu(null)

    const handleLogout = async () => {
        setMenu(null)
        await logout()
        router.reload()
    }

    return (
        <div>
            {user?.name}
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <Avatar>{user.name?.charAt(0)}</Avatar>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={menu}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                open={Boolean(menu)}
                onClose={handleClose}
            >
                <Link href='/profile' passHref>
                    <MenuItem>
                        <FormattedMessage id='header.profile'/>
                    </MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>
                    <FormattedMessage id='header.logout'/>
                </MenuItem>
            </Menu>
        </div>
    )
}