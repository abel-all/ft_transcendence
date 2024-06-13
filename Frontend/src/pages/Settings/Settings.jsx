import SettingsNav from "./settings_comp/SettingsNav"
import "./Settings.css"



function Settings() {
    return (
        <div className="container mx-auto flex justify-center w-full h-full">
            <div className='w-full'>
                <SettingsNav/>
            </div>
        </div>
    )
}


export default Settings