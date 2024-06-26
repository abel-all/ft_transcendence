import SetCookie from '../hooks/SetCookie'
import GetCookie from '../hooks/GetCookie'
import RemoveCookie from '../hooks/RemoveCookie'
import { createContext, useContext } from "react";

// function isAuthenticated() {
//     return (!!GetCookie('jwt_token'))
// }

// function login(token) {
//     SetCookie('jwt_token', token)
// }

// function logout() {
//     RemoveCookie('jwt_token')
// }

// export { isAuthenticated, login, logout }

export const Authcontext = createContext(null);

export const ContextProvider = ({ children }) => {
    
    const isAuthenticated = () => {
        return (!!GetCookie('jwt_token'))
    }

    const login = (user) => {
        SetCookie('jwt_token', user)
    }

    const logout = () => {
        RemoveCookie('jwt_token')
    }

    return (
        <Authcontext.Provider value={ {isAuthenticated, login, logout} }>
            {children}
        </Authcontext.Provider>
    )
};

export const useAuth = () => {
    return useContext(Authcontext);
};