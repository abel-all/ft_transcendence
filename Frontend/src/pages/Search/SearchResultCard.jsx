import rankImg from '../../assets/imgs/rank.svg'
import playImg from '../../assets/imgs/paly_friend.svg'
import addUserImg from '../../assets/imgs/AddUser.svg'
import chatImg from '../../assets/imgs/chat_friend.svg'
import Axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../components/Auth'
import Alert from '../../components/Alert'

const SearchResultCard = ({ rank, userImage, userName, bgColor }) => {
  
  const [isPlayIconCliced, setIsPlayIconCliced] = useState(false)
  const [isAddIconCliced, setIsAddIconCliced] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(null)
  const navigate = useNavigate();
  const auth = useAuth();

  const handlePlayWithMeClick = async () => {
    setIsPlayIconCliced(true)
    setIsSuccess(false)
    await Axios.post(
      'http://localhost:8800/api/profile/send-palywithme-request/',
      {
        username: userName,
      },
      {
        withCredentials: true,
      }
    )
    .then(() => {
      setIsSuccess(true)
      setIsPlayIconCliced(false)
    })
    .catch(async (err) => {
      setIsPlayIconCliced(false)
      if (err.response?.status === 403) {
        await auth.RefreshToken();
      }
      else if (err.response?.status === 401) {
        navigate("/signin", { replace: true })
      }
      setIsError(err?.response?.data?.message)
    })
  }

  const handleAddUserClick = () => {
    setIsSuccess(false)
    setIsAddIconCliced(true)
    Axios.post('http://localhost:8800/api/profile/send-friendship-request/', {
      username: userName,
    },
    {
      withCredentials: true,
    })
    .then(() => {
      setIsSuccess(true)
      setIsAddIconCliced(false)
    })
    .catch(async (err) => {
      setIsAddIconCliced(false)
      if (err.response?.status === 403) {
        await auth.RefreshToken();
      }
      else if (err.response?.status === 401) {
        navigate("/signin", { replace: true })
      }
      setIsError(err?.response?.data?.message)
    })
  }

  const handleChatClick = () => {
    navigate(`/chat?user=${userName}`)
  }

  const handleUserImgClick = () => {
    navigate(`/profile?username=${userName}`)
  }

  return (
    <div className="bg-[#6e6e6e] rounded-lg bg-opacity-30 w-full flex sm:justify-between max-sm:flex-col max-sm:gap-[10px] px-[10px] py-[4px]">
      {isError && <Alert message={isError} color={"red"}/>}
      {isSuccess && <Alert message={"Your request has been sent successfully"} color={"green"}/>}
      <div className="image-userinfo-container flex gap-[20px] max-sm:flex-col max-sm:items-center">
        <img onClick={handleUserImgClick} className="w-[80px] rounded-md hover:grayscale cursor-pointer" src={userImage} />
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
          className="icons-link flex gap-[20px]"
        >
          <img
            onClick={handlePlayWithMeClick}
            className={`${
              isPlayIconCliced ? 'hidden' : ''
            } duration-500 cursor-pointer`}
            src={playImg}
          />
          <img onClick={handleAddUserClick} className={`${
              isAddIconCliced ? 'hidden' : ''
            } duration-500 cursor-pointer`}
            src={addUserImg} />
          <img onClick={handleChatClick} className={`cursor-pointer`}
            src={chatImg} />
        </div>
      </div>
    </div>
  )
}

export default SearchResultCard
