import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoaderOntop from "./LoaderOntop";
import Axios from 'axios'
import RefreshToken from '../hooks/RefreshToken.jsx'

const DontRequireAuth = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        const checkAuth = async () => {
            await Axios.get('http://localhost:8800/api/auth/token/', {
                withCredentials: true,
            })
            .then(() => {
                navigate("/game", { replace: true });
            }).catch((err) => {
                if (err.response?.status === 403) {
                    RefreshToken()
                    navigate("/game", { replace: true });
                }
                console.log(err)
                console.log('Please try again!')
                setIsLoading(false)
            })
        }
        checkAuth()
    }, [navigate]) 

    return isLoading ? <LoaderOntop /> : children
}

export default DontRequireAuth