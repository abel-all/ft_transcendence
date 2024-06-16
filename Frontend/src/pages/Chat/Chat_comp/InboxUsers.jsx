

import testuser from "../../../assets/users/user (10).png"



function InboxUsers(){
    return (
        <div className="inboxChatHolder flex flex-col pt-[10px]">
            <div className="Chatuser flex flex-row">
                <div className="InboxUsersList mx-[5px] relative mb-[10px] w-[53.85px] h-[53.85px]">
                    <img className="InboxUser w-[53.85px] h-[53.85px] rounded-full" src={testuser} alt="" />
                    <span className="status bg-[#00FF00] w-[10px] h-[10px] rounded-full absolute bottom-0 right-[3px]"></span>
                </div>
                <div className="UserMessage flex flex-col  ml-[7px] pt-[5px]">
                    <span className="text-white font-[500] font-[Outfit] text-[16px]">Username</span>
                    <div className="inboxUserMessage font-[300] text-[13px] text-[white] opacity-70">
                        Message from the user
                    </div>
                </div>
                <div className="spaces grow"></div>
                <div className="TimeCount flex flex-col bottom-2/12 pt-[5px] items-center">
                    <div className="timeSent font-[Outfit] font-[300] ftext-[12px] text-white opacity-70">
                        5 min
                    </div>
                    <div className="bg-[#00CEFF] text-[12px] flex justify-center items-center font-[600] font-[Outfit] w-[20px] h-[20px] mt-[5px] rounded-full text-center">
                        3
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InboxUsers