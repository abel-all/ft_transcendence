import { createContext, useContext, useState } from "react";
import Axios from 'axios'

export const Authcontext = createContext(null);

export const ContextProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(null);

    const isAuthenticated = async () => {
        await Axios.get("https://www.fttran.tech/api/token/", {
            withCredentials:true
        })
        .then(async response => {
            console.log(response);
            setIsAuth(true);
        })
        .catch(async (err) => {
            if (err.response.status == 401) {
                await Axios.get("https://www.fttran.tech/api/token/refresh/", {
                    withCredentials:true
                })
                .then(response => {
                    console.log(response);
                    setIsAuth(true);
                }).catch(err => {
                    setIsAuth(false);
                    console.log(err);
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
