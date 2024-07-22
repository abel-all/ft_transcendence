
import { useContext, useEffect, useState } from 'react'
import { sendMessageContext } from './ChatSide'
import GetChatFromDataBase from '../../../components/GetChatFromDataBase'
import StoreMessages from '../../../components/StoreMessages'



function Messages(Data) {
    
    
    const messageContext = useContext(sendMessageContext);
    useEffect(() => {
        messageContext.goToButtom("auto")
    },);
    
    // console.log("Messages Section", messages.messages);
    const {messages} = useContext(sendMessageContext);
    const {messagesAdded} = useContext(sendMessageContext);
    return (
        <div ref={messageContext.messagesRef} className={"" + (Data.className) ? Data.className : ''}>
           <>
            {
                Array.isArray(messages.messages) && messages.messages.map((chatMessages, index) => {
                    return (
                        <GetChatFromDataBase chatMessages={chatMessages} key={index}/>
                    );
                })
            }
            {
                Array.isArray(messagesAdded) && messagesAdded.map((chatMessages, index) => {
                    return (
                        <StoreMessages chatMessages={chatMessages} key={index}/>
                    );
                })
            }
            </>
        </div>


    )
}


export default Messages
