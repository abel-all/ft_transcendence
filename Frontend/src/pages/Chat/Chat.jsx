import ChatNavBottom from './Chat_comp/ChatNavBottom'
import ChatSide from './Chat_comp/ChatSide'
import ProprtesSide from './Chat_comp/ProprtesSide'
import Header from '../../components/Header'
import "./Chat.css"
import { useState, createContext, useEffect, useRef } from 'react'
import chatUsers from "../../assets/ChatUsers.json"
import useWebSocket, { ReadyState } from 'react-use-websocket';



const chatHeaderOnClick = createContext();

function Chat() {

    const [isFrom, setIsFrom] = useState(false);
    const [socketURL, setSocketURL] = useState('ws://10.11.2.3:8000/');
    const [messageHistory, setMessageHistory] = useState([]);
    const [VoidedUsername, setVoidedUsername]  = useState("");
    const { sendMessage, lastMessage, readyState } = useWebSocket(socketURL, {
        onOpen: () => console.log('WebSocket connection opened.'),
        onClose: () => console.log('WebSocket connection closed.'),
        onError: (error) => console.error('WebSocket error:', error),
        onMessage: (message) => {
          setMessageHistory(prev => [...prev, message.data.toString()]); // Ensure message is a string
        },
        shouldReconnect: () => true, // Always attempt to reconnect
        reconnectInterval: 3000 // Reconnect every 3 seconds
      });


    const connectionStatus = {
      [ReadyState.CONNECTING]: 'Connecting',
      [ReadyState.OPEN]: 'Open',
      [ReadyState.CLOSING]: 'Closing',
      [ReadyState.CLOSED]: 'Closed',
      [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];


    const [chatHeader, setChatHeader] = useState({
        name: "",
        rank: -999,
        userProfile: "x",
        windowSize:"",
        clicked: false,
        ChatShown:true
    });

    useEffect(() => {
        console.log(`VoidedUsername : 1 : ${VoidedUsername}`);
    }, [VoidedUsername]);

    function handelSetingUser(username, userurl, userrank) {
        setUserFromUrl(prevState => ({
            ...prevState,
            user: (username) ? username : prevState.user,
            url: (userurl) ? userurl : prevState.url,
            rank: (userrank) ? userrank : prevState.rank,
        }));
    }

    const [userFromUrl, setUserFromUrl] = useState({
        user:"",
        url:"",
        rank:""
    });




    const handelChatHeader = (names, ranks, userProfiles) => {
        setChatHeader(prevState => ({
            ...prevState,
            name: names,
            rank: ranks,
            userProfile: userProfiles,
            clicked: true,
            ChatShown:false,
            windowSize: (window.innerWidth < 768) ? "Mobile" : "Desktop"
        }));
    }

    const handelChatShown = (state) => {
        setChatHeader(prevState => ({
            ...prevState,
            ChatShown: state,
        }));
    }

    function SetFrom() {
        let windo = window.location.href;
        if (windo.lastIndexOf("user=") != -1) {
            let FromUser = windo.substring(windo.lastIndexOf("user=") + 5);
            chatUsers.map( users => {
                if (users.nickname == FromUser) {
                    setIsFrom(true);
                    handelSetingUser(users.nickname ,users.userProfile ,56662);
                    handelChatShown(false);
               }
            })
        }
    }

    useEffect (() => {
        SetFrom();
    }, []);

    useEffect (() => {
        handelSetingUser("","","");
    }, []);

    const handelChatClick = (state) => {
        setChatHeader(prevState => ({
            ...prevState,
            clicked: state,
        }));
    }

    useEffect (() => {
        chatHeader;
    }, []);

    return (
        <div className="container mx-auto flex justify-center w-full h-full">
            <div className='w-full'>
                <Header title="Chat" activeSection="ChatIcon" hide={!chatHeader.ChatShown ? "hidden md:flex" : ""}/>
                <chatHeaderOnClick.Provider value={{chatHeader, setChatHeader, handelChatHeader, handelChatShown, handelChatClick, lastMessage, userFromUrl, sendMessage, readyState}}>
                    <div className="flex indexchatHolder mt-[101px] flex-row">
                        <ProprtesSide VoidedUsername={VoidedUsername}className={`ProprtesSide basis-full ${chatHeader.ChatShown == false ? " hidden md:flex" : "flex"} md:basis-4/12 flex flex-col`}/>
                        <ChatSide setVoidedUsername={setVoidedUsername} className={`ChatSide ${chatHeader.ChatShown == true ? " hidden " : ""} md:flex md:basis-8/12`}/>
                    </div>
                </chatHeaderOnClick.Provider>
                <ChatNavBottom hide={!chatHeader.ChatShown ? "hidden " : ""}/>
            </div>
        </div>
    )
}

export {chatHeaderOnClick}
export default Chat
