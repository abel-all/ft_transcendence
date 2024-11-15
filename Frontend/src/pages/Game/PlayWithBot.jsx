import { useEffect, useState } from "react"
import LoaderOntop from "../../components/LoaderOntop.jsx";
import Header from "../../components/Header.jsx"
import BottomNaveBar from "../../components/BottomNavBar.jsx"
import { useGameSettings } from './GameSettingsContext'
import HowToPlay from "./HowToPlay.jsx";
import GamePlay from "./GamePlay.jsx"
import { scoreConverter, mapColorConverter, paddleAndBallColorConverter } from "../../hooks/badgeConverter.jsx";


const PlayWithBot = () => {

    const [isLoaded, setIsLoaded] = useState(true);
    const gameContext = useGameSettings();
    const [settings, setSettings] = useState({
            levelOfBot: gameContext.gameSettings.botlevel,
            score: scoreConverter(gameContext.gameSettings.score),
            mapColor:  mapColorConverter(gameContext.gameSettings.mapname),
            ballColor: paddleAndBallColorConverter(gameContext.gameSettings.ballcolor),
    });

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(false)
        }, 500);
    }, [])

    useEffect(() => {
        setSettings({
            levelOfBot: gameContext.gameSettings.botlevel,
            score: scoreConverter(gameContext.gameSettings.score),
            mapColor:  mapColorConverter(gameContext.gameSettings.mapname),
            ballColor: paddleAndBallColorConverter(gameContext.gameSettings.ballcolor),
        })
    }, [gameContext.gameSettings])

    if (isLoaded)
        return <LoaderOntop />


    return (
            <div className="h-[100vh] container mx-auto px-[10px]">
                <Header title="Bot Game" activeSection="GametableIcon" />
                {gameContext.isHowToPlay && <HowToPlay />}
                {true && !gameContext.isHowToPlay && <GamePlay
                    levelOfBot={settings.levelOfBot}
                    score={settings.score}
                    mapColor={settings.mapColor}
                    ballColor={settings.ballColor}
                />}
                <BottomNaveBar activeSection="GametableIcon" />
            </div>
        )
}

export default PlayWithBot
