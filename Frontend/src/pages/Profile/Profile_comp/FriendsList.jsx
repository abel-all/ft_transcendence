import Friend from '../../../components/Friend'

function FriendsList({className}) {
    return (
        <div className={"w-[620px] h-[319px] p-[25px] bg-[var(--bg-color)] border-[1px] border-[#626262] mt-[2px] mr-[2px]"  + (className ? ` ${className}` : '')}>
            <div className="Title text-[30px] font-[500] font-Outfit  text-[#FFFFFF] opacity-80 block mb-[25px]"> Friends List</div>
            <div className="text-[white] friendsHolder flex flex-col">
                <Friend
                        username = "username"
                        status   = "activeuser"
                        rank     = "5642"
                />
                <Friend
                    username = "Fullusername"
                    status   = "notactiveuser"
                    rank     = "5642"
                />
                <Friend
                username = "fullfullfullusername"
                status   = "activeuser"
                rank     = "5642"
                />
            </div>

        </div>
    )
}

export default FriendsList