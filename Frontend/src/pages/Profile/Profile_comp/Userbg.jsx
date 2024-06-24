import { Link } from "react-router-dom"
import userbg from "../../../assets/imgs/userbg.png"

function Userbg() {
    return (
        <div className="userbgHolder relative">
            <img className="rounded-t-lg h-[182px] w-full" src={userbg} alt="" />
            <Link to="/settings">
                <div className="Btn-dec flex flex-row justify-around bg-[#15262A]  opacity-90 font-Outfit rounded-full top-[3px] right-[6px] absolute w-[153px] h-[42px] ">
                    <button className="btn-editProfile text-[16px]  text-[#EEEEEE] font-medium">Edit profile</button>
                    <div className="divDico"></div>
                </div>
            </Link>
        </div>
    )
}

export default Userbg
