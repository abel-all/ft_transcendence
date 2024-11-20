import { useState } from 'react';
import dots from "../../../assets/imgs/chat/dot-vertical.svg"
import video from "../../../assets/imgs/chat/video-on.svg"
import chevron from "../../../assets/imgs/chat/chevron-left.svg"
import play from "../../../assets/imgs/gametable.svg"
import { Link } from "react-router-dom"
import testUser from '../../../assets/users/user (9).png'
import UserProfileBlock from './UserProfileBlock';
import { useContext, useEffect } from "react"
import {chatHeaderOnClick} from '../Chat'
import axios from 'axios';


function ChatHeader() {
    const [display, setDisplay] = useState(false);
    const ChatContext = useContext(chatHeaderOnClick);

    function handelDisplay(){
        setDisplay(!display);
    }

    const handlePlayWithMeClick =  () => {
        axios.post(
          'http://localhost:8800/api/profile/send-palywithme-request/',
          {
            username: !ChatContext.chatHeader.clicked ? ChatContext.userFromUrl.user : ChatContext.chatHeader.name,
          },
          {
            withCredentials: true,
          }
        )
          .then((response) => {
          })
          .catch((err) => {
            console.error(err);
          })
    }
    
    return (
        <div className="ChatHeader flex flex-row items-center border-b-[1px] py-[10px] border-[#626262] bg-[#161c20]">
            <div className="flex md:hidden cursor-pointer" onClick={() => {ChatContext.handelChatShown(true)}}> <img src={chevron} alt=""/></div>
            <img className=" w-[40px] h-[40px] rounded-full"
                src={
                    (ChatContext.userFromUrl.url && !ChatContext.chatHeader.clicked)
                    ? (ChatContext.userFromUrl.url ? ChatContext.userFromUrl.url : testUser)
                    : (ChatContext.chatHeader.userProfile ? ChatContext.chatHeader.userProfile : testUser)}
                alt=""
            />
            <div className="UserHolder flex basis-3/12 mx-[10px] flex-col pt-[5px]">
                <span className="UserUserName text-white font-[500] font-[Outfit] text-[14px]"> {ChatContext.userFromUrl.user && !ChatContext.chatHeader.clicked ? ChatContext.userFromUrl.user : ChatContext.chatHeader.name} </span>
                <div className="rankHolder flex flex-row">
                    <span className="trendup-icon"></span>
                    <span className="text-white opacity-60 font-[500] font-[Outfit] text-[12px]">{ChatContext.userFromUrl.rank && !ChatContext.chatHeader.clicked ? ChatContext.userFromUrl.rank : ChatContext.chatHeader.rank}</span>
                </div>
            </div>
            <div className="Spaces grow"></div>
            <div className='' onClick={handlePlayWithMeClick}><img className=" w-[30px] mr-[7px] h-[30px] opacity-60 cursor-pointer" src={play} alt="" /></div>
            <div className=" cursor-pointer">
                <img onClick={handelDisplay} className=" w-[30px] opacity-60 mr-[7px] h-[30px]" src={dots} alt=""/>
                {display && <UserProfileBlock username={!ChatContext.chatHeader.clicked ? ChatContext.userFromUrl.user : ChatContext.chatHeader.name} dplay={display} dhand={handelDisplay}/>}
            </div>
        </div>
    )
}

export default ChatHeader 