import bell from "../../../assets/imgs/bell.svg"
import gametable from "../../../assets/imgs/gametable.svg"
import chat from "../../../assets/imgs/chat.svg"
import settings from "../../../assets/imgs/settings.svg"
import user from "../../../assets/imgs/user.svg"
import search from "../../../assets/imgs/search.svg"
import logout from "../../../assets/imgs/logout.svg"
import { Link } from 'react-router-dom'


function ProfileNavBottom() {
    return (
        <div className=" ProfileSectionsBottom md:hidden fixed bottom-0 right-0 left-0 bg-[#2D3C40] w-full mt-[10px] h-[66px]">
        <ul className="flex flex-row justify-around  py-[10px] gap-5">
            <li><Link to="/profile" ><img className="w-[40px] h-[40px]" src={user} alt="" /> </Link></li>
            <li><Link to="/game" ><img className="w-[40px] h-[40px]" src={gametable} alt="" /> </Link></li>
            <li><Link to="/chat" ><img className="w-[40px] h-[40px]" src={chat} alt="" /> </Link></li>
            <li><Link to="settings" ><img className="w-[40px] h-[40px]" src={settings} alt="" /> </Link></li>
            <li><Link to="/notification" ><img className="w-[40px] h-[40px]" src={bell} alt="" /> </Link></li>
        </ul>
        </div>
    )
}

export default ProfileNavBottom