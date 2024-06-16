
import User from "../../../assets/imgs/userprofile.svg"
import Userlist from "./Userlist"
import inboxIcon from "../../../assets/imgs/inbox.svg"
import InboxUsers from "./InboxUsers"
import { Link } from "react-router-dom"



function BoxInboxUsers() {
    return (
        <>
            <div className="OnlineFriends my-[15px]">
                <div className="FriendHeader flex flex-row">
                    <img className="w-[25px] h-[25px] " src={User} alt=""/>
                    <span className="ml-[7px] text-[white] font-[400] text-[20px] font-[Outfit]">Online Friends</span>
                    <div className="grow"></div>
                    <div className=" text-[#00CEFF] underline">All</div>
                </div>
            </div>
            <div className="OnlineList flex flex-row flex-wrap h-[58px] overflow-hidden">
                <Userlist/>
            </div>
            <div className="inboxField mt-[60px]">
                <div className="inboxHolder flex flex-row pb-[15px] border-b-[1px] border-white border-opacity-40">
                    <img className="opacity-80" src={inboxIcon} alt="" />
                    <span className="ml-[20px] text-white text-[20px] font-[400] font-[Outfit]"> Inbox </span>
                </div>
                <Link to="/chatComp"><InboxUsers/></Link>
                <Link to="/chatComp"><InboxUsers/></Link>
            </div>
        </>
    )
}


export default BoxInboxUsers