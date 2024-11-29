import { createContext, useContext, useState } from 'react'
import Axios from 'axios'
import axios from 'axios'
import GetCookie from '../hooks/GetCookie'
import { useNavigate } from "react-router-dom"

export const Authcontext = createContext(null)

export const ContextProvider = ({ children }) => {
  const [isGame, setIsGame] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [showNotificationMobile, setShowNotificationMobile] = useState(false)
  const navigate = useNavigate();

  axios.defaults.headers.common['X-CSRFToken'] = GetCookie('csrftoken')

  const setHandler = (key, value) => {
    switch (key) {
      case 'game':
        setIsGame(value)
        break
      case 'login':
        setIsLogin(value)
        break
    }
  }

  const RefreshToken = async () => {
    await Axios.get('http://localhost:8800/api/auth/token/refresh/', {
        withCredentials: true,
      })
      .then(() => {
        navigate("/profile", { replace: true });
      })
      .catch(() => {
        navigate("/signin", { replace: true })
      })
  }

  const setShowNotificationHandler = () => {
    setShowNotification(!showNotification)
  }
  const setShowNotificationMobileHandler = () => {
    setShowNotificationMobile(!showNotificationMobile)
  }

  return (
    <Authcontext.Provider
      value={{
        setShowNotificationHandler,
        setShowNotificationMobile,
        setShowNotificationMobileHandler,
        setShowNotification,
        showNotification,
        showNotificationMobile,
        setHandler,
        isGame,
        isLogin,
        RefreshToken
      }}
    >
      {children}
    </Authcontext.Provider>
  )
}

export const useAuth = () => {
  return useContext(Authcontext)
}
