import logo from "../assets/imgs/logo.png"
import { Link } from 'react-router-dom'

const listItems = [
    {
        name: "About Us",
        to: "/about"
    },
    {
        name: "Contact",
        to: "/contact"
    },
    {
        name: "Sign In",
        to: "/signin",
        specialitem: true,
    },
]

function Navbar() {

    return (
        <div className="w-full flex gap-[15px] justify-between max-sm:flex-col max-sm:items-center">
            <Link to="/"><img className="w-[97px] h-[97px]" src={logo} /></Link>
            <ul className="flex items-center gap-[20px]">
                {listItems.map((item, index) => (
                    <li key={index} className="text-white hover:text-[#00CEFF] duration-[600ms]">
                        {item.specialitem ?
                            (<Link className="text-black rounded-full bg-[#EEEEEE] px-7 py-2 hover:bg-[#00CEFF] hover:shadow-md duration-[600ms]" to={item.to}>{item.name}</Link>) :
                            (<Link to={item.to}>{item.name}</Link>)
                        }
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Navbar;
