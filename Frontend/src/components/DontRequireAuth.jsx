import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { useEffect, useState } from "react";
import Game from "../pages/Game/Game";
import Loader from "./LoaderOntop";

const DontRequireAuth = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [oneTime, setOneTime] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isGame, setIsGame] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const authIsChecked = async () => {
            await auth.isAuthenticated();
            setLoading(false);
            setOneTime(true);
        }

        if (isMounted && !oneTime) {
            authIsChecked();
        }

        return () => {
            isMounted = false;
        }
    }, [auth, oneTime])
    
    useEffect(() => {
        let isMounted = true;
        if (!loading) {
            if (isMounted) {
                if (!auth.isAuth) {
                    console.log("signinnnnnn")
                    setIsLogin(true);
                }
                else
                    setIsGame(true);
            }
        }
        
        return () => {
            isMounted = false;
        }
    }, [loading, auth, navigate])

    if (isLogin)
        return children;
    else if (isGame)
        return <Game />;
    return <Loader />
}

export default DontRequireAuth