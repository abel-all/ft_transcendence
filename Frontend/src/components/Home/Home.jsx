import "./Home.css"
import Navbar from './home_components/Navbar.jsx';
import MiniNavbar from './home_components/MiniNavbar.jsx';
import HomeContent from './home_components/HomeContent.jsx';
import React, { useState, useEffect } from 'react';
import Footer from "./home_components/Footer.jsx";

function Home() {

    const [ww, setww] = useState(window.innerWidth);

    function handleResize() {
        setww(window.innerWidth);
        console.log(ww);
    }

    function widthCal() {
        if (ww > 654)
        {
            return (
                <>
                    <Navbar></Navbar>
                    <HomeContent></HomeContent>
                </>
            )

        }
        return (
            <>
                <MiniNavbar></MiniNavbar>
                <HomeContent></HomeContent>
                <Footer></Footer>
            </>
        )
    }


    return (
        <div className="Home mx-[15%] max-OurSize:mx-[0%] h-full">
            {window.addEventListener('resize', handleResize)}
            {widthCal()}
        </div>
    )
}

export default Home;