import React, {useState, useEffect} from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography, List, ListItem, Box, CardHeader, IconButton} from '@mui/material';
import Stack from '@mui/material/Stack';
import Axios from "axios";
import data from '../../../Assets/Data/data.json'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { useImmerReducer } from "use-immer";
import { MapContainer, TileLayer, useMap, Marker,Popup,Polygon } from 'react-leaflet'
import { useNavigate } from "react-router-dom";
import {Item} from '../../elements/utils/Item'



export default function ImgMediaCard() {

    const navigate = useNavigate();


    const initialState = { 
        
        mapInstance:null,
    
    }


    function ReducerFuction(draft, action) {
        switch (action.type) {
			
            case 'getMap':
                draft.mapInstance = action.mapData;
                break
            
            default: break;
        }
    }

    const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

    function TheMapComponent(){
        const map = useMap()
        
        dispatch({type: 'getMap', mapData: map})
        return null;
    }

    

    const [allListings, setAllListings] = useState([]);
    const [dataIsLoading, setDataIsLoading] = useState(true);

	useEffect(() => {
		const source = Axios.CancelToken.source();
		async function GetAllListings() {
			try {
				const response = await Axios.get(
					"http://127.0.0.1:8000/api/listings/",
					{ cancelToken: source.token }
				);

				setAllListings(response.data);
				setDataIsLoading(false);
			} catch (error) {}
		}
		GetAllListings();
		return () => {
			source.cancel();
		};
	}, []);
    return (
        <>  
            {allListings.map((item) =>(
                <Card sx={{width:'94%',height:'70vh', margin: '0 auto', mt: 2}} key={item.id}>

                    <CardHeader
                            action={
                            <IconButton aria-label="settings">
                                <AddLocationAltIcon/>
                            </IconButton>
                            }
                            title={item.title}
                           
                        />
                    
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height= '50%'
                    image = {item.picture}
                    
                />
            
                
                <CardContent>
                    
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                      
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                        <Item>{item.property_status} </Item>
                        <Item>price &#36;: {item.property_status ==='Sale' ? item.price : item.price + ' per ' + item.rental_frequency} </Item>
                        <Item>rooms: {item.rooms}</Item>
                        <Item>agency: {item.seller_agency_name}</Item>
                    </Stack>
                    <Typography variant='body1' sx={{m: 0, fontSize: '.7rem'}}>
                            {item.description}
                            </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small"
                    onClick={()=>{navigate(`/listings/${item.id}`)}}>More</Button>
                    <Button 
                        size="small" 
                        onClick={()=>{navigate(`/agencies/${item.seller}`)}}>Seller</Button>
                    
                </CardActions>
            </Card>
            ))
             }


        </>
    );
}