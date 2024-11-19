import NavActive from "./NavActive"
import { useAuth } from "../components/Auth";
import Notification from "./Notification";


function BottomNaveBar(props) {

    const notification = useAuth();

    return (
        <>
            <div className="md:hidden fixed z-[50]">
                {notification.showNotificationMobile && <Notification state={"2"} />}
            </div>
            <div className='fixed bottom-[15px] left-0 right-0 z-50'>
                <div className="container mx-auto px-[10px]">
                    <div className="md:hidden shadow-md backdrop-blur-md bg-[#161c20]/30 rounded-full w-full h-[66px]">
                        <ul className="flex justify-around py-[10px] gap-5">
                            <NavActive active={props.activeSection} />
                        </ul>
                    </div>
                </div>
            </div>
        </>

    )
}

export default BottomNaveBar;
