import Header from "../../components/Header.jsx"
import BottomNaveBar from "../../components/BottomNavBar.jsx"
import CardContainer from "./CardContainer.jsx";
import { useEffect, useState } from "react";
import LoaderOntop from "../../components/LoaderOntop.jsx";


function Game() {

    const [isloaded, setIsloaded] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsloaded(false)
        }, 500);
    }, [])

    return (
        <>
            {isloaded ? <LoaderOntop /> : <div></div>}
            <div className="container mx-auto px-[10px]">
                <Header title="Game" activeSection="GametableIcon" />
                <CardContainer/>
                <BottomNaveBar activeSection="GametableIcon" />
            </div>
        </>
    )
}


export default Game;
