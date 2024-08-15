import { createContext, useContext, useState } from "react";
import Axios from 'axios'
import axios from 'axios';
import GetCookie from "../hooks/GetCookie"

export const Authcontext = createContext(null);

export const ContextProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(false);
    const [isGame, setIsGame] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    axios.defaults.headers.common['X-CSRFToken'] = GetCookie("csrftoken");

    const setHandler = (key, value) => {

        switch (key) {
            case "game":
                setIsGame(value);
                break;
            case "login":
                setIsLogin(value);
                break;
        }
    }

    const isAuthenticated = async () => {
        await Axios.get("https://fttran.tech/api/auth/token/", {
            withCredentials:true
        })
        .then(() => {
            console.log("first request");
            setIsAuth(true);
        })
        .catch((err) => {
            if (err.response?.status === undefined)
                setIsAuth(false);
            if (err.response?.status == 403) {
                const refrechToken = async () => {
                    await Axios.get("https://fttran.tech/api/auth/token/refresh/", {
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
                refrechToken();
            }
            else {
                setIsAuth(false);
            }
        })
    }

    const setShowNotificationHandler = () => {
        console.log("hellololol")
        setShowNotification(!showNotification);
    }

    return (
        <Authcontext.Provider value={ { setShowNotificationHandler, setShowNotification, showNotification, isAuthenticated, setHandler, isAuth, isGame, isLogin } }>
            {children}
        </Authcontext.Provider>
    )
};

export const useAuth = () => {
    return useContext(Authcontext);
};
