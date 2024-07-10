import send from "../../../assets/imgs/chat/send-02.svg"
import microphone from "../../../assets/imgs/chat/microphone-02.svg"
import camera from "../../../assets/imgs/chat/camera-02.svg"
import paperclip from "../../../assets/imgs/chat/paperclip-01.svg"
import { useRef, useState, useContext } from "react"
import { sendMessageContext } from "./ChatSide"
import { flushSync } from 'react-dom';


function ChatBottom() {

    const messageContext = useContext(sendMessageContext);
    const [textValue, setTextValue] = useState('');
    const textAreaRef = useRef(null);

    const HandelSendMessage = (e) => {
        if (messageContext.userAbleToSendMessage){
            flushSync(() => {
                messageContext.addMessage(textValue);
                if (textAreaRef.current)
                    textAreaRef.current.value = "";
            });
            setTimeout(() => {
                messageContext.goToButtom("smooth");
            }, 0)
        }
    }

    const updateTextalue = (e) => {
        setTextValue(e.target.value);
    }

    const handelEntry = (e) => {
        if (e.key == "Enter")
            HandelSendMessage();
    }

    return (
        <>
            <div className={`SendMessagePart flex flex-row justify-center items-center border-t-[1px] border-[#626262] h-[86px]`}>
                <input autoComplete="off" id='txtarea' onKeyUp={handelEntry} ref={textAreaRef} onChange={updateTextalue}
                    className="resize-none text-[20px] p-[27px] ml-[7px] grow opacity-80 placeholder:opacity-80 text-white
                        placeholder:text-white bg-transparent h-full placeholder:font-[200] font-[200]
                        placeholder:font-[Outfit] font-[Outfit] focus-visible:outline-none"
                    placeholder="Type Something..."/>
                <div className="SendMessage cursor-pointer flex flex-row p-[10px] items-center justify-center h-full border-l-[1px] border-[#626262]"
                    onClick={HandelSendMessage}>
                    <div className="text-[#00CEFF] text-[20px] font-[500] font-[Outfit]">Send</div>
                    <img className="w-[30px] h-[30px]" src={send} alt=""/>
                </div>
            </div>
        </>
    )
}


export default ChatBottom