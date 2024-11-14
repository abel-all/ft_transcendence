import { useEffect, useState } from "react"
import LoaderOntop from "../../components/LoaderOntop.jsx";
import Header from "../../components/Header.jsx"
import BottomNaveBar from "../../components/BottomNavBar.jsx"
import { useGameSettings } from './GameSettingsContext'
import GamePlayOnline from "./GamePlayOnline.jsx"
import { mapColorConverter, paddleAndBallColorConverter } from "../../hooks/badgeConverter.jsx";


const PlayOnline = () => {

    const [isLoaded, setIsLoaded] = useState(true);
    const gameContext = useGameSettings();
    const [settings, setSettings] = useState({
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
            mapColor:  mapColorConverter(gameContext.gameSettings.mapname),
            ballColor: paddleAndBallColorConverter(gameContext.gameSettings.ballcolor),
        })
    }, [gameContext.gameSettings])

    if (isLoaded)
        return <LoaderOntop />

    return (
            <div className="h-screen container mx-auto px-[10px]">
                <Header title="Online Game" activeSection="GametableIcon" />
                <GamePlayOnline 
                    mapColor={settings.mapColor}
                    ballColor={settings.ballColor}
                />
                <BottomNaveBar activeSection="GametableIcon" />
            </div>
        )
}

export default PlayOnline
