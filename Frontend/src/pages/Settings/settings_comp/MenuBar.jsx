import { Link } from "react-router-dom"

{/*flex flex-col h-[full]*/}
function MenuBar(className) {
    return (
        <div className={"md:flex-col md:mt-[20px] md:items-center md:m-auto" + (className.className ? ` ${className.className}` : '')}>
            <div className="ProfileSettingsButton md:mb-[15px] text-center rounded-[30px] p-[6px] cursor-pointer" onClick={() => className.setShown("Profile")}>My Profile</div>
            <div className="SecuritySettingsButton md:mb-[15px] text-center rounded-[30px] p-[6px] cursor-pointer" onClick={() => className.setShown("Security")}>Security</div>
            <div className="DeleteSettingsButton rounded-[30px] p-[6px] cursor-pointer text-[#B63C3C] underline" > Delete Account</div>
        </div>
    )
}

export default MenuBar