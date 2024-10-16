import Header from '../../components/Header.jsx'
import BottomNaveBar from '../../components/BottomNavBar.jsx'
import { useGameSettings } from './GameSettingsContext'
import { useNavigate } from 'react-router-dom'

const OnlineGameMiddleware = () => {
  const navigate = useNavigate()
  const gameContext = useGameSettings()

  const handleInvitationClick = () => {
    gameContext.setHandler('isRandomGame', false)
    navigate('/game/play/online')
  }
  const handleRandomClick = () => {
    gameContext.setHandler('isRandomGame', true)
    navigate('/game/play/online')
  }

  return (
    <div className="container mx-auto px-[10px]">
      <Header title="Game" activeSection="GametableIcon" />
      <div className="sm:mt-[360px] max-sm:scale-75 mt-[200px] w-full flex flex-col gap-y-4 text-[#fff6f9] items-center">
        <div className="text-2xl font-light pb-6">Play with</div>
        <button
          className="text-3xl font-light p-[20px] w-full max-w-[200px] bg-[#322c69] rounded-[15px] hover:scale-110 duration-500"
          onClick={handleInvitationClick}
        >
          invitations people
        </button>
        <div className="text-xl">Or</div>
        <button
          className="text-3xl font-light p-[20px] w-full max-w-[200px] text-[#242424] bg-[#f8f3f7] rounded-[15px] hover:scale-110 duration-500"
          onClick={handleRandomClick}
        >
          random people
        </button>
      </div>
      <BottomNaveBar activeSection="GametableIcon" />
    </div>
  )
}

export default OnlineGameMiddleware
