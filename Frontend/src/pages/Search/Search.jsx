import { useEffect, useState } from 'react'
import LoaderOntop from "../../components/LoaderOntop.jsx";
import Header from "../../components/Header.jsx"
import BottomNaveBar from "../../components/BottomNavBar.jsx"
import SearchEngine from "./SearchEngine.jsx"

const Search = () => {
    const [isLoaded, setIsLoaded] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(false)
        }, 300);
    }, [])

    if (isLoaded)
        return <LoaderOntop />

    return (
        <div className="container mx-auto px-[10px]">
            <Header title="Search" activeSection="" />
            <SearchEngine />
            <BottomNaveBar activeSection="GametableIcon" />
        </div>
    )
}

export default Search