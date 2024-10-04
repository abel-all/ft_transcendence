import List from './List'
import userIcon from "../../../assets/imgs/userprofile.svg"
import { useEffect, useState } from 'react';
import axios from 'axios';


const FriendListHost = ({className, UrlUsername}) => {

    const [AlreadyDated, setAlreadyDated] = useState([]);

    useEffect(() => {
        const fetchmydata = async () => {
            try {
                const res = await axios.get(`https://www.fttran.tech/api/profile/friends/`, {username : UrlUsername});
                setAlreadyDated(res.data);
                console.log(`List of FRIENDS Fetched data with success for user ${UrlUsername}`);
            } catch (error) {
                console.log(`List of FRIENDS fetchig data Error for user ${UrlUsername}`);
            }
        }
        fetchmydata();
    }, []);

    return (
        <>
            <div className={"relative w-[620px] p-[5px] md:p-[25px] bg-[var(--bg-color)] border-[1px] border-[#626262]"  + (className ? ` ${className}` : '')}>
                <div className="Title text-[20px] md:text-[30px] font-[500] font-Outfit  text-[#FFFFFF] opacity-80 block mb-[25px]"> Friends List</div>
                <button>
                    <img className=" top-[20px] right-[18px] absolute w-[25.6px] h-[25.6px]" src={userIcon} alt=''/>
                </button>
                <div className="friends-list text-[white] friendsHolder flex flex-col gap-5 h-[230px] overflow-auto">
                    { <List reason="Friends list" isfriend={true} EndPoint="friends" AlreadyDated={AlreadyDated}/> }
                </div>
            </div>
        </>
    );
}

export default FriendListHost;
