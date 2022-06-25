import React, { useEffect, useRef, useMemo,useState, useContext} from 'react';
import {Container,  Typography,Link,  Box,Grid,Breadcrumbs, Button, TextField} from '@mui/material';

import Axios from "axios";
import CssBaseline from '@mui/material/CssBaseline';
import {useImmerReducer} from 'use-immer';
import { useNavigate,useParams } from "react-router-dom";
import Navbar from '../elements/Navbar';
import {Item} from '../elements/utils/Item'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Footer from '../elements/Footer';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ListingUpdate from './components/ListingUpdate'

import { MapContainer, TileLayer, useMap, Marker,Popup,Polygon } from 'react-leaflet'
import stateContext from '../../Context/StateContext';


import {initialState} from '../elements/utils/InitialState'
import {ReducerFuction} from '../elements/utils/Reducer'

function ListingDetail() {
   
    const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);
    const navigate = useNavigate();
    const GlobalState = useContext(stateContext) 
    const params = useParams()
    const [open, setOpen] = useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
    useEffect(()=>{
		async function getListingDetail(){
			try{
				const response = await Axios.get(`http://127.0.0.1:8000/api/listings/${params.id}/`)
                console.log(response.data)
				dispatch({type: 'catchListingInfo', listingObject: response.data})
			} catch(e){
				console.log(e.response)
			}
		
	}
	getListingDetail()
	},[])

    useEffect(() => {
		if (state.listingInfo) {
			async function GetProfileInfo() {
				try {
					const response = await Axios.get(
						`http://127.0.0.1:8000/api/profiles/${state.listingInfo.seller}/`
					);
                        
					dispatch({
						type: "catchSellerProfileInfo",
						profileObject: response.data,
					});
					dispatch({ type: "loadingDone" });
				} catch (e) {}
			}
			GetProfileInfo();
		}
	}, [state.listingInfo]);

    async function deleteListing(){
        let confirmDelete = window.confirm('Are you sure you want to delete?')
        if (confirmDelete){
        try{
            const response = await Axios.delete(`http://127.0.0.1:8000/api/listings/${params.id}/delete/`)
            navigate('/listings');
        } catch(e){
            console.log(e.response)
        }}
    }



    let position = [state.listingInfo.latitude, state.listingInfo.longitude]
    let price = 0
    if(state.listingInfo.property_status === 'Sale'){
        price = `price: $${state.listingInfo.price}`
    } else { price = `price: $${state.listingInfo.price} per ${state.listingInfo.rental_frequency}`}

    let cctv = 0
    if(state.listingInfo.cctv){
        cctv = 'cctv: yes'
    }else{ cctv = 'cctv: no' }

    let elevator = 0
    if(state.listingInfo.elevator){
        elevator = 'elevator: yes'
    }else{ elevator = 'elevator: no' }

    let parking = 0
    if(state.listingInfo.parking){
        parking = 'parking: yes'
    }else{ parking = 'parking: no' }

    let pool = 0
    if(state.listingInfo.pool){
        pool = 'pool: yes'
    }else{ pool = 'pool: no' }




    if(state.listingInfo.latitude){

    
  return (
    
    <>
    <Navbar/>
    <Box>
        <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" onClick={()=>navigate('/listings/')}>
                listings
            </Link>
            <Typography color="text.primary">{state.listingInfo.title}</Typography>
        </Breadcrumbs>
    </Box>
    <Typography variant='h1' sx={{textAlign: 'center'}}>{state.listingInfo.title}</Typography>
    <Grid container>
        <Grid item xs={6}><Container fixed>
            <Box sx={{height: '73vh', backgroundColor: 'red', margin: '0 auto', mt: 2, }}>
                <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                        
                        
                        <Marker key={state.listingInfo.id} position={position}>
                         <Popup>
                             <Typography variant='h5' sx={{fontSize: '1.2rem'}}>{state.listingInfo.title}</Typography>
                            <img src={state.listingInfo.picture} alt={'picture'}style={{width: '100%', height: 'auto'}}/>
                            <Typography variant='body1' sx={{m: 0, fontSize: '.7rem'}}>
                            {state.listingInfo.description}
                            </Typography>
                            
                        </Popup>
   
                        </Marker>
                   
                </MapContainer>
            </Box>
            </Container></Grid>
        <Grid item xs={6} alignItems="flex-start" sx={{pt:'1rem'}}>
            <Container>
            <Box component='div' sx={{textAlign:'center'}} >
                <img src={state.listingInfo.picture} style={{width:'85vh'}}/>
            </Box>
            <Grid container spacing={2} sx={{mt:'1rem'}}>
                <Grid item xs={6}>
                <Item key={state.listingInfo.id} elevation={4} sx={{cursor:'pointer'}} onClick={()=>{navigate(`/agencies/${state.sellerProfileInfo.seller}`)}}>
                  {`Agency: ${state.listingInfo.seller_agency_name}`}
                </Item>
                
                </Grid>
                <Grid item xs={6}>
                <Item key={state.listingInfo.id} elevation={4}>
                {`Phone: ${state.sellerProfileInfo.phone_number}`}
                </Item>
                </Grid>
               
                {parseInt(GlobalState.userId) === state.listingInfo.seller ? (<Grid item xs={6}>
                    
                    <Button variant="contained" sx={{mr:'1rem'}} onClick={deleteListing}>delete</Button>
                   
                        <Button variant="contained" onClick={handleClickOpen}>
                            Update
                        </Button>
                        <Dialog open={open} onClose={handleClose} sx={{margin:'0 auto'}}>
                            <ListingUpdate listingData={state.listingInfo} />
                        </Dialog>
               
                </Grid>) : ''}
            </Grid>
                
            <Typography variant='h6' sx={{mt:'1rem'}}>Description:</Typography>
            <Typography >{state.listingInfo.description}</Typography>

            <Typography variant='h6'>Locations:</Typography>
            <Typography variant='body2'>{`${state.listingInfo.area}, ${state.listingInfo.borough}`}</Typography>

            <Grid container spacing={2} sx={{mt:'1rem'}}>
                <Grid item xs={6}>
                <Item key={state.listingInfo.id} elevation={4}>
                  {`rooms: ${state.listingInfo.rooms}`}
                </Item>
                
                </Grid>
                <Grid item xs={6}>
                <Item key={state.listingInfo.id} elevation={4}>
                  {price}
                </Item>
                </Grid>
                <Grid item xs={6}>
                <Item key={state.listingInfo.id} elevation={4}>
                  {cctv}
                </Item>
                </Grid>
                <Grid item xs={6}>
                <Item key={state.listingInfo.id} elevation={4}>
                  {elevator}
                </Item>
                </Grid>
                <Grid item xs={6}>
                <Item key={state.listingInfo.id} elevation={4}>
                  {parking}
                </Item>
                </Grid>
                <Grid item xs={6}>
                <Item key={state.listingInfo.id} elevation={4}>
                  {pool}
                </Item>
                </Grid>
            </Grid>
            </Container>
        </Grid>
        
    </Grid>
    <Footer/>
    </>
  )
}}

export default ListingDetail