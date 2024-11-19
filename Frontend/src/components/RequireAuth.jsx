import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoaderOntop from "./LoaderOntop";
import { useGameSettings } from '../pages/Game/GameSettingsContext'
import Axios from 'axios'
import { useAuth } from './Auth'


const RequireAuth = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const gameContext = useGameSettings()
    const auth = useAuth();

    useEffect(() => {
        const checkAuthAndFetchUserData = async () => {
            await Axios.get('http://localhost:8800/api/profile/data/', { withCredentials: true })
            .then((response) => {
                gameContext.setHandler('selfData', response.data)
                gameContext.setAuth(true)
                const fetchSettings = async () => {
                    await Axios.get(`http://localhost:8800/api/game/settings/`, {
                        withCredentials: true,
                    }).then((response) => {
                        gameContext.setHandler('gameSettings', response.data[0] || response.data)
                    })
                    .catch((err) => {
                        if (err.response?.status === 403) {
                            auth.RefreshToken()
                            fetchSettings()
                        }
                        else if (err.response?.status === 401)
                            navigate("/signin", { replace: true });
                    })
                }
                fetchSettings()
                setIsLoading(false)
            }).catch((err) => {
                if (err.response?.status === 403) {
                    auth.RefreshToken()
                    checkAuthAndFetchUserData()
                }
                else if (err.response?.status === 401)
                    navigate("/signin", { replace: true });
                setIsLoading(false)
            })
        }
        checkAuthAndFetchUserData()
    }, [navigate])

    return isLoading ? <LoaderOntop /> : children
}

export default RequireAuth
