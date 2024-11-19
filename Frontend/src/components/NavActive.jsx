import UserIcon from "../assets/icons/user"
import ChatIcon from "../assets/icons/chat"
import SettingsIcon from "../assets/icons/settings"
import GameplayIcon from "../assets/icons/gametable"
import BellIcon from "../assets/icons/bell"
import { Link } from 'react-router-dom'
import { useAuth } from "../components/Auth";
import { useEffect, useState } from "react"


const List = ({ to, active, icon }) => {

    const [color, setColor] = useState("#eee");
    const [iconComponent, setIconComponent] = useState();
    const auth = useAuth();

    const handleIconClick = () => {
        auth.setShowNotification(false);
        auth.setShowNotificationMobile(false);
    }

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

    if(icon == "notification")
        return (
            <li onMouseMove={changeColorHover} onMouseLeave={changeColorLeave}>{iconComponent} </li>
        )
    return (
        <li onClick={handleIconClick} onMouseMove={changeColorHover} onMouseLeave={changeColorLeave}><Link to={to} > {iconComponent} </Link></li>
    )
}

function NavActive({ active }) {

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
                        active={active}
                        icon={item.icon}
                    />
                ))}
            </>
    )
}

export default NavActive
