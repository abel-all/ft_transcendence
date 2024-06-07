import userbg from "../../../assets/userbg.png"

function Userbg() {
    return (
        <div className="userbgHolder relative">
            <img className="rounded-t-lg h-[182px] w-full" src={userbg} alt="" />
            <button className="btn-editProfile top-[3px] right-[6px] absolute w-[153px] h-[42px] text-[16px] bg-[#15262A] text-[#EEEEEE] opacity-90 font-Outfit rounded-full font-medium">Edit profile</button>
        </div>
    )
}

export default Userbg