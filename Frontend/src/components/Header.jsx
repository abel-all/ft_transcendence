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
        await Axios.post("http://10.12.9.12:8800/api/auth/logout/")
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

    const handleOverlayClick = () => {
        auth.setShowNotification(false);
    }

    return (
        <>
            {auth.showNotification && <div onClick={handleOverlayClick} className="w-[100vw] h-[100vh] bg-[#FFF9F6] fixed z-[50] top-0 left-0 opacity-0 max-md:hidden">
            </div>}
            <div className='fixed top-[15px] left-0 right-0 z-50'>
                <div className="container mx-auto px-[10px]">
                    <div className={`shadow-md backdrop-blur-md bg-[#161c20]/30 rounded-full p-[10px] flex ${props.hide}`}>
                        <div className="basis-1/3">
                            <p className="font-medium text-[#eee] text-[30px]">{props.title}</p>
                        </div>
                        <div className="basis-1/3">
                            <ul className="flex max-md:hidden justify-around gap-5">
                                <NavActive active={props.activeSection} />
                            </ul>
                        </div>
                        <div className="basis-1/3">
                            <ul className="flex flex-row-reverse">
                                <li className="ml-[10px] cursor-pointer" onClick={handleLogout}><img className="w-[40px] h-[40px]" src={logout} alt="" /></li>
                                <li onClick={handleOverlayClick} className=""><Link to="/search" ><img className="w-[40px] h-[40px]" src={search} alt="" /> </Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Header;
