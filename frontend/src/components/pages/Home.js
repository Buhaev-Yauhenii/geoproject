import React, { useState } from "react";
import { Link } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
// MUI imports
import { Button, Typography, Grid, AppBar, Toolbar,Box } from "@mui/material";

//components
import Navbar from '../elements/Navbar';
import Header from '../elements/Header';
import BestOffers from '../elements/BestOffers';
import Footer from '../elements/Footer';




function Home(){
    return(
        <>

            <Navbar/>
            <Header/>
            <BestOffers/>
            <Footer/>
        </>
    )
}

export default Home;