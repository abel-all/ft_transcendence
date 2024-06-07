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
    }

    function widthCal() {
        if (ww > 640)
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
        <div className="Home mx-[15%] FullSize:w-[1280px] max-LapSize:mx-[10%] FullSize:m-auto max-TabSize:mx-[0%] h-full">
            {window.addEventListener('resize', handleResize)}
            {widthCal()}
        </div>
    )
}

export default Home;