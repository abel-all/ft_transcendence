import { useState , useEffect} from "react";
import friendlistTest from "../../../assets/friendlist.json"



function List({reason, Friend, EndPoint, AlreadyDated, isfriend} = data) {

    const [friendlist, setfriendlist] = useState(friendlistTest);

    useEffect(() => {
        if (!AlreadyDated) {
            const fetchmydata = async () => {
                try {
                    const res = await axios.get(`https://fttran.tech/api/profile/${EndPoint}/`);
                    setfriendlist(res.data);
                    console.log(`List of ${EndPoint} Fetched data with success`);
                } catch (error) {
                    console.log(`List of ${EndPoint} fetchig data Error`);
                }
            }
            fetchmydata();
        }
        else
            setfriendlist(friendlistTest);
    }, []);

    console.log(friendlist);
    return (
        <>                            
            {
                friendlist.map( (friend, index) => {
                    return (
                        <div key={index} className="relative friend flex items-center justify-between h-[57px] px-2  bg-[#2d3c3f] rounded-full border-[1px] border-[#000000] sm:mr-5">
                            <Friend
                                username =   {friend.username}
                                status =   {friend.status}
                                rank =   {friend.rank}
                                reason = {reason}
                                isFriend = {isfriend}
                            />
                        </div>
                    )
                })
            }
        </>
    );
}

export default List;