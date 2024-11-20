import Header from '../../components/Header.jsx'
import BottomNaveBar from '../../components/BottomNavBar.jsx'
import { useGameSettings } from './GameSettingsContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import LoaderOntop from '../../components/LoaderOntop.jsx'
import onlinegameone from "../../assets/imgs/onlinegameone.svg"
import onlinegametwo from "../../assets/imgs/onlinegametwo.svg"

const OnlineGameMiddleware = () => {
  const navigate = useNavigate()
  const gameContext = useGameSettings()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsLoading(false)
    }, 300)

    return () => {
      clearTimeout(timeOut)
    }
  }, [])

  const handleInvitationClick = () => {
    gameContext.setHandler('isRandomGame', false)
    navigate('/game/online')
  }
  const handleRandomClick = () => {
    gameContext.setHandler('isRandomGame', true)
    navigate('/game/online')
  }

  return (
    <>
    {isLoading ? <LoaderOntop /> :
      <div className="container mx-auto px-[10px]">
        <Header title="Game" activeSection="GametableIcon" />
        <div className="sm:mt-[360px] max-sm:scale-75 mt-[200px] w-full flex flex-col gap-y-4 text-[#fff6f9] items-center">
          <div className="text-2xl font-light pb-6">Play with</div>
          <button
            className="text-3xl font-light p-[20px] w-full max-w-[400px] text-[#242424] bg-[#80DEEA] rounded-[15px] hover:scale-105 duration-500 flex justify-between"
            onClick={handleInvitationClick}
          >
            <div>Invited Player</div>
            <img className="h-10 w-h-10" src={onlinegameone} alt="" />
          </button>
          <div className="text-xl">Or</div>
          <button
            className="text-3xl font-light p-[20px] w-full max-w-[400px] text-[#242424] bg-[#FFCC80] rounded-[15px] hover:scale-105 duration-500 flex justify-between"
            onClick={handleRandomClick}
          >
            <div>A Random Player</div>
            <img className="h-10 w-h-10" src={onlinegametwo} alt="" />
          </button>
        </div>
        <BottomNaveBar activeSection="GametableIcon" />
      </div>
    }
    </>
  )
}

export default OnlineGameMiddleware
