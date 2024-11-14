import MatchMaking from "./MatchMaking.jsx";
import GameSettings from "./GameSettings.jsx";
import { useEffect, useState } from "react"
import LoaderOntop from "../../components/LoaderOntop.jsx";
import Header from "../../components/Header.jsx"
import BottomNaveBar from "../../components/BottomNavBar.jsx"
import { useGameSettings } from './GameSettingsContext'
import GamePlayOnline from "./GamePlayOnline.jsx"


const PlayOnline = () => {

    const [isLoaded, setIsLoaded] = useState(true);
    const [gameDelay, setGameDelay] = useState(true);
    const gameContext = useGameSettings();

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(false)
        }, 500);
    }, [])

    useEffect(() => {
        if (!gameContext.matchDelay)
            setTimeout(() => {
                setGameDelay(false)
            }, 6000);
    }, [gameContext.matchDelay])

    if (isLoaded)
        return <LoaderOntop />

    return (
            <div className="h-[100vh] container mx-auto px-[10px]">
                <Header title="Online Game" activeSection="GametableIcon" />
                {/* {(gameContext.matchDelay || gameDelay) && <MatchMaking />} */}
                {/* {!gameContext.selfData.isSettings && <GameSettings isOnlineGame={true}/>}
                {(gameContext.isGame || gameContext.selfData.isSettings) && <GamePlayOnline />} */}
                <GamePlayOnline />
                <BottomNaveBar activeSection="GametableIcon" />
            </div>
        )
}

export default PlayOnline
