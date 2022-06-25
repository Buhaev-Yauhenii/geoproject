import {
   
    Typography,
   
    Box,
   
    useMediaQuery
} from "@mui/material";

import {useTheme} from '@mui/material/styles';
import {Link, useNavigate} from "react-router-dom";

import backgroundCity from '../../Assets/city.jpg'

function Header() {
    const theme = useTheme()
    const display_sm = useMediaQuery(theme.breakpoints.up('sm'));
    const display_md = useMediaQuery(theme.breakpoints.up('md'));
    const display_lg = useMediaQuery(theme.breakpoints.up('lg'));


    if (display_lg || display_md || display_sm) {
        return (
            <>
                <Box component='header'>
                    <Typography variant="h1" align='center' sx={{
                        fontSize: '6rem',
                        color: '#fff',
                        letterSpacing: '.3rem',
                        pt: '10rem',
                        backgroundImage: `url(${backgroundCity})`,
                        width: '100%',
                        height: '60vh',
                        backgroundSize: 'cover'
                    }}>
                        Geoproject
                    </Typography>
                </Box>
                <Box sx={{height: '12vh', width: '100%', backgroundColor: '#000'}}>

                </Box>
            </>
        )
    } else {
        return (
            <>
                <Box component='header'>
                    <Typography variant="h1" align='center' sx={{
                        fontSize: '4rem',
                        color: '#fff',
                        letterSpacing: '.5rem',
                        pt: '10rem',
                        height: '60vh',
                        backgroundSize: 'cover',
                        backgroundImage: `url(${backgroundCity})`
                    }}>
                        Geoproject
                    </Typography>

                </Box>
                <Box sx={{height: '12vh', width: '100%', backgroundColor: '#000'}}>

                </Box>
            </>
        )
    }
}

export default Header