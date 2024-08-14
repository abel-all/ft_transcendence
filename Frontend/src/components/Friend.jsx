import FriendPic from "../assets/imgs/FriendPic.svg"
import playfriend from "../assets/imgs/paly_friend.svg"
import chatfreind from "../assets/imgs/chat_friend.svg"
import AddUser from "../assets/imgs/AddUser.svg"
import removefriend from "../assets/imgs/remove_friend.svg"
import Moudel from "../pages/Profile/Profile_comp/Moudel"
import {useEffect, useState } from "react"
import { Link } from "react-router-dom"
import unblock from "../assets/imgs/unblock.svg"
import panding from "../assets/imgs/panding.svg"
import axios from "axios"


function Friend(Data) {

    const [isTrue, setIsTrue] = useState(false);

    const AcceptRequest = (user) => {
        if (Data.reason == "Invetations") {
            console.log(`${user} is accepted`);
            axios.post('api/profile/handle-friendship-request/', {
                AcceptRequest : user
            }).then((respons) => {
                console.log("user add to friend list");
            }).catch((error) => {
                console.log("request not accepted");
            })
        }
    }
    
    const SendRequest = (user) => {
        console.log(`${user} ia requested`);
        axios.post('api/profile/send-friendship-request/', {
            SendRequest : user
        }).then((respons) => {
            console.log("user add to friend list");
        }).catch((error) => {
            console.log("request not accepted");
        })
    }

    function toggle() {
        setIsTrue(!isTrue);
    }

    return (
            <>
                <div className="flex items-center shrink overflow-hidden">
                    <div className="relative shrink-0 overflow-hidden">
                        <img className="FriendPic rounded-full m-[5px] w-[45px] h-[45.71px]" src={Data.picture ? Data.picture : FriendPic} alt="" />
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
                            {isTrue && <Moudel tggl = {toggle} username = {Data.username} message="Are you sure you want to Block" reason="Block"/> }
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
                        <button onClick={() => SendRequest(Data.username)} className="btn-frnds Addfriend">
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
                            <img className="px-[7px]" onClick={toggle} src={unblock} alt="" />
                            {isTrue && <Moudel tggl = {toggle} username = {Data.username} message="Are you sure you want to UnBlock" reason="Unblock"/> }
                        </button>
                    </>
                }
                {Data.reason == "Panding Requests" &&
                    <>
                        <button className="btn-frnds Unblock">
                            <img className="px-[7px]" onClick={toggle} src={panding} alt="" />
                            {isTrue && <Moudel tggl = {toggle} username = {Data.username} message="Are you sure you want to Undo" reason="undo"/> }
                        </button>
                        <button className="btn-frnds chatFriend">
                            <Link to={"/chat?user=" + Data.username} >
                                <img className="px-[7px]" src={chatfreind} alt="" />
                            </Link>
                        </button>
                    </>
                }
                {Data.reason == "Invetations" &&
                <>
                    <button onClick={() => AcceptRequest(Data.username)} className="btn-frnds Invite">
                        <img className="px-[7px]" src={AddUser} alt="" />
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