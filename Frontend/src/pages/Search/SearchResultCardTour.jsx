import rankImg from '../../assets/imgs/rank.svg'
import playImg from '../../assets/imgs/paly_friend.svg'
import { useGameSettings } from '../Game/GameSettingsContext'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import RefreshToken from "../../hooks/RefreshToken"
import { useNavigate } from 'react-router-dom'

const SearchResultCard = ({ rank, userImage, userName, bgColor }) => {
  const navigate = useNavigate();
  const gameContext = useGameSettings()
  const [isIconCliced, setIsIconCliced] = useState(false)
   

  const handlePlayWithMeClick = async () => {
    setIsIconCliced(true)
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
      .then((response) => {
      })
      .catch((err) => {
        if (err.response?.status === 403) {
          RefreshToken();
          handlePlayWithMeClick();
        }
        else if (err.response?.status === 401) {
          navigate("/signin", { replace: true })
        }
      })
  }

  useEffect(() => {
    if (isIconCliced) {
      setTimeout(() => {
        setIsIconCliced(false);
      }, 1000)
    }

  }, [isIconCliced])

  return (
    <div className="bg-[#6e6e6e] rounded-lg bg-opacity-30 w-full flex sm:justify-between max-sm:flex-col max-sm:gap-[10px] px-[10px] py-[4px]">
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
