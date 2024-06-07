import bell from "../../../assets/bell.png"
import gametable from "../../../assets/gametable.png"
import chat from "../../../assets/chat.png"
import settings from "../../../assets/settings.png"
import user from "../../../assets/user.png"
import { Link } from 'react-router-dom'


function ProfileNav() {
    return (
        <div className="ProfileNav flex flex-row">
            <div className="ProfileTitle basis-1/3">
                <p className="font-medium text-[#FFFFFF] opacity-80 text-[30px] font-Outfit py-[30px]">Profile</p>
            </div>
            <div className=" ProfileSections basis-2/3">
                <ul className="flex flex-row py-[30px]">
                    <li className="pr-[60px]"><Link to="/profile" ><img className="w-[40px] h-[40px]" src={user} alt="" /> </Link></li>
                    <li className="pr-[60px]"><Link to="/game" ><img className="w-[40px] h-[40px]" src={gametable} alt="" /> </Link></li>
                    <li className="pr-[60px]"><Link to="/chat" ><img className="w-[40px] h-[40px]" src={chat} alt="" /> </Link></li>
                    <li className="pr-[60px]"><Link to="settings" ><img className="w-[40px] h-[40px]" src={settings} alt="" /> </Link></li>
                    <li className="pr-[60px]"><Link to="/notification" ><img className="w-[40px] h-[40px]" src={bell} alt="" /> </Link></li>
                </ul>
            </div>
        </div>
    )
}

export default ProfileNav