import Header from "../../components/Header.jsx"
import BottomNaveBar from "../../components/BottomNavBar.jsx"
import CardContainer from "./CardContainer.jsx";
import { useEffect, useState } from "react";
import LoaderOntop from "../../components/LoaderOntop.jsx";
import Axios from "axios";


function Game() {

    const [isLoaded, setIsLoaded] = useState(true);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {

            setIsLoaded(false)
            await Axios.get("https://fttran.tech/api/profile/data/",
            {
                withCredentials:true,
            }).then((response) => {
                console.log("first request");
                setUserData(response.data);
            }).catch(err => {
                console.log(err);
                console.log("Please try again!")
            })
        }
        fetchUserData();
        // setTimeout(() => {
        // }, 500);
    }, [])

    if (isLoaded)
        return <LoaderOntop />

    return (
        <div className="container mx-auto px-[10px]">
            <Header title="Game" activeSection="GametableIcon" />
            <CardContainer showSettings={userData.isSettings}/>
            <BottomNaveBar activeSection="GametableIcon" />
        </div>
    )
}


export default Game;
