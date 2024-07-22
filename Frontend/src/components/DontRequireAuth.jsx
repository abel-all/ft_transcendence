import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { useEffect, useState } from "react";
import Loader from "./LoaderOntop";

const DontRequireAuth = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [oneTime, setOneTime] = useState(false);
    // const [isLogin, setIsLogin] = useState(false);
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
        }

        if (isMounted && !oneTime && !auth.isLogin) {
            authIsChecked();
        }

        return () => {
            isMounted = false;
        }
    }, [auth, oneTime])
    
    useEffect(() => {
        if (!loading && auth.isAuth) {
            navigate("/game", { replace: true });
            // if (isMounted) {
            //     if (!auth.isAuth) {
            //         console.log("signinnnnnn")
            //         setIsLogin(true);
            //     }
            //     else {
            //         // auth.setHandler("game", true);
            //     }
            // }
        }
        
    }, [loading, auth.isAuth, navigate]) 

    if (loading && !auth.isLogin)
        return <Loader />
        
    return children;
}

export default DontRequireAuth