import NavActive from "../../../components/NavActive"

function ChatNavBottom(props) {
    return (
        <div className={` ProfileSectionsBottom md:hidden fixed bottom-0 right-0 left-0 bg-[#2D3C40] w-full mt-[10px] h-[66px] ${props.hide}`}>
            <ul className="flex flex-row justify-around  py-[10px] gap-5">
                <NavActive active = "ChatIcon"/>
            </ul>
        </div>
    )
}

export default ChatNavBottom