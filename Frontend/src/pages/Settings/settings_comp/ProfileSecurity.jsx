import MenuBar from "./MenuBar"



function ProfileSecurity(className) {
    return (
        <div className={"h-[1093px]" + (className.className ? ` ${className.className}` : '')}>
            <div className="hidden md:block text-[20px] font-[500] font-[Outfit] opacity-80 py-[25px]"> Security</div>
            <MenuBar className="md:hidden SecuritySettings flex flex-row justify-between font-[500] font-[Outfit] py-[35px] " setShown={className.setShown}/>
            <div className="linksHolder p-[17px]">
                <div className="text-[16px] font-[500] font-[Outfit] text-[#219EBC] mb-[20px]">Change My Passowrd</div>
                <div className="text-[16px] font-[500] font-[Outfit] text-[#219EBC] mb-[20px]">Two-factor Authentication</div>
            </div>
        </div>
    )
}

export default ProfileSecurity