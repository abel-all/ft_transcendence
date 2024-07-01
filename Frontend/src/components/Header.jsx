import NavActive from "./NavActive"
import search from "../assets/imgs/search.svg"
import logout from "../assets/imgs/logout.svg"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'

function Header(props) {

    const navigate = useNavigate();

    const handleLogout = async () => {
        await Axios.post("http://10.13.100.55:8000/api/logout/")
        .then(response => {
            console.log(response);
            if (response.status == 200 || response.status == 304) {
                navigate("/", { replace: true });
            }
            else {
                console.log(response.data.reason)
            }
        }).catch(err => {
            console.log(err);
            console.log("No Server Response")
        })
    }

    return (
        <div className="flex flex-row">
            <div className="basis-1/3">
                <p className="font-medium text-[#FFFFFF] opacity-80 text-[30px] font-Outfit py-[30px]">{props.title}</p>
            </div>
            <div className="basis-1/3">
                <ul className="md:flex flex-row hidden justify-around py-[30px] gap-5">
                    <NavActive active={props.activeSection} />
                </ul>
            </div>
            <div className="basis-1/3">
                <ul className="flex flex-row-reverse py-[30px]">
                    <li className="ml-[10px] cursor-pointer" onClick={handleLogout}><img className="w-[40px] h-[40px]" src={logout} alt="" /></li>
                    <li className=""><Link to="/search" ><img className="w-[40px] h-[40px]" src={search} alt="" /> </Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Header;
