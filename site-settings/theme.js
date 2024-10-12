import { createTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

const theme = createTheme({
    direction: 'rtl',
    typography: {
        fontFamily: '"Cairo", sans-serif',
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    },
    palette: {
        primary: {
            main: '#009688',
        },
        secondary: {
            main: '#80604D',
        },
        error: {
            main: red.A400,
        },
        success: {
            main: '#00962a',
        },
        danger: {
            main: red.A400,
        },
        background: {
            default: '#f2f2f2',
            title: '#f4f7f9'
        },
    },
})

export default theme