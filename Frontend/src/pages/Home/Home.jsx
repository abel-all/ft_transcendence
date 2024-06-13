import "./Home.css"
import Navbar from './home_components/Navbar.jsx';
import MiniNavbar from './home_components/MiniNavbar.jsx';
import HomeContent from './home_components/HomeContent.jsx';
import Footer from "./home_components/Footer.jsx";
import backgroundVideo from '../../assets/imgs/backgroundVideo.mp4'

function Home() {

    return (
        <div className="container mx-auto px-[10px] ">
            <Navbar/>
            <HomeContent/>
        </div>
    )
}

export default Home;
