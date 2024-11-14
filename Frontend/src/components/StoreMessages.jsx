import Chat from '../assets/Chat.json'
import seen from '../assets/imgs/chat/seen.svg'
import notseen from '../assets/imgs/chat/notyet.svg'
import waithing from '../assets/imgs/chat/msg_waiting.svg'
import failed from '../assets/imgs/chat/msg_failed.svg'

import React from "react";

function StoreMessages({chatMessages, username, WhoAmI}) {
    
    let userStyle;

    (chatMessages.sender == username) ? userStyle = "text-white bg-[#0A0C0E] rounded-tr-lg " : userStyle = "text-black bg-white self-end rounded-tl-lg ";
    console.log("What message got ", chatMessages);
    return (
            <div className={`${userStyle} + 'break-all relative flex rounded-b-lg w-[70%] lg:w-[450px] m-[10px] p-[20px]`}>
                <p className='pb-[15px] break-all'>{chatMessages.message}</p>
                {(chatMessages.sender == WhoAmI || !chatMessages.sender) ?
                    <>
                        <span className='absolute right-[45px] bottom-[5px]'>
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} sender
                        </span>
                        <img
                            src={
                                chatMessages.seen ? seen : (chatMessages.depands ? ((chatMessages.depands == "failed") ? failed : waithing) : notseen)}
                                alt='' className='absolute right-[15px] bottom-[5px]'/>
                    </>
                    : 
                        <span className='absolute right-[15px] bottom-[5px]'>
                            {
                                chatMessages.sender
                                ? new Date(chatMessages.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
                                : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
                            } reciver
                        </span>
                }
            </div>
    )
}



export default StoreMessages;