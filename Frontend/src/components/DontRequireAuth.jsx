import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const DontRequireAuth = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const authIsChecked = async () => {
            if (isMounted) {
                setLoading(false);
                await auth.isAuthenticated();
            }
        };
        authIsChecked();

        return () => {
            isMounted = false;
        }
    }, [auth])
    
    useEffect(() => {
        let isMounted = true;
        if (!loading) {
            if (isMounted) {
                if (auth.isAuth) {
                    console.log("gameeeeeees")
                    navigate("/game", {replace: true})
                }
            }
        }
        
        return () => {
            isMounted = false;
        }
    }, [loading, auth, navigate])

    if (loading)
        return <Loader />
    return children;
}

export default DontRequireAuth