import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const DontRequireAuth = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const authIsChecked = async () => {
            await auth.isAuthenticated();
            setLoading(false);
        };
        authIsChecked();
    }, [auth])

    useEffect(() => {
        if (!loading) {
            if (auth.isAuth)
            navigate("/game", {replace: true})
        }

    })
    if (loading)
        return <Loader />
    return children;
}

export default DontRequireAuth