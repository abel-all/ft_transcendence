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
        <div className='fixed top-[15px] left-0 right-0 z-50'>
            <div className="container mx-auto px-[10px]">
                <div className="shadow-md backdrop-blur-md bg-[#161c20]/40 rounded-full px-[20px] w-full max-sm:pb-[20px] flex gap-[15px] justify-between max-sm:flex-col max-sm:items-center">
                    <Link to="/"><img className="w-[70px] h-[70px]" src={logo} /></Link>
                    <ul className="flex items-center gap-[20px] max-sm:gap-[10px]">
                        {listItems.map((item, index) => (
                            <li key={index} className="text-[#eee] hover:text-[#00CEFF] duration-[600ms]">
                                {item.specialitem ?
                                    (<Link className="text-black rounded-[15px] bg-[#eee] px-7 py-2 hover:bg-[#00CEFF] hover:shadow-md duration-[600ms]" to={item.to}>{item.name}</Link>) :
                                    (<Link to={item.to}>{item.name}</Link>)
                                }
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
