import ChatNavBottom from './Chat_comp/ChatNavBottom'
import ChatSide from './Chat_comp/ChatSide'
import ProprtesSide from './Chat_comp/ProprtesSide'
import Header from '../../components/Header'
import "./Chat.css"
import { useState, createContext } from 'react'



const chatHeaderOnClick = createContext();

function Chat() {


    const [chatHeader, setChatHeader] = useState({
        name: "user",
        rank: 55,
        userProfile: "google.com",
        windowSize:""
    }); 

    const handelChatHeader = (names, ranks, userProfiles) => {
        setChatHeader(prevState => ({
            ...prevState,
            name: names,
            rank: ranks,
            userProfile: userProfiles,
            windowSize: (window.innerWidth < 768) ? "Mobile" : "Desktop"
        }));
    }

    return (
        <div className="container mx-auto flex justify-center w-full h-full">
            <div className='w-full'>
                <Header title="Chat" activeSection="ChatIcon"/>
                <chatHeaderOnClick.Provider value={{chatHeader, setChatHeader, handelChatHeader}}>
                    <div className="flex indexchatHolder flex-row">
                        <ProprtesSide className="ProprtesSide basis-full md:basis-4/12 flex flex-col"/>
                        <ChatSide className="ChatSide hidden md:flex md:basis-8/12"/>
                    </div>
                </chatHeaderOnClick.Provider>
                <ChatNavBottom/>
            </div>
        </div>
    )
} 

export {chatHeaderOnClick}
export default Chat