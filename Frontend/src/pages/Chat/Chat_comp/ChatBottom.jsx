import send from "../../../assets/imgs/chat/send-02.svg"
import microphone from "../../../assets/imgs/chat/microphone-02.svg"
import camera from "../../../assets/imgs/chat/camera-02.svg"
import paperclip from "../../../assets/imgs/chat/paperclip-01.svg"




function ChatBottom() {
    return (
        <div className="SendMessagePart flex flex-row justify-center items-center border-t-[1px] border-[#626262] h-[86px]">
            <textarea
                className="resize-none text-[20px] ml-[7px] grow opacity-80 placeholder:opacity-80 text-white
                    placeholder:text-white bg-transparent h-full placeholder:font-[200] font-[200]
                    placeholder:font-[Outfit] font-[Outfit] focus-visible:outline-none"
                placeholder="Type Something..."/>
            <div className="flex flex-row cameraaudiodiv">
                <img className=" w-[25px] mx-[7px] h-[25px] cursor-pointer" src={paperclip} alt=""/>
                <img className=" w-[25px] mx-[7px] h-[25px] cursor-pointer" src={camera} alt=""/>
                <img className=" w-[25px] mx-[7px] h-[25px] cursor-pointer" src={microphone} alt=""/>
            </div>
            <div className="SendMessage cursor-pointer flex flex-row p-[10px] items-center justify-center h-full border-l-[1px] border-[#626262]">
                <span className="text-[#00CEFF] text-[20px] font-[500] font-[Outfit]">Send</span>
                <img className="w-[30px] h-[30px]" src={send} alt=""/>
            </div>
        </div>
    )
}


export default ChatBottom