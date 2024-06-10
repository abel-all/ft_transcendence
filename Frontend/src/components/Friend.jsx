import FriendPic from "../assets/imgs/FriendPic.svg"
import playfriend from "../assets/imgs/paly_friend.svg"
import chatfreind from "../assets/imgs/chat_friend.svg"
import removefriend from "../assets/imgs/remove_friend.svg"



function Friend(Data) {
    return (
            <div className="relative mb-[20px] friend flex flex-row h-[57px] w-[463px] bg-[#2d3c3f] rounded-full border-[1px] border-[#000000]">
                <img className="FriendPic rounded-full m-[5px] w-[45px] h-[45.71px]" src={FriendPic} alt="" />
                <div className={`${Data.status}`}></div>
                <div className="userNrank flex flex-col">
                    <span className=" text-[20px] px-[7px] font-[400] font-[Outfit]">{Data.username}</span>
                    <div className="flex flex-row justify-center">
                        <span className="trendup-icon text-[12px] px-[3px] font-[500] font-[Outfit] opacity-60">
                        </span>
                        <span className="text-[12px] px-[3px] font-[500] font-[Outfit] opacity-60">{Data.rank}</span>
                    </div>
                </div>
                <div className="space-space flex-grow"></div>
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
    )
}

export default Friend