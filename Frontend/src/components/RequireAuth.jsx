import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { useEffect, useState } from "react";
import SignIn from "../pages/Login/SignIn";
import Loader from "./Loader";

const RequireAuth = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [oneTime, setOneTime] = useState(false);
    const [isGame, setIsGame] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const authIsChecked = async () => {
                await auth.isAuthenticated();
                setLoading(false);
                setOneTime(true);
        };
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
                if (auth.isAuth) {
                    console.log("gameeeeeees")
                    setIsGame(true)
                }
                else
                    setIsLogin(true)
            }
        }
    
        return () => {
            isMounted = false;
        }
    }, [loading, auth, navigate])
    
    if (isGame)
        return children;
    else if (isLogin)
        return <SignIn />;
    return <Loader />
}

export default RequireAuth