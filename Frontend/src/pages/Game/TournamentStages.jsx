import { EmptyMatchCard } from "./TournamentMatch.jsx"
import { useGameSettings } from './GameSettingsContext'
import { TournamentMatchCard } from './TournamentMatch.jsx';
import defualtImg from "../../assets/imgs/defualtImg.jpg"

const SemiFinal = () => {

    const gameContext = useGameSettings();

    return (
        <div className="flex flex-col gap-[93px]">
            <div className="match-5 flex gap-[20px] items-center h-[216px]">
                <div className="font-medium text-[25px] text-[#000] bg-[#eee] flex justify-center items-center bg-opacity-60 w-[30px] h-[30px] rounded-full">3</div>
                <div className="flex flex-col gap-[5px]">
                    {gameContext?.winners.length > 0 ? <TournamentMatchCard
                        rank={gameContext?.winners[0]?.profile?.rank}
                        userImg={gameContext?.winners[0]?.profile?.picture ? `http://localhost:8888${gameContext?.winners[0]?.profile?.picture}` : defualtImg}
                        userName={gameContext?.winners[0]?.alias}
                        gradeColor={gameContext?.winners[0]?.profile?.badge === "BRONZE" ? "bg-[#CD7F32]" : "bg-[#fff6f9]"}
                    /> : <EmptyMatchCard />}
                    {gameContext?.winners.length > 1 ? <TournamentMatchCard
                        rank={gameContext?.winners[1]?.profile?.rank}
                        userImg={gameContext?.winners[1]?.profile?.picture ? `http://localhost:8888${gameContext?.winners[1]?.profile?.picture}` : defualtImg}
                        userName={gameContext?.winners[1]?.alias}
                        gradeColor={gameContext?.winners[1]?.profile?.badge === "BRONZE" ? "bg-[#CD7F32]" : "bg-[#fff6f9]"}
                    /> : <EmptyMatchCard />}
                </div>
            </div>
        </div>
    )
}

export { SemiFinal }