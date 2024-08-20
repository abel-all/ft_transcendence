
import User from "../../../assets/imgs/userprofile.svg"
import Userlist from "./Userlist"
import inboxIcon from "../../../assets/imgs/inbox.svg"
import InboxUsers from "./InboxUsers"
import { Link } from "react-router-dom"
import chatUsers from "../../../assets/ChatUsers.json"
import {chatHeaderOnClick} from '../Chat'
import {useContext, useState, useEffect} from 'react'




function BoxInboxUsers({lastMessage}) {

    const ChatHeader = useContext(chatHeaderOnClick);
    const [UserList, setUserList] = useState([]);

    useEffect(() => {
        setUserList(chatUsers);
    }, []);


    if (lastMessage) {
        let i = 0;
        while (i < UserList.length) {
            if (UserList[i].nickname == JSON.parse(lastMessage.data).user) {
                UserList[i].lastMessage = JSON.parse(lastMessage.data).message;
                UserList[i].unreadMessages++;
                console.log(UserList.lastMessage);
            }
            i++;
        }
    }


    return (
        <>
            <div className="inboxField mt-[10px] ">
                <div className="inboxHolder flex flex-row pb-[15px] border-b-[1px] border-white border-opacity-40">
                    <img className="opacity-80" src={inboxIcon} alt="" />
                    <span className="ml-[20px] text-white text-[20px] font-[400] font-[Outfit]"> Inbox </span>
                </div>
                <div className="HolderOfusersChat h-[calc(100vh-240px)] overflow-y-scroll">
                    {
                        UserList.map( (users, index) => {
                            return (
                                <div className="cursor-pointer" key={index} onClick={() => ChatHeader.handelChatHeader(users.nickname, 623, users.userProfile)}>
                                    <InboxUsers
                                        nickname = {users.nickname}  
                                        socketid = {users.socketid}  
                                        total_messages = {users.total_messages}  
                                        userProfile = {users.userProfile}        
                                        lastMessage = {users.lastMessage}  
                                        unreadMessages = {users.unreadMessages}  
                                        lastMessageTime = {users.lastMessageTime}  
                                        isActive = {users.isActive}  
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}


export default BoxInboxUsers