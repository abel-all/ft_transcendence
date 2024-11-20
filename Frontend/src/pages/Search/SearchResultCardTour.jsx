import rankImg from '../../assets/imgs/rank.svg'
import playImg from '../../assets/imgs/paly_friend.svg'
import { useGameSettings } from '../Game/GameSettingsContext'
import Axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../components/Auth'
import Alert from '../../components/Alert'

const SearchResultCard = ({ rank, userImage, userName, bgColor }) => {
  const navigate = useNavigate();
  const gameContext = useGameSettings()
  const [isIconCliced, setIsIconCliced] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(null)
  const auth = useAuth();

  const handlePlayWithMeClick = async () => {
    setIsIconCliced(true)
    setIsSuccess(false)
    await Axios.post(
      'http://localhost:8800/api/profile/notification/join-tournament/',
      {
        username: userName,
        tournament_name: gameContext?.tournamentInfo?.name,
      },
      {
        withCredentials: true,
      }
    )
      .then(() => {
        setIsSuccess(true)
        setIsIconCliced(false)
      })
      .catch(async (err) => {
        setIsIconCliced(false)
        if (err.response?.status === 403) {
          await auth.RefreshToken();
        }
        else if (err.response?.status === 401) {
          navigate("/signin", { replace: true })
        }
        setIsError(err?.response?.data?.message)
      })
  }

  return (
    <div className="bg-[#6e6e6e] rounded-lg bg-opacity-30 w-full flex sm:justify-between max-sm:flex-col max-sm:gap-[10px] px-[10px] py-[4px]">
      {isError && <Alert message={isError} color={"red"}/>}
      {isSuccess && <Alert message={"Your request has been sent successfully"} color={"green"}/>}
      <div className="image-userinfo-container flex gap-[20px] max-sm:flex-col max-sm:items-center">
        <img className="w-[80px] rounded-md " src={userImage} />
        <div className="flex flex-col gap-[6px] sm:justify-center">
          <div className="userName text-[#eee] text-[20px]">{userName}</div>
          <div className="rank-container flex gap-[10px] opacity-50">
            <img src={rankImg} />
            <div className="user-rank text-[#eee]">{rank}</div>
          </div>
        </div>
      </div>
      <div className="link-badge-container flex flex-col max-sm:items-center sm:justify-center sm:items-end gap-[10px]">
        <div
          className={`badge w-[20px] h-[20px] rounded-full ${bgColor}`}
        ></div>
        <div
          onClick={handlePlayWithMeClick}
          className="cursor-pointer icons-link flex gap-[20px]"
        >
          <img
            className={`${isIconCliced ? 'hidden' : ''} duration-500`}
            src={playImg}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchResultCard
