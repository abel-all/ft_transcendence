import { useState , useEffect} from "react";
import friendlistTest from "../../../assets/friendlist.json"
import Friend from '../../../components/Friend'
import axios from "axios";


function List({reason, EndPoint, AlreadyDated, isfriend} = data) {

    const [friendlist, setfriendlist] = useState([]);

    useEffect(() => {
        if (!AlreadyDated || !Array.isArray(AlreadyDated)) {
            const fetchmydata = async () => {
                try {
                    const res = await axios.get(`https://fttran.tech/api/profile/${EndPoint}/`);
                    setfriendlist(res.data);
                    console.log(`List of ${EndPoint} Fetched data with success ${res}`);
                } catch (error) {
                    console.log(`List of ${EndPoint} fetchig data Error`);
                }
            }
            fetchmydata();
        }
        else
            setfriendlist(AlreadyDated);
    }, [AlreadyDated]);

    return (
        <>

            {
                friendlist ? friendlist.map( (friends, index) => {
                    console.log(`fetched data ${friendlist}`);
                    return (
                        <div key={index} className="relative friend flex items-center justify-between h-[57px] px-2  bg-[#2d3c3f] rounded-full border-[1px] border-[#000000] sm:mr-5">
                            <Friend
                                username =   {friends.username}
                                picture =   {friends.picture}
                                status =   {friends.is_online}
                                rank =   {friends.rank}
                                reason = {reason}
                                isFriend = {true}
                            />
                        </div>
                    )
                })
                : <div className="NoData flex items-center h-full text[20px] font[oblique] font[500] justify-center text-white">No Data To Fetch !</div>
            }
        </>
    );
}

export default List;
