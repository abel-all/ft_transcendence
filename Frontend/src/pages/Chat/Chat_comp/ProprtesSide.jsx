import Search from "../../../assets/imgs/search.svg"
import User from "../../../assets/imgs/userprofile.svg"
import Userlist from "./Userlist"
import inboxIcon from "../../../assets/imgs/inbox.svg"
import InboxUsers from "./InboxUsers"

function ProprtesSide(Data) {
    return (
        <div className={" " + (Data.className) ? Data.className : ``}>
            <div className="SearchInpute relative my-[5px]">
                <input 
                    className="p-[25px] focus-visible:outline-0 text-[white] rounded-full w-full blur-none
                    text-[16px] bg-transparent border-[1px] border-[#626262]"
                    type="text" placeholder="Search" />
                <img src={Search} className="w-[37px] h-[37px] cursor-pointer absolute top-[17px] opacity-50 right-[17px]" alt=""/>
            </div>
            <div className="OnlineFriends my-[15px]">
                <div className="FriendHeader flex flex-row">
                    <img className="w-[25px] h-[25px] basis-1/12" src={User} alt=""/>
                    <div className="basis-1/12"></div>
                    <span className="basis-6/12 text-[white] font-[400] text-[20px] font-[Outfit]">Online Friends</span>
                    <div className="basis-4/12"></div>
                    <div className="basis-1/12 text-[#00CEFF] underline">All</div>
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
                <InboxUsers/>
                <InboxUsers/>
                <InboxUsers/>
                <InboxUsers/>
                <InboxUsers/>
                <InboxUsers/>
                <InboxUsers/>
                <InboxUsers/>
                <InboxUsers/>
                <InboxUsers/>
                <InboxUsers/>
                <InboxUsers/>
                <InboxUsers/>
                <InboxUsers/>
                <InboxUsers/>
            </div>
        </div>
    )
}

export default ProprtesSide