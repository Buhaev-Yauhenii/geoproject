import React, { useEffect, useRef, useMemo, useContext,useState} from 'react';
import {Card, CardActions, CardContent, Stack,  CardMedia, Button, Typography, List, ListItem, Box, CardHeader, Grid} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Axios from "axios";
import CssBaseline from '@mui/material/CssBaseline';
import {useImmerReducer} from 'use-immer';
import { useNavigate } from "react-router-dom";
import Navbar from '../elements/Navbar';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Footer from '../elements/Footer';


import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { MapContainer, TileLayer, useMap, Marker,Popup,Polygon } from 'react-leaflet'
import stateContext from '../../Context/StateContext';
import {areaOptions, innerLondonOptions, outerLondonOptions, listingTypeOptions, propertyStatusOptions, rentalFrequencyOptions} from '../elements/utils/Data'

import {initialState} from '../elements/utils/InitialState'
import {ReducerFuction} from '../elements/utils/Reducer'

function Agencies() {
    const navigate = useNavigate();
    const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);
    const GlobalState = useContext(stateContext) 
    const [allProfiles, setAllProfiles] = useState([]);
    const [dataIsLoading, setDataIsLoading] = useState(true);

    useEffect(() => {
		const source = Axios.CancelToken.source();
		async function GetAllListings() {
			try {
				const response = await Axios.get(
					"http://127.0.0.1:8000/api/profiles/",
					{ cancelToken: source.token }
				);

				setAllProfiles(response.data);
				setDataIsLoading(false);
			} catch (error) {}
		}
		GetAllListings();
		return () => {
			source.cancel();
		};
	}, []);
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));


  return (
    <>
    <Navbar/>
    <Grid container spacing={3}>
    {allProfiles.map((item) =>(
        <Grid item xs={6}>
                <Card sx={{width:'100%',height:'70vh', margin: '0 auto', mt: 2}} key={item.id}>
                    <CardHeader title={item.agency_name}/>
                    
                    
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height= '50%'
                    image = {item.profile_picture}
                    
                />
            
                
                <CardContent>
                    
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                      
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                        
                        <Item>phone: {item.phone_number}</Item>
                        <Item>listings number: {item.seller_listings.length}</Item>
                        
                    </Stack>
                    <Typography variant='body1' sx={{m: 0, fontSize: '.7rem'}}>
                            {item.biography}
                            </Typography>
                </CardContent>
                <CardActions>
                    <Button
                     size="small"
                     onClick={()=>{navigate(`/agencies/${item.seller}`)}}
                     >More</Button>
                    
                </CardActions>
            </Card>
            </Grid>
            ))
             }
             </Grid>
                        <Footer/>

    </>
  )
}

export default Agencies