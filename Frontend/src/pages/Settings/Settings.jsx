import SettingsNavButtom from "./settings_comp/SettingsNavBottom"
import MenuBar from "./settings_comp/MenuBar"
import ProfileSettings from "./settings_comp/ProfileSettings"
import ProfileSecurity from "./settings_comp/ProfileSecurity"
import { useEffect, useState } from "react"
import Header from '../../components/Header'
import "./Settings.css"



function Settings() {

    const [Shown, setShown] = useState("Profile");
    const [Token, setToken] = useState(window.location.href.split("?token=")[1]);

    useEffect(() => {
        if (Token) {
            setShown(prevState => "Security");
        }
    });

    return (
        <div className="container md:mb-[50px] mx-auto flex justify-center w-full h-full">
            <div className='w-full'>
                <Header title="Account Settings" activeSection="SettingsIcon"/>
                <div className="SettingsBody mt-[101px] flex justify-between rounded-md md:border-[1px] md:border-solid border-[#626262] flex-col md:flex-row text-white">
                    <MenuBar className={"hidden md:p-[20px] md:flex md:basis-2/12 " + Shown} setShown={setShown}/>
                    {Shown == "Profile" && <ProfileSettings className="basis-full md:border-l-[1px] border-[#626262]  md:p-[20px] md:basis-10/12" setShown={setShown}/>}
                    {Shown == "Security" &&  <ProfileSecurity className="basis-full md:border-l-[1px] border-[#626262]  md:p-[20px] md:basis-10/12" token={Token} setShown={setShown}/>}
                </div>
                <SettingsNavButtom/>
            </div>
        </div>
    )
}


export default Settings