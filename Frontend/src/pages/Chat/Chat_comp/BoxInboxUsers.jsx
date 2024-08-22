
import User from "../../../assets/imgs/userprofile.svg"
import Userlist from "./Userlist"
import inboxIcon from "../../../assets/imgs/inbox.svg"
import InboxUsers from "./InboxUsers"
import { Link } from "react-router-dom"
import chatUsers from "../../../assets/ChatUsers.json"
import {chatHeaderOnClick} from '../Chat'
import {useContext, useState, useEffect} from 'react'




function BoxInboxUsers({lastMessage, VoidedUsername}) {

    const ChatHeader = useContext(chatHeaderOnClick);
    const [UserList, setUserList] = useState(chatUsers);
    const [Sorted, setSorted] = useState([]);
    
    useEffect(() => {
        if (lastMessage) {
            setUserList(prevUserList => {
                const updatedUserList = prevUserList.map(user => {
                    if (user.nickname === JSON.parse(lastMessage.data).user) {
                        return {
                            ...user,
                            lastMessage: JSON.parse(lastMessage.data).message,
                            total_messages: (VoidedUsername == user.nickname) ? 0 : user.total_messages + 1,
                            lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                            MessageUpdatedAt: new Date().toISOString()
                        };
                    }
                    return user;
                });
                const sortedList = [...updatedUserList].sort((First, Second) => {return new Date(Second.MessageUpdatedAt) - new Date(First.MessageUpdatedAt);});
                setSorted(sortedList);
                return updatedUserList;
            });
        }
    }, [lastMessage]);
    
    useEffect(() => {
        if (VoidedUsername) {
            setUserList(prevUserList => {
                const updatedUserList = prevUserList.map(user => {
                    if (user.nickname == VoidedUsername) {
                    return {
                        ...user,
                        total_messages: 0
                    };
                }
                return user;
                })
                const sortedList = [...updatedUserList].sort((First, Second) => {return new Date(Second.MessageUpdatedAt) - new Date(First.MessageUpdatedAt);});
                setSorted(sortedList);
                return updatedUserList;
            });
        }
    }, [VoidedUsername]);

    return (
        <>
            <div className="inboxField mt-[10px] ">
                <div className="inboxHolder flex flex-row pb-[15px] border-b-[1px] border-white border-opacity-40">
                    <img className="opacity-80" src={inboxIcon} alt="" />
                    <span className="ml-[20px] text-white text-[20px] font-[400] font-[Outfit]"> Inbox </span>
                </div>
                <div className="HolderOfusersChat h-[calc(100vh-240px)] overflow-y-scroll">
                    {
                        Sorted.map((users, index) => {
                            return (
                                <div className="cursor-pointer" key={index} onClick={() => ChatHeader.handelChatHeader(users.nickname, 623, users.userProfile)}>
                                    <InboxUsers
                                        nickname={users.nickname}  
                                        socketid={users.socketid}  
                                        total_messages={users.total_messages}  
                                        userProfile={users.userProfile}        
                                        lastMessage={users.lastMessage}  
                                        unreadMessages={users.unreadMessages}  
                                        lastMessageTime={users.lastMessageTime}  
                                        isActive={users.isActive}  
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </>
    )
}


export default BoxInboxUsers