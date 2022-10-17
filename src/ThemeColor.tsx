
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
    palette: {
        primary: {
            main: '#4040fa',
        },
        secondary: {
            main: '#f0f0f0',
        },

    },

    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "#f8f8f8"
                }
            }
        }
    }
});
