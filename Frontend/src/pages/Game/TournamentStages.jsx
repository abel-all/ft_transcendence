import { EmptyMatchCard } from "./TournamentMatch.jsx"
// import { useGameSettings } from './GameSettingsContext'
// import { TournamentMatchCard } from './TournamentMatch.jsx';

const Final = () => {



    return (
        <div className="match-7 flex gap-[20px] items-center h-[525px]">
            <div className="font-medium text-[25px] text-[#000] bg-[#eee] flex justify-center items-center bg-opacity-60 w-[30px] h-[30px] rounded-full">7</div>
            <div className="flex flex-col gap-[5px]">
                <EmptyMatchCard />
                <EmptyMatchCard />
            </div>
        </div>
    )
}
const SemiFinal = () => {

    // const gameContext = useGameSettings();

    return (
        <div className="flex flex-col gap-[93px]">
            <div className="match-5 flex gap-[20px] items-center h-[216px]">
                <div className="font-medium text-[25px] text-[#000] bg-[#eee] flex justify-center items-center bg-opacity-60 w-[30px] h-[30px] rounded-full">5</div>
                <div className="flex flex-col gap-[5px]">
                    <EmptyMatchCard />
                    <EmptyMatchCard />
                </div>
            </div>
            <div className="match-5 flex gap-[20px] items-center h-[216px]">
                <div className="font-medium text-[25px] text-[#000] bg-[#eee] flex justify-center items-center bg-opacity-60 w-[30px] h-[30px] rounded-full">6</div>
                <div className="flex flex-col gap-[5px]">
                    <EmptyMatchCard />
                    <EmptyMatchCard />
                </div>
            </div>
        </div>
    )
}

export { Final, SemiFinal }