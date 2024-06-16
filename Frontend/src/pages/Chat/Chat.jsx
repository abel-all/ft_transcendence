
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
                    <ProprtesSide className="basis-full md:basis-4/12 flex flex-col"/>
                    <ChatSide className="hidden md:flex md:basis-8/12"/>
                </div>
                <ChatNavBottom/>
            </div>
        </div>
    )
} 


export default Chat