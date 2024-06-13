import logo from "../../../assets/imgs/logo.png"
import { Link } from 'react-router-dom'


function MiniNavbar() {

    return (
        <div className="Navbar w-full h-[100px]">
            <div className="logo h-full w-2/4 float-left">
                <img className="w-19 h-full ml-0" src={logo}/>
            </div>
            <div className="w-2/4 float-right ">
                <ul className="flex flex-nowrap justify-end p-6">
                    <li className="text-white ml-6 py-2">
                        <Link to="/login">Sign In</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MiniNavbar;
