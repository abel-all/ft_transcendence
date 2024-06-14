


function ProfileSecurity(className) {
    return (
        <div className={"h-screen" + (className.className ? ` ${className.className}` : '')}>
            <div className="hidden md:block text-[20px] font-[500] font-[Outfit] opacity-80 py-[25px]"> Security</div>
            <div className="linksHolder p-[17px]">
                <div className="text-[16px] font-[500] font-[Outfit] text-[#219EBC] mb-[20px]">Change My Passowrd</div>
                <div className="text-[16px] font-[500] font-[Outfit] text-[#219EBC] mb-[20px]">Two-factor Authentication</div>
            </div>
        </div>
    )
}

export default ProfileSecurity