import Friend from '../../../components/Friend'
import AddUser from "../../../assets/imgs/AddUser.svg"
import friendlist from "../../../assets/friendlist.json"


function FriendsList({className}) {
    return (
        <div className={"relative w-[620px] p-[5px] md:p-[25px] bg-[var(--bg-color)] border-[1px] border-[#626262] mt-[2px] mr-[2px]"  + (className ? ` ${className}` : '')}>
            <div className="Title text-[20px] md:text-[30px] font-[500] font-Outfit  text-[#FFFFFF] opacity-80 block mb-[25px]"> Friends List</div>
            <button>
                <img className=" top-[20px] right-[18px] absolute w-[25.6px] h-[25.6px]" src={AddUser} alt=''/>
            </button>
            <div className="friends-list text-[white] friendsHolder flex flex-col gap-5 max-h-[230px] overflow-auto">
            {
                    friendlist.map( friend => {
                        return (
                            <Friend
                                username =   {friend.username}
                                status =   {friend.status}
                                rank =   {friend.rank}
                            />
                        )
                    })
                }
            </div>

        </div>
    )
}

export default FriendsList