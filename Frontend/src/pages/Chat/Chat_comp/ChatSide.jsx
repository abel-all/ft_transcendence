import ChatHeader from "./ChatHeader"
import ChatBottom from "./ChatBottom"
import Messages from './Messages'
import { useContext } from "react"
import {chatHeaderOnClick} from '../Chat'



function ChatSide(Data) {

    const ChatContext = useContext(chatHeaderOnClick);
    return (
        <div className={" " + (Data.className) ? Data.className : ``}>
            <div className={"ChatWithUser w-full p-[7px] "}>
                {(ChatContext.chatHeader.name || ChatContext.userFromUrl.user) &&
                <>
                    <ChatHeader Data={Data}/>
                    <Messages className={`ChatBody bg-[#161c20] ${ChatContext.ChatShown ? "h-[calc(100vh-276px)]": "h-[calc(100vh-171px)] md:h-[calc(100vh-276px)]"} overflow-y-scroll flex flex-col`}/>
                    <ChatBottom/>
                </>}
            </div>
        </div>
    )
}


export default ChatSide