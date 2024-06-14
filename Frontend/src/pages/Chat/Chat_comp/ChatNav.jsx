import NavActive from "../../../components/NavActive"
import search from "../../../assets/imgs/search.svg"
import logout from "../../../assets/imgs/logout.svg"
import { Link } from 'react-router-dom'


function ChatNav() {
    return (
        <div className="ChatNav flex flex-row">
            <div className="ProfileTitle basis-2/3 md:basis-1/3">
                <p className="font-medium text-[#FFFFFF] opacity-80  text-[21px] md:text-[30px] font-Outfit py-[30px]">Chat</p>
            </div>
            <div className=" ProfileSections basis-1/3">
            <ul className="md:flex flex-row hidden justify-around py-[30px] gap-5">
                <NavActive active = "ChatIcon"/>
            </ul>
            </div>
            <div className="logout basis-1/3">
                <ul className="flex flex-row-reverse py-[30px]">
                    <li className="ml-[10px]"><Link to="/logout" ><img className="w-[40px] h-[40px]" src={logout} alt="" /> </Link></li>
                    <li className=""><Link to="/search" ><img className="w-[40px] h-[40px]" src={search} alt="" /> </Link></li>
                </ul>
            </div>
        </div>
    )
}

export default ChatNav