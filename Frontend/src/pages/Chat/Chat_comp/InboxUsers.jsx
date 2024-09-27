import profilePictute from '../../../assets/imgs/UserIcon.png'


function InboxUsers({isActive, userProfile, lastMessage, nickname, total_messages, lastMessageTime}){


    let Status;
    if (isActive)
        Status = "status bg-[#00FF00] w-[10px] h-[10px] rounded-full absolute bottom-0 right-[3px]";
    else
        Status = "status bg-[#ccc] w-[10px] h-[10px] rounded-full absolute bottom-0 right-[3px]";
    return (
        <div className="inboxChatHolder flex flex-col pt-[10px]">
            <div className="Chatuser flex flex-row">
                <div className="InboxUsersList mx-[5px] relative mb-[10px] w-[53.85px] h-[53.85px]">
                    <img className="InboxUser w-[53.85px] h-[53.85px] rounded-full" src={userProfile ? userProfile : profilePictute} alt="" />
                    <span className={Status}></span>
                </div>
                <div className="UserMessage flex flex-col  ml-[7px] pt-[5px]">
                    <span className="text-white font-[500] font-[Outfit] text-[16px]">{nickname}</span>
                    <div className="inboxUserMessage font-[300] text-[13px] text-[white] opacity-70">
                        {lastMessage}
                    </div>
                </div>
                <div className="spaces grow"></div>
                <div className="TimeCount flex flex-col bottom-2/12 w-[94px] pt-[5px] items-center ">
                    <div className="timeSent font-[Outfit] font-[300] ftext-[12px] text-center text-white opacity-70">
                        {lastMessageTime}
                    </div>
                    <div className={`${total_messages ? "bg-[#00CEFF] text-[12px] flex justify-center items-center font-[600] font-[Outfit] w-[20px] h-[20px] mt-[5px] rounded-full text-center" : ""}`}>
                        {total_messages ? total_messages : ""}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InboxUsers