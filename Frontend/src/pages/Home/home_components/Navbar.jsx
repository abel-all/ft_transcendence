import logo from "../../../assets/imgs/logo.png"
import { Link } from 'react-router-dom'

function Navbar() {

    return (
        <div className="w-full flex gap-[15px] justify-between max-sm:flex-col max-sm:items-center">
            <Link to="/"><img className="w-[97px] h-[97px]" src={logo}/></Link>
            <ul className="flex items-center gap-[20px]">
                <li className="text-white hover:text-[#00CEFF] duration-[600ms]">
                    <Link to="/about">About Us</Link>
                </li>
                <li className="text-white hover:text-[#00CEFF] duration-[600ms]">
                    <Link to='/contact'>Contact</Link>
                </li>
                <li>
                    <Link className="text-black rounded-full bg-[#EEEEEE] px-7 py-2 hover:bg-[#00CEFF] hover:shadow-md duration-[600ms]" to="/signin">Sign In</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;
