import { createContext, useContext, useState } from "react";
import Axios from 'axios'

export const Authcontext = createContext(null);

export const ContextProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(false);

    const isAuthenticated = () => {
        Axios.get("https://www.fttran.tech/api/token/", {
            withCredentials:true
        })
        .then(() => {
            console.log("first request");
            setIsAuth(true);
        })
        .catch((err) => {
            if (err.response?.status === undefined)
                setIsAuth(false);
            if (err.response?.status == 401) {
                Axios.get("https://www.fttran.tech/api/token/refresh/", {
                    withCredentials:true
                })
                .then(() => {
                    console.log("second request");
                    setIsAuth(true);
                }).catch(err => {
                    console.log(err);
                    setIsAuth(false);
                })
            }
            else {
                setIsAuth(false);
            }
        })
    }

    return (
        <Authcontext.Provider value={ { isAuthenticated, isAuth } }>
            {children}
        </Authcontext.Provider>
    )
};

export const useAuth = () => {
    return useContext(Authcontext);
};
