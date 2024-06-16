
import ChatHeader from "./ChatHeader"
import ChatBottom from "./ChatBottom"
import Messages from './Messages'

function ChatComp() {

    return (
        <div className={"ChatWithUser w-full p-[7px] "}>
            <ChatHeader/>
            <Messages className="ChatBody bg-[#161c20] h-[652px] overflow-y-scroll flex flex-col"/>
            <ChatBottom/>
        </div>
    )
}


export default ChatComp