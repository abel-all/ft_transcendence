import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoaderOntop from "./LoaderOntop";
import { useGameSettings } from '../pages/Game/GameSettingsContext'
import Axios from 'axios'
import RefreshToken from '../hooks/RefreshToken.jsx'


const RequireAuth = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const gameContext = useGameSettings()

    useEffect(() => {
        const checkAuthAndFetchUserData = async () => {
            await Axios.get('http://localhost:8800/api/profile/data/', { withCredentials: true })
            .then((response) => {
                console.log('data of user : ', response.data)
                gameContext.setHandler('selfData', response.data)
                const fetchSettings = async () => {
                    await Axios.get(`http://localhost:8800/api/game/settings/`, {
                        withCredentials: true,
                    }).then((response) => {
                        console.log('settings is : ', response)
                        gameContext.setHandler('gameSettings', response.data[0] || response.data)
                    })
                    .catch((err) => {
                        if (err.response?.status === 403) {
                            RefreshToken()
                            fetchSettings()
                        }
                        else if (err.response?.status === 401)
                            navigate("/signin", { replace: true });
                        console.log(err)
                        console.log('Please try again!')
                    })
                }
                fetchSettings()
                setIsLoading(false)
            }).catch((err) => {
                if (err.response?.status === 403) {
                    RefreshToken()
                    checkAuthAndFetchUserData()
                }
                else if (err.response?.status === 401)
                    navigate("/signin", { replace: true });
                console.log(err)
                console.log('Please try again!')
                setIsLoading(false)
            })
        }
        checkAuthAndFetchUserData()
    }, [navigate])

    return isLoading ? <LoaderOntop /> : children
}

export default RequireAuth
