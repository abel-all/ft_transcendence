import Header from "../../components/Header.jsx"
import BottomNaveBar from "../../components/BottomNavBar.jsx"
import CardContainer from "./CardContainer.jsx";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader.jsx";


function Game() {

    const [isloaded, setIsloaded] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsloaded(false)
        }, 3000);
    }, [])

    return (
        <>
        {isloaded ? <Loader /> : <div></div>}
        <div className="container mx-auto px-[10px]">
            <Header title="Game" activeSection="GametableIcon" />
            <CardContainer/>
            <BottomNaveBar activeSection="GametableIcon" />
        </div>
        </>
    )
}


export default Game;
