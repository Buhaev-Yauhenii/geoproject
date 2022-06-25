import React, { useEffect, useState, useMemo, useContext} from 'react';
import {Container,  Button, Typography,MenuItem,  Box,Grid,TextField,Avatar,Link} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Axios from "axios";
import CssBaseline from '@mui/material/CssBaseline';
import {useImmerReducer} from 'use-immer';
import { useNavigate } from "react-router-dom";
import Navbar from '../elements/Navbar';
import Dialog from '@mui/material/Dialog';
import ProfileUpdate from './ProfileUpdate'
import stateContext from '../../Context/StateContext';

import {initialState} from '../elements/utils/InitialState'
import {ReducerFuction} from '../elements/utils/Reducer'



function Profile() {
    const theme = createTheme();
    const navigate = useNavigate();
    const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);
    const GlobalState = useContext(stateContext) 

    const handleSubmit = (event) => {
        event.preventDefault();
    
		dispatch({type: 'changeRequest', })
        console.log('success');
    };

    const [open, setOpen] = useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    useEffect(()=>{
		if(state.sendRequest){
			async function updateProfile(){
				const formData = new FormData();
					formData.append("agency_name", state.agencyNameValue);
					formData.append("phone_number", state.phoneValue);
					formData.append("biography", state.bioValue);
					formData.append("profile_picture", state.profilePicture);
					formData.append("seller", GlobalState.userId);
				try{
					const response = await Axios.patch(`http://127.0.0.1:8000/api/profiles/${GlobalState.userId}/update/`, formData)
                    // console.log(response.data)
                    
					navigate('/')
				}catch(e){
					console.log('error')
				}
			}
			updateProfile();
		}
	}, [state.sendRequest])

    useEffect(()=>{
		async function getProfile(){
			try{
				const response = await Axios.get(`http://127.0.0.1:8000/api/profiles/${GlobalState.userId}/`)
				console.log(response.data)
				console.log(state)
				dispatch({type: 'catchUserProfileInfo', profileObj: response.data})
			} catch(e){
				console.log(e.response)
			}
		
	}
	getProfile()
	},[])
    console.log(state.sellerProfileInfo)
    useEffect(()=>{
        if(state.uploadedPictureProfileValue[0]){
            dispatch({type: 'catchProfilePicture', profilePictureChosen: state.uploadedPictureProfileValue[0]})

        }

    },[state.uploadedPictureProfileValue[0]])
    console.log(state.userProfile)
    function WelcomeDisplay(){
        if (!state.userProfile.agencyName || !state.userProfile.phone ){
            return (<><Typography variant='h4' sx={{textAlign: 'center', marginTop:'2rem'}}>Welcome <span style={{color: '#ed6b04'}}>{GlobalState.userUsername}</span>, please adding information in your profile</Typography> 
                    <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            
                        }}
                    >
                       
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1, width:'40rem'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="agency_name"
                                label="Agency name"
                                name="agency"
                                
                                
                                value={state.agencyNameValue}
                                onChange={(event)=>(dispatch({type: 'catchAgencyNameChange', agencyNameChosen: event.target.value}))}
                                    
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="phone"
                                label="phone"
                                type="phone"
                                id="phone"
                                
                                value={state.phoneValue}
                                onChange={(event)=>(dispatch({type: 'catchPhoneChange', phoneChosen: event.target.value}))}
                                    
                            />
                            
                            <TextField
                                sx={{width:'100%'}}
                                multiline
                                rows={6}
                                margin="normal"
                                required
                                fullWidth
                                name="biography"
                                label="biography"
                               
                                id="biography"
                                
                                value={state.bioValue}
                                onChange={(event)=>(dispatch({type: 'catchBioChange', bioChosen: event.target.value}))}
                                    
                            />
                            
                                    
                            <Box component='div' sx = {{margin:'0 auto', textAlign: 'center'}}>
                                <Button
                                    fullWidth
                                    component='label'
                                    variant="contained"
                                    sx={{textAlign:'center',mt: 3, mb: 2, width:'30%'}}
                                >
                                    <input type='file' accept="image/png, image/jpeg, image/gif" hidden onChange={(event)=>(dispatch({type: 'catchPictureProfileChange', pictureProfileChosen: event.target.files}))}/>
                                    upload profile image
                                </Button>
                                <Box component='div'>
									{state.profilePicture ? <p>{state.profilePicture.name}</p> : ''}
								</Box>
                            </Box>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Submit
                            </Button>

                        </Box>
                    </Box>

                </Container>
            </ThemeProvider>
           
            </>)
        } else {
            return (<>
            <Typography variant='h4' sx={{textAlign: 'center',}}>{state.userProfile.agencyName}</Typography>
            
                    <Box  sx={{marginLeft: '5rem'}} >
                        <img src={state.userProfile.agencyPicture} style = {{width:'20rem', marginRight:'3rem', marginTop:'1rem'}}/>
                    </Box>
                    <Box  sx={{marginLeft: '5rem'}}>
                        <Typography variant='h4'>Phone:</Typography>
                            <p> {state.userProfile.phone}</p>
                            <Typography variant='h4'>Description:</Typography>
                            <p>{state.userProfile.bio}</p>
                    </Box>
                    <Button variant="contained" onClick={handleClickOpen}>
                            Update
                        </Button>
                        <Dialog open={open} onClose={handleClose} sx={{margin:'0 auto'}}>
                            <ProfileUpdate userProfile={state.userProfile} />
                        </Dialog>
                               
                
            </>)
        }
    }

  return (
    <>
         <Navbar/>
         <div>
            {WelcomeDisplay()}
         </div>
         
    </>
  )
}

export default Profile