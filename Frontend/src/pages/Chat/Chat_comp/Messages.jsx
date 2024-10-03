import { useContext, useEffect, useRef, useState } from 'react'
import { sendMessageContext } from './ChatSide'
import GetChatFromDataBase from '../../../components/GetChatFromDataBase'
import StoreMessages from '../../../components/StoreMessages'
import axios from 'axios'

function Messages({ setMessages, username, className, toUser }) {
  console.log('Chat with : ', username)

  const messageContext = useContext(sendMessageContext)
  const { messages, messagesAdded, messagesRef } =
    useContext(sendMessageContext)
  const [isLoading, setIsLoading] = useState(false)
  const [Oldest, setOldest] = useState([])
  const [Scroll, setScroll] = useState(0)
  const [LoadingMessage, setLoadingMessage] = useState('')
  // const [WhoAmI, setWhoAmI] = useState("hisoka");

  const Arr = ['Alice', 'Charlie', 'Dora', 'Elmo', 'Fiona', 'George']
  const index = useRef(0)

  useEffect(() => {
    messageContext.goToButtom('auto')
  }, [messagesAdded])

  // useEffect(() => {
  //     async function fetchUsername() {
  //         await axios.get('https://www.fttran.tech/api/WhoAmI/')
  //         .then(res => {
  //             console.log("Done fetching Data of username");
  //             setWhoAmI(res.data.username);
  //         })
  //         .catch (error => {
  //             console.log("Getting username error !");
  //         });
  //     }
  //     fetchUsername();
  // }, []);

  useEffect(() => {
    const handleScroll = async () => {
      if (messagesRef.current.scrollTop === 0 && index.current < Arr.length) {
        setIsLoading(true)
        setLoadingMessage('Messages are loading....')

        const oldScrollHeight = messagesRef.current.scrollHeight

        try {
          const res = await axios.get(
            `https://www.fttran.tech/messages/${Arr[index.current]}`,
            { withCredentials: true }
          )
          index.current++
          const newMessages = Array.isArray(res.data.messages)
            ? res.data.messages
            : []

          setOldest((prevStat) => [...newMessages, ...prevStat])

          setTimeout(() => {
            const newScrollHeight = messagesRef.current.scrollHeight
            messagesRef.current.scrollTop = newScrollHeight - oldScrollHeight
            setIsLoading(false)
            console.log(
              Arr[index.current],
              ' fetched and scroll went to ',
              newScrollHeight - oldScrollHeight,
              newScrollHeight,
              oldScrollHeight
            )
          }, 0)
        } catch (error) {
          console.log('Error fetching messages:', error)
          setIsLoading(false)
        }
      }
    }

    handleScroll()
  }, [Scroll])

  return (
    <div
      ref={messagesRef}
      onScroll={() => {
        setScroll(messagesRef.current.scrollTop)
      }}
      className={'' + className ? className : ''}
    >
      <>
        {isLoading && (
          <div
            className={`Loading text-center text-white text-[20px] p-[17px] `}
          >
            {' '}
            {LoadingMessage}{' '}
          </div>
        )}
        {Array.isArray(Oldest) &&
          Oldest.map((chatMessages, index) => {
            return (
              <GetChatFromDataBase
                WhoAmI={toUser}
                username={username}
                chatMessages={chatMessages}
                key={index}
              />
            )
          })}
        {Array.isArray(messages.messages) &&
          messages.messages.map((chatMessages, index) => {
            return (
              <GetChatFromDataBase
                WhoAmI={toUser}
                username={username}
                chatMessages={chatMessages}
                key={index}
              />
            )
          })}
        {Array.isArray(messagesAdded) &&
          messagesAdded.map((chatMessages, index) => {
            return (
              <StoreMessages
                WhoAmI={toUser}
                username={username}
                chatMessages={chatMessages}
                key={index}
              />
            )
          })}
      </>
    </div>
  )
}

export default Messages
