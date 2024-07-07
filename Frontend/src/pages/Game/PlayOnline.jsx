import MatchMaking from "./MatchMaking.jsx";
import { useEffect, useRef, useState } from "react"
import LoaderOntop from "../../components/LoaderOntop.jsx";
import Header from "../../components/Header.jsx"
import BottomNaveBar from "../../components/BottomNavBar.jsx"


const PlayOnline = () => {
    
    const [isLoaded, setIsLoaded] = useState(true);
    const ref = useRef();
    
    const draw = () => {
        
        if(ref.current) {
            const canvas = ref.current;
            const context = canvas.getContext("2d");

            context.shadowColor = 'transparent';
            context.shadowBlur = 0;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;

            context.fillStyle = 'white';
            context.strokeStyle = 'red';
            context.fillRect(0, 120,5, 25);
            // context.strokeRect(0, 120,5, 25);
            // context.fillRect(0, 0,5, 25)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(false)
        }, 500);

    }, [])

    useEffect(() => {
        if (!isLoaded)
            draw();
    }, [isLoaded])

    if (isLoaded)
        return <LoaderOntop />

    

    return (
        <div className="h-[100vh] container mx-auto px-[10px]">
            <Header title="Online Game" activeSection="GametableIcon" />
            <MatchMaking />
            {/* <div className="w-full sm:h-[calc(100%-105px)] sm:flex sm:flex-col sm:justify-center sm:items-center">
                <canvas ref={ref} id="game-canva" className="w-full max-w-[900px] h-[600px] bg-[#1F1F1F] border border-[#626262] rounded-[13px]">

                </canvas>
            </div> */}
            <BottomNaveBar activeSection="GametableIcon" />
        </div>
    )
}

export default PlayOnline
