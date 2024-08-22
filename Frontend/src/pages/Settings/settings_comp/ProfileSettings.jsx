import Badge from "./Badge"
import UserBg from "./UserBg"
import MenuBar from "./MenuBar"
import PersonalInformation from "./PersonalInformation"
import AddressInformation from "./AddressInformation"
import { useEffect, useState } from "react"
import axios from "axios"




function ProfileSettings(className) {

    const [SettingsData, setSettingsData] = useState([]);


    useEffect(() => {
        axios.get('http://10.12.9.14:8000/personal-data/')
        .then((res) => {
            setSettingsData(res.data);
            console.log("Data for settings : ", res);
        })
        .catch((err) => {
            console.log("Data got an error : ", err);
        });
    }, []);

    return (
        <div className={"" + (className.className ? ` ${className.className}` : '')}>
            <div className="hidden md:block text-[20px] font-[500] font-[Outfit] opacity-80 py-[25px]"> My profile</div>
            <Badge SettingsData={SettingsData}/>
            <MenuBar className="md:hidden ProfileSettings flex flex-row justify-between font-[500] font-[Outfit] py-[35px]" setShown={className.setShown}/>
            <PersonalInformation SettingsData={SettingsData} className="flex flex-col"/>
            <AddressInformation SettingsData={SettingsData} className="flex flex-col"/>
        </div>
    )
}

export default ProfileSettings