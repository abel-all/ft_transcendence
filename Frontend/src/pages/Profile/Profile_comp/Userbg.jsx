import { Link } from "react-router-dom"
import UserBackground from "../../../assets/imgs/userbg.png"


function Userbg({background_picture} = data) {

    return (
        <div className="userbgHolder mt-[101px] relative">
            <div className={`rounded-t-lg bg-cover bg-center bg-[url('${background_picture ? background_picture : UserBackground}')] h-[182px] w-full`} ></div>
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
