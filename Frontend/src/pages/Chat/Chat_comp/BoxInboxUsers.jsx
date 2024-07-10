
import User from "../../../assets/imgs/userprofile.svg"
import Userlist from "./Userlist"
import inboxIcon from "../../../assets/imgs/inbox.svg"
import InboxUsers from "./InboxUsers"
import { Link } from "react-router-dom"
import chatUsers from "../../../assets/ChatUsers.json"
import {chatHeaderOnClick} from '../Chat'
import {useContext} from 'react'




function BoxInboxUsers() {

    const ChatHeader = useContext(chatHeaderOnClick);

    return (
        <>
            <div className="OnlineFriends my-[15px]">
                <div className="FriendHeader flex flex-row">
                    <img className="w-[25px] h-[25px] " src={User} alt=""/>
                    <span className="ml-[7px] text-[white] font-[400] text-[20px] font-[Outfit]">Online Friends</span>
                    <div className="grow"></div>
                    <div className=" text-[#00CEFF] underline">All</div>
                </div>
            </div>
            <div className="OnlineList flex flex-row flex-wrap h-[58px] overflow-hidden">
                <Userlist/>
            </div>
            <div className="inboxField mt-[10px] ">
                <div className="inboxHolder flex flex-row pb-[15px] border-b-[1px] border-white border-opacity-40">
                    <img className="opacity-80" src={inboxIcon} alt="" />
                    <span className="ml-[20px] text-white text-[20px] font-[400] font-[Outfit]"> Inbox </span>
                </div>
                <div className="HolderOfusersChat h-[calc(100vh-361px)] overflow-y-scroll">
                    {
                        chatUsers.map( (users, index) => {
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