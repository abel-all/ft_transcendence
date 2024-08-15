import { useEffect, useState } from "react"
import LoaderOntop from "../../components/LoaderOntop.jsx";
import Header from "../../components/Header.jsx"
import BottomNaveBar from "../../components/BottomNavBar.jsx"
import plusIcon from "../../assets/imgs/plusIcon.svg"
import { useGameSettings } from './GameSettingsContext'
import SearchEngine from "../Search/SearchEngine.jsx";
import "./css/index.css"

import rankIcon from "../../assets/imgs/rank.svg"

const EmptyMatchCard = () => {

    return (
        <div className="bg-gradient-to-l from-[#161c20] to-[#43515b] h-[44px] w-[140px] rounded-[15px] flex justify-center items-center gap-[10px]">
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
            <div className="bg-gradient-to-l from-[#161c20] to-[#43515b] h-[44px] w-[140px] rounded-[15px] flex justify-center items-center gap-[10px]">
                <img className="w-[35px] h-[35px] rounded-[8px]" src={userImg} alt="" />
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
    const [focusOnFrnds, setFocusOnFrnds] = useState(true);
    const [focusOnSrch, setFocusOnSrch] = useState(false);
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

    const modalClickHandler1 = () => {
        setFocusOnFrnds(true);
        setFocusOnSrch(false);
    }
    const modalClickHandler2 = () => {
        setFocusOnFrnds(false);
        setFocusOnSrch(true);
    }

    return (
        <>
            <div className="container mx-auto px-[10px]">
                <Header title="Tournament" activeSection="GametableIcon" />
                {!gameContext.modal ?
                    <div>
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
                    </div>
                :
                    <div className="modal-container w-full flex justify-center my-[200px] max-md:mt-[50px]">
                        <div  className="modal-container p-[20px] rounded-[15px] w-full h-[600px] max-w-[600px] bg-gradient-to-t from-[#161c20] to-[#43515b]">
                            <div className="header w-full flex justify-evenly">
                                <button onClick={modalClickHandler1} className={`h-[40px] w-[100px] rounded-[15px] duration-[300ms] font-light ${focusOnFrnds ? "bg-[#009f9f]" : "border border-[#000]"}`}>Friends</button>
                                <button onClick={modalClickHandler2} className={`h-[40px] w-[100px] rounded-[15px] duration-[300ms] font-light ${focusOnSrch ? "bg-[#009f9f]" : "border border-[#000]"}`}>Search</button>
                            </div>
                            <SearchEngine gap="my-[70px] gap-[50px]" scroll="h-[350px] overflow-y-scroll scrollbar-w"/>
                        </div>
                    </div>
                }
                <BottomNaveBar activeSection="GametableIcon" />
            </div>
        </>
        )
}

export default Tournament
