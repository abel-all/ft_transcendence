import NavActive from "./NavActive"
import search from "../assets/imgs/search.svg"
import logout from "../assets/imgs/logout.svg"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./Auth";
import Axios from 'axios'

function Header(props) {

    const navigate = useNavigate();
    const auth = useAuth();

    const handleLogout = async () => {
        await Axios.post("https://ftspring.me/api/auth/logout/")
        .then(response => {
            console.log(response);
            auth.setHandler("game", false);
            auth.setHandler("login", false);
            navigate("/", { replace: true });
        }).catch(err => {
            console.log(err);
            console.log("No Server Response")
        })
    }

    return (
        <div className='md:fixed md:top-[15px] md:left-0 md:right-0 md:z-50'>
            <div className="md:container md:mx-auto md:px-[10px]">
                <div className={`md:shadow-md md:backdrop-blur-md md:bg-[#161c20]/30 md:rounded-full p-[10px] flex ${props.hide}`}>
                    <div className="basis-1/3">
                        <p className="font-medium text-[#eee] text-[30px]">{props.title}</p>
                    </div>
                    <div className="basis-1/3">
                        <ul className="md:flex hidden justify-around gap-5">
                            <NavActive active={props.activeSection} />
                        </ul>
                    </div>
                    <div className="basis-1/3">
                        <ul className="flex flex-row-reverse">
                            <li className="ml-[10px] cursor-pointer" onClick={handleLogout}><img className="w-[40px] h-[40px]" src={logout} alt="" /></li>
                            <li className=""><Link to="/search" ><img className="w-[40px] h-[40px]" src={search} alt="" /> </Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Header;
