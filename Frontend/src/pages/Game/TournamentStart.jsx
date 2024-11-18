import TournamentGamePlay from './TournamentGamePlay'
import { useEffect, useState } from 'react'
import LoaderOntop from '../../components/LoaderOntop.jsx'
import Header from '../../components/Header.jsx'
import BottomNaveBar from '../../components/BottomNavBar.jsx'
import { mapColorConverter, paddleAndBallColorConverter } from "../../hooks/badgeConverter.jsx";
import { useGameSettings } from './GameSettingsContext'

const TournamentStart = () => {
    const [isLoaded, setIsLoaded] = useState(true)
    const gameContext = useGameSettings()
    const [settings, setSettings] = useState({
        mapColor:  mapColorConverter(gameContext.gameSettings.mapname),
        ballColor: paddleAndBallColorConverter(gameContext.gameSettings.ballcolor),
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
        setIsLoaded(false)
        }, 500)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [])

    useEffect(() => {
        setSettings({
            mapColor:  mapColorConverter(gameContext.gameSettings.mapname),
            ballColor: paddleAndBallColorConverter(gameContext.gameSettings.ballcolor),
        })
    }, [gameContext.gameSettings])

    return (
        <>
            {isLoaded ? (
                <LoaderOntop />
            ) : (
                <div className="container mx-auto px-[10px]">
                    <Header title="Tournament" activeSection="GametableIcon" />
                    <TournamentGamePlay mapColor={settings.mapColor} ballColor={settings.ballColor} />
                    <BottomNaveBar activeSection="GametableIcon" />
                </div>
            )}
        </>
    )
}

export default TournamentStart