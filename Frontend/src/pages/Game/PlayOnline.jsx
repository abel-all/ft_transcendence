import MatchMaking from "./MatchMaking.jsx";
import { useEffect, useState } from "react"
import LoaderOntop from "../../components/LoaderOntop.jsx";
import Header from "../../components/Header.jsx"
import BottomNaveBar from "../../components/BottomNavBar.jsx"


const PlayOnline = () => {

    const [isLoaded, setIsLoaded] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(false)
        }, 500);
    }, [])

    if (isLoaded)
        return <LoaderOntop />

    return (
        <div className="h-[100vh] container mx-auto px-[10px]">
            <Header title="Online Game" activeSection="GametableIcon" />
            {/* <div className="w-full max-w-[900px] h-full max-h-[600px] bg-[#1F1F1F] border border-[#626262] rounded-[13px] ">

            </div> */}
            {/* <MatchMaking /> */}
            <div className="w-full h-[calc(100%-105px)] min-h-[1000px]  pb-[200px] flex flex-col justify-center items-center">
                <canvas id="game-canva" width={900} height={600} className="bg-[#1F1F1F] border border-[#626262] rounded-[13px]">

                </canvas>
            </div>
            <BottomNaveBar activeSection="GametableIcon" />
        </div>
    )
}

export default PlayOnline