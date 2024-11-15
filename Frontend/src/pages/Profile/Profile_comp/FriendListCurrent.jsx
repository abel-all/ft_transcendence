import Friend from '../../../components/Friend'
import AddUser from "../../../assets/imgs/AddUser.svg"
import friendlist from "../../../assets/friendlist.json"
import removefriend from "../../../assets/imgs/remove_friend.svg"
import userIcon from "../../../assets/imgs/userprofile.svg"
import close from "../../../assets/imgs/close.svg"
import invite from "../../../assets/imgs/panding.svg"
import List from './List'
import NotifyUser from '../../../components/NotifyUser'
import Buttons from './buttons'

const FriendListCurrent = ({className, toggle, prop, HandelProp, handelToglle, HandelSearchRequest, FriendlistFromSearch}) => {
    return (
        <>
            {toggle && <div className={"relative w-[620px] p-[5px] md:p-[25px] bg-[var(--bg-color)] border-[1px] border-[#626262]"  + (className ? ` ${className}` : '')}>
                <div className="Title text-[20px] md:text-[30px] font-[500] font-Outfit  text-[#FFFFFF] opacity-80 block mb-[25px]"> {prop} </div>
                <div className='flex fle-row'>
                    <button onClick={handelToglle}>
                            <img className=" top-[20px] right-[18px] absolute w-[25.6px] h-[25.6px]" src={close} alt=''/>
                    </button>
                    <Buttons fun={HandelProp} styleR="58px" icon={AddUser} type="Search"/>
                    <Buttons fun={HandelProp} styleR="98px" icon={removefriend} type="Blocked Users"/>
                    <Buttons fun={HandelProp} styleR="138px" icon={userIcon} type="Panding Requests"/>
                    <Buttons fun={HandelProp} styleR="178px" icon={invite} type="Invetations"/>
                </div>
                <div className="friends-list text-[white] friendsHolder flex flex-col gap-5 h-[254px] overflow-auto">
                    {prop == "Search" &&
                        <>
                            <input onKeyUp={HandelSearchRequest}  className='bg-transparent border-b-[1px] w-[60%] focus-visible:outline-none ' placeholder='Search'/>
                            { <List reason="Search" EndPoint="search" AlreadyDated={FriendlistFromSearch}/> }
                        </>
                    }
                    { prop == "Blocked Users" &&  <List reason="Blocked Users" EndPoint="blocked-friends" /> }
                    { prop == "Panding Requests" && <List reason="Panding Requests" EndPoint="requested-friendships" /> }
                    { prop == "Invetations" && <List reason="Invetations" EndPoint="friendship-requests" /> }

                </div>
            </div>}
            {!toggle && <div className={"relative w-[620px] p-[5px] md:p-[25px] bg-[var(--bg-color)] border-[1px] border-[#626262]"  + (className ? ` ${className}` : '')}>
                <div className="Title text-[20px] md:text-[30px] font-[500] font-Outfit  text-[#FFFFFF] opacity-80 block mb-[25px]"> Friends List</div>
                <button onClick={handelToglle}>
                    <img className=" top-[20px] right-[18px] absolute w-[25.6px] h-[25.6px]" src={AddUser} alt=''/>
                </button>
                <div className="friends-list text-[white] friendsHolder flex flex-col gap-5 h-[230px] overflow-auto">
                    { <List reason="Friends list" isfriend={true} EndPoint="friends" /> }
                </div>
            </div>}
        </>
    );
}

export default FriendListCurrent;