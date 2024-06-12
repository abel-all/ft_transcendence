import UserIcon from "../assets/icons/user"
import ChatIcon from "../assets/icons/chat"
import SettingsIcon from "../assets/icons/settings"
import GameplayIcon from "../assets/icons/gametable"
import BellIcon from "../assets/icons/bell"
import { Link } from 'react-router-dom'

function NavActive(Data) {
    return (
        <ul className="md:flex flex-row hidden justify-around py-[30px] gap-5">
            <li><Link to="/profile" > <UserIcon who = {Data.active}/> </Link></li>
            <li><Link to="/game" > <GameplayIcon who = {Data.active}/> </Link></li>
            <li><Link to="/chat" ><ChatIcon who = {Data.active}/> </Link></li>
            <li><Link to="settings" ><SettingsIcon who = {Data.active}/> </Link></li>
            <li><Link to="/notification" ><BellIcon  who = {Data.active}/> </Link></li>
        </ul>
    )
}

export default NavActive