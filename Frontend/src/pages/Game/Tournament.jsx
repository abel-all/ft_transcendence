import { useEffect, useState } from "react"
import LoaderOntop from "../../components/LoaderOntop.jsx";
import Header from "../../components/Header.jsx"
import BottomNaveBar from "../../components/BottomNavBar.jsx"
import { useGameSettings } from './GameSettingsContext'
import CreateTournament from "./CreateTournament.jsx";
import TournamentStart from "./TournamentStart.jsx";




const Tournament = () => {

    const [isLoaded, setIsLoaded] = useState(true);
    const gameContext = useGameSettings();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsLoaded(false)
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        }

    }, [])

    return (
        <>
            {isLoaded ? <LoaderOntop /> :
                <div className="container mx-auto px-[10px]">
                    <Header title="Tournament" activeSection="GametableIcon" />
                    {!gameContext.isTournament ? <CreateTournament /> : <TournamentStart />}
                    <BottomNaveBar activeSection="GametableIcon" />
                </div>
            }
        </>
        )
}

export default Tournament
