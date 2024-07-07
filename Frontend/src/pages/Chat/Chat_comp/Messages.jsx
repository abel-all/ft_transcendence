import Chat from '../../../assets/Chat.json'
import seen from '../../../assets/imgs/chat/seen.svg'
import notseen from '../../../assets/imgs/chat/notyet.svg'
import waithing from '../../../assets/imgs/chat/msg_waiting.svg'
import failed from '../../../assets/imgs/chat/msg_failed.svg'
import { useContext, useEffect, useState } from 'react'
import { sendMessageContext } from './ChatSide'




function Messages(Data) {

    const messageContext = useContext(sendMessageContext);
    let userStyle;
    
    useEffect(() => {
        const timer = setTimeout(() => {
            messageContext.goToButtom("auto")
        }, 100)

        return (() => {
            clearTimeout(timer)
        })
    }, [])
    return (
        <div ref={messageContext.messagesRef} className={"" + (Data.className) ? Data.className : ''}>
            {
                messageContext.messages.map(chatMessages => {
                    {(chatMessages.sender == "User1") ? userStyle = "text-white bg-[#0A0C0E] rounded-tr-lg " : userStyle = "text-black bg-white self-end rounded-tl-lg "}
                    return (
                        <div key={chatMessages.message_id} className={userStyle + 'break-all relative flex rounded-b-lg w-[70%] lg:w-[450px] m-[10px] p-[20px]'}>
                            <p className='pb-[15px]'>{chatMessages.message}</p>
                            {(chatMessages.sender == "User2") ?
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
                })
            }
        </div>


    )
}


export default Messages
