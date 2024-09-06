import { useEffect, useState } from "react"
import MatchMakingCard from "./MatchMakingCard.jsx";
import Axios from 'axios'


const MatchMaking = () => {

    const [avatar, setAvatar] = useState(true);
    const [userData, setUserData] = useState({});
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchPlayerData = async () => {

            await Axios.post("https://fttran.tech/api/game/join/",
            {
                withCredentials:true,
            }).then((response) => {
                console.log("first request");
                setUserData(response?.data);
                setAvatar(false)
            }).catch(err => {
                console.log(err);
                setMessage("No one wants to play right now. Please try again!")
            })
        }
        fetchPlayerData();
        // setTimeout(() => {
        // }, 5000);
    }, [])

    return (
        <div className="h-[calc(100vh-105px)] min-h-[650px] pb-[200px] flex flex-col justify-center items-center gap-[100px] max-md:gap-[60px]">
            <div className=" flex justify-center items-center max-md:flex-col gap-[100px] max-md:gap-[30px]">
                <MatchMakingCard
                    avatar={false}
                    bgColor="bg-[#CD7F32]"
                    image="https://cdn.intra.42.fr/users/faa4187430345830e7ed57d35c0e4434/abel-all.jpg"
                    username="abel-a
                    ll"
                    rank="233"
                />
                <div className="font-bold text-[50px] text-white">VS</div>
                <MatchMakingCard
                    avatar={avatar}
                    bgColor={`bg-[${userData.badgeColor}]`}
                    image={`${userData.userImage}`}
                    username={`${userData.userName}`}
                    rank={`${userData.rank}`}
                />
            </div>
            <div className="font-light text-[22px] max-md:text-[18px] text-white">
                {message}
            </div>
        </div>
    )
}

export default MatchMaking
