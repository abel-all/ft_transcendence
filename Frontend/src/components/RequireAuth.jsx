import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const RequireAuth = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const authIsChecked = async () => {
            if (isMounted) {
                await auth.isAuthenticated();
                setLoading(false);
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
                if (!auth.isAuth)
                    navigate("/signin", {replace: true})
            }
        }
    
        return () => {
            isMounted = false;
        }
    })
    
    if (loading)
        return <Loader />
    return children;
}

export default RequireAuth