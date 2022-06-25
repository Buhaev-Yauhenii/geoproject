import React, { useState } from "react";
import Navbar from '../elements/Navbar';
import MapSet from "../Listing/components/MapSet";
import Footer from '../elements/Footer';


function Listings(){
    return(
        <>

            <Navbar/>
            <MapSet/>
            <Footer/>
        </>
    )
}

export default Listings;