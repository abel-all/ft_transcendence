import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { useEffect, useState } from "react";
import LoaderOntop from "./LoaderOntop";
// import { useGameSettings } from "../pages/Game/GameSettingsContext"


const RequireAuth = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [oneTime, setOneTime] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    // const gameContext = useGameSettings();

    useEffect(() => {
        console.log("RequireAuth is calling : ", oneTime)
        const authIsChecked = async () => {
                await auth.isAuthenticated();
                    setLoading(false);
                    // setOneTime(true);
        };
        if (!auth.isGame) {
            authIsChecked();
        }
    }, [oneTime])

    useEffect(() => {
        setOneTime(!oneTime);
    }, [location]);

    useEffect(() => {
        if (!loading && !auth.isAuth) {
            navigate("/signin", { replace: true });
        }

    }, [loading, auth.isAuth, navigate])

    if (loading && !auth.isGame) {
        return <LoaderOntop />
    }

    return children;
}

export default RequireAuth
