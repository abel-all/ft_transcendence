import "../Home.css"
import logo from "../../../assets/logo.png"

function Navbar() {

    return (
        <div className="Navbar w-full h-[100px]">
            <div className="logo h-full w-1/4 float-left">
                <img className="w-19 h-full ml-0" src={logo}/>
            </div>
            <div className="menu w-3/4 float-right ">
                <ul className="home-ul flex flex-nowrap justify-end p-6">
                    <li className="text-white py-2">
                        <a href="hello.com">About Us</a>
                    </li>
                    <li className="text-white ml-6 py-2">
                        <a href="hello.com">Contact</a>
                    </li>
                    <li className="home-active-button text-[#002A43] rounded-full bg-[#EEEEEE] ml-6 px-7 py-2">
                        <a href="hello.com">Sign In</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;