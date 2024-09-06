import ChatHeader from "./ChatHeader"
import ChatBottom from "./ChatBottom"
import Messages from './Messages'
import { useMemo, useRef, useContext, useEffect, createContext, useState } from "react"
import {chatHeaderOnClick} from '../Chat'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { flushSync } from 'react-dom';
import TimeHM from '../../../components/TimeHM'
import { ReadyState } from 'react-use-websocket';




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


function ChatSide({setVoidedUsername, className}) {
    const messagesRef = useRef(null);
    const ChatContext = useContext(chatHeaderOnClick);


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
    const [getMessagesFromDataBase, setGetMessagesFromDataBase] = useState(true);
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
    
    
    const goToButtom = (scrollBehavior) => {
        messagesRef.current.scrollTo({
            top: messagesRef.current.scrollHeight,
            behavior: scrollBehavior
        });
    }

    useEffect(() => {
        function FetchFullBack() {
            if (ChatContext.chatHeader.name) {
                SetUsername(ChatContext.chatHeader.name);
                setVoidedUsername(ChatContext.chatHeader.name);
            }
            else if (ChatContext.userFromUrl.user) {
                SetUsername(ChatContext.userFromUrl.user);
                setVoidedUsername(ChatContext.userFromUrl.user);
            }
            if (username) {
                axios.get(`https://fttran.tech/messages/${username}`, {withCredentials:true})
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
            sendMessageToDataBase(message, username, CreateMessages);
            //ChatContext.sendMessage(JSON.stringify({ username: 'hello', message: 'Hello!' }));
            console.log("Hello how are you? ", username);

    }
    
    const sendMessageToDataBase = (message, sender ,CreateMessages) => {
        serUserAbleToSendMessage(false);


        if (ChatContext.readyState == ReadyState.OPEN) {
            ChatContext.sendMessage({
                action: "chat_message",
                message: message,
                username: sender,
                    // message_id : uuidv4(),
                    // timestamp :  TimeHM(),
                    // sender : sender,
                    // message : message,
                    // seen : false,
                }
            );
            console.log("Message just sent to Database");
            UpdateCreatedMessageState(false, "")
            serUserAbleToSendMessage(true);
        } else {
            UpdateCreatedMessageState(false, "failed");
            serUserAbleToSendMessage(false);
        }
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

        if (ChatContext.lastMessage && JSON.parse(ChatContext.lastMessage.data).user == username) {
            const msg = JSON.parse(ChatContext.lastMessage.data).message;
            msg && setMessagesAdded(prevState => [
                ...prevState, {
                    message: msg,
                    message_id: Math.floor(Math.random() * 10000),
                    timestamp: new Date().toLocaleTimeString(),
                    sender: "hisoka",
                    seen: true,
                    depends: "Waiting"
                }
            ]);
        }
      }, [ChatContext.lastMessage]);

    return (
        <div className={" " + (className) ? className : ``}>
            <div className={"ChatWithUser w-full p-[7px] "}>
                {
                    (ChatContext.chatHeader.name || ChatContext.userFromUrl.user) && getMessagesFromDataBase &&
                    <>
                        {/* {console.log("Entered users are ", ChatContext.chatHeader.name, " And ",ChatContext.userFromUrl.user,"|")} */}
                        <sendMessageContext.Provider value={{addMessage,messages, messagesAdded, messagesRef, goToButtom, userAbleToSendMessage, CreateMessages, username}}>
                            <ChatHeader className={className}/>
                            <Messages setMessages={setMessages} username={username} className={`ChatBody bg-[#161c20] ${ChatContext.ChatShown ? "h-[calc(100vh-276px)]": "h-[calc(100vh-171px)] md:h-[calc(100vh-276px)]"} overflow-y-scroll flex flex-col`}/>
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
