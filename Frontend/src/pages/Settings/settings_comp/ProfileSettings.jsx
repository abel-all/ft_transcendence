import Badge from "./Badge"
import UserBg from "./UserBg"
import MenuBar from "./MenuBar"
import PersonalInformation from "./PersonalInformation"
import AddressInformation from "./AddressInformation"




function ProfileSettings(className) {
    return (
        <div className={"" + (className.className ? ` ${className.className}` : '')}>
            <div className="hidden md:block text-[20px] font-[500] font-[Outfit] opacity-80 py-[25px]"> My profile</div>
            <UserBg/>
            <Badge/>
            <MenuBar className="md:hidden ProfileSettings flex flex-row justify-between font-[500] font-[Outfit] py-[35px]" setShown={className.setShown}/>
            <PersonalInformation className="flex flex-col"/>
            <AddressInformation className="flex flex-col"/>
        </div>
    )
}

export default ProfileSettings