import FriendPic from '../assets/imgs/FriendPic.svg'
import playfriend from '../assets/imgs/paly_friend.svg'
import chatfreind from '../assets/imgs/chat_friend.svg'
import AddUser from '../assets/imgs/AddUser.svg'
import removefriend from '../assets/imgs/remove_friend.svg'
import remove_friendBig from '../assets/imgs/remove_friendBig.svg'
import Moudel from '../pages/Profile/Profile_comp/Moudel'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import unblock from '../assets/imgs/unblock.svg'
import panding from '../assets/imgs/panding.svg'
import axios from 'axios'
import Alert from './Alert'
import { useAuth } from './Auth'


function Friend(Data) {
  const [isTrue, setIsTrue] = useState(false)
  const [render, setRender] = useState('')
  const [color, setColor] = useState('grren')

  const handelRender = (str, col = 'green') => {
    setRender(() => {
      return str
    })
    setColor(() => {
      return col
    })
  }

  const handlePlayWithMeClick =  () => {
    axios.post(
      'http://localhost:8800/api/profile/send-palywithme-request/',
      {
        username: Data.username,
      },
      {
        withCredentials: true,
      }
    )
      .then((response) => {
      })
      .catch((err) => {
        // import { useAuth } from '../components/Auth'
        if (err.response?.status === 403) {const auth = useAuth(); auth.RefreshToken()}
        if (err.response?.status === 403) {const auth = useAuth(); auth.RefreshToken()}
      })
    }
    const AcceptRequest = (user, statusOfReq) => {
      if (Data.reason == 'Invetations') {
        axios
        .post('http://localhost:8800/api/profile/handle-friendship-request/', {
          username: user,
          status: statusOfReq,
        })
        .then((respons) => {
          Data.setfriendlist(Data.friendlist.filter(obj => obj.username != user));
        })
        .catch((error) => {
          if (error.response?.status === 403) {const auth = useAuth(); auth.RefreshToken()}
        })
    }
  }

  const SendRequest = (user) => {
    axios
      .post('http://localhost:8800/api/profile/send-friendship-request/', {
        username: user,
      })
      .then((respons) => {
        handelRender(respons.data.message);
        Data.setfriendlist(Data.friendlist.filter(obj => obj.username != user));
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status == 403) {
            handelRender(error.response.data.message, 'red')
            if (error.response?.status === 403) {const auth = useAuth(); auth.RefreshToken()}
          }
        }
      })
  }

  function toggle() {
    setIsTrue(!isTrue)
  }

  const reurtnRef = (render) => {
    let newWord = render
    return newWord
  }

  return (
    <>
      {render && <Alert message={reurtnRef(render)} color={reurtnRef(color)} />}
      <div className="flex items-center shrink overflow-hidden">
        <div className="relative shrink-0 overflow-hidden">
          <img
            className="FriendPic rounded-full m-[5px] w-[45px] h-[45.71px]"
            src={Data.picture ? `http://localhost:8888${Data.picture}` : FriendPic}
            alt=""
          />
          {Data.isFriend && Data.status && (
            <div
              className={`bg-[lime] size-[10px] rounded-full right-[10px] bottom-[8px] absolute`}
            ></div>
          )}
        </div>
        <div className="userNrank flex flex-col shrink overflow-hidden">
          <span className=" text-[20px] px-[7px] font-[400] font-[Outfit] overflow-hidden text-ellipsis whitespace-nowrap">
            {Data.username}
          </span>
          <div className="flex flex-row justify-start pl-[10px]">
            <span className="trendup-icon text-[12px] px-[3px] font-[500] font-[Outfit] opacity-60"></span>
            <span className="text-[12px] px-[3px] font-[500] font-[Outfit] opacity-60">
              {Data.rank}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center shrink-0">
        {Data.reason == 'Friends list' && (
          <>
            <button className="btn-frnds deleteFriend">
              <img
                className="px-[7px]"
                onClick={toggle}
                src={removefriend}
                alt=""
              />
              {isTrue && (
                <Moudel
                  tggl={toggle}
                  friendlist={Data.friendlist}
                  setfriendlist={Data.setfriendlist}
                  username={Data.username}
                  message="Are you sure you want to Block"
                  reason="Block"
                />
              )}
            </button>
            <button className="btn-frnds chatFriend">
              <Link to={'/chat?user=' + Data.username}>
                <img className="px-[7px]" src={chatfreind} alt="" />
              </Link>
            </button>
            <button className="btn-frnds playFriend">
              {/* <Link to={'/PlayWith?user=' + Data.username}> */}
                <img onClick={handlePlayWithMeClick} className="px-[7px]" src={playfriend} alt="" />
              {/* </Link> */}
            </button>
          </>
        )}
        {Data.reason == 'Search' && (
          <>
            <button
              onClick={() => SendRequest(Data.username)}
              className="btn-frnds Addfriend"
            >
              <img className="px-[7px]" src={AddUser} alt="" />
            </button>
            <button className="btn-frnds chatFriend">
              <Link to={'/chat?user=' + Data.username}>
                <img className="px-[7px]" src={chatfreind} alt="" />
              </Link>
            </button>
            <button className="btn-frnds playFriend">
              <img onClick={handlePlayWithMeClick} className="px-[7px]" src={playfriend} alt="" />
            </button>
          </>
        )}
        {Data.reason == 'Blocked Users' && (
          <>
            <button className="btn-frnds Unblock">
              <img className="px-[7px]" onClick={toggle} src={unblock} alt="" />
              {isTrue && (
                <Moudel
                  tggl={toggle}
                  friendlist={Data.friendlist}
                  setfriendlist={Data.setfriendlist}
                  username={Data.username}
                  message="Are you sure you want to UnBlock"
                  reason="Unblock"
                />
              )}
            </button>
          </>
        )}
        {Data.reason == 'Panding Requests' && (
          <>
            <button className="btn-frnds Unblock">
              <img className="px-[7px]" onClick={toggle} src={panding} alt="" />
              {isTrue && (
                <Moudel
                  tggl={toggle}
                  friendlist={Data.friendlist}
                  setfriendlist={Data.setfriendlist}
                  username={Data.username}
                  message="Are you sure you want to Undo"
                  reason="undo"
                />
              )}
            </button>
            <button className="btn-frnds chatFriend">
              <Link to={'/chat?user=' + Data.username}>
                <img className="px-[7px]" src={chatfreind} alt="" />
              </Link>
            </button>
          </>
        )}
        {Data.reason == 'Invetations' && (
          <>
            <button
              onClick={() => AcceptRequest(Data.username, 'rejected')}
              className="btn-frnds deleteFriend"
            >
              <img className="px-[7px]" src={remove_friendBig} alt="" />
            </button>
            <button
              onClick={() => AcceptRequest(Data.username, 'accepted')}
              className="btn-frnds Invite"
            >
              <img className="px-[7px]" src={AddUser} alt="" />
            </button>
            <button className="btn-frnds chatFriend">
              <Link to={'/chat?user=' + Data.username}>
                <img className="px-[7px]" src={chatfreind} alt="" />
              </Link>
            </button>
          </>
        )}
      </div>
    </>
  )
}

export default Friend
