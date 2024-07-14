import Friend from '../../../components/Friend'
import AddUser from "../../../assets/imgs/AddUser.svg"
import friendlist from "../../../assets/friendlist.json"
import removefriend from "../../../assets/imgs/remove_friend.svg"
import { useState } from 'react'
import userIcon from "../../../assets/imgs/userprofile.svg"
import close from "../../../assets/imgs/close.svg"
import invite from "../../../assets/imgs/panding.svg"



function FriendsList({className}) {
    const [toggle, setToggle] = useState(false);

    function handelToglle() {
        setToggle(!toggle);
    }

    const [prop, setProp] = useState("Search");

    function HandelProp(prop) {
        setProp(prop);
    }

    return (
        <>
            {toggle && <div className={"relative w-[620px] p-[5px] md:p-[25px] bg-[var(--bg-color)] border-[1px] border-[#626262]"  + (className ? ` ${className}` : '')}>
                <div className="Title text-[20px] md:text-[30px] font-[500] font-Outfit  text-[#FFFFFF] opacity-80 block mb-[25px]"> {prop} </div>
                <div className='flex fle-row'>
                    <button onClick={handelToglle}>
                            <img className=" top-[20px] right-[18px] absolute w-[25.6px] h-[25.6px]" src={close} alt=''/>
                    </button>
                    <button onClick={() => HandelProp("Search")}>
                            <img className=" top-[20px] right-[58px] absolute w-[25.6px] h-[25.6px]" src={AddUser} alt=''/>
                    </button>
                    <button onClick={() => HandelProp("Blocked Users")}>
                        <img className=" top-[20px] right-[98px] absolute w-[25.6px] h-[25.6px]" src={removefriend} alt=''/>
                    </button>
                    <button onClick={() => HandelProp("Panding Requests")}>
                        <img className=" top-[20px] right-[138px] absolute w-[25.6px] h-[25.6px]" src={userIcon} alt=''/>
                    </button>
                    <button onClick={() => HandelProp("Invetations")}>
                        <img className=" top-[20px] right-[178px] absolute w-[25.6px] h-[25.6px]" src={invite} alt=''/>
                    </button>
                </div>
                <div className="friends-list text-[white] friendsHolder flex flex-col gap-5 h-[254px] overflow-auto">
                    {prop == "Search" &&
                        <>
                            <input className='bg-transparent border-b-[1px] w-[60%] focus-visible:outline-none ' placeholder='Search'/>
                            {
                                friendlist.map( (friend, index) => {
                                    return (
                                        <div key={index} className="relative friend flex items-center justify-between h-[57px] px-2  bg-[#2d3c3f] rounded-full border-[1px] border-[#000000] sm:mr-5">
                                            <Friend
                                                username =   {friend.username}
                                                status =   {friend.status}
                                                rank =   {friend.rank}
                                                reason = "Search"
                                            />
                                        </div>
                                    )
                                })
                            }
                        </>
                    }
                    {prop == "Blocked Users" &&
                        <>                            
                            {
                                friendlist.map( (friend, index) => {
                                    return (
                                        <div key={index} className="relative friend flex items-center justify-between h-[57px] px-2  bg-[#2d3c3f] rounded-full border-[1px] border-[#000000] sm:mr-5">
                                            <Friend
                                                username =   {friend.username}
                                                status =   {friend.status}
                                                rank =   {friend.rank}
                                                reason = "Blocked Users"
                                            />
                                        </div>
                                    )
                                })
                            }
                        </>
                    }
                    {prop == "Panding Requests" &&
                        <>                            
                            {
                                friendlist.map( (friend, index) => {
                                    return (
                                        <div key={index} className="relative friend flex items-center justify-between h-[57px] px-2  bg-[#2d3c3f] rounded-full border-[1px] border-[#000000] sm:mr-5">
                                            <Friend
                                                username =   {friend.username}
                                                status =   {friend.status}
                                                rank =   {friend.rank}
                                                reason = "Panding Requests"
                                            />
                                        </div>
                                    )
                                })
                            }
                        </>
                    }
                    {prop == "Invetations" &&
                    <>                            
                        {
                            friendlist.map( (friend, index) => {
                                return (
                                    <div key={index} className="relative friend flex items-center justify-between h-[57px] px-2  bg-[#2d3c3f] rounded-full border-[1px] border-[#000000] sm:mr-5">
                                        <Friend
                                            username =   {friend.username}
                                            status =   {friend.status}
                                            rank =   {friend.rank}
                                            reason = "Invetations"
                                        />
                                    </div>
                                )
                            })
                        }
                    </>
                }
                </div>
            </div>}
            {!toggle && <div className={"relative w-[620px] p-[5px] md:p-[25px] bg-[var(--bg-color)] border-[1px] border-[#626262]"  + (className ? ` ${className}` : '')}>
                <div className="Title text-[20px] md:text-[30px] font-[500] font-Outfit  text-[#FFFFFF] opacity-80 block mb-[25px]"> Friends List</div>
                <button onClick={handelToglle}>
                    <img className=" top-[20px] right-[18px] absolute w-[25.6px] h-[25.6px]" src={AddUser} alt=''/>
                </button>
                <div className="friends-list text-[white] friendsHolder flex flex-col gap-5 max-h-[230px] overflow-auto">
                {
                        friendlist.map( (friend, index) => {
                            return (
                                <div key={index} className="relative friend flex items-center justify-between h-[57px] px-2  bg-[#2d3c3f] rounded-full border-[1px] border-[#000000] sm:mr-5">
                                    <Friend
                                        username =   {friend.username}
                                        status =   {friend.status}
                                        rank =   {friend.rank}
                                        reason = "Friends list"
                                        isFriend = {true}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>}
        </>
    )
}

export default FriendsList