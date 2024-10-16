import { EmptyMatchCard } from "./TournamentMatch.jsx"
import { useGameSettings } from './GameSettingsContext'
import { TournamentMatchCard } from './TournamentMatch.jsx';

const Final = () => {


    const gameContext = useGameSettings();

    return (
        <div className="match-7 flex gap-[20px] items-center h-[525px]">
            <div className="font-medium text-[25px] text-[#000] bg-[#eee] flex justify-center items-center bg-opacity-60 w-[30px] h-[30px] rounded-full">7</div>
            <div className="flex flex-col gap-[5px]">
                {gameContext?.winnersFinal.length > 0 ? <TournamentMatchCard
                    rank={gameContext?.winnersFinal[0]?.profile?.rank}
                    userImg={gameContext?.winnersFinal[0]?.profile?.picture || "https://cdn.intra.42.fr/users/faa4187430345830e7ed57d35c0e4434/abel-all.jpg"}
                    userName={gameContext?.winnersFinal[0]?.alias}
                    gradeColor={gameContext?.winnersFinal[0]?.profile?.badge === "BRONZE" ? "bg-[#CD7F32]" : "bg-[#fff6f9]"}
                /> : <EmptyMatchCard />}
                {gameContext?.winnersFinal.length > 1 ? <TournamentMatchCard
                    rank={gameContext?.winnersFinal[1]?.profile?.rank}
                    userImg={gameContext?.winnersFinal[1]?.profile?.picture || "https://cdn.intra.42.fr/users/faa4187430345830e7ed57d35c0e4434/abel-all.jpg"}
                    userName={gameContext?.winnersFinal[1]?.alias}
                    gradeColor={gameContext?.winnersFinal[1]?.profile?.badge === "BRONZE" ? "bg-[#CD7F32]" : "bg-[#fff6f9]"}
                /> : <EmptyMatchCard />}
            </div>
        </div>
    )
}
const SemiFinal = () => {

    const gameContext = useGameSettings();

    return (
        <div className="flex flex-col gap-[93px]">
            <div className="match-5 flex gap-[20px] items-center h-[216px]">
                <div className="font-medium text-[25px] text-[#000] bg-[#eee] flex justify-center items-center bg-opacity-60 w-[30px] h-[30px] rounded-full">5</div>
                <div className="flex flex-col gap-[5px]">
                    {gameContext?.winners.length > 0 ? <TournamentMatchCard
                        rank={gameContext?.winners[0]?.profile?.rank}
                        userImg={gameContext?.winners[0]?.profile?.picture || "https://cdn.intra.42.fr/users/faa4187430345830e7ed57d35c0e4434/abel-all.jpg"}
                        userName={gameContext?.winners[0]?.alias}
                        gradeColor={gameContext?.winners[0]?.profile?.badge === "BRONZE" ? "bg-[#CD7F32]" : "bg-[#fff6f9]"}
                    /> : <EmptyMatchCard />}
                    {gameContext?.winners.length > 1 ? <TournamentMatchCard
                        rank={gameContext?.winners[1]?.profile?.rank}
                        userImg={gameContext?.winners[1]?.profile?.picture || "https://cdn.intra.42.fr/users/faa4187430345830e7ed57d35c0e4434/abel-all.jpg"}
                        userName={gameContext?.winners[1]?.alias}
                        gradeColor={gameContext?.winners[1]?.profile?.badge === "BRONZE" ? "bg-[#CD7F32]" : "bg-[#fff6f9]"}
                    /> : <EmptyMatchCard />}
                </div>
            </div>
            <div className="match-5 flex gap-[20px] items-center h-[216px]">
                <div className="font-medium text-[25px] text-[#000] bg-[#eee] flex justify-center items-center bg-opacity-60 w-[30px] h-[30px] rounded-full">6</div>
                <div className="flex flex-col gap-[5px]">
                    {gameContext?.winners.length > 2 ? <TournamentMatchCard
                        rank={gameContext?.winners[2]?.profile?.rank}
                        userImg={gameContext?.winners[2]?.profile?.picture || "https://cdn.intra.42.fr/users/faa4187430345830e7ed57d35c0e4434/abel-all.jpg"}
                        userName={gameContext?.winners[2]?.alias}
                        gradeColor={gameContext?.winners[2]?.profile?.badge === "BRONZE" ? "bg-[#CD7F32]" : "bg-[#fff6f9]"}
                    /> : <EmptyMatchCard />}
                    {gameContext?.winners.length > 3 ? <TournamentMatchCard
                        rank={gameContext?.winners[3]?.profile?.rank}
                        userImg={gameContext?.winners[3]?.profile?.picture || "https://cdn.intra.42.fr/users/faa4187430345830e7ed57d35c0e4434/abel-all.jpg"}
                        userName={gameContext?.winners[3]?.alias}
                        gradeColor={gameContext?.winners[3]?.profile?.badge === "BRONZE" ? "bg-[#CD7F32]" : "bg-[#fff6f9]"}
                    /> : <EmptyMatchCard />}
                </div>
            </div>
        </div>
    )
}

export { Final, SemiFinal }