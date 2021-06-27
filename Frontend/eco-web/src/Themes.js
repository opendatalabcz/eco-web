import { createMuiTheme } from '@material-ui/core'
import { green, grey } from '@material-ui/core/colors'

export const theme = createMuiTheme({
    shape: {
        borderRadius: 0
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
    shape: {
        borderRadius: 0
    },
    type: 'light',
    palette: {
        primary: {
            main: green[800]
        },
        secondary: {
            main: '#ffffff'
        }
    }
})

export const topBarThemeDark = createMuiTheme({
    shape: {
        borderRadius: 0
    },
    type: 'dark',
    palette: {
        primary: {
            main: green[800]
        },
        secondary: {
            main: '#6d6d6d'
        }
    }
})

export const sideBarTheme = createMuiTheme({
    shape: {
        borderRadius: 0
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

export const appThemeLight = createMuiTheme({
    shape: {
        borderRadius: 0
    },
    palette: {
        type: 'light',
        primary: {
            main: green[800]
        },
        secondary: {
            main: '#60ad5e'
        }
    }
})

export const appThemeDark = createMuiTheme({
    shape: {
        borderRadius: 0
    },
    palette: {
        type: 'dark',
        primary: {
            main: grey[50]
        },
        secondary: {
            main: '#60ad5e'
        },
        background: {
            paper: '#424242'
        }
    }
})
