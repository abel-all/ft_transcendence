import ChatHeader from "./ChatHeader"
import ChatBottom from "./ChatBottom"
import Messages from './Messages'
import { useRef, useContext, useEffect, createContext, useState } from "react"
import {chatHeaderOnClick} from '../Chat'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';




const sendMessageContext = createContext();





function ChatSide(Data) {

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }

    // Example usage:
    const now = new Date();
    const formattedTime = formatTime(now);



    const [messages, setMessages] = useState([]);
    const [userAbleToSendMessage, serUserAbleToSendMessage] = useState(true);
    const [CreateMessages, setCreateMessages] = useState({
        message : '',
        message_id : uuidv4(),
        timestamp : formattedTime,
        sender : '',
        seen : false,
        depands : "waiting"
    });

    const  UpdateCreatedMessage = (msg, send) => {
        setCreateMessages({
                message : msg,
                message_id : uuidv4(),
                timestamp : formattedTime,
                sender : send,
                seen : false,
                depands : "waiting"
            });
    }
    
    const  UpdateCreatedMessageState = (seen, state) => {
        setCreateMessages( prevState => ({ 
                ...prevState,
                seen : seen,
                depands : state
            })
        );
    }

    const messagesRef = useRef(null);
    
    useEffect(() => {
        axios.get('http://localhost:3000/messages')
        .then(res => {
            setMessages(res.data);
        })
    }, []);

    
    const goToButtom = (scrollBehavior) => {
        messagesRef.current.scrollTo({
            top: messagesRef.current.scrollHeight,
            behavior: scrollBehavior
        });
    }


    const addMessage = (message) => {
        UpdateCreatedMessage(message, "User2");
        sendMessageToDataBase(message, "User2", CreateMessages);
    }
    
    const sendMessageToDataBase = (message, sender ,CreateMessages) => {
        serUserAbleToSendMessage(false);
        axios.post('http://localhost:3000/messages', {
            message : message,
            message_id : uuidv4(),
            timestamp : CreateMessages.formattedTime,
            sender : sender,
            seen : false,
        })
        .then(res => {
            UpdateCreatedMessageState(false, "")
            serUserAbleToSendMessage(true);
        })
        .catch(err => {
            UpdateCreatedMessageState(false, "failed");
            serUserAbleToSendMessage(false);
        })
    };

    useEffect(() => {
        messages.length == 0 && setMessages(
            prevState => {
                return [...prevState, CreateMessages];
            }
        );
        messages.length > 0 &&  setMessages(
            prevState => {
                let lastmessage = prevState[prevState.length - 1];
                if (lastmessage.message_id == CreateMessages.message_id) {
                        const UpdateLastMessage = {...lastmessage, depands: CreateMessages.depands};
                        const updateMessaes = [...prevState.slice(0, prevState.length - 1), UpdateLastMessage];
                        return updateMessaes;
                    }
                else {
                    return [...prevState, CreateMessages];
                }
            }
        );               
    }, [CreateMessages])


    const ChatContext = useContext(chatHeaderOnClick);
    return (
        <div className={" " + (Data.className) ? Data.className : ``}>
            <div className={"ChatWithUser w-full p-[7px] "}>
                {
                    (ChatContext.chatHeader.name || ChatContext.userFromUrl.user) &&
                    <sendMessageContext.Provider value={{addMessage,messages, messagesRef, goToButtom, userAbleToSendMessage}}>
                        <ChatHeader Data={Data}/>
                        <Messages className={`ChatBody bg-[#161c20] ${ChatContext.ChatShown ? "h-[calc(100vh-276px)]": "h-[calc(100vh-171px)] md:h-[calc(100vh-276px)]"} overflow-y-scroll flex flex-col`}/>
                        <ChatBottom/>
                    </sendMessageContext.Provider>
                }
            </div>
        </div>
    )
}

export {sendMessageContext}
export default ChatSide