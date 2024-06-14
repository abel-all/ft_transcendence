
import ChatNav from './Chat_comp/ChatNav'
import ChatNavBottom from './Chat_comp/ChatNavBottom'
import ChatSide from './Chat_comp/ChatSide'
import ProprtesSide from './Chat_comp/ProprtesSide'
import "./Chat.css"

function Chat() {
    return (
        <div className="container mx-auto flex justify-center w-full h-full">
            <div className='w-full'>
                <ChatNav/>
                <div className="flex indexchatHolder flex-row">
                    <ProprtesSide className="basis-full flex flex-col"/>
                    <ChatSide className="basis-0/12"/>
                </div>
                <ChatNavBottom/>
            </div>
        </div>
    )
} 


export default Chat