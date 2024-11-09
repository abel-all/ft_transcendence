import rankImg from '../../assets/imgs/rank.svg'
import playImg from '../../assets/imgs/paly_friend.svg'
import addUserImg from '../../assets/imgs/AddUser.svg'
import chatImg from '../../assets/imgs/chat_friend.svg'
import { Axios } from 'axios'
import { useEffect, useState } from 'react'
import RefreshToken from "../../hooks/RefreshToken"
import { useNavigate } from 'react-router-dom'

const SearchResultCard = ({ rank, userImage, userName, bgColor }) => {
  
  const [isPlayIconCliced, setIsPlayIconCliced] = useState(false)
  const [isChatIconCliced, setIsChatIconCliced] = useState(false)
  const [isAddIconCliced, setIsAddIconCliced] = useState(false)
  const navigate = useNavigate();

  const handlePlayWithMeClick = async () => {
    console.log(userName)
    setIsPlayIconCliced(true)
    await Axios.post(
      'http://localhost:8800/api/profile/send-palywithme-request/',
      {
        username: userName,
      },
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        console.log('data of friends is ', response?.data)
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          RefreshToken();
          handlePlayWithMeClick();
        }
        console.log(err)
      })
  }

  const handleAddUserClick = () => {
    Axios.post('http://localhost:8800/api/profile/send-friendship-request/', {
      username: userName,
    },
    {
      withCredentials: true,
    })
        .then((response) => {
          console.log('send friend request successfuly ', response?.data)
        })
        .catch((err) => {
          if (err.response?.status === 401) {
            RefreshToken();
            handleAddUserClick();
          }
          console.log(err);
        })
  }

  const handleChatClick = () => {
    navigate(`/chat?user=${userName}`)
  }

  useEffect(() => {
    if (isPlayIconCliced) {
      setTimeout(() => {
        setIsPlayIconCliced(false);
      }, 1000)
    }

  }, [isPlayIconCliced])

  useEffect(() => {
    if (isAddIconCliced) {
      setTimeout(() => {
        setIsAddIconCliced(false);
      }, 1000)
    }

  }, [isAddIconCliced])

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
