import ChatHeader from "./ChatHeader"
import ChatBottom from "./ChatBottom"
import Messages from './Messages'
import { useMemo, useRef, useContext, useEffect, createContext, useState } from "react"
import {chatHeaderOnClick} from '../Chat'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { flushSync } from 'react-dom';
import TimeHM from '../../../components/TimeHM'



const sendMessageContext = createContext();


function messagesAddedLoop(msg , add) {

    for (let i = 0; i < msg.length; i++) {
        if (msg[i].message_id === add.message_id && msg[i].depands != add.depands) {
            msg[i] = add;
            return (false);
        }
    }
    return (true);
}


function ChatSide(Data) {
    
    const initialState = {
        message: '',
        message_id: uuidv4(),
        timestamp: TimeHM(),
        sender: '',
        seen: false,
        depands: "waiting"
      };
    
    const [messages, setMessages] = useState([]);
    const [messagesAdded, setMessagesAdded] = useState([]);
    const [username, SetUsername] = useState("");
    const [getMessagesFromDataBase, setGetMessagesFromDataBase] = useState(false);
    const [userAbleToSendMessage, serUserAbleToSendMessage] = useState(true);
    const [CreateMessages, setCreateMessages] = useState(initialState);
    
    const  UpdateCreatedMessage = (msg, send) => {
        setCreateMessages( prevState => ({ 
            ...prevState,
            message : msg,
            timestamp :  TimeHM(),
            sender : send,
        })
    );
    }
    
    const  UpdateCreatedMessageState = (seen, state) => {
        setCreateMessages( prevState => ({ 
            ...prevState,
            seen : seen,
            timestamp :  TimeHM(),
            depands : state
            })
        );
    }
    
    const messagesRef = useRef(null);
    const ChatContext = useContext(chatHeaderOnClick);
    
    const goToButtom = (scrollBehavior) => {
        messagesRef.current.scrollTo({
            top: messagesRef.current.scrollHeight,
            behavior: scrollBehavior
        });
    }

    useEffect(() => {
        function FetchFullBack() {
            console.log("Data Featched!");
            if (ChatContext.chatHeader.name)
                    SetUsername(ChatContext.chatHeader.name);
            else if (ChatContext.userFromUrl.user)
                    SetUsername(ChatContext.userFromUrl.user);
            if (username) {
                axios.get(`http://192.168.43.61:8000/messages/${username}`, {withCredentials:true})
                .then(res => {
                    setMessages(res.data);
                    setGetMessagesFromDataBase((prevState) => {
                        return true;
                    });
                })
                .catch(error => {
                    console.log('Error fetching messages:', error);
                });
            }
        }
        
        FetchFullBack();
    }, [ChatContext.chatHeader.name, ChatContext.userFromUrl.user, username]);
    
    
    useEffect(() => {
        setMessagesAdded([]);
    }, [ChatContext.chatHeader]);


    const addMessage = (message) => {
            UpdateCreatedMessage(message, "User2");
            sendMessageToDataBase(message, "User2", CreateMessages);
    }
    
    const sendMessageToDataBase = (message, sender ,CreateMessages) => {
        serUserAbleToSendMessage(false);
        axios.post(`http://192.168.43.61:8000/messages/${username}`, {
            message_id : uuidv4(),
            timestamp :  TimeHM(),
            sender : sender,
            message : message,
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
            CreateMessages.message && messagesAddedLoop(messagesAdded, CreateMessages) && setMessagesAdded(prevState => [
                ...prevState, {
                    message: CreateMessages.message,
                    message_id: CreateMessages.message_id,
                    timestamp: CreateMessages.timestamp,
                    sender: CreateMessages.sender,
                    seen: CreateMessages.seen,
                    depands: CreateMessages.depands,
                }
            ]);
            CreateMessages.depands != "waiting" && setCreateMessages(initialState);
      }, [CreateMessages]);


    useEffect(() => {
        if (ChatContext.lastMessage) {
            const msg = JSON.parse(ChatContext.lastMessage.data).message;
            msg && setMessagesAdded(prevState => [
                ...prevState, {
                    message: msg,
                    message_id: 654,
                    timestamp: "41:55",
                    sender: "User1",
                    seen: true,
                    depands: "Waiting",
                }
            ]);
        }
      }, [ChatContext.lastMessage]);
    return (
        <div className={" " + (Data.className) ? Data.className : ``}>
            <div className={"ChatWithUser w-full p-[7px] "}>
                {
                    (ChatContext.chatHeader.name || ChatContext.userFromUrl.user) && getMessagesFromDataBase &&
                    <>
                        {/* {console.log("Entered users are ", ChatContext.chatHeader.name, " And ",ChatContext.userFromUrl.user,"|")} */}
                        <sendMessageContext.Provider value={{addMessage,messages, messagesAdded, messagesRef, goToButtom, userAbleToSendMessage, CreateMessages}}>
                            <ChatHeader Data={Data}/>
                            <Messages className={`ChatBody bg-[#161c20] ${ChatContext.ChatShown ? "h-[calc(100vh-276px)]": "h-[calc(100vh-171px)] md:h-[calc(100vh-276px)]"} overflow-y-scroll flex flex-col`}/>
                            <ChatBottom/>
                        </sendMessageContext.Provider>
                    </>
                }
            </div>
        </div>
    )
}

export {sendMessageContext}
export default ChatSide
