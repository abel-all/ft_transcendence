import UserIcon from "../assets/icons/user"
import ChatIcon from "../assets/icons/chat"
import SettingsIcon from "../assets/icons/settings"
import GameplayIcon from "../assets/icons/gametable"
import BellIcon from "../assets/icons/bell"
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"


const List = ({ to, active, icon}) => {

    const [color, setColor] = useState("#eee");
    const [iconComponent, setIconComponent] = useState();
    
    const changeColorHover = () => {
        setColor("#009F9F");
    }
    const changeColorLeave = () => {
        setColor("#eee");
    }
    useEffect(() => {
        
        switch(icon) {
            case "profile":
                setIconComponent(<UserIcon who = {active} color={color}/>);
                break;
            case "game":
                setIconComponent(<GameplayIcon who = {active} color={color}/>);
                break;
            case "chat":
                setIconComponent(<ChatIcon who = {active} color={color}/>);
                break;
            case "settings":
                setIconComponent(<SettingsIcon who = {active} color={color}/>);
                break;
            case "notification":
                setIconComponent(<BellIcon who = {active} color={color}/>);
                break;
        }
    }, [color, active, icon])

    return (
        <li onMouseMove={changeColorHover} onMouseLeave={changeColorLeave}><Link to={to} > {iconComponent} </Link></li>
    )
}

function NavActive(Data) {

    const navData = [
        {to: "/profile", icon: "profile"},
        {to: "/game", icon: "game"},
        {to: "/chat", icon: "chat"},
        {to: "/settings", icon: "settings"},
        {to: "/notification", icon: "notification"},
    ]
    return (
            <>
                {navData.map((item, index) => (
                    <List 
                        key={index}
                        to={item.to}
                        active={Data.active}
                        icon={item.icon}
                    />
                ))}
                {/* <li onMouseMove={changeColorHover} onMouseLeave={changeColorLeave}><Link to="/profile" > <UserIcon who = {Data.active} color={color}/> </Link></li>
                <li><Link to="/game" > <GameplayIcon who = {Data.active} color={color}/> </Link></li>
                <li><Link to="/chat" ><ChatIcon who = {Data.active} color={color}/> </Link></li>
                <li><Link to="/settings" ><SettingsIcon who = {Data.active} color={color}/> </Link></li>
                <li><Link to="/notification" ><BellIcon  who = {Data.active} color={color}/> </Link></li> */}
            </>
    )
}

export default NavActive