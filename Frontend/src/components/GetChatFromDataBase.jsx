import Chat from '../assets/Chat.json'
import seen from '../assets/imgs/chat/seen.svg'
import notseen from '../assets/imgs/chat/notyet.svg'
import waithing from '../assets/imgs/chat/msg_waiting.svg'
import failed from '../assets/imgs/chat/msg_failed.svg'

import React from "react";

function GetChatFromDataBase({chatMessages, username, WhoAmI}) {
    
    let userStyle;

    (chatMessages.sender == username) ? userStyle = "text-white bg-[#0A0C0E] rounded-tr-lg " : userStyle = "text-black bg-white self-end rounded-tl-lg ";
    return (
            <div className={`${userStyle} + 'break-all relative flex rounded-b-lg w-[70%] lg:w-[450px] m-[10px] p-[20px]`}>
                <p className='pb-[15px] break-all'>{chatMessages.message}</p>
                {(chatMessages.sender == WhoAmI) ?
                    <>
                        <span className='absolute right-[45px] bottom-[5px]'>{chatMessages.timestamp}</span>
                        <img
                            src={
                                chatMessages.seen ? seen : (chatMessages.depands ? ((chatMessages.depands == "failed") ? failed : waithing) : notseen)}
                            alt='' className='absolute right-[15px] bottom-[5px]'/>
                    </>
                    : 
                        <span className='absolute right-[15px] bottom-[5px]'>{chatMessages.timestamp}</span>
                }
            </div>
    )
}


export default GetChatFromDataBase;