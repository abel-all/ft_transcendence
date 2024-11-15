import Navbar from "../../components/Navbar.jsx"
import AboutContent from './AboutContent.jsx'
import Cards from './Cards.jsx'
import { useEffect, useState } from "react";
import LoaderOntop from "../../components/LoaderOntop.jsx";


function About() {

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
            <AboutContent />
            <Cards />   
        </div>
    )
}

export default About;

