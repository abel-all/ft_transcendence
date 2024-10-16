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
    const [ToUser, setToUser] = useState("");


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
    const lastUserFetched = useRef(null);

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
            if (username && username != lastUserFetched.current) {
                if (ChatContext.readyState == ReadyState.OPEN) {
                    console.log("set seen for user : ", username);
                    ChatContext.sendMessage(JSON.stringify({
                        action: "read_receipt",
                        username: username,
                        })
                    );
                }
                axios.post(`https://aennaki.me/api/chat/messages/history/`, {
                    username : username,
                    start    : 0,
                })
                .then(res => {
                    lastUserFetched.current = username;
                    setMessages((prevState) => { return res.data});
                    setGetMessagesFromDataBase((prevState) => {
                        return true;
                    });
                })
                .catch(error => {
                });
            }
        }

        FetchFullBack();
    }, [ChatContext.chatHeader.name, ChatContext.userFromUrl.user, username]);


    useEffect(() => {
        setMessagesAdded([]);
    }, [ChatContext.chatHeader]);


    const addMessage = (message) => {
            UpdateCreatedMessage(message, ToUser);
            sendMessageToDataBase(message, username, CreateMessages);
    }

    const sendMessageToDataBase = (message, sender ,CreateMessages) => {
        serUserAbleToSendMessage(false);


        if (ChatContext.readyState == ReadyState.OPEN) {
            ChatContext.sendMessage(JSON.stringify({
                action: "chat_message",
                message: message,
                username: sender,
                })
            );
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
        if (ChatContext.lastMessage) {
            setToUser(JSON.parse(ChatContext.lastMessage.data).to);
            if (ChatContext.lastMessage && JSON.parse(ChatContext.lastMessage.data).from == username && JSON.parse(ChatContext.lastMessage.data).type == "chat_message") {
                const msg = JSON.parse(ChatContext.lastMessage.data).message;
                msg && setMessagesAdded(prevState => [
                    ...prevState, {
                        message: msg,
                        message_id: Math.floor(Math.random() * 10000),
                        timestamp: JSON.parse(ChatContext.lastMessage.data).created_at,
                        sender: JSON.parse(ChatContext.lastMessage.data).from,
                        seen: false,
                        depends: "Waiting"
                    }
                ]);
                if (ChatContext.readyState == ReadyState.OPEN) {
                    ChatContext.sendMessage(JSON.stringify({
                        action: "read_receipt",
                        username: JSON.parse(ChatContext.lastMessage.data).from,
                        })
                    );
                }
            }
        }
    }, [ChatContext.lastMessage]);

    useEffect(() => {
        if (ChatContext.lastMessage
            && JSON.parse(ChatContext.lastMessage.data).from == username
            && JSON.parse(ChatContext.lastMessage.data).type == "read_receipt")
        {
            console.log(username, "before Seen your message Array : ", messagesAdded);
            let arrs = messagesAdded;
            for (let i = 0; i < messagesAdded.length; i++) {
                arrs[i].seen = true;
            }
            console.log(username, "after Seen your message Array : ", arrs);
            setMessagesAdded(prevState => [...arrs]);
        }
    }, [ChatContext.lastMessage]);

    const {setlastMessageUserSend} = useContext(chatHeaderOnClick);

    return (
        <div className={" " + (className) ? className : ``}>
            <div className={"ChatWithUser w-full p-[7px] "}>
                {
                    (ChatContext.chatHeader.name || ChatContext.userFromUrl.user) && getMessagesFromDataBase &&
                    <>
                        <sendMessageContext.Provider value={{addMessage,messages, messagesAdded, messagesRef, goToButtom, userAbleToSendMessage, CreateMessages, username, setlastMessageUserSend}}>
                            <ChatHeader className={className}/>
                            <Messages setMessages={setMessages} toUser={ToUser} username={username} className={`ChatBody bg-[#161c20] ${ChatContext.ChatShown ? "h-[calc(100vh-276px)]": "h-[calc(100vh-171px)] md:h-[calc(100vh-276px)]"} overflow-y-scroll flex flex-col`}/>
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
