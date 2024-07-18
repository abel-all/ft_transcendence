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
            <div className="h-[100vh] container mx-auto px-[10px]">
                <Header title="Tournament" activeSection="GametableIcon" />
                <div></div>
                <BottomNaveBar activeSection="GametableIcon" />
            </div>
        )
}

export default Tournament