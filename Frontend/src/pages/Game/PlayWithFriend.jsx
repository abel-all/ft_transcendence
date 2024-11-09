import GameSettings from "./GameSettings.jsx";
import { useEffect, useState } from "react"
import LoaderOntop from "../../components/LoaderOntop.jsx";
import Header from "../../components/Header.jsx"
import BottomNaveBar from "../../components/BottomNavBar.jsx"
import { useGameSettings } from './GameSettingsContext'
import GamePlay from "./GamePlay.jsx"
import { scoreConverter, mapColorConverter, paddleAndBallColorConverter } from "../../hooks/badgeConverter.jsx";


const PlayWithFriend = () => {

    const [isLoaded, setIsLoaded] = useState(true);
    const gameContext = useGameSettings();

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(false)
        }, 500);

    }, [])

    if (isLoaded)
        return <LoaderOntop />


    return (
            <div className="h-[100vh] container mx-auto px-[10px]">
                <Header title="Bot Game" activeSection="GametableIcon" />
                {true && <GamePlay 
                    levelOfBot={0}
                    score={scoreConverter(gameContext.gameSettings.score)}
                    mapColor={mapColorConverter(gameContext.gameSettings.mapname)}
                    ballColor={paddleAndBallColorConverter(gameContext.gameSettings.ballcolor)}
                />}
                <BottomNaveBar activeSection="GametableIcon" />
            </div>
        )
}

export default PlayWithFriend
