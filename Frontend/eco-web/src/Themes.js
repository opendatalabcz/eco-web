import { createMuiTheme } from '@material-ui/core'
import { green, grey } from '@material-ui/core/colors'

export const theme = createMuiTheme({
    shape: {
        borderRadius: 0,
    },
    palette: {
        primary: {
            main: green[800]
        },
        secondary: {
            main: grey[800]
        }
    }
})

export const topBarThemeLight = createMuiTheme({
    type: 'light',
    shape: {
        borderRadius: 0,
    },
    palette: {
        primary: {
            main: green[800]
        },
        secondary: {
            main: '#ffffff',
        }
    }
})

export const topBarThemeDark = createMuiTheme({
    type: 'dark',
    shape: {
        borderRadius: 0,
    },
    palette: {
        primary: {
            main: green[800]
        },
        secondary: {
            main: '#6d6d6d',
        }
    }
})

export const sideBarTheme = createMuiTheme({
    shape: {
        borderRadius: 0,
    },
    palette: {
        primary: {
            main: '#005005'
        },
        secondary: {
            main: grey[800]
        }
    }
})
