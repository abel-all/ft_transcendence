import rankIcon from "../../assets/imgs/rank.svg"
import { useGameSettings } from './GameSettingsContext'
import "./css/index.css"

const TournamentMatch = () => {
    const gameContext = useGameSettings();

    return (
        <div className="flex flex-col gap-[93px]">
            <div className="flex flex-col gap-[30px]">
                <div className="flex gap-[20px] items-center">
                    <div className="font-medium text-[25px] text-[#000] bg-[#eee] flex justify-center items-center bg-opacity-60 w-[30px] h-[30px] rounded-full">1</div>
                    <div className="flex flex-col gap-[5px]">
                        <TournamentMatchCard
                            rank={gameContext?.participants[0]?.profile?.rank}
                            userImg={gameContext?.participants[0]?.profile?.picture || "https://cdn.intra.42.fr/users/faa4187430345830e7ed57d35c0e4434/abel-all.jpg"}
                            userName={gameContext?.participants[0]?.alias}
                            gradeColor={gameContext?.participants[0]?.profile?.badge === "BRONZE" ? "bg-[#CD7F32]" : "bg-[#fff6f9]"}
                        />
                        {gameContext?.participants.length > 1 ? <TournamentMatchCard
                            rank={gameContext?.participants[1]?.profile?.rank}
                            userImg={gameContext?.participants[1]?.profile?.picture || "https://cdn.intra.42.fr/users/faa4187430345830e7ed57d35c0e4434/abel-all.jpg"}
                            userName={gameContext?.participants[1]?.alias}
                            gradeColor={gameContext?.participants[1]?.profile?.badge === "BRONZE" ? "bg-[#CD7F32]" : "bg-[#fff6f9]"}
                        /> : <EmptyMatchCard />}
                    </div>
                </div>
                <div className="flex gap-[20px] items-center">
                    <div className="font-medium text-[25px] text-[#000] bg-[#eee] flex justify-center items-center bg-opacity-60 w-[30px] h-[30px] rounded-full">2</div>
                    <div className="flex flex-col gap-[5px]">
                        {gameContext?.participants.length > 2 ? <TournamentMatchCard
                            rank={gameContext?.participants[2]?.profile?.rank}
                            userImg={gameContext?.participants[2]?.profile?.picture || "https://cdn.intra.42.fr/users/faa4187430345830e7ed57d35c0e4434/abel-all.jpg"}
                            userName={gameContext?.participants[2]?.alias}
                            gradeColor={gameContext?.participants[2]?.profile?.badge === "BRONZE" ? "bg-[#CD7F32]" : "bg-[#fff6f9]"}
                        /> : <EmptyMatchCard />}
                        {gameContext?.participants.length > 3 ? <TournamentMatchCard
                            rank={gameContext?.participants[3]?.profile?.rank}
                            userImg={gameContext?.participants[3]?.profile?.picture || "https://cdn.intra.42.fr/users/faa4187430345830e7ed57d35c0e4434/abel-all.jpg"}
                            userName={gameContext?.participants[3]?.alias}
                            gradeColor={gameContext?.participants[3]?.profile?.badge === "BRONZE" ? "bg-[#CD7F32]" : "bg-[#fff6f9]"}
                        /> : <EmptyMatchCard />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TournamentMatch;

const Match = ({nbr}) => {

    return (
        <div className="flex gap-[20px] items-center">
            <div className="font-medium text-[25px] text-[#000] bg-[#eee] flex justify-center items-center bg-opacity-60 w-[30px] h-[30px] rounded-full">{nbr}</div>
            <div className="flex flex-col gap-[5px]">
                <EmptyMatchCard />
                <EmptyMatchCard />
            </div>
        </div>
    )
}

const TournamentMatchCard = ({rank, userImg, userName, gradeColor, isLose=false}) => {

    return (
            <div className={`bg-[#4a515b] h-[44px] w-[160px] px-[5px] rounded-[20px] flex justify-center items-center gap-[10px] ${isLose ? "grayscale" : ""}`}>
                <img className="w-[40px] h-[40px] rounded-[20px]" src={userImg} alt="" />
                <div className="flex-1 flex flex-col">
                    <div className="font-light text-[#eee]">{userName}</div>
                    <div className="w-full font-medium opacity-80 text-[#f0f0f1] flex gap-[8px] items-center">
                        <img className="w-[20px]" src={rankIcon} alt="rank icon" />
                        <div className="text-[14px] font-extralight">{rank}</div>
                    </div>
                </div>
                <div className={`w-[20px] h-[20px] rounded-full ${gradeColor}`}></div>
            </div>
    )
}

const EmptyMatchCard = () => {

    return (
        <div className="bg-[#4a515b] h-[44px] w-[160px] rounded-[20px] flex justify-center items-center gap-[10px] animated-bg">
        </div>
    )
}

export { Match, TournamentMatchCard, EmptyMatchCard }