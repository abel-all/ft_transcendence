import { useEffect, useState } from "react"
import LoaderOntop from "../../components/LoaderOntop.jsx";
import Header from "../../components/Header.jsx"
import BottomNaveBar from "../../components/BottomNavBar.jsx"
import plusIcon from "../../assets/imgs/plusIcon.svg"
import { useGameSettings } from './GameSettingsContext'
import CreateTournament from "./CreateTournament.jsx";
import SearchModal from "./SearchModal.jsx";
import "./css/index.css"

import rankIcon from "../../assets/imgs/rank.svg"

const EmptyMatchCard = () => {

    return (
        <div className="bg-[#4a515b] h-[44px] w-[140px] rounded-[20px] flex justify-center items-center gap-[10px]">
        </div>
    )
}

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

const TournamentMatchCard = ({rank, userImg, userName, gradeColor}) => {

    return (
            <div className=" bg-[#4a515b] h-[44px] w-[140px] rounded-[20px] flex justify-center items-center gap-[10px]">
                <img className="w-[40px] h-[40px] rounded-[20px]" src={userImg} alt="" />
                <div className="flex flex-col">
                    <div className="font-light text-[#eee]">{userName}</div>
                    <div className="w-full font-medium opacity-80 text-[#f0f0f1] flex gap-[8px]">
                        <img className="w-[20px]" src={rankIcon} alt="rank icon" />
                        <div className="text-[14px] font-extralight">{rank}</div>
                    </div>
                </div>
                <div className={`w-[20px] h-[20px] rounded-full ${gradeColor}`}></div>
            </div>
    )
}

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

const TournamentMatch = () => {

    return (
        <div className="flex flex-col gap-[93px]">
            <div className="flex flex-col gap-[30px]">
                <div className="flex gap-[20px] items-center">
                    <div className="font-medium text-[25px] text-[#000] bg-[#eee] flex justify-center items-center bg-opacity-60 w-[30px] h-[30px] rounded-full">1</div>
                    <div className="flex flex-col gap-[5px]">
                        <TournamentMatchCard
                            rank="342"
                            userImg="https://picsum.photos/200?random=3"
                            userName="abel-all"
                            gradeColor="bg-[#eee]"
                        />
                        <EmptyMatchCard />
                    </div>
                </div>
                <Match nbr={2}/>
            </div>
            <div className="flex flex-col gap-[30px]">
                <Match nbr={3}/>
                <Match nbr={4}/>
            </div>
        </div>
    )
}

const Tournament = () => {

    const [isLoaded, setIsLoaded] = useState(true);
    const gameContext = useGameSettings();

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(false)
        }, 500);

    }, [])

    const clickHandler = () => {
        gameContext.handleModalClick();
    }

    if (isLoaded)
        return <LoaderOntop />

    return (
        <>
            <div className="container mx-auto px-[10px]">
                <Header title="Tournament" activeSection="GametableIcon" />
                {!gameContext.isTournament ? <CreateTournament /> :
                    <>
                        {!gameContext.modal ?
                            <>
                                <div className="w-full flex max-lg:gap-[60px] max-xl:gap-[140px] gap-[240px] justify-center my-[200px] max-md:my-[50px]">
                                    <div className="quarter-final">
                                        <div className="font-light text-[#eee] text-[20px] mb-[30px]">Quarter-final</div>
                                        <TournamentMatch />
                                    </div>
                                    <div className="max-md:hidden Semi-final">
                                        <div className="font-light text-[#eee] text-[20px] mb-[30px]">Semi-final</div>
                                        <SemiFinal />
                                    </div>
                                    <div className="max-md:hidden Final">
                                        <div className="font-light text-[#eee] text-[20px] mb-[30px]">Final</div>
                                        <Final />
                                    </div>
                                </div>
                                <div className="button flex justify-center">
                                    <button onClick={clickHandler} className="bg-[#009f9f] h-[44px] w-full max-w-[140px] rounded-[15px] flex justify-center items-center gap-[10px]">
                                        <div className="text-[#000] font-normal">
                                            Add one
                                        </div>
                                        <img className="w-[25px] h-[25px]" src={plusIcon} />
                                    </button>
                                </div>
                            </>
                        :
                            <SearchModal/>
                        }
                    </>
                }
                <BottomNaveBar activeSection="GametableIcon" />
            </div>
        </>
        )
}

export default Tournament
