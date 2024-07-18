import { createContext, useContext, useEffect, useState } from "react";
import Axios from 'axios'

export const Authcontext = createContext(null);

export const ContextProvider = ({ children }) => {

    let isAuth = false;
    
    const isAuthenticated = () => {
        Axios.get("https://www.fttran.tech/api/token/", {
            withCredentials:true
        })
        .then(response => {
            console.log(response);
            isAuth = true;
        })
        .catch((err) => {
            if (err.response.status == 401) {
                Axios.get("https://www.fttran.tech/api/token/refresh/", {
                    withCredentials:true
                })
                .then(response => {
                    console.log(response);
                    isAuth = true;
                }).catch(err => {
                    isAuth = false;
                    console.log(err);
                })
            }
            else {
                isAuth = false;
            }
        })
        console.log("isauth : ", isAuth);
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
