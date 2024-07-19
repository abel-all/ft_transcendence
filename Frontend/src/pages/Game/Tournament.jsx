import { useEffect, useState } from "react"
import LoaderOntop from "../../components/LoaderOntop.jsx";
import Header from "../../components/Header.jsx"
import BottomNaveBar from "../../components/BottomNavBar.jsx"


const Tournament = () => {

    const [isLoaded, setIsLoaded] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(false)
        }, 500);
        
    }, [])
    

    if (isLoaded)
        return <LoaderOntop />

    return (
            <div className="container mx-auto px-[10px]">
                <Header title="Tournament" activeSection="GametableIcon" />
                <div className="mt-[200px] max-sm:mt-[50px] bg-red-700">
                </div>
                <BottomNaveBar activeSection="GametableIcon" />
            </div>
        )
}

export default Tournament