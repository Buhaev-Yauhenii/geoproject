import React, {useEffect, useState, useReducer, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Navbar from '../elements/Navbar';
import Footer from '../elements/Footer';
import Axios from 'axios';
import {useImmerReducer} from 'use-immer';
import DispatchContext from '../../Context/DispatchContext';
import stateContext from '../../Context/StateContext';


const theme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
    const Globaldispatch = useContext(DispatchContext)
    const GlobalState = useContext(stateContext)
    
    const initialState = { 
        usernameValue:'',
        emailValue:'', 
        passwordValue:'', 
        rePasswordValue:'', 
        sendRequest:0
    }


    
    
    function ReducerFuction(draft, action) {
        switch (action.type) {
            case 'catchUsernameChange':
                draft.usernameValue = action.usernameChosen;
                break;
            case 'catchEmailChange':
                draft.emailValue = action.emailChosen;
                break;
            case 'catchPasswordChange':
                draft.passwordValue = action.passwordChosen;
                break;
            case 'catchRePasswordChange':
                draft.rePasswordValue = action.rePasswordChosen;
                break;
            case 'changeSetRequest':
                draft.sendRequest = draft.sendRequest + 1;
                break;
            default: break;
        }
    }
    const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);
    const handleSubmit = (event) => {
        event.preventDefault();
    
        dispatch({type: 'changeSetRequest'})
        console.log('success');
    };

    useEffect(() => {
		if (state.sendRequest){
            const source = Axios.CancelToken.source();
		async function reg() {
			try {
				const response = await Axios.post('http://127.0.0.1:8000/api-auth-djoser/users/', {
                    username: state.usernameValue,
                    email: state.emailValue,
                    password: state.passwordValue,
                    re_password:state.rePasswordValue
                },{ cancelToken: source.token }
				);
                dispatch({type: 'catchToken', tokenValue: response.data.auth_token})
                Globaldispatch({type: 'catchToken', tokenValue: response.data.auth_token})
                
			} catch (error) {}
		}
		reg();
        navigate('/')
		return () => {
			source.cancel();
		};
	}
        }, [state.sendRequest]);

   

    return (
        <>
            <Navbar/>
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
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="username"
                                        required
                                        fullWidth
                                        id="username"
                                        label="username"
                                        autoFocus
                                        value={state.usernameValue}
                                        onChange={(event)=>(dispatch({type: 'catchUsernameChange', usernameChosen: event.target.value}))}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        value={state.emailValue}
                                        onChange={(event)=>(dispatch({type: 'catchEmailChange', emailChosen: event.target.value}))}
                                        
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        value={state.passwordValue}
                                        onChange={(event)=>(dispatch({type: 'catchPasswordChange', passwordChosen: event.target.value}))}
                                        
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password2"
                                        label="Confirm Password"
                                        variant="outlined"
                                        type="password"
                                        id="password2"
                                        value={state.rePasswordValue}
                                        onChange={(event)=>(dispatch({type: 'catchRePasswordChange', rePasswordChosen: event.target.value}))}
                                        
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign Up
                            </Button>
                            {GlobalState.globalMessage}
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/SignIn" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
            <Footer/>
        </>
    );
}