import { createContext, useContext, useState } from "react";
import Axios from 'axios'

export const Authcontext = createContext(null);

export const ContextProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(null);

    const isAuthenticated = async () => {
        // try {
        await Axios.post("http://10.13.100.55:8090/api/token/")
        .then(async response => {
            console.log(response);
            if (response.status == 200 || response.status == 304) {
                setIsAuth(true);
            }
            else if (response.status == 401) {
                await Axios.post("http://10.13.100.55:8090/api/token/refresh/")
                .then(response => {
                    console.log(response);
                    if (response.status == 200) {
                        setIsAuth(true);
                    }
                    else
                        setIsAuth(false);
                }).catch(err => {
                    console.log(err);
                    setIsAuth(false);
                })
            }
            else {
                setIsAuth(false);
            }
        })
        .catch(err => {
            console.log("this err : ");
            console.log(err.response.status);
            console.log(err);
            // if (err.response.status == 400) {
            //     setIsAuth(true);
            // }
            // else
            setIsAuth(false);
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
