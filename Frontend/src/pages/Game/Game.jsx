import Header from '../../components/Header.jsx'
import BottomNaveBar from '../../components/BottomNavBar.jsx'
import CardContainer from './CardContainer.jsx'
import { useEffect, useState } from 'react'
import LoaderOntop from '../../components/LoaderOntop.jsx'
import Axios from 'axios'
import { useGameSettings } from './GameSettingsContext'

function Game() {
  const [isLoaded, setIsLoaded] = useState(true)
  const gameContext = useGameSettings()

  useEffect(() => {
    const fetchSettings = async () => {
      const userId = gameContext.selfData.id

      await Axios.get(`https://www.fttran.tech/api/game/settings/${userId}/`, {
        withCredentials: true,
      })
        .then((response) => {
          console.log('settings is : ', response.data)
        })
        .catch((err) => {
          console.log(err)
          console.log('Please try again!')
        })
    }
    if (gameContext.selfData.id) fetchSettings()
    setIsLoaded(false)
  }, [gameContext.selfData.id])

  return (
    <>
      {isLoaded ? (
        <LoaderOntop />
      ) : (
        <div className="container mx-auto px-[10px]">
          <Header title="Game" activeSection="GametableIcon" />
          {/* <CardContainer showSettings={gameContext.selfData.issetting}/> */}
          <CardContainer showSettings={true} />
          <BottomNaveBar activeSection="GametableIcon" />
        </div>
      )}
    </>
  )
}

export default Game
