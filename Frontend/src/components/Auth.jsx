import { createContext, useContext, useState } from 'react'
import Axios from 'axios'
import axios from 'axios'
import GetCookie from '../hooks/GetCookie'
import { useGameSettings } from '../pages/Game/GameSettingsContext'
import RefreshToken from '../hooks/RefreshToken.jsx'

export const Authcontext = createContext(null)

export const ContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [isGame, setIsGame] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const gameContext = useGameSettings()

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

  const isAuthenticated = async () => {
    
    const refrechToken = async () => {
      await Axios.get('http://localhost:8800/api/auth/token/refresh/', {
        withCredentials: true,
      })
        .then(() => {
          setIsAuth(true)
        })
        .catch(() => {
          setIsAuth(false)
        })
    }

    await Axios.get('http://localhost:8800/api/auth/token/', {
      withCredentials: true,
    })
      .then(() => {
        const fetchUserData = async () => {
          await Axios.get('http://localhost:8800/api/profile/data/', {
            withCredentials: true,
          })
            .then((response) => {
              gameContext.setHandler('selfData', response.data)
              const fetchSettings = async () => {
    
                await Axios.get(`http://localhost:8800/api/game/settings/`, {
                  withCredentials: true,
                })
                  .then((response) => {
                    gameContext.setHandler('gameSettings', response?.data[0])
                  })
                  .catch((err) => {
                    if (err.response?.status === 403)
                      RefreshToken()
                    else if (err.response?.status === 401)
                      setIsAuth(false)
                  })
              }
              fetchSettings()
            })
            .catch((err) => {
              if (err.response?.status === 403)
                RefreshToken()
              else if (err.response?.status === 401)
                setIsAuth(false)
              setIsAuth(false)
            })
        }
        fetchUserData()
        setIsAuth(true)
        return 
      })
      .catch((err) => {
        if (err.response?.status === undefined) setIsAuth(false)
        if (err.response?.status === 403) {
          refrechToken()
        } else {
          setIsAuth(false)
        }
      })
  }

  const setShowNotificationHandler = () => {
    setShowNotification(!showNotification)
  }

  return (
    <Authcontext.Provider
      value={{
        setShowNotificationHandler,
        setShowNotification,
        showNotification,
        isAuthenticated,
        setHandler,
        isAuth,
        isGame,
        isLogin,
      }}
    >
      {children}
    </Authcontext.Provider>
  )
}

export const useAuth = () => {
  return useContext(Authcontext)
}
