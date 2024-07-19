import ChatHeader from "./ChatHeader"
import ChatBottom from "./ChatBottom"
import Messages from './Messages'
import { useMemo, useRef, useContext, useEffect, createContext, useState } from "react"
import {chatHeaderOnClick} from '../Chat'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { flushSync } from 'react-dom';




const sendMessageContext = createContext();


function ChatSide(Data) {
    
    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }
    
    const now = new Date();
    const formattedTime = formatTime(now);
    
    const initialState = {
        message: '',
        message_id: uuidv4(),
        timestamp: formattedTime,
        sender: '',
        seen: false,
        depands: "waiting"
      };
    
    const [messages, setMessages] = useState([]);
    const [username, SetUsername] = useState("");
    const [getMessagesFromDataBase, setGetMessagesFromDataBase] = useState(false);
    const [userAbleToSendMessage, serUserAbleToSendMessage] = useState(true);
    const [CreateMessages, setCreateMessages] = useState(initialState);
    
    const  UpdateCreatedMessage = (msg, send) => {
        setCreateMessages( prevState => ({ 
            ...prevState,
            message : msg,
            timestamp :  formattedTime,
            sender : send,
        })
    );
    }
    
    const  UpdateCreatedMessageState = (seen, state) => {
        setCreateMessages( prevState => ({ 
            ...prevState,
            seen : seen,
            timestamp :  formattedTime,
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
        function getingData() {
            console.log("Data Featched!");
            if (ChatContext.chatHeader.name)
                    SetUsername(ChatContext.chatHeader.name);
            else if (ChatContext.userFromUrl.user)
                    SetUsername(ChatContext.userFromUrl.user);
            if (username) {
                axios.get(`http://127.0.0.1:8000/messages/${username}`)
                .then(res => {
                    setMessages(res.data);
                    setGetMessagesFromDataBase((prevState) => {
                        return true;
                    });
                    // console.log("Getting data in chat side", res.data);
                })
                .catch(error => {
                    console.error('Error fetching messages:', error);
                });
            }
        }
        
        getingData();
    }, [ChatContext.chatHeader.name, ChatContext.userFromUrl.user, username]);
    
    
    
    const addMessage = (message) => {
        UpdateCreatedMessage(message, "User2");
        sendMessageToDataBase(message, "User2", CreateMessages);
    }
    
    const sendMessageToDataBase = (message, sender ,CreateMessages) => {
        serUserAbleToSendMessage(false);
        axios.post(`http://127.0.0.1:8000/messages/${username}`, {
            message_id : uuidv4(),
            timestamp :  formattedTime,
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
        console.log("1 ", CreateMessages);
        if (Array.isArray(messages.messages)) {
          
          if (messages.messages.length === 0) {
            setMessages(prevState => ({
              messages: [...prevState.messages, CreateMessages],
            }));
          } else {
            setMessages(prevState => {
              let lastMessage = prevState.messages[prevState.messages.length - 1];
              console.log("went from here! ");
              if (lastMessage.message_id === CreateMessages.message_id) {
                const updatedLastMessage = { ...lastMessage, depands: CreateMessages.depands };
                const updatedMessages = [...prevState.messages.slice(0, -1), updatedLastMessage];
                return { messages: updatedMessages };
              } else {
                return { messages: [...prevState.messages, CreateMessages] };
              }
            });
          }
        }
      }, [CreateMessages]);

    // console.log("users are ", ChatContext.chatHeader.name, " And ",ChatContext.userFromUrl.user,"|")
    return (
        <div className={" " + (Data.className) ? Data.className : ``}>
            <div className={"ChatWithUser w-full p-[7px] "}>
                {
                    (ChatContext.chatHeader.name || ChatContext.userFromUrl.user) && getMessagesFromDataBase &&
                    <>
                        {/* {console.log("Entered users are ", ChatContext.chatHeader.name, " And ",ChatContext.userFromUrl.user,"|")} */}
                        <sendMessageContext.Provider value={{addMessage,messages, messagesRef, goToButtom, userAbleToSendMessage, CreateMessages}}>
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
