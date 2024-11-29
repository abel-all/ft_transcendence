import { useAuth } from "../../components/Auth.jsx";
import Notification from "../../components/Notification.jsx";
import "./css/index.css"


function BellIcon({who, color="#eee", isNotification=true}) {

    const notification = useAuth();

    let opacity = 1;
    if (who == "BellIcon")
        opacity = 0.5;

    const handleClick = () => {
        if (window.innerWidth <= 768)
            notification.setShowNotificationMobileHandler();
        else {
            notification.setShowNotificationHandler();
        }
    }

    return (
        <div className="relative">
            <svg onClick={handleClick} className="cursor-pointer" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5554 33.4848C16.7349 34.4271 18.2924 35 19.9998 35C21.7073 35 23.2648 34.4271 24.4443 33.4848M7.51256 28.6363C6.80987 28.6363 6.4174 27.5324 6.84246 26.9191C7.82877 25.4959 8.78076 23.4086 8.78076 20.895L8.82144 17.2528C8.82144 10.4858 13.8262 5 19.9998 5C26.2644 5 31.3429 10.5666 31.3429 17.4332L31.3022 20.895C31.3022 23.4258 32.2214 25.5246 33.1676 26.9483C33.5762 27.5632 33.1827 28.6363 32.4887 28.6363H7.51256Z" stroke={color} strokeOpacity={opacity} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className={`w-[17px] h-[17px] bg-[#DA2626] absolute top-0 right-0 rounded-full ${isNotification ? "block" : "hidden"}`} >
            </div>
            <div className="max-md:hidden">
                {notification.showNotification && <Notification state={"1"}/>}
            </div>
        </div>
    )
}

export default BellIcon
