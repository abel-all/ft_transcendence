import FriendPic from "../assets/imgs/FriendPic.svg"
import playfriend from "../assets/imgs/paly_friend.svg"
import chatfreind from "../assets/imgs/chat_friend.svg"
import removefriend from "../assets/imgs/remove_friend.svg"



function Friend(Data) {
    return (
            <div className="relative friend flex items-center justify-between h-[57px] px-2  bg-[#2d3c3f] rounded-full border-[1px] border-[#000000] sm:mr-5">
                <div className="flex items-center shrink overflow-hidden">
                    <div className="relative shrink-0 overflow-hidden">
                        <img className="FriendPic rounded-full m-[5px] w-[45px] h-[45.71px]" src={FriendPic} alt="" />
                        <div className={`${Data.status} absolute bottom-0 right-0`}></div>
                    </div>
                    <div className="userNrank flex flex-col shrink overflow-hidden">
                        <span className=" text-[20px] px-[7px] font-[400] font-[Outfit] overflow-hidden text-ellipsis whitespace-nowrap">{Data.username}</span>
                        <div className="flex flex-row justify-start pl-[10px]">
                            <span className="trendup-icon text-[12px] px-[3px] font-[500] font-[Outfit] opacity-60"></span>
                            <span className="text-[12px] px-[3px] font-[500] font-[Outfit] opacity-60">{Data.rank}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center shrink-0">
                    <button className="btn-frnds deleteFriend">
                        <img className="px-[7px]" src={removefriend} alt="" />
                    </button>
                    <button className="btn-frnds chatFriend">
                        <img className="px-[7px]" src={chatfreind} alt="" />
                    </button>
                    <button className="btn-frnds playFriend">
                        <img className="px-[7px]" src={playfriend} alt="" />
                    </button>
                </div>
            </div>
    )
}

export default Friend