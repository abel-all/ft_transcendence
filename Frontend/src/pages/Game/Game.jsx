import Header from "../../components/Header.jsx"
import BottomNaveBar from "../../components/BottomNavBar.jsx"
import CardContainer from "./CardContainer.jsx";


function Game() {

    return (
        <div className="container mx-auto px-[10px]">
            <Header title="Game" activeSection="GametableIcon" />
            <CardContainer/>
            <BottomNaveBar activeSection="GametableIcon" />
        </div>
    )
}


export default Game;
