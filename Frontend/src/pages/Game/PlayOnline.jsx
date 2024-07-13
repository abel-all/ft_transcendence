import MatchMaking from "./MatchMaking.jsx";
import GameSettings from "./GameSettings.jsx";
import { useEffect, useState } from "react"
import LoaderOntop from "../../components/LoaderOntop.jsx";
import Header from "../../components/Header.jsx"
import BottomNaveBar from "../../components/BottomNavBar.jsx"
import { useGameSettings } from './GameSettingsContext'
import GamePlay from "./GamePlay.jsx"


const PlayOnline = () => {
    
    const [isLoaded, setIsLoaded] = useState(true);
    const [matchDelay, setMatchDelay] = useState(true);
    const [gameDelay, setGameDelay] = useState(true);
    const gameContext = useGameSettings();
    
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(false)
        }, 500);
        
    }, [])
    
    useEffect(() => {
        if (!isLoaded)
            setTimeout(() => {
                setMatchDelay(false);
                setGameDelay(false)
            }, 7000);
    }, [isLoaded])

    if (isLoaded)
        return <LoaderOntop />


    return (
            <div className="h-[100vh] container mx-auto px-[10px]">
                <Header title="Online Game" activeSection="GametableIcon" />
                {/* {matchDelay && <MatchMaking />}
                {!gameDelay && !gameContext.isGame && <GameSettings />} */}
                {/* {gameContext.isGame && <GamePlay />} */}
                {true && <GamePlay />}
                <BottomNaveBar activeSection="GametableIcon" />
            </div>
        )
}

export default PlayOnline
