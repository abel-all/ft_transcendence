import Navbar from '../../components/Navbar.jsx';
import HomeContent from './home_components/HomeContent.jsx';
import LoaderOntop from "../../components/LoaderOntop.jsx";
import { useEffect, useState } from "react";

function Home() {

    const [isloaded, setIsloaded] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsloaded(false)
        }, 300);
    }, [])

    if (isloaded)
        return <LoaderOntop />

    return (
        <div className="container mx-auto px-[10px]">
            <Navbar />
            <HomeContent />
        </div>
    )
}

export default Home;
