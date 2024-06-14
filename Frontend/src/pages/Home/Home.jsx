import Navbar from './home_components/Navbar.jsx';
import HomeContent from './home_components/HomeContent.jsx';

function Home() {

    return (
        <div className="container mx-auto px-[10px] ">
            <Navbar/>
            <HomeContent/>
        </div>
    )
}

export default Home;
