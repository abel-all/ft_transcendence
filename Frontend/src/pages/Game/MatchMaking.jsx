import { useEffect, useState } from "react"
import MatchMakingCard from "./MatchMakingCard.jsx";



const MatchMaking = () => {

    const [avatar, setAvatar] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setAvatar(false)
        }, 5000);
    }, [])

    return (
        <div className="h-[calc(100vh-105px)] min-h-[650px] flex justify-center items-center pb-[200px] max-md:flex-col gap-[100px] max-md:gap-[30px]">
            <MatchMakingCard
                avatar={false}
                bgColor="bg-[#CD7F32]"
                image="https://cdn.intra.42.fr/users/faa4187430345830e7ed57d35c0e4434/abel-all.jpg"
                username="abel-all"
                rank="233"
            />
            <div className="font-bold text-[50px] text-white">VS</div>
            <MatchMakingCard
                avatar={avatar}
                bgColor="bg-[#B9F2FF]"
                image="https://cdn.intra.42.fr/users/d95f55ada2e553d72f377af58e282003/ychahbi.jpg"
                username="ychahbi"
                rank="6273"
            />
        </div>
    )
}

export default MatchMaking