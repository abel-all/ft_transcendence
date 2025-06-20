import { useEffect, useRef, useState } from 'react'
import Spiner from '../pages/Game/Spiner'
import Axios from 'axios'
import '../assets/icons/css/index.css'
import { useNavigate } from 'react-router-dom'
import friendReq from "../assets/imgs/friendReq.svg"
import friendship from "../assets/imgs/friendship.svg"
import tournReminder from "../assets/imgs/tournReminder.svg"
import joinMatch from "../assets/imgs/joinMatch.svg"
import notiJoinTourn from "../assets/imgs/notiJoinTourn.svg"
import { useAuth } from '../components/Auth'
import Alert from './Alert'

const Notification = ({state}) => {
  const notification = useAuth();
  const targetRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(true)
  const [isZeroNotification, setIsZeroNotification] = useState(false)
  const [isBottomCounter, setIsBottomCounter] = useState(0)
  const [notiData, setNotiData] = useState([])
  const [isError, setIsError] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      await Axios.post(
        'http://localhost:8800/api/profile/notifications/',
        {
          start: 10 * isBottomCounter,
        },
        {
          withCredentials: true,
        }
      )
        .then((response) => {
          response?.data.length === 0 && isBottomCounter === 0
            ? setIsZeroNotification(true)
            : setNotiData((prev) => [...prev, ...response.data])
          setIsLoaded(false)
        })
        .catch((err) => {
          if (err.response?.status === 403) {
            notification.RefreshToken();
          }
          else if (err.response?.status === 401) {
            navigate("/signin", { replace: true })
          }
          setIsError(err?.response?.data?.message)
        })
      }
    fetchUserData();
  }, [isBottomCounter])

    
    useEffect(() => {
      const currentRef = targetRef.current
      
      let isFetching = false
      let setCounter
      
      const handleScroll = () => {
        if (currentRef && !isFetching) {
          const { scrollTop, scrollHeight, clientHeight } = currentRef
          if (scrollTop + clientHeight >= scrollHeight) {
            isFetching = true
            setIsLoaded(true)
            setCounter = setTimeout(async () => {
              setIsBottomCounter((prev) => prev + 1)
              isFetching = false
            }, 2000)
          }
        }
      }
      
      
      if (currentRef) currentRef.addEventListener('scroll', handleScroll)
        
        return () => {
          if (currentRef) currentRef.removeEventListener('scroll', handleScroll)
            clearTimeout(setCounter)
        }
      }, [])

      const handleClick = (e) => {
    switch (e.currentTarget.dataset.id) {
      case "PLAYWITHME_REQUEST":
        notification.setShowNotification(false);
        notification.setShowNotificationMobile(false);
        navigate(`/game/online?param=${e.currentTarget.dataset.id1}`);
        break;
        case "JOINING_TOURNAMENT":
          notification.setShowNotification(false);
          notification.setShowNotificationMobile(false);
          navigate(`/game/tournament?param=${e.currentTarget.dataset.id2.split(" ")[2]}`);
          break;
          default:
            break;
          }
        }
        const handleImg = (notificationType) => {
    switch (notificationType) {
      case "FRIENDSHIP_REQUEST":
        return friendReq
        case "HANDLE_REQUESTED_FRIENDSHIP":
          return friendship
          case "PLAYWITHME_REQUEST":
            return joinMatch
            case "JOINING_TOURNAMENT":
              return notiJoinTourn
              case "TOURNAMENT_REMINDER":
        return tournReminder
      }
    }
    
    return (
      <div
      ref={targetRef}
      className="flex flex-col items-center flex-nowrap gap-[10px] max-md:pb-[100px] p-[10px] max-md:pr-[25px] w-[400px] h-[600px] max-md:w-[calc(100vw-15px)] max-md:h-[100vh] overflow-y-scroll scrollbar-w bg-[#393e42] absolute max-md:fixed right-[5px] top-[53px] max-md:top-0 max-md:right-0 max-md:left-0 md:rounded-[15px] md:rounded-tr-[0]"
      >
      {isError && <Alert message={isError} color={"red"}/>}
      {isZeroNotification ? (
        <div className="text-[#fff6f9] text-[20px] flex flex-col justify-center h-full">
          No Notifications
        </div>
      ) : (
        notiData.map(({ content, notification_type, from_user }, index) => (
          <div
          key={index}
          data-id={notification_type}
          data-id1={from_user}
          data-id2={content}
          className={`flex-shrink-0 max-md:w-full w-full mx-3 h-[70px] bg-[#878787] rounded-[10px] flex justify-between items-center px-3 ${(notification_type === "PLAYWITHME_REQUEST" || notification_type === "JOINING_TOURNAMENT") ? "cursor-pointer": ""}`}
          onClick={handleClick}
          >
            <div className=''>{content}</div>
            <img className="w-8 h-8" src={handleImg(notification_type)} alt="notification image" />
          </div>
        ))
      )}
      {isLoaded && <Spiner />}
    </div>
  )
}

export default Notification
