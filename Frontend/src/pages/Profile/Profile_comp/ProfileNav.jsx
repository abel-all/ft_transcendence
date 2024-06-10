import bell from "../../../assets/imgs/bell.svg"
import gametable from "../../../assets/imgs/gametable.png"
import chat from "../../../assets/imgs/chat.png"
import settings from "../../../assets/imgs/settings.png"
import user from "../../../assets/imgs/user.png"
import search from "../../../assets/imgs/search.svg"
import logout from "../../../assets/imgs/logout.svg"
import { Link } from 'react-router-dom'


function ProfileNav() {
    return (
        <div className="ProfileNav flex flex-row">
            <div className="ProfileTitle basis-1/3">
                <p className="font-medium text-[#FFFFFF] opacity-80 text-[30px] font-Outfit py-[30px]">Profile</p>
            </div>
            <div className=" ProfileSections basis-1/3">
                <ul className="flex flex-row py-[30px] gap-5">
                    <li><Link to="/profile" ><img className="w-[40px] h-[40px]" src={user} alt="" /> </Link></li>
                    <li><Link to="/game" ><img className="w-[40px] h-[40px]" src={gametable} alt="" /> </Link></li>
                    <li><Link to="/chat" ><img className="w-[40px] h-[40px]" src={chat} alt="" /> </Link></li>
                    <li><Link to="settings" ><img className="w-[40px] h-[40px]" src={settings} alt="" /> </Link></li>
                    <li><Link to="/notification" ><img className="w-[40px] h-[40px]" src={bell} alt="" /> </Link></li>
                </ul>
            </div>
            <div className="logout basis-1/3">
                <ul className="flex flex-row float-right py-[30px]">
                    <li className="pr-[60px]"><Link to="/search" ><img className="w-[40px] h-[40px]" src={search} alt="" /> </Link></li>
                    <li className="pr-[60px]"><Link to="/logout" ><img className="w-[40px] h-[40px]" src={logout} alt="" /> </Link></li>
                </ul>
            </div>
        </div>
    )
}

export default ProfileNav
