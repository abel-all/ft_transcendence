import send from "../../../assets/imgs/chat/send-02.svg"
import microphone from "../../../assets/imgs/chat/microphone-02.svg"
import camera from "../../../assets/imgs/chat/camera-02.svg"
import paperclip from "../../../assets/imgs/chat/paperclip-01.svg"
import { useState } from "react"




function ChatBottom() {
    
    return (
        <form action="">
            <div className={`SendMessagePart flex flex-row justify-center items-center border-t-[1px] border-[#626262] h-[86px]`}>
                <textarea id='txtarea'
                    className="resize-none text-[20px] p-[27px] ml-[7px] grow opacity-80 placeholder:opacity-80 text-white
                        placeholder:text-white bg-transparent h-full placeholder:font-[200] font-[200]
                        placeholder:font-[Outfit] font-[Outfit] focus-visible:outline-none"
                    placeholder="Type Something..."/>
                <div className="SendMessage cursor-pointer flex flex-row p-[10px] items-center justify-center h-full border-l-[1px] border-[#626262]">
                    <button className="text-[#00CEFF] text-[20px] font-[500] font-[Outfit]">Send</button>
                    <img className="w-[30px] h-[30px]" src={send} alt=""/>
                </div>
            </div>
        </form>
    )
}


export default ChatBottom