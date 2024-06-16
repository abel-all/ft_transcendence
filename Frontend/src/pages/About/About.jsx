import Navbar from "../../components/Navbar.jsx"
import AboutContent from './AboutContent.jsx'
import Cards from './Cards.jsx'

function About() {

    return (
        <div className="container mx-auto px-[10px]">
            <Navbar />
            <AboutContent />
            <Cards />
        </div>
    )
}

export default About;

