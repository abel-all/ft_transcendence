import { useState } from 'react';
import dots from "../../../assets/imgs/chat/dot-vertical.svg"
import video from "../../../assets/imgs/chat/video-on.svg"
import chevron from "../../../assets/imgs/chat/chevron-left.svg"
import play from "../../../assets/imgs/gametable.svg"
import { Link } from "react-router-dom"
import testUser from '../../../assets/users/user (9).png'
import UserProfileBlock from './UserProfileBlock';
import chatUsers from "../../../assets/ChatUsers.json"
import { useContext } from "react"
import {chatHeaderOnClick} from '../Chat'

function ChatHeader() {

    const [display, setDisplay] = useState(false);
    const ChatContext = useContext(chatHeaderOnClick);


    let From = false;
    let FromUser;
    let UsrProfile = null;

    function handelDisplay(){
        setDisplay(!display);
    }

    function SetFrom() {
        let windo = window.location.href;
        if (windo.lastIndexOf("user=") != -1) {
            FromUser = windo.substring(windo.lastIndexOf("user=") + 5);
            chatUsers.map( users => {
               if (users.nickname == FromUser) {
                    UsrProfile = users.userProfile;
                    From = true;
               }
            })
        }
    }

    return (
        <div className="ChatHeader flex flex-row items-center border-b-[1px] py-[10px] border-[#626262] bg-[#161c20]">
            {SetFrom()}
            <Link className="flex md:hidden" to="/chat"> <img src={chevron} alt=""/></Link>
            <img className=" w-[40px] h-[40px] rounded-full" src={ChatContext.chatHeader.userProfile} alt=""/>
            <div className="UserHolder flex basis-3/12 mx-[10px] flex-col pt-[5px]">
                <span className="UserUserName text-white font-[500] font-[Outfit] text-[14px]"> {FromUser ? FromUser : ChatContext.chatHeader.name} </span>
                <div className="rankHolder flex flex-row">
                    <span className="trendup-icon"></span>
                    <span className="text-white opacity-60 font-[500] font-[Outfit] text-[12px]">{ChatContext.chatHeader.rank}</span>
                </div>
            </div>
            <div className="Spaces grow"></div>
            <img className=" w-[30px] mr-[7px] h-[30px] opacity-60 cursor-pointer" src={play} alt="" />
            <img className=" w-[30px] mr-[7px] h-[30px] opacity-60 cursor-pointer" src={video} alt="" />
            <div className=" cursor-pointer relative">
                <img onClick={handelDisplay} className=" w-[30px] opacity-60 mr-[7px] h-[30px]" src={dots} alt=""/>
                {display && <UserProfileBlock/>}
            </div>
        </div>
    )
}

export default ChatHeader 