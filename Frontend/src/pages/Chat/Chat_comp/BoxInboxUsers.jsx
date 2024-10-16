import User from '../../../assets/imgs/userprofile.svg'
import Userlist from './Userlist'
import inboxIcon from '../../../assets/imgs/inbox.svg'
import InboxUsers from './InboxUsers'
import { Link } from 'react-router-dom'
import chatUsers from '../../../assets/ChatUsers.json'
import { chatHeaderOnClick } from '../Chat'
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'

function BoxInboxUsers({ lastMessage, VoidedUsername, lMUS }) {
  const ChatHeader = useContext(chatHeaderOnClick)
  const [UserList, setUserList] = useState([])
  const [Sorted, setSorted] = useState([])

  useEffect(() => {
    const times = setTimeout(() => {
      axios.get('https://fttran.tech/api/chat/chats/').then((res) => {
        setUserList(res.data)
        setSorted(res.data)
      })
      clearTimeout(times)
    }, 300)
  }, [])

  useEffect(() => {
    if (lastMessage) {
      setUserList((prevUserList) => {
        const updatedUserList = prevUserList.map((user) => {
          if (user.username === JSON.parse(lastMessage.data).from) {
            return {
              ...user,
              last_message_content: JSON.parse(lastMessage.data).message
                ? JSON.parse(lastMessage.data).message
                : lMUS
                ? `you: ${lMUS}`
                : '',
              unread_messages:
                VoidedUsername == user.username ? 0 : user.unread_messages + 1,
              last_message_time_diff: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              }),
              last_message_time: new Date().toISOString(),
            }
          }
          return user
        })
        const sortedList = [...updatedUserList].sort((First, Second) => {
          return (
            new Date(Second.last_message_time) -
            new Date(First.last_message_time)
          )
        })
        setSorted(sortedList)
        return updatedUserList
      })
    }
  }, [lastMessage])

  useEffect(() => {
    if (VoidedUsername) {
      setUserList((prevUserList) => {
        const updatedUserList = prevUserList.map((user) => {
          if (user.username == VoidedUsername) {
            return {
              ...user,
              total_messages: 0,
            }
          }
          return user
        })
        const sortedList = [...updatedUserList].sort((First, Second) => {
          return (
            new Date(Second.last_message_time) -
            new Date(First.last_message_time)
          )
        })
        setSorted(sortedList)
        return updatedUserList
      })
    }
  }, [VoidedUsername])

  return (
    <>
      <div className="inboxField mt-[10px] ">
        <div className="inboxHolder flex flex-row pb-[15px] border-b-[1px] border-white border-opacity-40">
          <img className="opacity-80" src={inboxIcon} alt="" />
          <span className="ml-[20px] text-white text-[20px] font-[400] font-[Outfit]">
            {' '}
            Inbox{' '}
          </span>
        </div>
        <div className="HolderOfusersChat h-[calc(100vh-240px)] overflow-y-scroll">
          {Sorted.map((users, index) => {
            return (
              <div
                className="cursor-pointer"
                key={index}
                onClick={() =>
                  ChatHeader.handelChatHeader(
                    users.username,
                    users.rank,
                    users.picture
                  )
                }
              >
                <InboxUsers
                  nickname={users.username}
                  total_messages={users.unread_messages}
                  userProfile={users.picture}
                  lastMessage={users.last_message_content}
                  lastMessageTime={new Date(
                    users.last_message_time
                  ).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                  isActive={users.is_online}
                />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default BoxInboxUsers
