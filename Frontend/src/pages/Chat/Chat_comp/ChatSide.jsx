import ChatHeader from "./ChatHeader"
import ChatBottom from "./ChatBottom"
import Messages from './Messages'
import { useContext } from "react"
import {chatHeaderOnClick} from '../Chat'



function ChatSide(Data) {

    const ChatContext = useContext(chatHeaderOnClick);

    
    console.log(ChatContext.chatHeader.name);
    return (
        <div className={" " + (Data.className) ? Data.className : ``}>
            <div className={"ChatWithUser w-full p-[7px] "}>
                <ChatHeader Data={Data}/>
                <Messages className="ChatBody bg-[#161c20] h-[calc(100vh-276px)] overflow-y-scroll flex flex-col"/>
                <ChatBottom/>
            </div>
        </div>
    )
}


export default ChatSide