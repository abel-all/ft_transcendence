import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoaderOntop from "./LoaderOntop";
import Axios from 'axios'
import { useAuth } from '../components/Auth'

const DontRequireAuth = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const auth = useAuth();
    
    useEffect(() => {
        const checkAuth = async () => {
            await Axios.get('http://localhost:8800/api/auth/token/', {
                withCredentials: true,
            })
            .then(() => {
                navigate("/profile", { replace: true });
            }).catch((err) => {
                if (err.response?.status === 403) {
                    auth.RefreshToken()
                    navigate("/profile", { replace: true });
                }
                setIsLoading(false)
            })
        }
        checkAuth()
    }, [navigate]) 

    return isLoading ? <LoaderOntop /> : children
}

export default DontRequireAuth