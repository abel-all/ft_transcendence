import { createContext, useContext, useEffect, useState } from "react";
import Axios from 'axios'

export const Authcontext = createContext(null);

export const ContextProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(null);

    const isAuthenticated = async () => {
        // try {
        await Axios.get("https://fakestoreapi.com/products/1")
        .then(response => {
            console.log(response);
            if (response.status == 200 || response.status == 304) {
                setIsAuth(true);
            }
            else {
                setIsAuth(false);
            }
        })
        .catch(err => {
            console.log(err);
            setIsAuth(false);
        })
        // if (response.status === 200)
        //     setIsAuth(true);
        // else if (response.status === 401) {
        //     const refreshTokenResponse = await Axios.post("http://10.13.100.192:8000/api/token/refresh/");
        //     if (refreshTokenResponse.status === 200)
        //         setIsAuth(true);
        //     else
        //         setIsAuth(false);
        // }
        // else
        //     setIsAuth(false);
        // } catch (err) {
        //         console.log("abdessamad")
        //         setIsAuth(false);
        // }
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
