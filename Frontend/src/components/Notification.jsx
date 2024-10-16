import { useEffect, useRef, useState } from 'react'
import Spiner from '../pages/Game/Spiner'
import Axios from 'axios'
import '../assets/icons/css/index.css'

// let onetime = false;

const Notification = () => {
  const targetRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isZeroNotification, setIsZeroNotification] = useState(false)
  const [isBottomCounter, setIsBottomCounter] = useState(0)
  const [notiData, setNotiData] = useState([])

  useEffect(() => {
    const fetchUserData = async () => {
      await Axios.post(
        'https://fttran.tech/api/profile/notifications/',
        {
          start: 10 * isBottomCounter,
        },
        {
          withCredentials: true,
        }
      )
        .then((response) => {
          console.log('noti data is v1 : ', response?.data)
          response?.data.length === 0
            ? setIsZeroNotification(true)
            : setNotiData((prev) => [...prev, ...response.data])
          setIsLoaded(false)
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err)
          console.log('Please try again!')
        })
      // setTimeout(() => {
      //     setNotiData(prev => [...prev, isBottomCounter, isBottomCounter, isBottomCounter, isBottomCounter, isBottomCounter, isBottomCounter, isBottomCounter, isBottomCounter, isBottomCounter, isBottomCounter]);
      //     setIsLoading(false);
      // }, 2000);
    }
    // if (!onetime)
    fetchUserData()
    // return () => { onetime =false }
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
          setCounter = setTimeout(() => {
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

  return (
    <div
      ref={targetRef}
      className="flex flex-col items-center flex-nowrap gap-[10px] max-md:pb-[100px] p-[10px] max-md:pr-[25px] w-[300px] h-[450px] max-md:w-[100vw] max-md:h-[100vh] overflow-y-scroll scrollbar-w bg-[#393e42] absolute max-md:fixed right-[5px] top-[53px] max-md:top-0 max-md:right-0 max-md:left-0 md:rounded-[15px] md:rounded-tr-[0]"
    >
      {isLoading && <Spiner height="h-full" />}
      {isZeroNotification ? (
        <div className="text-[#fff6f9] text-[20px] flex flex-col justify-center  h-full">
          No Notifications
        </div>
      ) : (
        notiData.map(({ content, from_user, created_at, isrouted }, index) => (
          <div
            key={index}
            className="flex-shrink-0 max-md:w-full w-[280px] h-[60px] bg-[#DA5644] rounded-[10px]"
          >
            {content + '--' + from_user + '--' + created_at + '--' + isrouted}
          </div>
        ))
      )}

      {isLoaded && <Spiner />}
    </div>
  )
}

export default Notification
