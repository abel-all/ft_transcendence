import FriendPic from "../assets/imgs/FriendPic.svg"
import playfriend from "../assets/imgs/paly_friend.svg"
import chatfreind from "../assets/imgs/chat_friend.svg"
import AddUser from "../assets/imgs/AddUser.svg"
import removefriend from "../assets/imgs/remove_friend.svg"
import Moudel from "../pages/Profile/Profile_comp/Moudel"
import {useState } from "react"
import { Link } from "react-router-dom"
import unblock from "../assets/imgs/unblock.svg"
import panding from "../assets/imgs/panding.svg"


function Friend(Data) {

    const [isTrue, setIsTrue] = useState(false);


    function toggle() {
        setIsTrue(!isTrue);
    }

    return (
            <>
                <div className="flex items-center shrink overflow-hidden">
                    <div className="relative shrink-0 overflow-hidden">
                        <img className="FriendPic rounded-full m-[5px] w-[45px] h-[45.71px]" src={FriendPic} alt="" />
                        {Data.isFriend && <div className={`${Data.status} absolute bottom-0 right-0`}></div>}
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
                {Data.reason == "Friends list" &&
                    <>
                        <button className="btn-frnds deleteFriend">
                            <img className="px-[7px]" onClick={toggle} src={removefriend} alt="" />
                            {isTrue && <Moudel toggle = {toggle} username = {Data.username}/> }
                        </button>
                        <button className="btn-frnds chatFriend">
                            <Link to={"/chat?user=" + Data.username} >
                                <img className="px-[7px]" src={chatfreind} alt="" />
                            </Link>
                        </button>
                        <button className="btn-frnds playFriend">
                            <Link to={"/PlayWith?user=" + Data.username} >
                                <img className="px-[7px]" src={playfriend} alt="" />
                            </Link>
                        </button>
                    </>
                }
                {Data.reason == "Search" &&
                    <>
                        <button className="btn-frnds Addfriend">
                            <img className="px-[7px]" src={AddUser} alt="" />
                        </button>
                        <button className="btn-frnds chatFriend">
                            <Link to={"/chat?user=" + Data.username} >
                                <img className="px-[7px]" src={chatfreind} alt="" />
                            </Link>
                        </button>
                        <button className="btn-frnds playFriend">
                            <Link to={"/PlayWith?user=" + Data.username} >
                                <img className="px-[7px]" src={playfriend} alt="" />
                            </Link>
                        </button>
                    </>
                }
                {Data.reason == "Blocked Users" &&
                    <>
                        <button className="btn-frnds Unblock">
                            <img className="px-[7px]" src={unblock} alt="" />
                        </button>
                    </>
                }
                {Data.reason == "Panding Requests" &&
                    <>
                        <button className="btn-frnds Unblock">
                            <img className="px-[7px]" src={panding} alt="" />
                        </button>
                        <button className="btn-frnds chatFriend">
                            <Link to={"/chat?user=" + Data.username} >
                                <img className="px-[7px]" src={chatfreind} alt="" />
                            </Link>
                        </button>
                    </>
                }
                </div>
            </>
    )
}

export default Friend