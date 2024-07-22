import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const RequireAuth = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [oneTime, setOneTime] = useState(false);
    // const [isGame, setIsGame] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const authIsChecked = async () => {
                await auth.isAuthenticated();
                if (isMounted) {
                    setLoading(false);
                    setOneTime(true);
                }
        };
        if (isMounted && !oneTime && !auth.isGame) {
            authIsChecked();
        }
        
        return () => {
            isMounted = false;
        }
    }, [auth, oneTime])
    
    useEffect(() => {
        if (!loading && !auth.isAuth) {
            navigate("/signin", { replace: true });
        }

    }, [loading, auth.isAuth, navigate])
    
    if (loading && !auth.isGame) {
        return <Loader />
    }

    return children;
}

export default RequireAuth