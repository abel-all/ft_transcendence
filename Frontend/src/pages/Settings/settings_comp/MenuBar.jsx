import { Link } from "react-router-dom"

{/*flex flex-col h-[full]*/}
function MenuBar(className) {
    return (
        <div className={"md:flex-col md:mt-[20px] md:items-center md:m-auto" + (className.className ? ` ${className.className}` : '')}>
            <div className="ProfileSettingsButton border-[1px] md:w-[100%] border-transparent md:mb-[15px] text-center rounded-[30px] p-[6px] cursor-pointer" onClick={() => className.setShown("Profile")}>My Profile</div>
            <div className="SecuritySettingsButton border-[1px] md:w-[100%] border-transparent md:mb-[15px] text-center rounded-[30px] p-[6px] cursor-pointer" onClick={() => className.setShown("Security")}>Security</div>
        </div>
    )
}

export default MenuBar