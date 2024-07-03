import Header from "../../components/Header.jsx"
import BottomNaveBar from "../../components/BottomNavBar.jsx"
import CardContainer from "./CardContainer.jsx";
import { useEffect, useState } from "react";
import LoaderOntop from "../../components/LoaderOntop.jsx";


function Game() {

    const [isLoaded, setIsLoaded] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(false)
        }, 500);
    }, [])

    if (isLoaded)
        return <LoaderOntop />

    return (
        <div className="container mx-auto px-[10px]">
            <Header title="Game" activeSection="GametableIcon" />
            <CardContainer/>
            <BottomNaveBar activeSection="GametableIcon" />
        </div>
    )
}


export default Game;
