import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";

const DontRequireAuth = ({ children }) => {
    const auth = useAuth();

    if (auth.isAuthenticated()) {
        return <Navigate to="/profile" />
    }
    return children;
}

export default DontRequireAuth