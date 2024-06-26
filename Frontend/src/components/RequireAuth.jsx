import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";

const RequireAuth = ({ children }) => {
    const auth = useAuth();

    if (!auth.isAuthenticated()) {
        return <Navigate to="/signin" />
    }
    return children;
}

export default RequireAuth